/**
 * Physics-based demo simulator.
 *
 * Models a monoblock air/water heat pump with parallel buffer, an unmixed
 * radiator circuit and an indirect DHW cylinder. Powers in kW, heat
 * capacities in kWh/K, mass flows as m·cp in kW/K, time in seconds.
 * The numbers are plausible, not a certified model.
 */

import type { HistoryPoint, Level, PlantMessage } from "../types";

export type SimGroup = "outdoor" | "indoor" | "pc0" | "pc1" | "circ" | "vw1" | "buffer" | "dhw" | "hc" | "tap" | "mixer";
export type SimValues = Record<SimGroup, Record<string, number | string | boolean>>;

export interface SimParams {
  nominal: number;
  source: "air" | "brine";
  bufferL: number;
  dhwL: number;
  auxKw: number;
  heatLoad: number; // kW at design temperature
  designTemp: number;
  floor: boolean;
}

export const DEFAULT_PARAMS: SimParams = {
  nominal: 7.1,
  source: "air",
  bufferL: 120,
  dhwL: 274,
  auxKw: 6,
  heatLoad: 6.2,
  designTemp: -12,
  floor: false,
};

const CP = 4.186 / 3600; // kWh per litre per K
const STEP = 10;
const ROOM_SET = 21;
const COLD = 10;

const DRAWS: [number, number, number][] = [
  // hour of day, minutes, litres per minute (mixed at 40 °C)
  [6.5, 7, 9],
  [6.85, 6, 9],
  [7.2, 5, 8],
  [12.25, 2, 4],
  [18.6, 3, 5],
  [20.4, 8, 9],
  [21.1, 6, 9],
];
const CIRC_WINDOWS: [number, number][] = [
  [6, 7.5],
  [11.5, 12.5],
  [17.5, 19],
];

type Mode = "off" | "heating" | "hot_water" | "defrost" | "compressor_alarm";

export class Simulator {
  p: SimParams;
  time: number;
  speed = 60;
  outdoorMean = 2;
  dailySwing = 2.5;

  // state
  tOut = 2;
  tRoom = 20.8;
  bufTop = 38;
  bufBot = 33;
  dhwTop = 49;
  dhwBot = 43;
  tVl = 30;
  tRl = 28;
  tVlHc = 38;
  tRlHc = 32;
  mode: Mode = "off";
  pTh = 0;
  pEl = 0;
  cop = 0;
  running = false;
  lastStart = -1e9;
  lastStop = -1e9;
  pc0Overrun = 0;
  ice = 0.3;
  defrostLeft = 0;
  aux = 0;
  auxTimer = 0;
  heatDemand = false;
  dhwDemand = false;
  tapFlow = 0;
  tapLeft = 0;
  qEmit = 0;
  starts = 0;
  e = { el: 0, heat: 0, elHeat: 0, elDhw: 0, heatHeat: 0, heatDhw: 0, aux: 0 };
  dim14a = false;
  pv = false;
  disinfect = false;
  fault = false;
  private lastDrawDay = new Map<number, number>();
  /** energy per local day (key: midnight epoch ms), kept for a few days */
  private days = new Map<number, { heat: number; el: number; heatDhw: number; elDhw: number; aux: number }>();
  private sampleAcc = 0;
  private hist = new Map<string, HistoryPoint[]>();
  private active = new Map<string, string>();
  messages: PlantMessage[] = [];
  /** component labels used in message texts */
  labels: Record<string, string> = { dhw: "WW" };
  private listeners: ((m: PlantMessage) => void)[] = [];
  values!: SimValues;

  constructor(params: Partial<SimParams> = {}, now = Date.now() / 1000, labels?: Record<string, string>) {
    this.p = { ...DEFAULT_PARAMS, ...params };
    if (labels) this.labels = { ...this.labels, ...labels };
    this.time = now - 24 * 3600;
    // settle and fill 24 h of history without emitting messages
    this.prefill(now);
  }

  private prefill(now: number): void {
    const quiet = this.listeners;
    this.listeners = [];
    while (this.time < now) this.step(STEP);
    this.messages = this.messages.slice(-40);
    this.listeners = quiet;
  }

  onMessage(cb: (m: PlantMessage) => void): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  /** Advance by real seconds × speed. */
  advance(realDt: number): void {
    let simDt = Math.min(realDt, 1) * this.speed;
    let guard = 0;
    while (simDt > 0 && guard++ < 400) {
      const dt = Math.min(STEP, simDt);
      this.step(dt);
      simDt -= dt;
    }
  }

  hour(): number {
    const d = new Date(this.time * 1000);
    return d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
  }

  // ----------------------------------------------------------- physics

  private pMax(): number {
    const base = this.p.nominal;
    const f = this.p.source === "air" ? 1 + 0.015 * (this.tOut - 2) : 1;
    return Math.max(base * 0.55, Math.min(base * 1.2, base * f));
  }

  private pMin(): number {
    const base = this.p.nominal * 0.18;
    const f = this.p.source === "air" ? 1 + 0.04 * Math.max(0, this.tOut - 2) : 1;
    return Math.max(1, base * f);
  }

  curveSetpoint(): number {
    const design = this.p.floor ? 35 : 50;
    const slope = (design - ROOM_SET) / (ROOM_SET - this.p.designTemp);
    const raise = this.pv ? 5 : 0;
    return Math.max(25, Math.min(design + 5, ROOM_SET + (ROOM_SET - this.tOut) * slope + raise));
  }

  dhwSetpoint(): number {
    if (this.disinfect) return 60;
    return this.pv ? 55 : 50;
  }

  private step(dt: number): void {
    this.time += dt;
    const h = this.hour();
    const hrs = dt / 3600;
    const p = this.p;

    // outdoor temperature: mean + daily swing, warmest at 15:00
    const target = this.outdoorMean + this.dailySwing * Math.cos(((h - 15) / 24) * 2 * Math.PI);
    this.tOut += (target - this.tOut) * Math.min(1, dt / 1800);

    const season = this.tOut < 16;
    const vlSet = this.curveSetpoint();

    // ---------------------------------------------- heating circuit
    const mHc = season ? (650 * CP * 3600) / 3600 : 0; // kW/K
    const qDesign = p.heatLoad * (p.floor ? 1 : 1);
    const dtDesign = p.floor ? 30 - ROOM_SET : 45 - ROOM_SET;
    const n = p.floor ? 1.1 : 1.3;
    let q = 0;
    this.tVlHc = this.bufTop;
    if (mHc > 0) {
      let tm = this.tVlHc - 3;
      for (let i = 0; i < 4; i++) {
        q = qDesign * Math.pow(Math.max(0, (tm - this.tRoom) / dtDesign), n);
        tm = this.tVlHc - q / (2 * mHc);
      }
      // thermostatic valves throttle when the room is warm
      q *= Math.max(0.1, Math.min(1, 1 - (this.tRoom - ROOM_SET - 0.2) * 1.5));
      this.tRlHc = this.tVlHc - q / mHc;
    } else {
      this.tRlHc = this.bufBot;
    }
    this.qEmit = q;
    const hLoss = p.heatLoad / (ROOM_SET - p.designTemp);
    this.tRoom += ((q - hLoss * (this.tRoom - this.tOut) + 0.35) * hrs) / 9;

    // ---------------------------------------------- DHW draws & circulation
    const day = Math.floor(this.time / 86400);
    DRAWS.forEach(([hh, mins, lpm], i) => {
      if (h >= hh && h < hh + 0.1 && this.lastDrawDay.get(i) !== day) {
        this.lastDrawDay.set(i, day);
        this.startDraw(mins, lpm);
      }
    });
    if (this.tapLeft > 0) {
      this.tapLeft -= dt;
      if (this.tapLeft <= 0) this.tapFlow = 0;
    }
    const circOn = CIRC_WINDOWS.some(([a, b]) => h >= a && h < b);
    const cDhwHalf = (p.dhwL / 2) * CP;
    const qDraw = this.tapFlow * 60 * CP * (40 - COLD); // kW
    const dhwLoss = 1.38 / 24 / 2 + (circOn ? 0.12 : 0) / 2;
    this.dhwTop -= ((qDraw * 0.35 + dhwLoss) * hrs) / cDhwHalf;
    this.dhwBot -= ((qDraw * 0.65 + dhwLoss) * hrs) / cDhwHalf;

    // ---------------------------------------------- heat pump control
    const dhwSet = this.dhwSetpoint();
    if (this.dhwTop < dhwSet - 5 || this.dhwBot < dhwSet - 14 || (this.disinfect && this.dhwBot < 59)) this.dhwDemand = true;
    if (this.dhwBot >= dhwSet - 0.5 && this.dhwTop >= dhwSet - 0.5) {
      this.dhwDemand = false;
      if (this.disinfect) {
        this.disinfect = false;
        this.condition("dis", false, "info", "dhw_disinfection", {}, "dhw");
      }
    }
    if (season && this.bufTop < vlSet - 2) this.heatDemand = true;
    const ranLong = this.time - this.lastStart > 600;
    if (!season || (this.bufTop > vlSet + 2.5 && ranLong)) this.heatDemand = false;

    let mode: Mode = this.fault ? "compressor_alarm" : this.dhwDemand ? "hot_water" : this.heatDemand ? "heating" : "off";
    if (this.defrostLeft > 0 && !this.fault) mode = "defrost";
    const wantRun = mode === "heating" || mode === "hot_water" || mode === "defrost";
    if (wantRun && !this.running) {
      if (this.time - this.lastStop >= 480 || mode === "defrost") {
        this.running = true;
        this.lastStart = this.time;
        this.starts++;
        this.pTh = this.pMin();
      } else {
        mode = "off";
      }
    } else if (!wantRun && this.running) {
      if (this.time - this.lastStart > 600 || this.fault) {
        this.running = false;
        this.lastStop = this.time;
        this.pc0Overrun = 180;
      } else {
        mode = this.mode === "hot_water" ? "hot_water" : "heating";
      }
    }
    this.mode = this.running ? mode : this.fault ? "compressor_alarm" : "off";

    // ---------------------------------------------- compressor power
    const pMax = this.pMax();
    const pMin = this.pMin();
    let pTarget = 0;
    if (this.running && this.mode === "heating") {
      pTarget = this.qEmit + 2.2 * (vlSet + 1 - this.bufTop);
    } else if (this.running && this.mode === "hot_water") {
      pTarget = Math.min(pMax * 0.9, Math.max(pMin, (60 - this.dhwBot - 3) * 0.9));
    }
    if (this.running && this.mode !== "defrost") {
      pTarget = Math.max(pMin, Math.min(pMax, pTarget));
      if (this.pTh < pMin) this.pTh = pMin; // restart after defrost
      const ramp = 0.5 * (dt / 60);
      this.pTh += Math.max(-ramp * 2, Math.min(ramp, pTarget - this.pTh));
    } else if (this.mode === "defrost") {
      this.pTh = -3;
    } else {
      this.pTh = 0;
    }

    // ---------------------------------------------- aux heater
    let auxWanted = 0;
    if (!this.dim14a) {
      if (this.fault && season) auxWanted = p.auxKw;
      else if (this.mode === "heating" && this.bufTop < vlSet - 5 && this.pTh >= pMax * 0.95) {
        this.auxTimer += dt;
        if (this.auxTimer > 1200) auxWanted = Math.min(p.auxKw, 3);
      } else this.auxTimer = 0;
      if (this.tOut < p.designTemp + 2 && this.mode === "heating") auxWanted = Math.max(auxWanted, Math.min(p.auxKw, 3));
      if (this.disinfect && this.mode === "hot_water" && this.dhwBot > 52) auxWanted = Math.min(p.auxKw, 3);
    }
    if (this.fault && season && auxWanted > 0) this.heatDemand = true;
    this.aux = auxWanted;

    // ---------------------------------------------- hydraulics
    const pumpOn = this.running || this.pc0Overrun > 0 || (this.fault && this.aux > 0);
    if (!this.running && this.pc0Overrun > 0) this.pc0Overrun -= dt;
    const m0 = pumpOn ? 1100 * CP : 0; // kW/K
    const toDhw = this.mode === "hot_water";
    const qIn = (this.running ? this.pTh : 0) + this.aux;

    if (toDhw) {
      this.tRl = this.dhwBot + 2;
    } else {
      this.tRl = pumpOn ? this.bufBot : this.tRl + (22 - this.tRl) * Math.min(1, dt / 3600);
    }
    this.tVl = m0 > 0 ? this.tRl + qIn / m0 : this.tVl + (this.tRl - this.tVl) * Math.min(1, dt / 600);

    const cBufHalf = ((p.bufferL + 60) / 2) * CP;
    const bm0 = toDhw ? 0 : m0;
    const loss = 0.05 / 2;
    const dTop =
      bm0 * (this.tVl - this.bufTop) + (mHc > bm0 ? (mHc - bm0) * (this.bufBot - this.bufTop) : 0) - loss;
    const dBot =
      mHc * (this.tRlHc - this.bufBot) + (bm0 > mHc ? (bm0 - mHc) * (this.bufTop - this.bufBot) : 0) - loss;
    this.bufTop += (dTop * hrs) / cBufHalf;
    this.bufBot += (dBot * hrs) / cBufHalf;
    if (this.bufBot > this.bufTop) {
      const avg = (this.bufBot + this.bufTop) / 2;
      this.bufBot = this.bufTop = avg;
    }

    if (toDhw) {
      this.dhwBot += (qIn * hrs) / cDhwHalf;
      if (this.dhwBot > this.dhwTop) {
        const avg = (this.dhwBot + this.dhwTop) / 2;
        this.dhwBot = this.dhwTop = avg;
      }
    }

    // ---------------------------------------------- efficiency
    if (this.running && this.mode !== "defrost") {
      const tc = this.tVl + 273.15 + 3;
      const te = (this.p.source === "air" ? this.tOut - 6 : 0) + 273.15;
      this.cop = Math.max(1.4, Math.min(7.5, (0.57 * tc) / Math.max(5, tc - te)));
      this.pEl = this.pTh / this.cop + 0.06;
    } else if (this.mode === "defrost") {
      this.cop = 0;
      this.pEl = 1.1;
    } else {
      this.cop = 0;
      this.pEl = 0.012 + (pumpOn ? 0.03 : 0);
    }
    const heatOut = Math.max(0, this.running ? this.pTh : 0);
    this.e.el += (this.pEl + this.aux) * hrs;
    this.e.aux += this.aux * hrs;
    this.e.heat += (heatOut + this.aux) * hrs;
    const d = new Date(this.time * 1000);
    const dayKey = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    let bucket = this.days.get(dayKey);
    if (!bucket) {
      this.days.set(dayKey, (bucket = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 }));
      for (const k of [...this.days.keys()]) if (k < dayKey - 3 * 86400_000) this.days.delete(k);
    }
    bucket.heat += (heatOut + this.aux) * hrs;
    bucket.el += (this.pEl + this.aux) * hrs;
    bucket.aux += this.aux * hrs;
    if (toDhw) {
      bucket.heatDhw += heatOut * hrs;
      bucket.elDhw += this.pEl * hrs;
    }
    if (toDhw) {
      this.e.elDhw += this.pEl * hrs;
      this.e.heatDhw += heatOut * hrs;
    } else {
      this.e.elHeat += this.pEl * hrs;
      this.e.heatHeat += heatOut * hrs;
    }

    // ---------------------------------------------- icing & defrost
    if (this.defrostLeft > 0) {
      this.defrostLeft -= dt;
      if (this.defrostLeft <= 0) {
        this.ice = 0;
        this.defrostLeft = 0;
      }
    } else if (this.p.source === "air" && this.running && this.tOut < 7 && this.tOut > -15) {
      const humid = this.tOut > -2 ? 1.3 - Math.abs(this.tOut - 1) * 0.12 : 0.9 + this.tOut * 0.04;
      this.ice += Math.max(0.05, humid) * (this.pTh / pMax) * hrs;
      if (this.ice >= 1) this.defrostLeft = 240 + Math.random() * 120;
    }

    this.emitConditions();
    this.values = this.buildValues(vlSet, dhwSet, circOn, pumpOn, m0);
    this.sampleAcc += dt;
    if (this.sampleAcc >= 60) {
      this.sampleAcc = 0;
      this.sample();
    }
  }

  startDraw(minutes: number, lpm: number): void {
    this.tapFlow = lpm;
    this.tapLeft = minutes * 60;
  }

  private buildValues(vlSet: number, dhwSet: number, circOn: boolean, pumpOn: boolean, m0: number): SimValues {
    const r1 = (x: number) => Math.round(x * 10) / 10;
    const pMax = this.pMax();
    const running = this.running;
    return {
      outdoor: {
        outdoor_temp: r1(this.tOut),
        air_in_temp: r1(this.tOut + 0.4),
        activity: this.mode,
        compressor_on: running && this.mode !== "defrost" ? true : running,
        compressor_speed: running ? Math.round((Math.abs(this.pTh) / (pMax * 1.15)) * 100) : 0,
        fan_speed: running && this.mode !== "defrost" ? Math.round(35 + (this.pTh / pMax) * 55) : 0,
        heat_power: r1(Math.max(0, running ? this.pTh : 0)),
        el_power: Math.round(this.pEl * 1000),
        compressor_starts: this.starts,
        evap_in_temp: r1(this.tOut - (running ? 6 : 0)),
        comp_in_temp: r1(this.tOut - (running ? 2 : 0)),
        comp_out_temp: r1(running ? this.tVl + 28 : this.tOut + 5),
        hp_temp: r1(running ? this.tVl + 3 : this.tOut),
        lp_temp: r1(running ? this.tOut - 7 : this.tOut),
        drain_pan_temp: r1(this.mode === "defrost" ? 4 : Math.max(this.tOut, 1)),
        silent_mode: "auto",
      },
      indoor: {
        supply_temp: r1(this.tVl),
        return_temp: r1(this.tRl),
        condenser_temp: r1(this.tVl + (running ? 1 : 0)),
        target_flow_temp: r1(this.mode === "hot_water" ? Math.min(62, dhwSet + 8) : vlSet),
        pressure: r1(1.45 + ((this.bufTop + this.bufBot) / 2 - 30) * 0.008),
        flow: pumpOn ? Math.round(m0 / CP) : 0,
        aux_level: Math.round((this.aux / 9) * 100),
        aux_step1: this.aux >= 3,
        aux_step2: this.aux >= 6,
        aux_step3: this.aux >= 9,
        input1: this.dim14a,
        input2: false,
        input3: false,
        input4: this.pv,
        heating_active: this.mode === "heating",
        dhw_active: this.mode === "hot_water",
        el_energy_total: r1(this.e.el),
        el_energy_heating: r1(this.e.elHeat),
        el_energy_dhw: r1(this.e.elDhw),
        heat_energy_total: r1(this.e.heat),
        heat_energy_heating: r1(this.e.heatHeat),
        heat_energy_dhw: r1(this.e.heatDhw),
        aux_energy_total: r1(this.e.aux),
        service_code: this.fault ? "SIM" : "",
      },
      pc0: { running: pumpOn, speed: pumpOn ? 72 : 0, flow: pumpOn ? 1100 : 0 },
      pc1: { running: this.tOut < 16, speed: this.tOut < 16 ? 55 : 0, flow: this.tOut < 16 ? 650 : 0 },
      circ: { running: circOn },
      vw1: { position: this.mode === "hot_water" },
      buffer: { temp_top: r1(this.bufTop), temp_mid: r1((this.bufTop + this.bufBot) / 2), temp_bottom: r1(this.bufBot) },
      dhw: {
        temp_top: r1(this.dhwTop),
        temp_bottom: r1(this.dhwBot),
        setpoint: dhwSet,
        charging: this.mode === "hot_water",
        onetime: false,
        disinfecting: this.disinfect,
      },
      hc: {
        flow_temp: r1(this.tVlHc),
        return_temp: r1(this.tRlHc),
        target_flow_temp: r1(vlSet),
        room_temp: r1(this.tRoom),
        room_setpoint: ROOM_SET,
        mode: "auto",
        summer_mode: this.tOut < 16 ? "winter" : "summer",
        operating_state: this.tOut < 16 ? "heating" : "off",
        design_temp: this.p.floor ? 35 : 50,
        offset_temp: 0,
        min_flow_temp: 25,
        max_flow_temp: this.p.floor ? 40 : 55,
      },
      tap: { flow: this.tapFlow, temp: r1(this.dhwTop - 2) },
      mixer: { position: this.tOut < 16 ? 40 : 0, flow_temp: r1(Math.min(this.tVlHc, 33)) },
    };
  }

  // ----------------------------------------------------------- messages

  private condition(ident: string, active: boolean, level: Level, key: string, params: Record<string, any>, comp: string | null): void {
    const existing = this.active.get(ident);
    if (active && !existing) {
      const m: PlantMessage = {
        id: Math.random().toString(16).slice(2, 14),
        ts: this.time,
        level,
        key,
        params,
        component_id: comp,
        active: true,
        end_ts: null,
      };
      this.active.set(ident, m.id);
      this.messages.push(m);
      if (this.messages.length > 200) this.messages.shift();
      this.listeners.forEach((l) => l(m));
    } else if (!active && existing) {
      this.active.delete(ident);
      const m = this.messages.find((x) => x.id === existing);
      if (m) {
        m.active = false;
        m.end_ts = this.time;
        this.listeners.forEach((l) => l(m));
      }
    }
  }

  private emitConditions(): void {
    this.condition("defrost", this.mode === "defrost", "info", "defrost", {}, "outdoor");
    this.condition("dhw", this.mode === "hot_water", "info", "dhw_charging", { component: this.labels.dhw }, "dhw");
    this.condition("aux", this.aux > 0, "notice", "aux_heater", {}, "indoor");
    this.condition("in1", this.dim14a, "warning", "input_active", { input: 1, label: "§14a" }, "indoor");
    this.condition("in4", this.pv, "notice", "input_active", { input: 4, label: "PV-Überschuss" }, "indoor");
    this.condition("dis", this.disinfect, "info", "dhw_disinfection", { component: this.labels.dhw }, "dhw");
    this.condition("fault", this.fault, "error", "sim_fault", {}, "outdoor");
  }

  scenarioMessage(name: string): void {
    const m: PlantMessage = {
      id: Math.random().toString(16).slice(2, 14),
      ts: this.time,
      level: "info",
      key: "sim_scenario",
      params: { name },
      component_id: null,
      active: false,
      end_ts: null,
    };
    this.messages.push(m);
    this.listeners.forEach((l) => l(m));
  }

  // ----------------------------------------------------------- history

  private sample(): void {
    const ts = this.time;
    for (const [group, slots] of Object.entries(this.values)) {
      for (const [slot, v] of Object.entries(slots)) {
        const num = typeof v === "number" ? v : typeof v === "boolean" ? (v ? 1 : 0) : null;
        if (num === null && slot !== "activity") continue;
        const key = `${group}.${slot}`;
        let arr = this.hist.get(key);
        if (!arr) this.hist.set(key, (arr = []));
        arr.push(num === null ? { t: ts, v: null, raw: String(v) } : { t: ts, v: num });
        if (arr.length > 1500) arr.splice(0, arr.length - 1440);
      }
    }
  }

  dailyEnergy(): { day: number; heat: number; el: number; heatDhw: number; elDhw: number; aux: number }[] {
    return [...this.days.entries()].sort((a, b) => a[0] - b[0]).map(([day, e]) => ({ day, ...e }));
  }

  history(group: SimGroup, slot: string, hours: number): HistoryPoint[] {
    const arr = this.hist.get(`${group}.${slot}`) || [];
    const from = this.time - hours * 3600;
    return arr.filter((p) => p.t >= from);
  }
}

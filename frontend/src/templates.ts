/** Plant wizard: turns a short description into a laid-out schematic. */

import { t } from "./i18n";
import type { ComponentType, FlowCond, Pipe, PipeKind, Plant, PlantComponent, PortRef, Rotation } from "./types";

export interface CircuitSpec {
  emitter: "radiators" | "floor_heating";
  mixed: boolean;
  label: string;
}

export interface WizardConfig {
  name: string;
  outdoorModel: string;
  nominalKw: number;
  outdoorLabel: string;
  indoorModel: string;
  indoorLabel: string;
  aux: boolean;
  auxKw: number;
  buffer: "none" | "parallel" | "serial";
  bufferVolume: number;
  bufferLabel: string;
  dhw: "none" | "tank";
  dhwVolume: number;
  dhwLabel: string;
  circulation: boolean;
  circuits: CircuitSpec[];
  separator: boolean;
  expansion: boolean;
}

/** Reference plant used as example and default. */
export function exampleConfig(): WizardConfig {
  return {
    name: t("wz.example_name") === "wz.example_name" ? "Meine Anlage" : t("wz.example_name"),
    outdoorModel: "buderus-wlw-mb-ar",
    nominalKw: 7.1,
    outdoorLabel: "WLW-7 MB AR",
    indoorModel: "buderus-wlw186i-e",
    indoorLabel: "WLW186i-12 E",
    aux: true,
    auxKw: 6,
    buffer: "parallel",
    bufferVolume: 120,
    bufferLabel: "Puffer P120.5",
    dhw: "tank",
    dhwVolume: 274,
    dhwLabel: "WW-Speicher SH290.2",
    circulation: true,
    circuits: [{ emitter: "radiators", mixed: false, label: "Heizkörper HK1" }],
    separator: true,
    expansion: true,
  };
}

class Builder {
  components: PlantComponent[] = [];
  pipes: Pipe[] = [];
  private n = 0;

  add(id: string, type: ComponentType, label: string, x: number, y: number, extra: Partial<PlantComponent> = {}): string {
    this.components.push({ id, type, label, x, y, bindings: {}, props: {}, ...extra });
    return id;
  }

  pipe(from: PortRef, to: PortRef, kind: PipeKind, flow: FlowCond[] = [], extra: Partial<Pipe> = {}): void {
    this.pipes.push({ id: `p${++this.n}`, from, to, kind, flow, ...extra });
  }
}

const P = (c: string, p: string): PortRef => ({ c, p });

export function generatePlant(cfg: WizardConfig, previous?: Plant | null): Plant {
  const b = new Builder();
  const hasDhw = cfg.dhw === "tank";
  const P0: FlowCond = { c: "pc0", s: "running" };
  const VA: FlowCond[] = hasDhw ? [{ c: "vw1", s: "a" }] : [];
  const VB: FlowCond = { c: "vw1", s: "b" };

  // ---------------------------------------------------------- generator
  b.add("ou", "outdoor_unit", cfg.outdoorLabel || t("type.outdoor_unit"), 1, 4, {
    model: cfg.outdoorModel,
    props: { nominal_kw: cfg.nominalKw },
  });
  b.add("iu", "indoor_unit", cfg.indoorLabel || t("type.indoor_unit"), 14, 4, {
    model: cfg.indoorModel,
    props: {
      aux_kw: cfg.aux ? cfg.auxKw : 0,
      input_labels: { input1: "§14a / EVU", input4: "PV" },
      input_levels: { input1: "warning" },
      pressure_min: 1.0,
      pressure_max: 2.7,
    },
  });
  b.add("pc0", "pump", "PC0", 22, 11, { rot: 180 as Rotation, props: { role: "primary" } });
  b.pipe(P("ou", "out"), P("iu", "src_in"), "supply", [P0]);
  b.pipe(P("iu", "src_out"), P("ou", "in"), "return", [P0]);
  b.pipe(P("pc0", "out"), P("iu", "ret"), "return", [P0]);

  // heating supply source on the primary side and the primary return target
  let heatSupply: PortRef = P("iu", "sup");
  let primaryReturn: PortRef = P("pc0", "in");
  if (hasDhw) {
    b.add("vw1", "valve_3way", "VW1", 27, 5, { props: { role: "dhw_switch" } });
    b.add("j1", "junction", "", 26, 12);
    b.pipe(P("iu", "sup"), P("vw1", "in"), "supply", [P0]);
    b.pipe(P("j1", "l"), P("pc0", "in"), "return", [P0]);
    heatSupply = P("vw1", "a");
    primaryReturn = P("j1", "r");
  }

  // ---------------------------------------------------------- buffer
  let hcSupply = heatSupply;
  let hcReturn = primaryReturn;
  const hcSupplyFlow: FlowCond[] = [P0, ...VA];
  let hcUsesPrimary = true;
  if (cfg.buffer === "parallel") {
    b.add("buf", "buffer", cfg.bufferLabel || t("type.buffer"), 34, 4, { props: { volume: cfg.bufferVolume } });
    b.pipe(heatSupply, P("buf", "in_sup"), "supply", [P0, ...VA]);
    b.pipe(P("buf", "in_ret"), primaryReturn, "return", [P0, ...VA]);
    hcSupply = P("buf", "out_sup");
    hcReturn = P("buf", "out_ret");
    hcUsesPrimary = false;
  } else if (cfg.buffer === "serial") {
    b.add("buf", "buffer", cfg.bufferLabel || t("type.buffer"), 34, 8, { props: { volume: cfg.bufferVolume } });
    b.pipe(P("buf", "in_ret"), primaryReturn, "return", [P0, ...VA]);
    hcReturn = P("buf", "out_ret");
  }

  // ---------------------------------------------------------- circuits
  const n = Math.max(1, cfg.circuits.length);
  const many = n > 1;
  // with several circuits the manifold block moves right, clear of the DHW tap area
  const xBase = many ? 52 : 41;
  const xMs = 50; // supply manifold column
  const xMr = 49; // return manifold column
  const pumpConds: FlowCond[] = [];
  cfg.circuits.slice(0, 6).forEach((hc, i) => {
    const yc = 5 + i * (many ? 12 : 10);
    const idx = i + 1;
    const needsPump = !hcUsesPrimary || hc.mixed;
    const pumpId = `hc${idx}_pump`;
    const mixId = `hc${idx}_mix`;
    const emId = `hc${idx}`;
    let x = xBase;
    let supplyIn: PortRef;
    let flowHc: FlowCond[];
    if (needsPump) {
      b.add(pumpId, "pump", hcUsesPrimary || hc.mixed ? `PC${idx}` : "PC1", x, yc, {
        props: { role: hc.mixed ? "hc" : "secondary", circuit: idx },
      });
      supplyIn = P(pumpId, "in");
      flowHc = [{ c: pumpId, s: "running" }];
      pumpConds.push(flowHc[0]);
      x += 4;
    } else {
      flowHc = hcSupplyFlow;
      supplyIn = P("__next", "in");
    }
    let lastSupply: PortRef | null = needsPump ? P(pumpId, "out") : null;
    if (hc.mixed) {
      b.add(mixId, "mixer", `VC${idx}`, x, yc, { props: { circuit: idx } });
      if (lastSupply) b.pipe(lastSupply, P(mixId, "in"), "supply", flowHc);
      else supplyIn = P(mixId, "in");
      lastSupply = P(mixId, "out");
      x += 3;
    }
    const emX = Math.max(x + 3, xBase + 7);
    b.add(emId, hc.emitter, hc.label || t("wz.circuit", { n: idx }), emX, yc, { props: { circuit: idx } });
    if (lastSupply) b.pipe(lastSupply, P(emId, "sup"), "supply", flowHc);
    else supplyIn = P(emId, "sup");

    // supply from source / manifold
    if (many) {
      const js = `js${idx}`;
      b.add(js, "junction", "", xMs, yc + 1);
      b.pipe(P(js, "r"), supplyIn, "supply", flowHc);
      if (i === 0) b.pipe(hcSupply, P(js, "l"), "supply", [], { flow: [] });
      else b.pipe(P(`js${i}`, "b"), P(js, "t"), "supply", []);
    } else {
      b.pipe(hcSupply, supplyIn, "supply", needsPump ? flowHc : hcSupplyFlow);
    }

    // return chain, right to left on row yc+7
    const row = yc + 7;
    let prev: PortRef = P(emId, "ret");
    let cur = emX - 3;
    if (hc.mixed) {
      const jm = `hc${idx}_jm`;
      const mixer = b.components.find((c) => c.id === mixId)!;
      b.add(jm, "junction", "", mixer.x + 1, row);
      b.pipe(prev, P(jm, "r"), "return", flowHc);
      b.pipe(P(jm, "t"), P(mixId, "ret"), "return", flowHc);
      prev = P(jm, "l");
      cur = mixer.x - 2;
    }
    if (cfg.expansion && i === 0) {
      b.add("jmag", "junction", "", cur, row);
      b.add("mag", "expansion_vessel", "MAG", cur - 1, row - 5);
      b.pipe(prev, P("jmag", "r"), "return", flowHc);
      b.pipe(P("mag", "conn"), P("jmag", "t"), "return", []);
      prev = P("jmag", "l");
      cur -= 4;
    }
    if (cfg.separator && !many) {
      b.add("sep", "separator", t("type.separator"), cur - 1, row - 1, { rot: 180 as Rotation });
      b.pipe(prev, P("sep", "in"), "return", flowHc);
      prev = P("sep", "out");
    }
    if (many) {
      const jr = `jr${idx}`;
      b.add(jr, "junction", "", xMr, row);
      b.pipe(prev, P(jr, "r"), "return", flowHc);
      if (i > 0) b.pipe(P(jr, "t"), P(`jr${i}`, "b"), "return", []);
    } else {
      b.pipe(prev, hcReturn, "return", needsPump ? flowHc : hcSupplyFlow);
    }
  });
  if (many) {
    // common return to the buffer / heat pump, optional separator
    const flowAny = pumpConds.length ? pumpConds : undefined;
    const manifoldFlow = hcUsesPrimary ? hcSupplyFlow : [];
    b.pipes.filter((p) => p.flow && p.flow.length === 0 && p.kind === "supply").forEach((p) => {
      p.flow = manifoldFlow;
      p.flowAny = flowAny;
    });
    let last: PortRef = P("jr1", "l");
    if (cfg.separator) {
      b.add("sep", "separator", t("type.separator"), 44, 11, { rot: 180 as Rotation });
      b.pipe(last, P("sep", "in"), "return", manifoldFlow, { flowAny });
      last = P("sep", "out");
    }
    b.pipe(last, hcReturn, "return", manifoldFlow, { flowAny });
    b.pipes.filter((p) => p.kind === "return" && p.flow && p.flow.length === 0 && p.from.c.startsWith("jr")).forEach((p) => {
      p.flow = manifoldFlow;
      p.flowAny = flowAny;
    });
  }

  // ---------------------------------------------------------- hot water
  if (hasDhw) {
    b.add("dhw", "dhw_tank", cfg.dhwLabel || t("type.dhw_tank"), 32, 20, { props: { volume: cfg.dhwVolume } });
    b.add("tap", "tap", t("type.tap"), 41, 16);
    b.add("inlet", "water_inlet", t("type.water_inlet"), 29, 32);
    b.pipe(P("vw1", "b"), P("dhw", "coil_in"), "supply", [P0, VB]);
    b.pipe(P("dhw", "coil_out"), P("j1", "b"), "return", [P0, VB]);
    const draw: FlowCond = { c: "tap", s: "flowing" };
    const circ: FlowCond = { c: "circ", s: "running" };
    b.pipe(P("dhw", "hot"), P("tap", "hot"), "dhw_hot", [], { flowAny: cfg.circulation ? [draw, circ] : [draw] });
    b.pipe(P("inlet", "out"), P("dhw", "cold"), "dhw_cold", [draw]);
    if (cfg.circulation) {
      b.add("circ", "pump", t("role.circulation").split(" ")[0], 39, 23, { rot: 180 as Rotation, props: { role: "circulation" } });
      b.pipe(P("tap", "circ"), P("circ", "in"), "circulation", [circ]);
      b.pipe(P("circ", "out"), P("dhw", "circ"), "circulation", [circ]);
    }
  }

  // drop placeholder references (circuits fed straight from the primary side)
  b.pipes = b.pipes.filter((p) => p.from.c !== "__next" && p.to.c !== "__next");

  const plant: Plant = {
    version: 1,
    name: cfg.name,
    grid: { w: many ? 76 : 64, h: Math.max(36, 8 + n * 12) },
    components: b.components,
    pipes: b.pipes,
    settings: previous?.settings ?? { style: "flat", demo: true },
  };
  plant.settings = { ...plant.settings, wizard: cfg } as any;

  // keep bindings, icons and badge choices of components that still exist
  if (previous) {
    const old = new Map(previous.components.map((c) => [c.id, c]));
    for (const c of plant.components) {
      const o = old.get(c.id);
      if (o && o.type === c.type) {
        c.bindings = { ...o.bindings };
        if (o.icon) c.icon = o.icon;
        if (o.show) c.show = o.show;
      }
    }
  }
  return plant;
}

export function examplePlant(): Plant {
  return generatePlant(exampleConfig());
}

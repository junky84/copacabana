/**
 * Efficiency: live COP vs. expectation, and seasonal performance (JAZ / SPF)
 * per day, month and year from energy counters.
 */

import { outdoorModel } from "../catalog";
import type { Hass, Plant, PlantComponent } from "../types";
import type { Simulator } from "../sim/simulator";
import type { ValueSource } from "./values";

/** Reference point of datasheets: COP at A7/W35. */
export const REF_OUT = 7;
export const REF_FLOW = 35;
export const DEFAULT_COP_REF = 4.9;

/** Carnot-based COP model (same physics as the demo simulator). */
export function copModel(tOut: number, tFlow: number, source: "air" | "brine" = "air"): number {
  const tc = tFlow + 273.15 + 3;
  const te = (source === "air" ? tOut - 6 : 0) + 273.15;
  return Math.max(1.2, Math.min(8, (0.57 * tc) / Math.max(5, tc - te)));
}

/** Expected COP at the given conditions, calibrated to the datasheet A7/W35 value. */
export function expectedCop(tOut: number, tFlow: number, copRef = DEFAULT_COP_REF, source: "air" | "brine" = "air"): number {
  return (copRef * copModel(tOut, tFlow, source)) / copModel(REF_OUT, REF_FLOW, source);
}

export type Ampel = "green" | "yellow" | "red";

export function ampel(ratio: number): Ampel {
  return ratio >= 0.9 ? "green" : ratio >= 0.75 ? "yellow" : "red";
}

export const AMPEL_COLOR: Record<Ampel, string> = { green: "#3ddc97", yellow: "#f5c542", red: "#ff5a5f" };

export interface LiveCop {
  cop: number;
  expected: number;
  ratio: number;
  ampel: Ampel;
  tOut: number;
  tFlow: number;
}

/** Live COP with expectation; undefined while the compressor is not in steady heating. */
export function liveCop(plant: Plant, src: ValueSource): LiveCop | undefined {
  const ou = plant.components.find((c) => c.type === "outdoor_unit");
  const iu = plant.components.find((c) => c.type === "indoor_unit");
  if (!ou || !iu) return undefined;
  const num = (c: PlantComponent, s: string) => {
    const v = src.get(c, s);
    return v?.available && v.num !== null ? v.num : undefined;
  };
  const heat = num(ou, "heat_power");
  let el = num(ou, "el_power");
  if (el !== undefined && src.get(ou, "el_power")?.unit === "kW") el *= 1000;
  const tOut = num(ou, "outdoor_temp");
  const tFlow = num(iu, "supply_temp");
  const act = String(src.get(ou, "activity")?.raw ?? "").toLowerCase();
  if (heat === undefined || el === undefined || tOut === undefined || tFlow === undefined) return undefined;
  if (heat < 0.5 || el < 80 || act.includes("defrost") || act.includes("abtau")) return undefined;
  const cop = heat / (el / 1000);
  const source = outdoorModel(ou.model).source;
  const expected = expectedCop(tOut, tFlow, Number(ou.props.cop_ref) || DEFAULT_COP_REF, source);
  const ratio = cop / expected;
  return { cop, expected, ratio, ampel: ampel(ratio), tOut, tFlow };
}

// ------------------------------------------------------------- periods

export interface Energy {
  heat: number;
  el: number;
  heatDhw: number;
  elDhw: number;
  aux: number;
}

export interface DayEnergy extends Energy {
  /** local midnight, epoch ms */
  day: number;
}

export interface EfficiencyData {
  today: Energy | null;
  yesterday: Energy | null;
  month: Energy | null;
  year: Energy | null;
  daily: DayEnergy[];
  /** values are a model estimate (demo) */
  estimated: { month: boolean; year: boolean };
  /** reason why live statistics are missing, if any */
  missing?: "no_counters" | "no_statistics";
}

export function spf(e: Energy | null): number | undefined {
  return e && e.el > 0.05 ? e.heat / e.el : undefined;
}

const EMPTY: Energy = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 };

function add(a: Energy, b: Partial<Energy>): Energy {
  return {
    heat: a.heat + (b.heat || 0),
    el: a.el + (b.el || 0),
    heatDhw: a.heatDhw + (b.heatDhw || 0),
    elDhw: a.elDhw + (b.elDhw || 0),
    aux: a.aux + (b.aux || 0),
  };
}

export function midnight(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

const SLOT_KEYS: Record<keyof Energy, string[]> = {
  heat: ["heat_energy_total"],
  el: ["el_energy_total"],
  heatDhw: ["heat_energy_dhw"],
  elDhw: ["el_energy_dhw"],
  aux: ["aux_energy_total"],
};

/** Long-term statistics of the bound energy counters. */
export async function hassEfficiency(hass: Hass, plant: Plant): Promise<EfficiencyData> {
  const iu = plant.components.find((c) => c.type === "indoor_unit");
  const ids: Partial<Record<keyof Energy, string>> = {};
  for (const [key, slots] of Object.entries(SLOT_KEYS) as [keyof Energy, string[]][]) {
    const id = slots.map((s) => iu?.bindings[s]).find(Boolean);
    if (id) ids[key] = id;
  }
  const empty: EfficiencyData = { today: null, yesterday: null, month: null, year: null, daily: [], estimated: { month: false, year: false } };
  if (!ids.heat || !ids.el) return { ...empty, missing: "no_counters" };

  const now = new Date();
  const statIds = Object.values(ids) as string[];
  const call = (start: Date, period: "day" | "month") =>
    hass.callWS<Record<string, { start: number; change?: number | null }[]>>({
      type: "recorder/statistics_during_period",
      start_time: start.toISOString(),
      end_time: now.toISOString(),
      statistic_ids: statIds,
      period,
      types: ["change"],
      units: { energy: "kWh" },
    });
  const [days, months] = await Promise.all([
    call(new Date(midnight(now) - 30 * 86400_000), "day"),
    call(new Date(now.getFullYear(), 0, 1), "month"),
  ]);

  const byDay = new Map<number, Energy>();
  for (const [key, id] of Object.entries(ids) as [keyof Energy, string][]) {
    for (const row of days[id] || []) {
      const day = midnight(new Date(row.start));
      byDay.set(day, add(byDay.get(day) || EMPTY, { [key]: row.change || 0 }));
    }
  }
  if (!byDay.size) return { ...empty, missing: "no_statistics" };
  const daily = [...byDay.entries()].sort((a, b) => a[0] - b[0]).map(([day, e]) => ({ day, ...e }));
  const today = byDay.get(midnight(now)) || null;
  const yesterday = byDay.get(midnight(now) - 86400_000) || null;

  let year: Energy = EMPTY;
  let month: Energy | null = null;
  for (const [key, id] of Object.entries(ids) as [keyof Energy, string][]) {
    for (const row of months[id] || []) {
      year = add(year, { [key]: row.change || 0 });
      if (new Date(row.start).getMonth() === now.getMonth()) month = add(month || EMPTY, { [key]: row.change || 0 });
    }
  }
  return { today, yesterday, month, year, daily, estimated: { month: false, year: false } };
}

// ------------------------------------------------------------ demo

/** Long-term monthly mean outdoor temperatures, Rhine-Main area (°C). */
const MONTH_TEMPS = [2.0, 3.0, 6.5, 10.5, 14.5, 18.0, 20.0, 19.5, 15.5, 10.5, 6.0, 3.0];

/** Real systems lose to defrosting, cycling, pumps and standby compared to the steady-state model. */
const SEASONAL_FACTOR = 0.8;

/** Analytic month estimate for the demo plant (heating curve, DHW for 5 persons). */
function estimateMonth(sim: Simulator, month: number, days: number, tMean?: number): Energy {
  const t = tMean ?? MONTH_TEMPS[month];
  const p = sim.p;
  const hLoss = p.heatLoad / (21 - p.designTemp);
  // heating degree hours with a daily spread of ±4 K around the mean
  let heatKwh = 0;
  let elHeat = 0;
  for (const dt of [-4, -2, 0, 2, 4]) {
    const tt = t + dt;
    if (tt >= 16) continue;
    const q = hLoss * (21 - tt) * 24 * days * 0.2 * 0.85; // internal / solar gains ~15 %
    const vl = 21 + (21 - tt) * ((p.floor ? 35 : 50) - 21) / (21 - p.designTemp);
    heatKwh += q;
    elHeat += q / (copModel(tt, vl, p.source) * SEASONAL_FACTOR);
  }
  const dhwKwh = (8.4 * days * (p.dhwL > 0 ? 1 : 0));
  const elDhw = dhwKwh / (copModel(t, 53, p.source) * SEASONAL_FACTOR);
  return { heat: heatKwh + dhwKwh, el: elHeat + elDhw, heatDhw: dhwKwh, elDhw, aux: 0 };
}

export function simEfficiency(sim: Simulator): EfficiencyData {
  const now = new Date(sim.time * 1000);
  const todayKey = midnight(now);
  const daily = sim.dailyEnergy();
  const today = daily.find((d) => d.day === todayKey) || null;
  const yesterday = daily.find((d) => d.day === todayKey - 86400_000) || null;
  // the running month and the recent days follow the demo's outdoor temperature setting
  const month = estimateMonth(sim, now.getMonth(), now.getDate() - 1 + now.getHours() / 24, sim.outdoorMean);
  let year = EMPTY;
  for (let m = 0; m < now.getMonth(); m++) year = add(year, estimateMonth(sim, m, new Date(now.getFullYear(), m + 1, 0).getDate()));
  year = add(year, month);
  // 30 synthetic days so the chart has something to show
  const synthetic: DayEnergy[] = [];
  for (let i = 29; i >= 2; i--) {
    const day = todayKey - i * 86400_000;
    const d = new Date(day);
    const recent = i <= 14 ? (14 - i) / 14 : 0;
    const tDay = MONTH_TEMPS[d.getMonth()] * (1 - recent) + sim.outdoorMean * recent + Math.sin(i * 1.3) * 2;
    const e = estimateMonth(sim, d.getMonth(), 1, tDay);
    const wobble = 1 + Math.sin(i * 1.7) * 0.18;
    synthetic.push({ day, ...e, heat: e.heat * wobble, el: e.el * wobble * (1 + Math.cos(i) * 0.04) });
  }
  return {
    today,
    yesterday,
    month,
    year,
    daily: [...synthetic, ...daily.filter((d) => d.day >= todayKey - 86400_000)],
    estimated: { month: true, year: true },
  };
}

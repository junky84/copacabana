/**
 * Costs and PV share of the heat pump's electricity.
 *
 * The daily electricity comes from the energy counters (efficiency data). How
 * much of it was covered by PV / battery is derived hour by hour from the
 * energy layer: the grid import is shared out proportionally over everything
 * that consumed power in that hour (house, wallbox, heat pump).
 */

import type { Hass, Plant, TariffConfig } from "../types";
import type { Simulator } from "../sim/simulator";
import { midnight, type DayEnergy } from "./efficiency";

export const DEFAULT_TARIFF: Required<Omit<TariffConfig, "price_entity">> & { price_entity?: string } = {
  mode: "fixed",
  price: 0.32,
  feed_in: 0.08,
  gas_price: 0.12,
  gas_eff: 90,
};

export function tariffOf(plant: Plant): typeof DEFAULT_TARIFF {
  return { ...DEFAULT_TARIFF, ...(plant.settings.tariff || {}) };
}

export interface CostDay {
  day: number;
  /** heat pump electricity, kWh */
  el: number;
  /** of which from the grid / from PV or battery */
  grid: number;
  self: number;
  heat: number;
  /** grid cost in € */
  cost: number;
  /** feed-in revenue given up for the self-supplied part, € */
  feedLoss: number;
  /** what the same heat would have cost with gas/oil, € */
  gas: number;
  /** share of PV/battery is a model estimate */
  estimated: boolean;
  /** PV share unknown (no energy layer data) */
  noShare: boolean;
}

export interface CostTotals {
  el: number;
  grid: number;
  self: number;
  heat: number;
  cost: number;
  feedLoss: number;
  gas: number;
  estimated: boolean;
  noShare: boolean;
}

/** Per hour: heat pump kWh, of it from the grid, and the mean price. */
interface Hour {
  hp: number;
  grid: number;
  price?: number;
}

type HourMap = Map<number, Hour>;

function kwFactor(unit: string | undefined): number {
  const u = (unit || "").toLowerCase();
  return u === "kw" ? 1 : u === "mw" ? 1000 : 0.001;
}

/** Grid share of one hour from mean powers (kW). */
function gridPart(hp: number, grid: number, house: number | undefined, wallbox: number, houseIncludesHp: boolean): number {
  if (hp <= 0) return 0;
  const imp = Math.max(0, grid);
  const total = house !== undefined ? house + wallbox + (houseIncludesHp ? 0 : hp) : hp + wallbox;
  if (total <= 0.01) return hp;
  return hp * Math.min(1, imp / total);
}

/** Hourly split from recorder long-term statistics (mean power per hour). */
async function hassHours(hass: Hass, plant: Plant, days: number): Promise<{ hours: HourMap; share: boolean }> {
  const ou = plant.components.find((c) => c.type === "outdoor_unit");
  const hpId = ou?.bindings.el_power;
  const en = plant.settings.energy;
  const tariff = tariffOf(plant);
  const hours: HourMap = new Map();
  if (!hpId) return { hours, share: false };
  const ids = [hpId, en?.grid, en?.house, en?.wallbox, tariff.mode === "entity" ? tariff.price_entity : undefined].filter((x): x is string => !!x);
  const res = await hass.callWS<Record<string, { start: number; mean?: number | null }[]>>({
    type: "recorder/statistics_during_period",
    start_time: new Date(midnight(new Date()) - days * 86400_000).toISOString(),
    end_time: new Date().toISOString(),
    statistic_ids: ids,
    period: "hour",
    types: ["mean"],
  });
  const series = (id?: string) => {
    const m = new Map<number, number>();
    if (!id) return m;
    const f = kwFactor(hass.states[id]?.attributes?.unit_of_measurement);
    for (const row of res[id] || []) if (row.mean !== null && row.mean !== undefined) m.set(row.start, row.mean * f);
    return m;
  };
  const hp = series(hpId);
  const sign = (v: number, invert?: boolean) => (invert ? -v : v);
  const grid = series(en?.enabled ? en.grid : undefined);
  const house = series(en?.enabled ? en.house : undefined);
  const wallbox = series(en?.enabled ? en.wallbox : undefined);
  const price = new Map<number, number>();
  if (tariff.mode === "entity" && tariff.price_entity) for (const row of res[tariff.price_entity] || []) if (row.mean != null) price.set(row.start, row.mean);
  const share = grid.size > 0;
  for (const [t, p] of hp) {
    const g = grid.get(t);
    const gridKwh = g === undefined ? p : gridPart(p, sign(g, en?.grid_invert), house.get(t), wallbox.get(t) ?? 0, en?.house_includes_hp !== false);
    hours.set(t, { hp: p, grid: gridKwh, price: price.get(t) });
  }
  return { hours, share };
}

/** Demo: minute history of the simulator, grouped by hour. */
function simHours(sim: Simulator): HourMap {
  const series = (slot: string) => sim.history("energy", slot, 24);
  const hp = series("hp_power");
  const grid = series("grid_power");
  const house = series("house_power");
  const wallbox = series("wallbox_power");
  const hours: HourMap = new Map();
  hp.forEach((p, i) => {
    const t = Math.floor((p.t * 1000) / 3600_000) * 3600_000;
    const kw = (p.v ?? 0) / 1000;
    const g = gridPart(kw, (grid[i]?.v ?? 0) / 1000, (house[i]?.v ?? 0) / 1000, (wallbox[i]?.v ?? 0) / 1000, false);
    const h = hours.get(t) || { hp: 0, grid: 0 };
    // minute samples: kW × 1/60 h
    h.hp += kw / 60;
    h.grid += g / 60;
    hours.set(t, h);
  });
  return hours;
}

/** Combine the daily energy with the hourly split and the tariff. */
export function costDays(daily: DayEnergy[], hours: HourMap, share: boolean, plant: Plant, demo: boolean): CostDay[] {
  const tariff = tariffOf(plant);
  const byDay = new Map<number, { hp: number; grid: number; priced: number; gridForPrice: number }>();
  for (const [t, h] of hours) {
    const day = midnight(new Date(t));
    const d = byDay.get(day) || { hp: 0, grid: 0, priced: 0, gridForPrice: 0 };
    d.hp += h.hp;
    d.grid += h.grid;
    if (h.price !== undefined) {
      d.priced += h.grid * h.price;
      d.gridForPrice += h.grid;
    }
    byDay.set(day, d);
  }
  return daily.map((e) => {
    const d = byDay.get(e.day);
    let gridShare: number;
    let estimated = false;
    if (d && d.hp > 0.05 && (share || demo)) gridShare = Math.min(1, d.grid / d.hp);
    else if (demo) {
      // older demo days: a plausible share for the season (more PV when less heat is needed)
      gridShare = Math.max(0.45, Math.min(0.92, 0.6 + e.el / 60));
      estimated = true;
    } else gridShare = 1;
    const price = d && d.gridForPrice > 0.01 ? d.priced / d.gridForPrice : tariff.price;
    const grid = e.el * gridShare;
    const self = e.el - grid;
    return {
      day: e.day,
      el: e.el,
      grid,
      self,
      heat: e.heat,
      cost: grid * price,
      feedLoss: self * tariff.feed_in,
      gas: (e.heat / Math.max(0.5, tariff.gas_eff / 100)) * tariff.gas_price,
      estimated,
      noShare: !share && !demo,
    };
  });
}

export async function loadCostDays(daily: DayEnergy[], plant: Plant, sim: Simulator | null, hass?: Hass): Promise<CostDay[]> {
  if (!daily.length) return [];
  if (sim) return costDays(daily, simHours(sim), true, plant, true);
  if (!hass) return costDays(daily, new Map(), false, plant, false);
  const { hours, share } = await hassHours(hass, plant, 31);
  return costDays(daily, hours, share, plant, false);
}

export function sumCosts(days: CostDay[]): CostTotals | null {
  if (!days.length) return null;
  const z: CostTotals = { el: 0, grid: 0, self: 0, heat: 0, cost: 0, feedLoss: 0, gas: 0, estimated: false, noShare: false };
  for (const d of days) {
    z.el += d.el;
    z.grid += d.grid;
    z.self += d.self;
    z.heat += d.heat;
    z.cost += d.cost;
    z.feedLoss += d.feedLoss;
    z.gas += d.gas;
    z.estimated ||= d.estimated;
    z.noShare ||= d.noShare;
  }
  return z;
}

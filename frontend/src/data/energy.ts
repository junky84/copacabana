/**
 * Energy layer: household power flows around the heat pump – PV, grid,
 * battery, house, wallbox – plus §14a dimming and the PV surplus signal.
 * All powers are returned in kW: grid > 0 = import, battery > 0 = discharge.
 */

import type { EnergyConfig, Hass, Plant, PlantComponent, SlotValue } from "../types";

export type { EnergyConfig };
import type { Simulator } from "../sim/simulator";
import { truthy, type ValueSource } from "./values";

export interface EnergyFlow {
  pv?: number;
  grid?: number;
  battery?: number;
  soc?: number;
  /** other household consumers (without heat pump and wallbox) */
  house?: number;
  wallbox?: number;
  hp?: number;
  dim14a: boolean;
  pvSignal: boolean;
  limit14a: number;
}

function kw(v: SlotValue | undefined): number | undefined {
  if (!v?.available || v.num === null || !Number.isFinite(v.num)) return undefined;
  const unit = (v.unit || "").toLowerCase();
  if (unit === "kw") return v.num;
  if (unit === "mw") return v.num * 1000;
  return v.num / 1000;
}

const first = (plant: Plant, type: string) => plant.components.find((c) => c.type === type);

/** Is the 14a / PV input active? Looks at the input labels of the indoor unit. */
function inputs(iu: PlantComponent | undefined, src: ValueSource): { dim14a: boolean; pv: boolean } {
  const labels: Record<string, string> = iu?.props.input_labels || {};
  let dim14a = false;
  let pv = false;
  for (const n of [1, 2, 3, 4]) {
    if (!iu || !truthy(src.get(iu, `input${n}`))) continue;
    const label = labels[`input${n}`] || "";
    if (/14a|evu|sperr/i.test(label)) dim14a = true;
    else if (/pv|solar|überschuss|surplus/i.test(label)) pv = true;
  }
  return { dim14a, pv };
}

export function energyAvailable(plant: Plant, sim: Simulator | null): boolean {
  const cfg = plant.settings.energy;
  return !!sim || !!(cfg?.enabled && (cfg.pv || cfg.grid || cfg.battery || cfg.house || cfg.wallbox));
}

export function readEnergy(plant: Plant, src: ValueSource, sim: Simulator | null): EnergyFlow {
  const cfg: EnergyConfig = plant.settings.energy || {};
  const ou = first(plant, "outdoor_unit");
  const iu = first(plant, "indoor_unit");
  const flags = inputs(iu, src);
  const limit14a = cfg.limit_14a ?? 4.2;
  if (sim) {
    const e = sim.values.energy as Record<string, number>;
    return {
      pv: e.pv_power / 1000,
      grid: e.grid_power / 1000,
      battery: e.battery_power / 1000,
      soc: e.battery_soc,
      house: e.house_power / 1000,
      wallbox: e.wallbox_power / 1000,
      hp: e.hp_power / 1000,
      dim14a: flags.dim14a,
      pvSignal: flags.pv,
      limit14a,
    };
  }
  const ent = (id?: string) => (id ? kw(src.getEntity(id)) : undefined);
  const pv = ent(cfg.pv);
  let grid = ent(cfg.grid);
  if (grid !== undefined && cfg.grid_invert) grid = -grid;
  let battery = ent(cfg.battery);
  if (battery !== undefined && cfg.battery_invert) battery = -battery;
  const socV = cfg.battery_soc ? src.getEntity(cfg.battery_soc) : undefined;
  const soc = socV?.available && socV.num !== null ? socV.num : undefined;
  const wallbox = ent(cfg.wallbox);
  const hp = ou ? kw(src.get(ou, "el_power")) : undefined;
  let house = ent(cfg.house);
  if (house !== undefined) {
    if (cfg.house_includes_hp !== false && hp !== undefined) house -= hp;
  } else if (grid !== undefined) {
    // balance: what is left after heat pump and wallbox
    house = grid + (pv ?? 0) + (battery ?? 0) - (hp ?? 0) - (wallbox ?? 0);
  }
  if (house !== undefined) house = Math.max(0, house);
  return { pv, grid, battery, soc, house, wallbox, hp, dim14a: flags.dim14a, pvSignal: flags.pv, limit14a };
}

/** Suggest entities from common integrations (evcc first, then SolaX Modbus). */
export function suggestEnergy(hass: Hass): EnergyConfig {
  const ids = Object.keys(hass.states);
  const has = (id: string) => (hass.states[id] ? id : undefined);
  const find = (re: RegExp) => ids.find((id) => re.test(id));
  if (has("sensor.evcc_grid_power") || has("sensor.evcc_pv_power")) {
    return {
      enabled: true,
      pv: has("sensor.evcc_pv_power"),
      grid: has("sensor.evcc_grid_power"),
      battery: has("sensor.evcc_battery_power"),
      battery_soc: has("sensor.evcc_battery_soc"),
      house: has("sensor.evcc_home_power"),
      house_includes_hp: true,
      wallbox: find(/^sensor\.evcc_.+_charge_power$/),
    };
  }
  const solax = (re: RegExp) => find(new RegExp(`^sensor\\.solax.*${re.source}`));
  if (find(/^sensor\.solax/)) {
    return {
      enabled: true,
      pv: solax(/pv_power_total$/),
      // SolaX reports export as positive ("measured power") and charging as positive
      grid: solax(/measured_power$/),
      grid_invert: true,
      battery: solax(/battery_power_charge$/),
      battery_invert: true,
      battery_soc: find(/^sensor\.solax_battery_capacity$/),
      house: solax(/house_load$/),
      house_includes_hp: true,
    };
  }
  return { enabled: true };
}

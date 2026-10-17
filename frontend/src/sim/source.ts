import { indoorModel, outdoorModel, variantOf } from "../catalog";
import type { HistoryPoint, Plant, PlantComponent, SlotValue } from "../types";
import type { ValueSource } from "../data/values";
import { Simulator, type SimGroup, type SimParams } from "./simulator";

/** Which simulator group feeds a plant component. */
export function simGroup(c: PlantComponent): SimGroup | null {
  switch (c.type) {
    case "outdoor_unit":
      return "outdoor";
    case "indoor_unit":
      return "indoor";
    case "buffer":
      return "buffer";
    case "dhw_tank":
      return "dhw";
    case "radiators":
    case "floor_heating":
      return "hc";
    case "tap":
      return "tap";
    case "mixer":
      return "mixer";
    case "valve_3way":
      return "vw1";
    case "pump": {
      const role = c.props.role;
      if (role === "primary") return "pc0";
      if (role === "circulation") return "circ";
      return "pc1";
    }
    default:
      return null;
  }
}

export function simParamsFor(plant: Plant | null): Partial<SimParams> {
  if (!plant) return {};
  const ou = plant.components.find((c) => c.type === "outdoor_unit");
  const iu = plant.components.find((c) => c.type === "indoor_unit");
  const buf = plant.components.find((c) => c.type === "buffer");
  const dhw = plant.components.find((c) => c.type === "dhw_tank");
  const im = indoorModel(iu?.model);
  const model = outdoorModel(ou?.model);
  const hcs = plant.components.filter((c) => c.type === "radiators" || c.type === "floor_heating");
  return {
    nominal: Number(ou?.props.nominal_kw) || model.nominal,
    source: model.source,
    bufferL: Number(buf?.props.volume) || im?.buffer || (buf ? 120 : 30),
    dhwL: Number(dhw?.props.volume) || im?.dhw || 274,
    auxKw: Number(iu?.props.aux_kw) || 6,
    heatLoad: Number(plant.settings?.heat_load) || 6.2,
    floor: hcs.length > 0 && hcs.every((c) => c.type === "floor_heating"),
  };
}

const UNITS: Record<string, string> = {};

export class SimSource implements ValueSource {
  constructor(public sim: Simulator) {}

  entityOf(): string | undefined {
    return undefined;
  }

  getEntity(): SlotValue | undefined {
    return undefined;
  }

  get(c: PlantComponent, slot: string): SlotValue | undefined {
    if (c.type === "value_tile") {
      const entry = ((c.props.entries as { slot: string; sim?: string }[]) || []).find((e) => e.slot === slot);
      if (!entry?.sim) return undefined;
      const [g, s] = entry.sim.split(".");
      return this.wrap((this.sim.values as any)[g]?.[s]);
    }
    // parts built into the indoor unit
    if (c.type === "indoor_unit") {
      const inner: Record<string, [SimGroup, string]> = {
        pc0_running: ["pc0", "running"],
        pc0_speed: ["pc0", "speed"],
        vw1_position: ["vw1", "position"],
        pc1_running: ["pc1", "running"],
        pc1_speed: ["pc1", "speed"],
        dhw_temp: ["dhw", "temp_top"],
        dhw_setpoint: ["dhw", "setpoint"],
        dhw_charging: ["dhw", "charging"],
        buffer_temp: ["buffer", "temp_top"],
      };
      const m = inner[slot];
      if (m) {
        const variant = variantOf(c)?.id;
        if ((slot.startsWith("dhw_") && variant !== "t180") || (slot === "buffer_temp" && variant !== "tp70") || (slot.startsWith("pc1") && variant === "wall_e"))
          return undefined;
        return this.wrap(this.sim.values[m[0]]?.[m[1]]);
      }
    }
    const group = simGroup(c);
    if (!group) return undefined;
    let v = this.sim.values[group]?.[slot];
    if (v === undefined) return undefined;
    // stagger additional heating circuits a little so they do not look cloned
    if (group === "hc" && typeof v === "number" && Number(c.props.circuit) > 1 && ["flow_temp", "return_temp", "target_flow_temp"].includes(slot)) {
      v = Math.round((v - (c.type === "floor_heating" ? 12 : 2)) * 10) / 10;
    }
    return this.wrap(v, UNITS[slot]);
  }

  private wrap(v: number | string | boolean | undefined, unit?: string): SlotValue | undefined {
    if (v === undefined) return undefined;
    return {
      raw: v,
      num: typeof v === "number" ? v : typeof v === "boolean" ? (v ? 1 : 0) : null,
      unit,
      available: true,
    };
  }

  async history(c: PlantComponent, slot: string, hours: number): Promise<HistoryPoint[]> {
    const group = simGroup(c);
    if (!group) return [];
    return this.sim.history(group, slot, hours);
  }
}

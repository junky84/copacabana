/**
 * Explain mode: describes in plain words what the plant is doing right now and
 * what each component is for. Works with live data and with the demo simulator.
 */

import { outdoorModel, variantOf } from "../catalog";
import type { Plant, PlantComponent } from "../types";
import { componentFlags, normalizeActivity, type ValueSource } from "./values";

export type ExplainTone = "heat" | "dhw" | "cold" | "warn" | "error" | "eco" | "info";

export interface ExplainItem {
  id: string;
  tone: ExplainTone;
  /** translation key (ex.*) and its parameters */
  key: string;
  params: Record<string, any>;
  /** optional second sentence: background knowledge */
  hint?: string;
  /** component the item is about (highlighted on hover) */
  comp?: string;
}

const first = (plant: Plant, ...types: string[]) => plant.components.find((c) => types.includes(c.type));

function reader(src: ValueSource) {
  const num = (c: PlantComponent | undefined, slot: string): number | undefined => {
    if (!c) return undefined;
    const v = src.get(c, slot);
    return v?.available && v.num !== null && Number.isFinite(v.num) ? v.num : undefined;
  };
  const on = (c: PlantComponent | undefined, slot: string): boolean => {
    const n = num(c, slot);
    if (n !== undefined) return n > 0;
    if (!c) return false;
    const raw = String(src.get(c, slot)?.raw ?? "").toLowerCase();
    return ["on", "true", "an", "ein", "1", "yes"].includes(raw);
  };
  return { num, on };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** What is happening right now, most important first. */
export function explainPlant(plant: Plant, src: ValueSource): ExplainItem[] {
  const { num, on } = reader(src);
  const ou = first(plant, "outdoor_unit");
  const iu = first(plant, "indoor_unit");
  const buf = first(plant, "buffer");
  const dhw = first(plant, "dhw_tank");
  const hc = first(plant, "radiators", "floor_heating");
  const tap = first(plant, "tap");
  const circ = plant.components.find((c) => c.type === "pump" && c.props.role === "circulation");
  const ouF = ou ? componentFlags(ou, src) : new Set<string>();
  const iuF = iu ? componentFlags(iu, src) : new Set<string>();
  const items: ExplainItem[] = [];
  if (!ou && !iu) return items;

  const brine = outdoorModel(ou?.model).source === "brine";
  const out = num(ou, "outdoor_temp");
  const heat = num(ou, "heat_power");
  let el = num(ou, "el_power");
  if (el !== undefined && ou && src.get(ou, "el_power")?.unit !== "kW") el /= 1000;
  const cop = heat !== undefined && el !== undefined && el > 0.05 && heat > 0.2 ? heat / el : undefined;
  const speed = num(ou, "compressor_speed");
  const sup = num(iu, "supply_temp");
  const ret = num(iu, "return_temp");
  const target = num(iu, "target_flow_temp") ?? num(hc, "target_flow_temp");
  const bufT = num(buf, "temp_top") ?? num(iu, "buffer_temp");
  const dhwT = num(dhw, "temp_top") ?? num(iu, "dhw_temp");
  const dhwSet = num(dhw, "setpoint") ?? num(iu, "dhw_setpoint");
  const aux = num(iu, "aux_level");
  const limit = num(hc, "heating_limit") ?? 16;
  const act = ou ? normalizeActivity(src.get(ou, "activity")) : undefined;
  const running = ouF.has("running");
  const dhwMode = act === "hot_water" || (running && iuF.has("b"));
  const charging = dhwMode || on(dhw, "charging") || iuF.has("charging");
  const source = brine ? "ground" : "air";
  const defrost = ouF.has("defrost");

  // ------------------------------------------------ main state
  if (ouF.has("alarm")) {
    items.push({ id: "alarm", tone: "error", key: "ex.alarm", params: {}, comp: ou?.id });
  } else if (ouF.has("defrost")) {
    items.push({ id: "defrost", tone: "cold", key: "ex.defrost", params: { out }, hint: "ex.defrost_hint", comp: ou?.id });
  } else if (running && dhwMode) {
    items.push({
      id: "dhw",
      tone: "dhw",
      key: dhwT !== undefined && dhwSet !== undefined ? "ex.dhw_charge" : "ex.dhw_charge_short",
      params: { dhw: dhwT, set: dhwSet },
      hint: "ex.dhw_charge_hint",
      comp: dhw?.id ?? iu?.id,
    });
  } else if (running) {
    items.push({
      id: "heating",
      tone: "heat",
      key: heat !== undefined && el !== undefined ? `ex.heating_${source}` : `ex.heating_${source}_short`,
      params: { out, heat: heat !== undefined ? r1(heat) : undefined, el: el !== undefined ? r1(el) : undefined },
      comp: ou?.id,
    });
  } else if (out !== undefined && out >= limit) {
    items.push({ id: "off", tone: "info", key: "ex.off_limit", params: { out, limit }, comp: ou?.id });
  } else if (bufT !== undefined && target !== undefined && bufT >= target - 1) {
    items.push({ id: "off", tone: "info", key: "ex.off_buffer", params: { buf: bufT, target }, hint: "ex.off_buffer_hint", comp: buf?.id ?? iu?.id });
  } else {
    items.push({ id: "off", tone: "info", key: "ex.off", params: {}, comp: ou?.id });
  }

  // ------------------------------------------------ efficiency of the moment
  if (running && !ouF.has("defrost") && cop !== undefined) {
    items.push({
      id: "cop",
      tone: cop >= 3.5 ? "eco" : cop >= 2.5 ? "info" : "warn",
      key: "ex.cop",
      params: { cop: r1(cop), speed },
      hint: speed !== undefined ? "ex.cop_modulating" : undefined,
      comp: ou?.id,
    });
  }

  // ------------------------------------------------ heating curve and flow temperature
  if (!dhwMode && !defrost && target !== undefined && out !== undefined && out < limit) {
    items.push({
      id: "curve",
      tone: "heat",
      key: sup !== undefined ? "ex.curve" : "ex.curve_short",
      params: { out, target, sup },
      hint: "ex.curve_hint",
      comp: iu?.id,
    });
  }
  if (running && !dhwMode && !defrost && sup !== undefined && ret !== undefined) {
    // same bands as the plant check: 3–8 K good, 2–10 K acceptable
    const spread = sup - ret;
    items.push({
      id: "spread",
      tone: spread >= 3 && spread <= 8 ? "eco" : spread >= 2 && spread <= 10 ? "info" : "warn",
      key: spread < 2 ? "ex.spread_low" : spread > 10 ? "ex.spread_high" : "ex.spread_ok",
      params: { spread: r1(spread), sup, ret },
      comp: iu?.id,
    });
  }

  // ------------------------------------------------ buffer and heating circuit
  if (bufT !== undefined && (buf || variantOf(iu!)?.id === "tp70")) {
    const pc1 = iuF.has("pc1") || plant.components.some((c) => c.type === "pump" && c.props.circuit === 1 && componentFlags(c, src).has("running"));
    const mixing = running && !dhwMode && !defrost && sup !== undefined && sup - bufT > 2;
    items.push({
      id: "buffer",
      tone: mixing ? "warn" : "info",
      key: mixing ? "ex.buffer_mixing" : pc1 ? "ex.buffer_pc1" : "ex.buffer",
      params: { buf: bufT, loss: sup !== undefined ? r1(sup - bufT) : undefined },
      comp: buf?.id ?? iu?.id,
    });
  }
  const room = num(hc, "room_temp");
  if (hc && room !== undefined) {
    const roomSet = num(hc, "room_setpoint");
    items.push({
      id: "room",
      tone: roomSet !== undefined && room < roomSet - 1 ? "warn" : "info",
      key: roomSet !== undefined ? "ex.room" : "ex.room_short",
      params: { room, set: roomSet, name: hc.label },
      comp: hc.id,
    });
  }

  // ------------------------------------------------ drinking water
  if (on(dhw, "disinfecting")) {
    items.push({ id: "disinfect", tone: "dhw", key: "ex.disinfect", params: {}, comp: dhw?.id });
  } else if (dhwT !== undefined && !charging) {
    items.push({ id: "dhw_idle", tone: "info", key: dhwSet !== undefined ? "ex.dhw_idle" : "ex.dhw_idle_short", params: { dhw: dhwT, set: dhwSet }, comp: dhw?.id ?? iu?.id });
  }
  if (tap && on(tap, "flow")) {
    items.push({ id: "tap", tone: "dhw", key: "ex.tap", params: { flow: num(tap, "flow") }, comp: tap.id });
  }
  if (circ && componentFlags(circ, src).has("running")) {
    items.push({ id: "circ", tone: "info", key: "ex.circ", params: {}, hint: "ex.circ_hint", comp: circ.id });
  }

  // ------------------------------------------------ backup heater and external inputs
  if (iuF.has("aux")) {
    items.push({ id: "aux", tone: "warn", key: aux !== undefined ? "ex.aux" : "ex.aux_short", params: { aux }, hint: "ex.aux_hint", comp: iu?.id });
  }
  const labels: Record<string, string> = iu?.props.input_labels || {};
  for (const n of [1, 2, 3, 4]) {
    if (!on(iu, `input${n}`)) continue;
    const label = labels[`input${n}`] || "";
    const kind = /14a|evu|sperr/i.test(label) ? "14a" : /pv|solar|überschuss|surplus/i.test(label) ? "pv" : "other";
    items.push({
      id: `input${n}`,
      tone: kind === "pv" ? "eco" : "warn",
      key: `ex.input_${kind}`,
      params: { n, label },
      comp: iu?.id,
    });
  }
  return items;
}

/** Translation keys explaining a single component: role, plus its current state. */
export function explainComponent(c: PlantComponent, src: ValueSource): { role: string; state?: string; params: Record<string, any> } {
  const f = componentFlags(c, src);
  const { num } = reader(src);
  switch (c.type) {
    case "outdoor_unit": {
      const brine = outdoorModel(c.model).source === "brine";
      return {
        role: brine ? "exc.outdoor_brine" : "exc.outdoor",
        state: f.has("defrost") ? "exs.defrost" : f.has("running") ? "exs.compressor_on" : "exs.compressor_off",
        params: { speed: num(c, "compressor_speed") },
      };
    }
    case "indoor_unit":
      return {
        role: `exc.indoor_${variantOf(c)?.id || "wall_e"}`,
        state: f.has("b") && f.has("running") ? "exs.vw1_b" : f.has("running") ? "exs.vw1_a" : undefined,
        params: {},
      };
    case "pump": {
      const role = c.props.role === "circulation" ? "circ" : c.props.role === "primary" ? "primary" : "hc";
      return { role: `exc.pump_${role}`, state: f.has("running") ? "exs.running" : "exs.stopped", params: {} };
    }
    case "valve_3way":
      return { role: "exc.valve_3way", state: f.has("b") ? "exs.valve_b" : "exs.valve_a", params: {} };
    case "separator":
      return { role: c.props.filter ? "exc.filter" : "exc.separator", params: {} };
    case "buffer":
    case "dhw_tank":
    case "mixer":
    case "radiators":
    case "floor_heating":
    case "tap":
    case "water_inlet":
    case "expansion_vessel":
      return { role: `exc.${c.type}`, params: {} };
    default:
      return { role: "", params: {} };
  }
}

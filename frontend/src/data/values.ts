import { TYPES, portPos, slotsOf, type SlotKind } from "../catalog";
import { fmtNum, t } from "../i18n";
import type { FlowCond, Hass, HistoryPoint, Pipe, Plant, PlantComponent, SlotValue } from "../types";

/** Anything that can deliver slot values: Home Assistant or the simulator. */
export interface ValueSource {
  get(c: PlantComponent, slot: string): SlotValue | undefined;
  history(c: PlantComponent, slot: string, hours: number): Promise<HistoryPoint[]>;
  entityOf(c: PlantComponent, slot: string): string | undefined;
  /** raw entity lookup, used for pipe bindings */
  getEntity(entityId: string): SlotValue | undefined;
}

const TRUE = new Set(["on", "true", "1", "yes", "ja", "ein", "an", "active", "aktiv", "open", "offen"]);

export function truthy(v: SlotValue | undefined): boolean {
  if (!v || !v.available || v.raw === null) return false;
  if (typeof v.raw === "boolean") return v.raw;
  if (v.num !== null) return v.num > 0;
  return TRUE.has(String(v.raw).trim().toLowerCase());
}

const ACTIVITY: Record<string, string[]> = {
  off: ["off", "aus", "uit", "av", "arrêt", "standby", "bereit"],
  heating: ["heating", "heizen", "verwarmen", "uppvärmning", "chauffage", "ogrzewanie", "riscaldamento"],
  cooling: ["cooling", "kühlen", "koelen", "kyler", "refroidissement", "chłodzenie", "raffreddamento"],
  hot_water: ["hot water", "hot_water", "warmwasser", "warm water", "varmvatten", "eau chaude", "c.w.u.", "acqua calda"],
  pool_heating: ["pool heating", "pool beheizen", "zwembadverwarming", "chauffage piscine"],
  pool: ["pool", "zwembad", "piscine", "basen", "piscina"],
  defrost: ["defrost", "abtauen", "ontdooien", "avfrostning", "dégivrage", "odladzanie", "scongelamento"],
  compressor_alarm: ["compressor alarm", "compressor_alarm", "kompressor alarm", "kompressoralarm"],
};

/** EMS-ESP publishes enums in its own UI language; map them to canonical keys. */
export function normalizeActivity(v: SlotValue | undefined): string | undefined {
  if (!v || !v.available || v.raw === null) return undefined;
  const s = String(v.raw).trim().toLowerCase();
  for (const [key, aliases] of Object.entries(ACTIVITY)) if (aliases.includes(s)) return key;
  if (s.includes("abtau") || s.includes("defrost")) return "defrost";
  return s;
}

export function parseState(state: string | undefined, unit?: string, entity?: string): SlotValue {
  if (state === undefined || state === "unavailable" || state === "unknown" || state === "") {
    return { raw: null, num: null, unit, entity, available: false };
  }
  const num = Number(state);
  return { raw: state, num: Number.isFinite(num) ? num : null, unit, entity, available: true };
}

/** Values straight from Home Assistant states. */
export class HassSource implements ValueSource {
  constructor(private hass: Hass) {}

  entityOf(c: PlantComponent, slot: string): string | undefined {
    if (c.type === "value_tile") {
      const entry = ((c.props.entries as { slot: string; entity: string }[]) || []).find((e) => e.slot === slot);
      return entry?.entity;
    }
    return c.bindings[slot];
  }

  get(c: PlantComponent, slot: string): SlotValue | undefined {
    const entityId = this.entityOf(c, slot);
    return entityId ? this.getEntity(entityId) : undefined;
  }

  getEntity(entityId: string): SlotValue | undefined {
    const st = this.hass.states[entityId];
    return parseState(st?.state, st?.attributes?.unit_of_measurement, entityId);
  }

  async history(c: PlantComponent, slot: string, hours: number): Promise<HistoryPoint[]> {
    const entityId = this.entityOf(c, slot);
    if (!entityId) return [];
    return fetchHistory(this.hass, entityId, hours);
  }
}

export async function fetchHistory(hass: Hass, entityId: string, hours: number): Promise<HistoryPoint[]> {
  const end = new Date();
  const start = new Date(end.getTime() - hours * 3600_000);
  const res = await hass.callWS<Record<string, { s: string; lu: number }[]>>({
    type: "history/history_during_period",
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    entity_ids: [entityId],
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: false,
  });
  const rows = res[entityId] || [];
  return rows.map((r) => {
    const s = String(r.s).toLowerCase();
    let v: number | null = Number(r.s);
    if (!Number.isFinite(v)) v = TRUE.has(s) ? 1 : s === "off" || s === "false" ? 0 : null;
    return { t: r.lu, v, raw: String(r.s) };
  });
}

// ------------------------------------------------------------------ state

/** State flags of a component, used for animations and pipe flow conditions. */
export function componentFlags(c: PlantComponent, src: ValueSource): Set<string> {
  const f = new Set<string>();
  const g = (s: string) => src.get(c, s);
  switch (c.type) {
    case "pump":
    case "mixer":
      if (truthy(g("running")) || truthy(g("speed")) || truthy(g("flow"))) f.add("running");
      if (c.type === "mixer" && truthy(g("position"))) f.add("running");
      break;
    case "valve_3way": {
      const pos = g("position");
      f.add(truthy(pos) ? "b" : "a");
      break;
    }
    case "outdoor_unit": {
      const act = normalizeActivity(g("activity"));
      if (truthy(g("compressor_on")) || truthy(g("compressor_speed")) || truthy(g("heat_power"))) f.add("running");
      if (act === "defrost") f.add("defrost");
      if (act === "compressor_alarm") f.add("alarm");
      if (act && act !== "off" && act !== "compressor_alarm") f.add("running");
      if (act) f.add(`mode_${act}`);
      break;
    }
    case "indoor_unit": {
      // PC0, VW1 and (in floor-standing units) PC1 are built into the indoor unit
      if (truthy(g("aux_level")) || truthy(g("aux_step1")) || truthy(g("aux_step2")) || truthy(g("aux_step3"))) f.add("aux");
      if (truthy(g("pc0_running")) || truthy(g("pc0_speed")) || truthy(g("flow"))) f.add("running");
      f.add(truthy(g("vw1_position")) || (!c.bindings.vw1_position && truthy(g("dhw_active")) && !truthy(g("heating_active"))) ? "b" : "a");
      if (truthy(g("pc1_running")) || truthy(g("pc1_speed"))) f.add("pc1");
      if (truthy(g("dhw_charging"))) f.add("charging");
      const mode = truthy(g("dhw_active")) || (f.has("running") && f.has("b")) ? "hot_water" : truthy(g("heating_active")) || f.has("running") ? "heating" : "off";
      f.add(`mode_${mode}`);
      break;
    }
    case "dhw_tank":
      if (truthy(g("charging"))) f.add("charging");
      if (truthy(g("disinfecting"))) f.add("disinfecting");
      break;
    case "tap":
      if (truthy(g("flow"))) f.add("flowing");
      break;
    case "radiators":
    case "floor_heating":
      f.add("on");
      break;
    default:
      break;
  }
  return f;
}

function condHolds(cond: FlowCond, flags: Map<string, Set<string>>): boolean {
  const set = flags.get(cond.c);
  if (!set) return false;
  // "!x" negates
  return cond.s.startsWith("!") ? !set.has(cond.s.slice(1)) : set.has(cond.s);
}

export function pipeActive(pipe: Pipe, flags: Map<string, Set<string>>): boolean {
  const all = pipe.flow || [];
  const any = pipe.flowAny || [];
  if (all.length === 0 && any.length === 0) return false;
  return all.every((c) => condHolds(c, flags)) && (any.length === 0 || any.some((c) => condHolds(c, flags)));
}

/** Temperature of each pipe from bindings, port slots or upstream passive parts. */
export function pipeTemps(plant: Plant, src: ValueSource): Map<string, number> {
  const byId = new Map(plant.components.map((c) => [c.id, c]));
  const temps = new Map<string, number>();
  const portTemp = (ref: { c: string; p: string }): number | undefined => {
    const c = byId.get(ref.c);
    if (!c) return undefined;
    const pos = portPos(c, ref.p);
    if (!pos) return undefined;
    if (pos.def.fixedTemp !== undefined) return pos.def.fixedTemp;
    if (pos.def.tempSlot) {
      const v = src.get(c, pos.def.tempSlot);
      if (v?.available && v.num !== null) return v.num;
    }
    return undefined;
  };
  for (const p of plant.pipes) {
    if (p.bindings?.temp) {
      const v = src.getEntity(p.bindings.temp);
      if (v?.available && v.num !== null) {
        temps.set(p.id, v.num);
        continue;
      }
    }
    const t0 = portTemp(p.from);
    if (t0 !== undefined) temps.set(p.id, t0);
  }
  for (let pass = 0; pass < 6; pass++) {
    let changed = false;
    for (const p of plant.pipes) {
      if (temps.has(p.id)) continue;
      const from = byId.get(p.from.c);
      if (from && TYPES[from.type].passive) {
        const upstream = plant.pipes.find((q) => q.to.c === from.id && temps.has(q.id));
        if (upstream) {
          temps.set(p.id, temps.get(upstream.id)!);
          changed = true;
          continue;
        }
      }
      if (pass === 5 || !from || !TYPES[from.type].passive) {
        const t1 = portTemp(p.to);
        if (t1 !== undefined) {
          temps.set(p.id, t1);
          changed = true;
        }
      }
    }
    if (!changed && pass > 0) break;
  }
  return temps;
}

// ------------------------------------------------------------- formatting

const DEFAULT_UNIT: Partial<Record<SlotKind, string>> = {
  temp: "°C",
  power_kw: "kW",
  power_w: "W",
  percent: "%",
  pressure: "bar",
  flow: "l/h",
  flow_lmin: "l/min",
  energy: "kWh",
  duration: "min",
};

export function kindOf(c: PlantComponent, slot: string): SlotKind {
  return slotsOf(c).find((s) => s.key === slot)?.kind || "text";
}

export function formatValue(v: SlotValue | undefined, kind: SlotKind): { text: string; unit: string } {
  if (!v) return { text: t("none"), unit: "" };
  if (!v.available) return { text: t("none"), unit: "" };
  if (kind === "bool") return { text: truthy(v) ? t("on") : t("off"), unit: "" };
  if (kind === "enum" && v.num === null) {
    const act = normalizeActivity(v);
    const key = `mode.${act}`;
    const tr = t(key);
    return { text: tr === key ? String(v.raw) : tr, unit: "" };
  }
  let unit = v.unit ?? DEFAULT_UNIT[kind] ?? "";
  if (v.num === null) return { text: String(v.raw), unit: "" };
  let num = v.num;
  if (kind === "power_w" && unit === "W" && Math.abs(num) >= 1000) {
    num = num / 1000;
    unit = "kW";
  }
  const digits =
    kind === "count" || kind === "percent" || kind === "flow" || kind === "duration" || (kind === "power_w" && unit === "W")
      ? 0
      : kind === "energy"
        ? num >= 100
          ? 0
          : 1
        : 1;
  return { text: fmtNum(num, digits), unit };
}

/** Colour for a water temperature (°C). */
export function tempColor(temp: number | undefined, fallback: string): string {
  if (temp === undefined || Number.isNaN(temp)) return fallback;
  const stops: [number, [number, number, number]][] = [
    [5, [43, 108, 255]],
    [20, [34, 195, 230]],
    [28, [61, 220, 151]],
    [36, [245, 197, 66]],
    [44, [255, 138, 61]],
    [54, [255, 77, 77]],
    [65, [224, 33, 122]],
  ];
  if (temp <= stops[0][0]) return rgb(stops[0][1]);
  for (let i = 1; i < stops.length; i++) {
    const [t1, c1] = stops[i];
    const [t0, c0] = stops[i - 1];
    if (temp <= t1) {
      const f = (temp - t0) / (t1 - t0);
      return rgb([0, 1, 2].map((k) => c0[k] + (c1[k] - c0[k]) * f) as [number, number, number]);
    }
  }
  return rgb(stops[stops.length - 1][1]);
}

function rgb(c: [number, number, number]): string {
  return `rgb(${c.map((x) => Math.round(x)).join(",")})`;
}

export const KIND_COLORS: Record<string, string> = {
  supply: "#ff7a45",
  return: "#4d9fff",
  dhw_hot: "#ff4f8b",
  dhw_cold: "#38d0ff",
  circulation: "#b07cff",
};

/**
 * Pipe colour in the style of hydraulic schematics: the kind of pipe sets the hue
 * (flow warm, return blue, DHW pink, cold water light blue, circulation violet),
 * the temperature shifts it within that hue family.
 */
export function pipeColor(kind: string, temp: number | undefined): string {
  const mix = (a: [number, number, number], b: [number, number, number], f: number) =>
    rgb([0, 1, 2].map((k) => a[k] + (b[k] - a[k]) * Math.max(0, Math.min(1, f))) as [number, number, number]);
  const f = (lo: number, hi: number) => (temp === undefined ? 0.5 : (temp - lo) / (hi - lo));
  switch (kind) {
    case "supply":
      return mix([245, 176, 66], [255, 64, 64], f(25, 55));
    case "return":
      return mix([46, 110, 255], [77, 208, 255], f(20, 45));
    case "dhw_hot":
      return mix([255, 128, 170], [255, 46, 120], f(35, 60));
    case "dhw_cold":
      return "rgb(110, 205, 255)";
    case "circulation":
      return mix([150, 120, 255], [196, 120, 255], f(35, 55));
    default:
      return tempColor(temp, "#8a97a6");
  }
}

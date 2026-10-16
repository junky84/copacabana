import type { ComponentType, Dir, PipeKind, PlantComponent } from "./types";

/** Pixel size of one grid cell. */
export const CELL = 20;

export type SlotKind =
  | "temp"
  | "power_kw"
  | "power_w"
  | "percent"
  | "pressure"
  | "flow"
  | "flow_lmin"
  | "energy"
  | "count"
  | "duration"
  | "bool"
  | "enum"
  | "text";

export interface SlotDef {
  key: string;
  kind: SlotKind;
  /** shown as badge by default */
  show?: boolean;
}

export interface PortDef {
  id: string;
  x: number;
  y: number;
  dir: Dir;
  /** slot whose value is the temperature of water leaving / entering here */
  tempSlot?: string;
  fixedTemp?: number;
  kind?: PipeKind;
}

export interface TypeDef {
  type: ComponentType;
  w: number;
  h: number;
  ports: PortDef[];
  slots: SlotDef[];
  rotatable?: boolean;
  /** passes water through: pipe temperature is inherited from upstream */
  passive?: boolean;
  /** where value badges are placed */
  badges: "below" | "right" | "left" | "above" | "inside" | "tank" | "none";
  roles?: string[];
  /** palette group */
  group: "generator" | "storage" | "hydraulic" | "consumer" | "misc";
}

const T = (key: string, show = false): SlotDef => ({ key, kind: "temp", show });

export const TYPES: Record<ComponentType, TypeDef> = {
  outdoor_unit: {
    type: "outdoor_unit",
    w: 9,
    h: 7,
    group: "generator",
    badges: "below",
    ports: [
      { id: "out", x: 9, y: 2, dir: "r", kind: "supply" },
      { id: "in", x: 9, y: 5, dir: "r", kind: "return" },
    ],
    slots: [
      T("outdoor_temp", true),
      { key: "activity", kind: "enum" },
      { key: "heat_power", kind: "power_kw", show: true },
      { key: "el_power", kind: "power_w", show: true },
      { key: "compressor_speed", kind: "percent", show: true },
      { key: "compressor_on", kind: "bool" },
      { key: "fan_speed", kind: "percent" },
      T("air_in_temp"),
      { key: "compressor_starts", kind: "count" },
      T("evap_in_temp"),
      T("comp_in_temp"),
      T("comp_out_temp"),
      T("hp_temp"),
      T("lp_temp"),
      T("drain_pan_temp"),
      { key: "silent_mode", kind: "enum" },
    ],
  },
  indoor_unit: {
    type: "indoor_unit",
    w: 6,
    h: 10,
    group: "generator",
    badges: "below",
    ports: [
      { id: "src_in", x: 0, y: 2, dir: "l", tempSlot: "supply_temp", kind: "supply" },
      { id: "src_out", x: 0, y: 8, dir: "l", tempSlot: "return_temp", kind: "return" },
      { id: "sup", x: 6, y: 2, dir: "r", tempSlot: "supply_temp", kind: "supply" },
      { id: "ret", x: 6, y: 8, dir: "r", tempSlot: "return_temp", kind: "return" },
    ],
    slots: [
      T("supply_temp", true),
      T("return_temp", true),
      T("target_flow_temp", true),
      { key: "pressure", kind: "pressure", show: true },
      { key: "flow", kind: "flow" },
      { key: "aux_level", kind: "percent", show: true },
      T("condenser_temp"),
      { key: "aux_status", kind: "enum" },
      { key: "aux_step1", kind: "bool" },
      { key: "aux_step2", kind: "bool" },
      { key: "aux_step3", kind: "bool" },
      { key: "service_code", kind: "text" },
      { key: "service_code_number", kind: "count" },
      { key: "last_error", kind: "text" },
      { key: "input1", kind: "bool" },
      { key: "input2", kind: "bool" },
      { key: "input3", kind: "bool" },
      { key: "input4", kind: "bool" },
      { key: "heating_active", kind: "bool" },
      { key: "dhw_active", kind: "bool" },
      { key: "el_energy_total", kind: "energy" },
      { key: "el_energy_heating", kind: "energy" },
      { key: "el_energy_dhw", kind: "energy" },
      { key: "heat_energy_total", kind: "energy" },
      { key: "heat_energy_heating", kind: "energy" },
      { key: "heat_energy_dhw", kind: "energy" },
      { key: "aux_energy_total", kind: "energy" },
      { key: "uptime_total", kind: "duration" },
    ],
  },
  buffer: {
    type: "buffer",
    w: 4,
    h: 10,
    group: "storage",
    badges: "tank",
    ports: [
      { id: "in_sup", x: 0, y: 2, dir: "l", kind: "supply" },
      { id: "in_ret", x: 0, y: 8, dir: "l", tempSlot: "temp_bottom", kind: "return" },
      { id: "out_sup", x: 4, y: 2, dir: "r", tempSlot: "temp_top", kind: "supply" },
      { id: "out_ret", x: 4, y: 8, dir: "r", kind: "return" },
    ],
    slots: [T("temp_top", true), T("temp_mid"), T("temp_bottom", true)],
  },
  dhw_tank: {
    type: "dhw_tank",
    w: 5,
    h: 11,
    group: "storage",
    badges: "tank",
    ports: [
      { id: "coil_in", x: 0, y: 5, dir: "l", kind: "supply" },
      { id: "coil_out", x: 0, y: 9, dir: "l", tempSlot: "temp_bottom", kind: "return" },
      { id: "hot", x: 3, y: 0, dir: "t", tempSlot: "temp_top", kind: "dhw_hot" },
      { id: "circ", x: 5, y: 4, dir: "r", kind: "circulation" },
      { id: "cold", x: 3, y: 11, dir: "b", kind: "dhw_cold" },
    ],
    slots: [
      T("temp_top", true),
      T("temp_bottom"),
      T("setpoint", true),
      { key: "charging", kind: "bool" },
      { key: "onetime", kind: "bool" },
      { key: "disinfecting", kind: "bool" },
    ],
  },
  pump: {
    type: "pump",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: true,
    passive: true,
    badges: "above",
    roles: ["primary", "secondary", "hc", "circulation", "other"],
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "out", x: 2, y: 1, dir: "r" },
    ],
    slots: [
      { key: "running", kind: "bool" },
      { key: "speed", kind: "percent", show: true },
      { key: "flow", kind: "flow" },
      { key: "power", kind: "power_w" },
    ],
  },
  valve_3way: {
    type: "valve_3way",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: true,
    passive: true,
    badges: "above",
    roles: ["dhw_switch", "other"],
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "a", x: 2, y: 1, dir: "r" },
      { id: "b", x: 1, y: 2, dir: "b" },
    ],
    slots: [{ key: "position", kind: "bool" }],
  },
  mixer: {
    type: "mixer",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: true,
    passive: true,
    badges: "above",
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "out", x: 2, y: 1, dir: "r" },
      { id: "ret", x: 1, y: 2, dir: "b" },
    ],
    slots: [{ key: "position", kind: "percent", show: true }, T("flow_temp", true)],
  },
  radiators: {
    type: "radiators",
    w: 7,
    h: 6,
    group: "consumer",
    badges: "below",
    ports: [
      { id: "sup", x: 0, y: 1, dir: "l", kind: "supply" },
      { id: "ret", x: 0, y: 5, dir: "l", tempSlot: "return_temp", kind: "return" },
    ],
    slots: [
      T("flow_temp", true),
      T("return_temp", true),
      T("target_flow_temp"),
      T("room_temp", true),
      T("room_setpoint"),
      { key: "mode", kind: "enum" },
      { key: "summer_mode", kind: "enum" },
      { key: "operating_state", kind: "enum" },
      T("design_temp"),
      { key: "offset_temp", kind: "temp" },
      T("min_flow_temp"),
      T("max_flow_temp"),
    ],
  },
  floor_heating: {
    type: "floor_heating",
    w: 7,
    h: 6,
    group: "consumer",
    badges: "below",
    ports: [
      { id: "sup", x: 0, y: 1, dir: "l", kind: "supply" },
      { id: "ret", x: 0, y: 5, dir: "l", tempSlot: "return_temp", kind: "return" },
    ],
    slots: [] as SlotDef[],
  },
  tap: {
    type: "tap",
    w: 3,
    h: 3,
    group: "consumer",
    passive: true,
    badges: "right",
    ports: [
      { id: "hot", x: 0, y: 1, dir: "l", kind: "dhw_hot" },
      { id: "circ", x: 1, y: 3, dir: "b", kind: "circulation" },
    ],
    slots: [{ key: "flow", kind: "flow_lmin", show: true }, T("temp")],
  },
  water_inlet: {
    type: "water_inlet",
    w: 3,
    h: 2,
    group: "consumer",
    badges: "none",
    ports: [{ id: "out", x: 3, y: 1, dir: "r", fixedTemp: 10, kind: "dhw_cold" }],
    slots: [],
  },
  separator: {
    type: "separator",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: true,
    passive: true,
    badges: "none",
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "out", x: 2, y: 1, dir: "r" },
    ],
    slots: [],
  },
  expansion_vessel: {
    type: "expansion_vessel",
    w: 2,
    h: 3,
    group: "hydraulic",
    badges: "left",
    ports: [{ id: "conn", x: 1, y: 3, dir: "b" }],
    slots: [{ key: "pressure", kind: "pressure", show: true }],
  },
  junction: {
    type: "junction",
    w: 0,
    h: 0,
    group: "hydraulic",
    passive: true,
    badges: "none",
    ports: [
      { id: "l", x: 0, y: 0, dir: "l" },
      { id: "r", x: 0, y: 0, dir: "r" },
      { id: "t", x: 0, y: 0, dir: "t" },
      { id: "b", x: 0, y: 0, dir: "b" },
    ],
    slots: [],
  },
  value_tile: {
    type: "value_tile",
    w: 8,
    h: 2,
    group: "misc",
    badges: "inside",
    ports: [],
    slots: [],
  },
  label: {
    type: "label",
    w: 8,
    h: 2,
    group: "misc",
    badges: "none",
    ports: [],
    slots: [],
  },
};
TYPES.floor_heating.slots = TYPES.radiators.slots;

/** Value tiles carry their slots in props.entries. */
export function slotsOf(c: PlantComponent): SlotDef[] {
  if (c.type === "value_tile") {
    return ((c.props.entries as { slot: string; kind?: SlotKind }[]) || []).map((e) => ({
      key: e.slot,
      kind: e.kind || "text",
      show: true,
    }));
  }
  return TYPES[c.type].slots;
}

export function sizeOf(c: PlantComponent): { w: number; h: number } {
  const def = TYPES[c.type];
  if (c.type === "value_tile") {
    const n = ((c.props.entries as unknown[]) || []).length;
    return { w: def.w, h: 2 + Math.ceil(n * 1.3) };
  }
  const rot = c.rot || 0;
  return rot === 90 || rot === 270 ? { w: def.h, h: def.w } : { w: def.w, h: def.h };
}

const DIRS: Dir[] = ["r", "b", "l", "t"];

function rotateDir(dir: Dir, rot: number): Dir {
  const steps = (rot / 90) % 4;
  return DIRS[(DIRS.indexOf(dir) + steps) % 4];
}

/** Absolute port position (cells) and exit direction, honouring rotation. */
export function portPos(c: PlantComponent, portId: string): { x: number; y: number; dir: Dir; def: PortDef } | null {
  const def = TYPES[c.type];
  const port = def.ports.find((p) => p.id === portId);
  if (!port) return null;
  const rot = c.rot || 0;
  const { w, h } = def;
  let { x, y } = port;
  if (rot === 90) [x, y] = [h - y, x];
  else if (rot === 180) [x, y] = [w - x, h - y];
  else if (rot === 270) [x, y] = [y, w - x];
  return { x: c.x + x, y: c.y + y, dir: rotateDir(port.dir, rot), def: port };
}

// ------------------------------------------------------------- models

export interface HpModel {
  id: string;
  label: string;
  brand: "buderus" | "bosch" | "generic";
  source: "air" | "brine";
  /** typical size used when the user gives no nominal output */
  nominal: number;
  refrigerant?: string;
}

/** Product families. The nominal output is a component prop (nominal_kw). */
export const OUTDOOR_MODELS: HpModel[] = [
  { id: "buderus-wlw-mb-ar", label: "Buderus Logatherm WLW-… MB AR (Monoblock)", brand: "buderus", source: "air", nominal: 7, refrigerant: "R290" },
  { id: "buderus-wlw176i-ar", label: "Buderus Logatherm WLW176i AR", brand: "buderus", source: "air", nominal: 7 },
  { id: "buderus-wlw196i-ar", label: "Buderus Logatherm WLW196i AR", brand: "buderus", source: "air", nominal: 8 },
  { id: "buderus-wsw", label: "Buderus Logatherm WSW (Sole/Wasser)", brand: "buderus", source: "brine", nominal: 8 },
  { id: "bosch-cs5800i-aw", label: "Bosch Compress 5800i AW", brand: "bosch", source: "air", nominal: 7 },
  { id: "bosch-cs6800i-aw", label: "Bosch Compress 6800i AW", brand: "bosch", source: "air", nominal: 7 },
  { id: "bosch-cs7800i-lw", label: "Bosch Compress 7800i LW (Sole/Wasser)", brand: "bosch", source: "brine", nominal: 8 },
  { id: "generic-air", label: "Luft/Wasser (allgemein)", brand: "generic", source: "air", nominal: 8 },
  { id: "generic-brine", label: "Sole/Wasser (allgemein)", brand: "generic", source: "brine", nominal: 8 },
];

export const INDOOR_MODELS: { id: string; label: string; aux?: boolean; tank?: boolean }[] = [
  { id: "buderus-wlw186i-e", label: "Buderus Logatherm WLW186i E (wandhängend, E-Zuheizer)", aux: true },
  { id: "buderus-wlw186i-b", label: "Buderus Logatherm WLW186i B (bivalent)" },
  { id: "buderus-wlw186i-t", label: "Buderus Logatherm WLW186i T (mit WW-Speicher)", aux: true, tank: true },
  { id: "buderus-wlw176i-e", label: "Buderus Logatherm WLW176i E", aux: true },
  { id: "bosch-aw-e", label: "Bosch Compress AW Inneneinheit (E-Zuheizer)", aux: true },
  { id: "bosch-aw-b", label: "Bosch Compress AW Inneneinheit (bivalent)" },
  { id: "bosch-aw-m", label: "Bosch Compress AW Inneneinheit (mit Speicher)", aux: true, tank: true },
  { id: "generic", label: "Andere Inneneinheit / Hydraulikmodul" },
];

export function outdoorModel(id?: string): HpModel {
  return OUTDOOR_MODELS.find((m) => m.id === id) || OUTDOOR_MODELS.find((m) => m.id === "generic-air")!;
}

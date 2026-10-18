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
  /** shown by default */
  show?: boolean;
  /** measured in the pipe at this port: shown as a pill on that pipe */
  at?: string;
  /** measured at this local cell position inside the component (e.g. manometer) */
  pos?: [number, number];
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

/** A product variant with its own housing, connections and value positions. */
export interface VariantDef {
  id: string;
  w: number;
  h: number;
  ports: PortDef[];
  /** local positions of values measured inside the unit */
  pos?: Record<string, [number, number]>;
  /** anchors of values measured in a pipe */
  at?: Record<string, string>;
  badges?: TypeDef["badges"];
}

export interface TypeDef {
  type: ComponentType;
  w: number;
  h: number;
  ports: PortDef[];
  slots: SlotDef[];
  rotatable?: boolean;
  /** can be mirrored left/right */
  mirrorable?: boolean;
  /** passes water through: pipe temperature is inherited from upstream */
  passive?: boolean;
  /** where value badges are placed */
  badges: "below" | "right" | "left" | "above" | "inside" | "tank" | "none";
  roles?: string[];
  variants?: Record<string, VariantDef>;
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
    badges: "above",
    // monoblock: both water connections at the rear, 202 mm above the floor,
    // on the right when seen from the front (Logatherm WLW-… MB AR manual, fig. 4)
    ports: [
      { id: "in", x: 9, y: 5, dir: "r", kind: "return" },
      { id: "out", x: 9, y: 6, dir: "r", kind: "supply" },
    ],
    slots: [
      { key: "heat_power", kind: "power_kw", show: true },
      { key: "el_power", kind: "power_w", show: true },
      { key: "compressor_speed", kind: "percent", show: true },
      // fourth chip: own row above the three power values
      { key: "outdoor_temp", kind: "temp", show: true },
      { key: "activity", kind: "enum" },
      { key: "compressor_on", kind: "bool" },
      { key: "fan_speed", kind: "percent", pos: [3.2, 3.5] },
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
    w: 8,
    h: 12,
    group: "generator",
    badges: "right",
    ports: [],
    variants: {
      // wall-hung E unit: all connections at the bottom (WLW186i E manual, fig. 3/6),
      // from left: to heat pump, from heat pump, DHW flow, DHW return, heating return, heating flow
      wall_e: {
        id: "wall_e",
        w: 10,
        h: 14,
        badges: "right",
        ports: [
          { id: "src_out", x: 2, y: 14, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "src_in", x: 3, y: 14, dir: "b", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_sup", x: 5, y: 14, dir: "b", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_ret", x: 6, y: 14, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "ret", x: 8, y: 14, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "sup", x: 9, y: 14, dir: "b", tempSlot: "supply_temp", kind: "supply" },
        ],
        pos: { pressure: [1.9, 7.6], aux_level: [5.9, 4.2], pc0_speed: [4.3, 11.4] },
        at: { supply_temp: "sup", return_temp: "ret" },
      },
      // floor-standing T180 with 180 l DHW cylinder: all connections on top (T180 manual, fig. 4/6),
      // from left: heating return, circulation, heating flow, DHW out, cold in, from heat pump, to heat pump
      t180: {
        id: "t180",
        w: 8,
        h: 22,
        badges: "right",
        ports: [
          { id: "ret", x: 1, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" },
          { id: "circ", x: 2, y: 0, dir: "t", kind: "circulation" },
          { id: "sup", x: 3, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_hot", x: 4, y: 0, dir: "t", tempSlot: "dhw_temp", kind: "dhw_hot" },
          { id: "dhw_cold", x: 5, y: 0, dir: "t", kind: "dhw_cold" },
          { id: "src_in", x: 6, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "src_out", x: 7, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" },
        ],
        pos: { pressure: [3.2, 8.8], aux_level: [6.4, 3.2], pc0_speed: [4.2, 7.4], dhw_temp: [4, 12], dhw_setpoint: [4, 17] },
        at: { supply_temp: "sup", return_temp: "ret" },
      },
      // floor-standing TP70 with 70 l buffer: all connections on top (TP70 manual, fig. 4)
      tp70: {
        id: "tp70",
        w: 9,
        h: 16,
        badges: "right",
        ports: [
          { id: "sup", x: 1, y: 0, dir: "t", tempSlot: "buffer_temp", kind: "supply" },
          { id: "ret", x: 2, y: 0, dir: "t", kind: "return" },
          { id: "sup2", x: 3, y: 0, dir: "t", tempSlot: "buffer_temp", kind: "supply" },
          { id: "ret2", x: 4, y: 0, dir: "t", kind: "return" },
          { id: "src_in", x: 5, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "src_out", x: 6, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" },
          { id: "dhw_sup", x: 7, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_ret", x: 8, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" },
        ],
        pos: { pressure: [7, 14.65], aux_level: [3.6, 3], pc0_speed: [7.6, 8.75], pc1_speed: [3.6, 4.9], buffer_temp: [4.5, 10.9] },
        at: { supply_temp: "src_in", return_temp: "src_out" },
      },
      // brine compact unit (WSW186i): connections on top; layout approximated from the T180 family
      brine: {
        id: "brine",
        w: 8,
        h: 14,
        badges: "right",
        ports: [
          { id: "src_in", x: 1, y: 0, dir: "t", kind: "supply" },
          { id: "src_out", x: 2, y: 0, dir: "t", kind: "return" },
          { id: "dhw_sup", x: 4, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_ret", x: 5, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" },
          { id: "ret", x: 6, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" },
          { id: "sup", x: 7, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
        ],
        pos: { pressure: [2.2, 12.8], aux_level: [4, 3], pc0_speed: [5.5, 13.2] },
        at: { supply_temp: "sup", return_temp: "ret" },
      },
    },
    slots: [
      T("supply_temp", true),
      T("return_temp", true),
      T("target_flow_temp", true),
      { key: "pressure", kind: "pressure", show: true },
      { key: "flow", kind: "flow" },
      { key: "aux_level", kind: "percent", show: true },
      { key: "pc0_running", kind: "bool" },
      { key: "pc0_speed", kind: "percent", show: true },
      { key: "vw1_position", kind: "bool" },
      { key: "pc1_running", kind: "bool" },
      { key: "pc1_speed", kind: "percent" },
      T("dhw_temp", true),
      T("dhw_setpoint"),
      { key: "dhw_charging", kind: "bool" },
      T("buffer_temp", true),
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
  // P120.5: all four connections on top; the two returns reach the bottom through dip tubes
  buffer: {
    type: "buffer",
    mirrorable: true,
    w: 5,
    h: 9,
    group: "storage",
    badges: "tank",
    ports: [
      { id: "in_sup", x: 1, y: 0, dir: "t", kind: "supply" },
      { id: "in_ret", x: 2, y: 0, dir: "t", tempSlot: "temp_bottom", kind: "return" },
      { id: "out_ret", x: 3, y: 0, dir: "t", kind: "return" },
      { id: "out_sup", x: 4, y: 0, dir: "t", tempSlot: "temp_top", kind: "supply" },
    ],
    slots: [T("temp_top", true), T("temp_mid"), T("temp_bottom", true)],
  },
  // SH290: connection heights from the datasheet (hot 1226, coil flow 784, circulation 544,
  // coil return 220, cold 55 of 1294 mm); heating coil on the right, drinking water on the left
  dhw_tank: {
    type: "dhw_tank",
    mirrorable: true,
    w: 6,
    h: 11,
    group: "storage",
    badges: "tank",
    ports: [
      { id: "coil_in", x: 6, y: 4, dir: "r", kind: "supply" },
      { id: "coil_out", x: 6, y: 9, dir: "r", tempSlot: "temp_bottom", kind: "return" },
      { id: "hot", x: 0, y: 1, dir: "l", tempSlot: "temp_top", kind: "dhw_hot" },
      { id: "circ", x: 0, y: 6, dir: "l", kind: "circulation" },
      { id: "cold", x: 0, y: 10, dir: "l", kind: "dhw_cold" },
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
    slots: [{ key: "position", kind: "percent", show: true }, { key: "flow_temp", kind: "temp", show: true, at: "out" }],
  },
  radiators: {
    type: "radiators",
    mirrorable: true,
    w: 7,
    h: 6,
    group: "consumer",
    badges: "below",
    ports: [
      { id: "sup", x: 0, y: 1, dir: "l", kind: "supply" },
      { id: "ret", x: 0, y: 5, dir: "l", tempSlot: "return_temp", kind: "return" },
    ],
    variants: {
      // connections on one side (flow top, return bottom)
      side: {
        id: "side",
        w: 7,
        h: 6,
        ports: [
          { id: "sup", x: 0, y: 1, dir: "l", kind: "supply" },
          { id: "ret", x: 0, y: 5, dir: "l", tempSlot: "return_temp", kind: "return" },
        ],
      },
      // valve radiator: both connections from below at the right end, return left of flow
      bottom: {
        id: "bottom",
        w: 7,
        h: 6,
        ports: [
          { id: "ret", x: 4, y: 6, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "sup", x: 6, y: 6, dir: "b", kind: "supply" },
        ],
      },
    },
    slots: [
      { key: "flow_temp", kind: "temp", show: true, at: "sup" },
      { key: "return_temp", kind: "temp", show: true, at: "ret" },
      T("target_flow_temp"),
      { key: "room_temp", kind: "temp", show: true, pos: [3.5, -2.2] },
      T("room_setpoint"),
      { key: "mode", kind: "enum" },
      { key: "summer_mode", kind: "enum" },
      { key: "operating_state", kind: "enum" },
      T("design_temp"),
      { key: "offset_temp", kind: "temp" },
      T("min_flow_temp"),
      T("max_flow_temp"),
      T("min_ext_temp"),
      T("heating_limit"),
    ],
  },
  floor_heating: {
    type: "floor_heating",
    mirrorable: true,
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
    mirrorable: true,
    w: 3,
    h: 3,
    group: "consumer",
    passive: true,
    badges: "left",
    ports: [{ id: "hot", x: 3, y: 1, dir: "r", kind: "dhw_hot" }],
    variants: {
      tap: { id: "tap", w: 3, h: 3, ports: [{ id: "hot", x: 3, y: 1, dir: "r", kind: "dhw_hot" }] },
      // shower head on an arm from the wall, supply from the right
      shower: { id: "shower", w: 4, h: 5, ports: [{ id: "hot", x: 4, y: 1, dir: "r", kind: "dhw_hot" }], pos: { flow: [1.4, -0.9] } },
    },
    slots: [{ key: "flow", kind: "flow_lmin", show: true, pos: [1.5, -0.9] }, T("temp")],
  },
  water_inlet: {
    type: "water_inlet",
    mirrorable: true,
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
    rotatable: true,
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

/** Effective variant of a component (indoor units come in several housings). */
export function variantOf(c: PlantComponent): VariantDef | undefined {
  const def = TYPES[c.type];
  if (!def.variants) return undefined;
  const id = (c.props?.variant as string) || indoorModel(c.model)?.variant || "wall_e";
  return def.variants[id] || Object.values(def.variants)[0];
}

/** Unrotated base size. */
export function baseSize(c: PlantComponent): { w: number; h: number } {
  const v = variantOf(c);
  return v ? { w: v.w, h: v.h } : { w: TYPES[c.type].w, h: TYPES[c.type].h };
}

export function portsOf(c: PlantComponent): PortDef[] {
  return variantOf(c)?.ports ?? TYPES[c.type].ports;
}

export function badgesOf(c: PlantComponent): TypeDef["badges"] {
  return variantOf(c)?.badges ?? TYPES[c.type].badges;
}

/** Slot definitions with the anchors of the component's variant applied. */
export function anchoredSlots(c: PlantComponent): SlotDef[] {
  const v = variantOf(c);
  return slotsOf(c).map((s) => (v ? { ...s, pos: v.pos?.[s.key] ?? s.pos, at: v.at?.[s.key] ?? s.at } : s));
}

export function sizeOf(c: PlantComponent): { w: number; h: number } {
  const def = { ...TYPES[c.type], ...baseSize(c) };
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
  const port = portsOf(c).find((p) => p.id === portId);
  if (!port) return null;
  const rot = c.rot || 0;
  const { w, h } = baseSize(c);
  let { x, y } = port;
  let dir = port.dir;
  if (c.flip && TYPES[c.type].mirrorable) {
    x = w - x;
    dir = dir === "l" ? "r" : dir === "r" ? "l" : dir;
  }
  if (rot === 90) [x, y] = [h - y, x];
  else if (rot === 180) [x, y] = [w - x, h - y];
  else if (rot === 270) [x, y] = [y, w - x];
  return { x: c.x + x, y: c.y + y, dir: rotateDir(dir, rot), def: port };
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

/**
 * Heat pump modules (outdoor units, or the heat source part of indoor-installed and brine units).
 * Current Buderus range as listed on buderus.de (Oct 2026); EMS-based models only.
 */
export const OUTDOOR_MODELS: HpModel[] = [
  { id: "buderus-wlw-mb-ar", label: "Buderus Logatherm WLW186i AR – Außeneinheit WLW-… MB AR (4/5/7/10/12 kW)", brand: "buderus", source: "air", nominal: 7, refrigerant: "R290" },
  { id: "buderus-wlw-mbe-ar", label: "Buderus Logatherm WLW186i MBE+ AR – Außeneinheit (11/13/15 kW)", brand: "buderus", source: "air", nominal: 13, refrigerant: "R290" },
  { id: "buderus-wlw176i-ar", label: "Buderus Logatherm WLW176i AR – Außeneinheit (4/5/7/10/12 kW)", brand: "buderus", source: "air", nominal: 7, refrigerant: "R290" },
  { id: "buderus-wlw166i-mbb-ar", label: "Buderus Logatherm WLW166i MBB AR – Außeneinheit (4/6/7/10/13 kW)", brand: "buderus", source: "air", nominal: 7, refrigerant: "R290" },
  { id: "buderus-wlw196i-ar", label: "Buderus Logatherm WLW196i AR – Außeneinheit (4/6/8/11/14 kW)", brand: "buderus", source: "air", nominal: 8 },
  { id: "buderus-wlw196i-ar-s", label: "Buderus Logatherm WLW196i AR S+ – Außeneinheit, schalloptimiert", brand: "buderus", source: "air", nominal: 8 },
  { id: "buderus-wlw196i-ir", label: "Buderus Logatherm WLW196i IR – Innenaufstellung (6/8/11/14 kW)", brand: "buderus", source: "air", nominal: 8 },
  { id: "buderus-wsw186i", label: "Buderus Logatherm WSW186i – Erdsonde/Kollektor (6/8/12/16 kW)", brand: "buderus", source: "brine", nominal: 8 },
  { id: "buderus-wsw196i", label: "Buderus Logatherm WSW196i(T) – Erdsonde/Kollektor (2–16 kW)", brand: "buderus", source: "brine", nominal: 8 },
  { id: "bosch-cs5800i-aw", label: "Bosch Compress 5800i AW", brand: "bosch", source: "air", nominal: 7 },
  { id: "bosch-cs6800i-aw", label: "Bosch Compress 6800i AW", brand: "bosch", source: "air", nominal: 7 },
  { id: "bosch-cs7800i-lw", label: "Bosch Compress 7800i LW (Sole/Wasser)", brand: "bosch", source: "brine", nominal: 8 },
  { id: "generic-air", label: "Luft/Wasser (allgemein)", brand: "generic", source: "air", nominal: 8 },
  { id: "generic-brine", label: "Sole/Wasser (allgemein)", brand: "generic", source: "brine", nominal: 8 },
];
// legacy ids of earlier versions
const LEGACY_OUTDOOR: Record<string, string> = { "buderus-wsw": "buderus-wsw186i" };

export interface IndoorModel {
  id: string;
  label: string;
  variant: "wall_e" | "t180" | "tp70" | "brine";
  /** built-in electric backup heater */
  aux?: boolean;
  /** built-in DHW cylinder (litres) */
  dhw?: number;
  /** built-in buffer (litres) */
  buffer?: number;
}

/** Indoor units / hydraulic modules with the housing (variant) that defines their connections. */
export const INDOOR_MODELS: IndoorModel[] = [
  { id: "buderus-wlw186i-e", label: "Logatherm WLW186i E – wandhängend, E-Zuheizer", variant: "wall_e", aux: true },
  { id: "buderus-wlw186i-t180", label: "Logatherm WLW186i T180 – Standgerät mit 180-l-WW-Speicher", variant: "t180", aux: true, dhw: 180 },
  { id: "buderus-wlw186i-tp70", label: "Logatherm WLW186i TP70 – Standgerät mit 70-l-Puffer", variant: "tp70", aux: true, buffer: 70 },
  { id: "buderus-wlw186i-mbe-e", label: "Logatherm WLW186i MBE+ E – wandhängend", variant: "wall_e", aux: true },
  { id: "buderus-wlw186i-mbe-tp70", label: "Logatherm WLW186i MBE+ TP70 – Standgerät mit 70-l-Puffer", variant: "tp70", aux: true, buffer: 70 },
  { id: "buderus-wlw176i-e", label: "Logatherm WLW176i E – wandhängend", variant: "wall_e", aux: true },
  { id: "buderus-wlw176i-t180", label: "Logatherm WLW176i T180 – mit 180-l-WW-Speicher", variant: "t180", aux: true, dhw: 180 },
  { id: "buderus-wlw176i-tp70", label: "Logatherm WLW176i TP70 – mit 70-l-Puffer", variant: "tp70", aux: true, buffer: 70 },
  { id: "buderus-wlw166i-e", label: "Logatherm WLW166i E – wandhängend", variant: "wall_e", aux: true },
  { id: "buderus-wlw166i-t180", label: "Logatherm WLW166i T180 – mit 180-l-WW-Speicher", variant: "t180", aux: true, dhw: 180 },
  { id: "buderus-wlw196i-e", label: "Logatherm WLW196i E – wandhängend", variant: "wall_e", aux: true },
  { id: "buderus-wlw196i-t180", label: "Logatherm WLW196i T180 – mit WW-Speicher", variant: "t180", aux: true, dhw: 180 },
  { id: "buderus-wsw186i", label: "Logatherm WSW186i – Sole-Kompaktgerät", variant: "brine", aux: true },
  { id: "buderus-wsw186i-t180", label: "Logatherm WSW186i T180 – Sole mit 180-l-WW-Speicher", variant: "t180", aux: true, dhw: 180 },
  { id: "buderus-wsw186i-tp50", label: "Logatherm WSW186i TP50 – Sole mit 50-l-Puffer", variant: "tp70", aux: true, buffer: 50 },
  { id: "buderus-wsw196i", label: "Logatherm WSW196i(T) – Sole-Kompaktgerät", variant: "brine", aux: true },
  { id: "bosch-aw-e", label: "Bosch Compress AW Inneneinheit (E-Zuheizer)", variant: "wall_e", aux: true },
  { id: "bosch-aw-m", label: "Bosch Compress AW Inneneinheit (mit Speicher)", variant: "t180", aux: true, dhw: 180 },
  { id: "generic", label: "Andere Inneneinheit / Hydraulikmodul", variant: "wall_e" },
];
const LEGACY_INDOOR: Record<string, string> = {
  "buderus-wlw186i-t": "buderus-wlw186i-t180",
  "buderus-wlw186i-b": "buderus-wlw186i-e",
  "bosch-aw-b": "bosch-aw-e",
};

export function indoorModel(id?: string): IndoorModel | undefined {
  const real = (id && LEGACY_INDOOR[id]) || id;
  return INDOOR_MODELS.find((m) => m.id === real);
}

export function outdoorModel(id?: string): HpModel {
  const real = (id && LEGACY_OUTDOOR[id]) || id;
  return OUTDOOR_MODELS.find((m) => m.id === real) || OUTDOOR_MODELS.find((m) => m.id === "generic-air")!;
}

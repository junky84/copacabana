/** Plant wizard: turns a short description into a laid-out schematic. */

import { indoorModel, portPos } from "./catalog";
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

/**
 * Lays out a plant with the real connection positions of the chosen units.
 *
 * Per the Buderus installation manuals the particle filter SC1, the expansion
 * vessel and the magnetite/dirt separator belong in the return directly in front
 * of the indoor unit (between buffer and indoor unit when a buffer is used).
 */
export function generatePlant(cfg: WizardConfig, previous?: Plant | null): Plant {
  const b = new Builder();
  const im = indoorModel(cfg.indoorModel);
  const variant = im?.variant || "wall_e";
  const builtInDhw = !!im?.dhw;
  const builtInBuffer = !!im?.buffer;
  const extDhw = cfg.dhw === "tank" && !builtInDhw;
  const hasDhw = cfg.dhw === "tank" || builtInDhw;
  const extBuffer = cfg.buffer !== "none" && !builtInBuffer;
  const IU: FlowCond = { c: "iu", s: "running" };
  const A: FlowCond[] = hasDhw ? [{ c: "iu", s: "a" }] : [];
  const B: FlowCond = { c: "iu", s: "b" };
  const PC1: FlowCond = { c: "pc1", s: "running" };

  const indoorProps = {
    aux_kw: cfg.aux ? cfg.auxKw : 0,
    input_labels: { input1: "§14a / EVU", input4: "PV" },
    input_levels: { input1: "warning" },
    pressure_min: 1.0,
    pressure_max: 2.7,
    buffer_l: im?.buffer,
  };
  const top = variant !== "wall_e";
  // TP70 with one direct circuit: dedicated layout (outdoor unit top left, circuit left, DHW right)
  const tp70 = variant === "tp70" && cfg.circuits.length <= 1 && !cfg.circuits[0]?.mixed;
  // wall units: outdoor connections level with the two rows below the indoor unit
  const oy = tp70 ? 5 : top ? 12 : 2 + 14 - 4;
  b.add("ou", "outdoor_unit", cfg.outdoorLabel || t("type.outdoor_unit"), 1, oy, {
    model: cfg.outdoorModel,
    props: { nominal_kw: cfg.nominalKw },
  });
  // generous gap between outdoor unit (x 1..10) and indoor unit
  const ix = tp70 ? 22 : top ? 14 : 16;
  const iy = tp70 ? 27 : top ? 12 : 2;
  b.add("iu", "indoor_unit", cfg.indoorLabel || t("type.indoor_unit"), ix, iy, { model: cfg.indoorModel, props: indoorProps });
  const iu = b.components.find((c) => c.id === "iu")!;
  const port = (id: string) => portPos(iu, id)!;
  const ouOut = { x: 10, y: oy + 5 };

  if (tp70) {
    // ------------------------------------------------ TP70: connections on top, PC1 and buffer built in
    // ports (x): HK1 flow, HK1 return, HK2 flow, HK2 return, from HP, to HP, DHW flow, DHW return
    const yTop = iy;
    const xs = (id: string) => port(id).x;
    const IPC1: FlowCond = { c: "iu", s: "pc1" };
    // outdoor connections above the unit: straight runs without crossings
    b.pipe(P("iu", "src_out"), P("ou", "in"), "return", [IU], { via: [[xs("src_out"), oy + 5]] });
    b.pipe(P("ou", "out"), P("iu", "src_in"), "supply", [IU], { via: [[xs("src_in"), oy + 6]] });
    // heating circuit left of the unit, mirrored so its connections face the unit
    const hc = cfg.circuits[0] ?? { emitter: "radiators", mixed: false, label: "" };
    const ex = 2;
    const supRow = yTop - 8;
    const retRow = yTop - 4;
    b.add("hc1", hc.emitter, hc.label || t("wz.circuit", { n: 1 }), ex, supRow - 1, { flip: true, props: { circuit: 1 } });
    b.pipe(P("iu", "sup"), P("hc1", "sup"), "supply", [IPC1], { via: [[xs("sup"), supRow]] });
    // return accessories (separator, SC1, MAG) in front of the indoor unit
    let from: PortRef = P("hc1", "ret");
    let via: [number, number][] = [];
    let x = ex + 9;
    if (cfg.separator) {
      b.add("sep", "separator", t("wz.separator_short"), x, retRow - 1);
      b.add("sc1", "separator", "SC1", x + 3, retRow - 1, { props: { filter: true } });
      b.pipe(from, P("sep", "in"), "return", [IPC1]);
      b.pipe(P("sep", "out"), P("sc1", "in"), "return", [IPC1]);
      from = P("sc1", "out");
      x += 7;
    }
    if (cfg.expansion) {
      b.add("jmag", "junction", "", x + 1, retRow);
      b.add("mag", "expansion_vessel", "MAG", x, retRow, { rot: 180 as Rotation });
      b.pipe(P("mag", "conn"), P("jmag", "b"), "return", []);
      b.pipe(from, P("jmag", "l"), "return", [IPC1]);
      from = P("jmag", "r");
    }
    b.pipe(from, P("iu", "ret"), "return", [IPC1], { via: [...via, [xs("ret"), retRow]] });
    if (extDhw) {
      // cylinder right of the unit, coil fed over the top; drinking water between unit and cylinder
      const tx = ix + 22;
      const ty = yTop + 2;
      b.add("dhw", "dhw_tank", cfg.dhwLabel || t("type.dhw_tank"), tx, ty, { props: { volume: cfg.dhwVolume } });
      b.pipe(P("iu", "dhw_sup"), P("dhw", "coil_in"), "supply", [IU, B], { via: [[xs("dhw_sup"), yTop - 3], [tx + 9, yTop - 3], [tx + 9, ty + 4]] });
      b.pipe(P("dhw", "coil_out"), P("iu", "dhw_ret"), "return", [IU, B], { via: [[tx + 8, ty + 9], [tx + 8, yTop - 2], [xs("dhw_ret"), yTop - 2]] });
      drinkingWater(b, cfg, P("dhw", "hot"), P("dhw", "circ"), P("dhw", "cold"), tx, ty);
    }
  } else if (!top) {
    // ------------------------------------------------ wall-hung unit, connections at the bottom
    // ports (x): to HP, from HP | DHW flow, DHW return | heating return, heating flow
    const bot = iy + 14;
    const px = (id: string) => port(id).x;
    // heat pump circuit: two rows below the unit, no crossings (outdoor return connection on top)
    b.pipe(P("iu", "src_out"), P("ou", "in"), "return", [IU], { via: [[px("src_out"), bot + 1]] });
    b.pipe(P("ou", "out"), P("iu", "src_in"), "supply", [IU], { via: [[px("src_in"), bot + 2]] });

    // return accessories in front of the indoor unit, on their own row
    const row = bot + 6;
    const flowR = [IU, ...A];
    const chain: { inP: PortRef; outP: PortRef }[] = [];
    if (cfg.separator) {
      b.add("sep", "separator", t("wz.separator_short"), px("sup") + 9, row - 1, { rot: 180 as Rotation });
      chain.push({ inP: P("sep", "in"), outP: P("sep", "out") });
    }
    if (cfg.expansion) {
      b.add("jmag", "junction", "", px("sup") + 6, row);
      b.add("mag", "expansion_vessel", "MAG", px("sup") + 5, row + 1, { rot: 180 as Rotation });
      b.pipe(P("mag", "conn"), P("jmag", "b"), "return", []);
      chain.push({ inP: P("jmag", "r"), outP: P("jmag", "l") });
    }
    if (cfg.separator) {
      b.add("sc1", "separator", "SC1", px("sup") + 1, row - 1, { rot: 180 as Rotation, props: { filter: true } });
      chain.push({ inP: P("sc1", "in"), outP: P("sc1", "out") });
    }
    for (let i = 0; i < chain.length - 1; i++) b.pipe(chain[i].outP, chain[i + 1].inP, "return", flowR);
    let ret: PortRef = P("iu", "ret");
    if (chain.length) {
      b.pipe(chain[chain.length - 1].outP, P("iu", "ret"), "return", flowR, { via: [[px("ret"), row]] });
      ret = chain[0].inP;
    }

    // heating side
    if (extBuffer) {
      const bx = ix + 22;
      const by = bot + 8;
      b.add("buf", "buffer", cfg.bufferLabel || t("type.buffer"), bx, by, { props: { volume: cfg.bufferVolume } });
      b.pipe(P("iu", "sup"), P("buf", "in_sup"), "supply", [IU, ...A], { via: [[px("sup"), bot + 2], [bx + 1, bot + 2]] });
      b.pipe(P("buf", "in_ret"), ret, "return", [IU, ...A], { via: [[bx + 2, row]] });
      circuits(b, cfg, P("buf", "out_sup"), P("buf", "out_ret"), [PC1], [], true, bx + 8, by + 1);
    } else {
      const x0 = ix + 25;
      circuits(b, cfg, P("iu", "sup"), ret, [IU, ...A], [[px("sup"), bot + 2], [x0 - 2, bot + 2]], false, x0, bot + 8, row);
    }

    // hot water: cylinder right below the DHW connections, drinking water on its left
    if (extDhw) {
      const tx = px("dhw_sup") - 8;
      const ty = bot + 6;
      b.add("dhw", "dhw_tank", cfg.dhwLabel || t("type.dhw_tank"), tx, ty, { props: { volume: cfg.dhwVolume } });
      b.pipe(P("iu", "dhw_sup"), P("dhw", "coil_in"), "supply", [IU, B], { via: [[px("dhw_sup"), ty + 4]] });
      b.pipe(P("dhw", "coil_out"), P("iu", "dhw_ret"), "return", [IU, B], { via: [[px("dhw_ret"), ty + 9]] });
      drinkingWater(b, cfg, P("dhw", "hot"), P("dhw", "circ"), P("dhw", "cold"), tx, ty);
    }
  } else {
    // ------------------------------------------------ floor-standing / compact unit, connections on top
    const yTop = iy;
    const xs = (id: string) => port(id).x;
    const lastPort = Math.max(...["src_in", "src_out", "sup", "ret", "dhw_sup", "dhw_ret", "dhw_hot", "dhw_cold", "circ"].filter((id) => portPos(iu, id)).map(xs));
    // heat pump circuit on the two topmost rows
    b.pipe(P("ou", "out"), P("iu", "src_in"), "supply", [IU], { via: [[12, ouOut.y], [12, yTop - 9], [xs("src_in"), yTop - 9]] });
    b.pipe(P("iu", "src_out"), P("ou", "in"), "return", [IU], { via: [[xs("src_out"), yTop - 10], [11, yTop - 10]] });

    let hcSupply: PortRef = P("iu", "sup");
    let hcReturn: PortRef = P("iu", "ret");
    let hcFlow: FlowCond[] = builtInBuffer ? [PC1] : [IU, ...A];
    let hcVia: [number, number][] = [[xs("sup"), yTop - 2]];
    const row = yTop - 4; // return accessories in front of the indoor unit
    let x0 = lastPort + 14;
    if (extBuffer) {
      // chain right of the last connection: junction + MAG, SC1, separator, then the buffer
      const jx = lastPort + 2;
      const bx = jx + 10;
      const by = yTop + 4;
      b.add("buf", "buffer", cfg.bufferLabel || t("type.buffer"), bx, by, { props: { volume: cfg.bufferVolume } });
      b.pipe(P("iu", "sup"), P("buf", "in_sup"), "supply", [IU, ...A], { via: [[xs("sup"), yTop - 2], [bx + 1, yTop - 2]] });
      const flowR = [IU, ...A];
      let toIu: PortRef = P("buf", "in_ret");
      let via: [number, number][] = [[bx + 2, row]];
      if (cfg.separator) {
        b.add("sep", "separator", t("wz.separator_short"), jx + 6, row - 1, { rot: 180 as Rotation });
        b.add("sc1", "separator", "SC1", jx + 3, row - 1, { rot: 180 as Rotation, props: { filter: true } });
        b.pipe(toIu, P("sep", "in"), "return", flowR, { via });
        b.pipe(P("sep", "out"), P("sc1", "in"), "return", flowR);
        toIu = P("sc1", "out");
        via = [];
      }
      if (cfg.expansion) {
        b.add("jmag", "junction", "", jx, row);
        b.add("mag", "expansion_vessel", "MAG", jx - 1, row - 5);
        b.pipe(P("mag", "conn"), P("jmag", "t"), "return", []);
        b.pipe(toIu, P("jmag", "r"), "return", flowR, { via });
        toIu = P("jmag", "l");
        via = [];
      }
      b.pipe(toIu, P("iu", "ret"), "return", flowR, { via: [...via, [xs("ret"), row]] });
      hcSupply = P("buf", "out_sup");
      hcReturn = P("buf", "out_ret");
      hcFlow = [PC1];
      hcVia = [];
      x0 = bx + 7;
    }
    circuits(b, cfg, hcSupply, hcReturn, hcFlow, hcVia, extBuffer || builtInBuffer, x0, yTop + 4);
    if (builtInDhw) {
      drinkingWater(b, cfg, P("iu", "dhw_hot"), P("iu", "circ"), P("iu", "dhw_cold"), ix - 1, yTop + 18);
    } else if (extDhw) {
      const tx = ix - 9;
      const ty = yTop + 8;
      b.add("dhw", "dhw_tank", cfg.dhwLabel || t("type.dhw_tank"), tx, ty, { props: { volume: cfg.dhwVolume } });
      b.pipe(P("iu", "dhw_sup"), P("dhw", "coil_in"), "supply", [IU, B], { via: [[xs("dhw_sup"), yTop - 1], [tx + 8, yTop - 1], [tx + 8, ty + 4]] });
      b.pipe(P("dhw", "coil_out"), P("iu", "dhw_ret"), "return", [IU, B], { via: [[tx + 7, ty + 9], [tx + 7, yTop - 3], [xs("dhw_ret"), yTop - 3]] });
      drinkingWater(b, cfg, P("dhw", "hot"), P("dhw", "circ"), P("dhw", "cold"), tx, ty);
    }
  }

  const n = Math.max(1, cfg.circuits.length);
  const plant: Plant = {
    version: 5,
    name: cfg.name,
    grid: tp70 ? { w: 58, h: 49 } : { w: n > 1 ? 76 : 66, h: Math.max(38, (top ? 46 : 38) + (n - 1) * 10) },
    components: b.components,
    pipes: b.pipes,
    settings: previous?.settings ?? { style: "flat", demo: true },
  };
  plant.settings = { ...plant.settings, wizard: cfg, layout_edited: false };

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
    // values of the former separate PC0 / VW1 components now live on the indoor unit
    const iuNew = plant.components.find((c) => c.id === "iu");
    const pc0 = old.get("pc0");
    const vw1 = old.get("vw1");
    if (iuNew && pc0?.bindings.running) iuNew.bindings.pc0_running ??= pc0.bindings.running;
    if (iuNew && pc0?.bindings.speed) iuNew.bindings.pc0_speed ??= pc0.bindings.speed;
    if (iuNew && vw1?.bindings.position) iuNew.bindings.vw1_position ??= vw1.bindings.position;
  }
  return plant;
}

/** Heating circuits: secondary pump (with buffer), optional mixer, emitter. */
function circuits(
  b: Builder,
  cfg: WizardConfig,
  supply: PortRef,
  ret: PortRef,
  flow: FlowCond[],
  supplyVia: [number, number][],
  ownPump: boolean,
  x0: number,
  yBase: number,
  returnRow?: number,
): void {
  const n = Math.max(1, cfg.circuits.length);
  const many = n > 1;
  const pumpConds: FlowCond[] = [];
  const supplyPort = { ...supply };
  cfg.circuits.slice(0, 4).forEach((hc, i) => {
    const idx = i + 1;
    const yc = yBase - 9 + i * 10;
    const pumpId = idx === 1 ? "pc1" : `hc${idx}_pump`;
    const mixId = `hc${idx}_mix`;
    const emId = `hc${idx}`;
    let x = x0;
    let entry: PortRef | null = null;
    let last: PortRef | null = null;
    let f = flow;
    if (ownPump || hc.mixed) {
      b.add(pumpId, "pump", idx === 1 ? "PC1" : `PC${idx}`, x, yc, { props: { role: hc.mixed ? "hc" : "secondary", circuit: idx } });
      entry = P(pumpId, "in");
      last = P(pumpId, "out");
      f = [{ c: pumpId, s: "running" }];
      pumpConds.push(f[0]);
      x += 4;
    }
    if (hc.mixed) {
      b.add(mixId, "mixer", `VC${idx}`, x, yc, { props: { circuit: idx } });
      if (last) b.pipe(last, P(mixId, "in"), "supply", f);
      else entry = P(mixId, "in");
      last = P(mixId, "out");
      x += 3;
    }
    const emX = x + 3;
    b.add(emId, hc.emitter, hc.label || t("wz.circuit", { n: idx }), emX, yc - 2, { props: { circuit: idx } });
    if (last) b.pipe(last, P(emId, "sup"), "supply", f, { via: [[emX - 2, yc + 1], [emX - 2, yc - 1]] });
    else entry = P(emId, "sup");
    // supply from the source; additional circuits share it (drawn as separate branches)
    b.pipe(i === 0 ? supplyPort : supplyPort, entry!, "supply", f, i === 0 ? { via: [...supplyVia, [x0 - 1 - i, yc + 1]] } : { via: [[x0 - 1 - i, yc + 1]] });
    if (hc.mixed) {
      b.add(`hc${idx}_jm`, "junction", "", x - 2, yc + 3);
      b.pipe(P(emId, "ret"), P(`hc${idx}_jm`, "r"), "return", f, { via: [[x - 2, yc + 3]] });
      b.pipe(P(`hc${idx}_jm`, "t"), P(mixId, "ret"), "return", f);
      b.pipe(P(`hc${idx}_jm`, "l"), ret, "return", f, { via: [[x0 - 2 - i, yc + 3], ...(returnRow ? [[x0 - 2 - i, returnRow] as [number, number]] : [])] });
    } else {
      b.pipe(P(emId, "ret"), ret, "return", f, { via: [[x0 - 2 - i, yc + 3], ...(returnRow ? [[x0 - 2 - i, returnRow] as [number, number]] : [])] });
    }
    void many;
  });
}

/**
 * Hot water line with tap, circulation and cold water inlet. The circulation
 * branches off at the end of the hot water line (tee behind the tap) and runs
 * through the circulation pump PW2 back to the cylinder's circulation inlet.
 */
function drinkingWater(b: Builder, cfg: WizardConfig, hot: PortRef, circ: PortRef, cold: PortRef, tx: number, ty: number): void {
  const draw: FlowCond = { c: "tap", s: "flowing" };
  const circOn: FlowCond = { c: "circ", s: "running" };
  // tap level with the hot water outlet, cold water inlet level with the cold connection
  b.add("tap", "tap", t("type.tap"), tx - 9, ty);
  b.add("inlet", "water_inlet", t("type.water_inlet"), tx - 9, ty + 9);
  b.pipe(P("inlet", "out"), cold, "dhw_cold", [draw]);
  if (!cfg.circulation) {
    b.pipe(hot, P("tap", "hot"), "dhw_hot", [draw]);
    return;
  }
  // tee at the end of the hot water line; circulation returns through PW2
  b.add("jww", "junction", "", tx - 3, ty + 1);
  b.pipe(hot, P("jww", "r"), "dhw_hot", [], { flowAny: [draw, circOn] });
  b.pipe(P("jww", "l"), P("tap", "hot"), "dhw_hot", [draw]);
  b.add("circ", "pump", "PW2", tx - 4, ty + 3, { rot: 90 as Rotation, props: { role: "circulation" } });
  b.pipe(P("jww", "b"), P("circ", "in"), "circulation", [circOn]);
  b.pipe(P("circ", "out"), circ, "circulation", [circOn]);
}

export function examplePlant(): Plant {
  // standalone demo: ?indoor=<model id> previews other indoor units
  const indoor = typeof location !== "undefined" ? new URLSearchParams(location.search).get("indoor") : null;
  const cfg = exampleConfig();
  if (indoor && indoorModel(indoor)) {
    cfg.indoorModel = indoor;
    cfg.indoorLabel = indoorModel(indoor)!.label.replace(/^Logatherm /, "").split(" – ")[0];
  }
  const plant = generatePlant(cfg);
  // ?style=iso previews the 2.5D style
  if (typeof location !== "undefined" && new URLSearchParams(location.search).get("style") === "iso") plant.settings.style = "iso";
  return plant;
}

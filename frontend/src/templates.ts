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
  const oy = top ? 12 : 3;
  b.add("ou", "outdoor_unit", cfg.outdoorLabel || t("type.outdoor_unit"), 1, oy, {
    model: cfg.outdoorModel,
    props: { nominal_kw: cfg.nominalKw },
  });
  const ix = 14;
  const iy = top ? 12 : 2;
  b.add("iu", "indoor_unit", cfg.indoorLabel || t("type.indoor_unit"), ix, iy, { model: cfg.indoorModel, props: indoorProps });
  const iu = b.components.find((c) => c.id === "iu")!;
  const port = (id: string) => portPos(iu, id)!;
  const ouOut = { x: 10, y: oy + 5 };

  if (!top) {
    // ------------------------------------------------ wall-hung unit, connections at the bottom
    const bot = iy + 12;
    b.pipe(P("ou", "out"), P("iu", "src_in"), "supply", [IU], { via: [[12, ouOut.y], [12, bot + 1]] });
    b.pipe(P("iu", "src_out"), P("ou", "in"), "return", [IU], { via: [[ix + 1, bot + 2], [11, bot + 2]] });

    // return accessories in front of the indoor unit (row bot+4)
    const row = bot + 4;
    let ret: PortRef = P("iu", "ret");
    let retVia: [number, number][] = [[ix + 6, row]];
    const chainFlow = [IU, ...A];
    const items: { id: string; x: number }[] = [];
    if (cfg.separator) {
      b.add("sc1", "separator", "SC1", ix + 8, row - 1, { rot: 180 as Rotation, props: { filter: true } });
      items.push({ id: "sc1", x: ix + 8 });
    }
    if (cfg.expansion) {
      b.add("jmag", "junction", "", ix + 12, row);
      b.add("mag", "expansion_vessel", "MAG", ix + 11, row + 1, { rot: 180 as Rotation });
      b.pipe(P("mag", "conn"), P("jmag", "b"), "return", []);
    }
    if (cfg.separator) {
      b.add("sep", "separator", t("wz.separator_short"), ix + 14, row - 1, { rot: 180 as Rotation });
    }
    // connect chain from the buffer side towards the indoor unit
    const chain: { inP: PortRef; outP: PortRef }[] = [];
    if (cfg.separator) chain.push({ inP: P("sep", "in"), outP: P("sep", "out") });
    if (cfg.expansion) chain.push({ inP: P("jmag", "r"), outP: P("jmag", "l") });
    if (cfg.separator) chain.push({ inP: P("sc1", "in"), outP: P("sc1", "out") });
    for (let i = 0; i < chain.length - 1; i++) b.pipe(chain[i].outP, chain[i + 1].inP, "return", chainFlow);
    if (chain.length) {
      b.pipe(chain[chain.length - 1].outP, ret, "return", chainFlow, { via: retVia });
      ret = chain[0].inP;
      retVia = [];
    }
    void items;

    // heating side
    let hcSupply: PortRef = P("iu", "sup");
    let hcReturn: PortRef = ret;
    let hcViaSup: [number, number][] = [[ix + 7, bot + 2], [ix + 19, bot + 2]];
    let x0 = ix + 20;
    let hcFlow: FlowCond[] = [IU, ...A];
    if (extBuffer) {
      const bx = ix + 17;
      const by = row + 2;
      b.add("buf", "buffer", cfg.bufferLabel || t("type.buffer"), bx, by, { props: { volume: cfg.bufferVolume } });
      b.pipe(P("iu", "sup"), P("buf", "in_sup"), "supply", [IU, ...A], { via: [[ix + 7, bot + 2], [bx + 1, bot + 2]] });
      b.pipe(P("buf", "in_ret"), ret, "return", [IU, ...A], { via: [[bx + 2, row]] });
      hcSupply = P("buf", "out_sup");
      hcReturn = P("buf", "out_ret");
      hcViaSup = [];
      hcFlow = [PC1];
      x0 = bx + 7;
    } else if (chain.length) {
      // no buffer: heating return runs through the accessories
      hcReturn = ret;
    }
    circuits(b, cfg, hcSupply, hcReturn, hcFlow, hcViaSup, extBuffer, x0, row + 2);

    // hot water
    if (extDhw) {
      const tx = ix - 4;
      const ty = row + 1;
      b.add("dhw", "dhw_tank", cfg.dhwLabel || t("type.dhw_tank"), tx, ty, { props: { volume: cfg.dhwVolume } });
      b.pipe(P("iu", "dhw_sup"), P("dhw", "coil_in"), "supply", [IU, B], { via: [[ix + 4, ty + 4]] });
      b.pipe(P("dhw", "coil_out"), P("iu", "dhw_ret"), "return", [IU, B], { via: [[ix + 5, ty + 9]] });
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
    version: 2,
    name: cfg.name,
    grid: { w: n > 1 ? 72 : 60, h: Math.max(36, (top ? 46 : 34) + (n - 1) * 10) },
    components: b.components,
    pipes: b.pipes,
    settings: previous?.settings ?? { style: "flat", demo: true },
  };
  plant.settings = { ...plant.settings, wizard: cfg };

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
      b.pipe(P(`hc${idx}_jm`, "l"), ret, "return", f, { via: [[x0 - 2 - i, yc + 3]] });
    } else {
      b.pipe(P(emId, "ret"), ret, "return", f, { via: [[x0 - 2 - i, yc + 3]] });
    }
    void many;
  });
}

/** Tap, circulation pump and cold water inlet next to a cylinder or an indoor unit with built-in cylinder. */
function drinkingWater(b: Builder, cfg: WizardConfig, hot: PortRef, circ: PortRef, cold: PortRef, tx: number, ty: number): void {
  const draw: FlowCond = { c: "tap", s: "flowing" };
  const circOn: FlowCond = { c: "circ", s: "running" };
  b.add("tap", "tap", t("type.tap"), tx - 6, ty - 2);
  b.add("inlet", "water_inlet", t("type.water_inlet"), tx - 6, ty + 9);
  b.pipe(hot, P("tap", "hot"), "dhw_hot", [], { flowAny: cfg.circulation ? [draw, circOn] : [draw], via: [[tx - 2, ty + 1], [tx - 2, ty - 1]] });
  b.pipe(P("inlet", "out"), cold, "dhw_cold", [draw]);
  if (cfg.circulation) {
    b.add("circ", "pump", "PW2", tx - 5, ty + 3, { rot: 90 as Rotation, props: { role: "circulation" } });
    b.pipe(P("tap", "circ"), P("circ", "in"), "circulation", [circOn]);
    b.pipe(P("circ", "out"), circ, "circulation", [circOn]);
  }
}

export function examplePlant(): Plant {
  return generatePlant(exampleConfig());
}

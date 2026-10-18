/** Plant wizard: turns a short description into a laid-out schematic. */

import { indoorModel, outdoorModel, portPos } from "./catalog";
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
  // floor-standing units with one direct radiator circuit: building section as well
  const oneRad = cfg.circuits.length === 1 && !cfg.circuits[0]?.mixed && cfg.circuits[0]?.emitter === "radiators";
  const bldTop = top && oneRad && (variant === "tp70" || variant === "brine" || variant === "t180");
  const tp70 = !bldTop && variant === "tp70" && cfg.circuits.length <= 1 && !cfg.circuits[0]?.mixed;
  // wall-hung unit with parallel buffer and one direct radiator circuit: building section layout
  // (outdoor unit outside on the ground, cylinder and buffer on the floor, radiator upstairs)
  const hc0 = cfg.circuits[0];
  const bld =
    variant === "wall_e" && cfg.buffer === "parallel" && !builtInBuffer && cfg.circuits.length === 1 && !hc0?.mixed && hc0?.emitter === "radiators";
  // building grid (cells): floor, outer wall, ceiling of the plant room
  // plant room in the basement: the ceiling (SLAB) is ground level outside
  const FLOOR = 50;
  const SLAB = 16;
  // runs to the outdoor unit pass the wall below ground level (ground: 2 cells under the ceiling)
  const RAIL = SLAB + 3;
  // floor-standing parts keep 2 cells to the drawn floor, so their names stay above the foundation
  const FLOOR_GAP = 2;
  // T180: heat pump connections are the rightmost ones, so the outside is on the right
  const outRight = bldTop && variant === "t180";
  // generous spacing as in the wall-hung layout: outdoor unit inset from the edge, 5 cells to the wall
  const ixTop = variant === "t180" ? (extBuffer ? 42 : 26) : variant === "tp70" ? 34 : 32;
  const WALL = outRight ? ixTop + 18 : bld || bldTop ? 19 : 16;
  // brine: the "outdoor unit" is the ground collector, below ground level
  const probe = bldTop && outdoorModel(cfg.outdoorModel).source === "brine";
  const ox = outRight ? WALL + 5 : bld || bldTop ? 4 : 1;
  // wall units: outdoor connections level with the two rows below the indoor unit
  const oy = bldTop ? (probe ? SLAB + 3 : SLAB - 7) : bld ? SLAB - 7 : tp70 ? 5 : top ? 12 : 2 + 14 - 4;
  b.add("ou", "outdoor_unit", cfg.outdoorLabel || t("type.outdoor_unit"), ox, oy, {
    model: cfg.outdoorModel,
    props: { nominal_kw: cfg.nominalKw },
  });
  // generous gap between outdoor unit (x 1..10) and indoor unit
  const ix = bldTop ? ixTop : bld ? 44 : tp70 ? 22 : top ? 14 : 16;
  // wall-hung: bottom connections 14 rows above the floor, the cylinder fits below the pipe runs
  const iy = bldTop ? FLOOR - (variant === "t180" ? 22 : variant === "tp70" ? 16 : 14) : bld ? FLOOR - 32 : tp70 ? 27 : top ? 12 : 2;
  b.add("iu", "indoor_unit", cfg.indoorLabel || t("type.indoor_unit"), ix, iy, { model: cfg.indoorModel, props: indoorProps });
  const iu = b.components.find((c) => c.id === "iu")!;
  const port = (id: string) => portPos(iu, id)!;
  const ouOut = { x: 10, y: oy + 5 };

  /**
   * Heating circuit of the building layouts: return and flow rise straight up through the ceiling to a
   * radiator with side connections (flow top, return bottom) on the living floor. retX is the return
   * riser; the flow rises two columns further out (dir) and steps aside once at jogY so a pump keeps
   * clear of the return. With chain, separator, SC1 and the expansion vessel sit in the return riser.
   */
  const radiatorUp = (
    ret: PortRef,
    sup: PortRef,
    retX: number,
    fromY: number,
    flow: FlowCond[],
    ownPump: boolean,
    radiatorLeft = true,
    opts: { supSrcX?: number; jogY?: number; chainY?: number; mag?: boolean; pumpY?: number; retSrcX?: number; retJogY?: number } = {},
  ) => {
    const dir = radiatorLeft ? 1 : -1;
    const supX = retX + 2 * dir;
    const supSrcX = opts.supSrcX ?? retX + dir;
    const jogY = opts.jogY ?? fromY - 2;
    const rx = radiatorLeft ? retX - 8 : retX + 1;
    const ry = SLAB - 8;
    const hc = cfg.circuits[0];
    b.add("hc1", hc.emitter, hc.label || t("wz.circuit", { n: 1 }), rx, ry, { flip: radiatorLeft, props: { circuit: 1 } });
    let f = flow;
    const supVia: [number, number][] = supSrcX === supX ? [] : [[supSrcX, jogY], [supX, jogY]];
    if (ownPump) {
      f = [{ c: "pc1", s: "running" }];
      b.add("pc1", "pump", "PC1", supX - 1, opts.pumpY ?? fromY - 10, { rot: 270 as Rotation, props: { role: "secondary", circuit: 1 } });
      b.pipe(sup, P("pc1", "in"), "supply", f, { via: supVia });
      b.pipe(P("pc1", "out"), P("hc1", "sup"), "supply", f, { via: [[supX, ry + 1]] });
    } else {
      b.pipe(sup, P("hc1", "sup"), "supply", f, { via: [...supVia, [supX, ry + 1]] });
    }
    // return riser, optionally with the return accessories (flow downwards)
    let from: PortRef = P("hc1", "ret");
    let via: [number, number][] = [[retX, ry + 5]];
    if (opts.chainY !== undefined) {
      let y = opts.chainY;
      const parts: [string, string, Record<string, unknown>][] = [];
      if (cfg.separator) parts.push(["sep", t("wz.separator_short"), {}], ["sc1", "SC1", { filter: true }]);
      for (const [id, label, props] of parts) {
        b.add(id, "separator", label, retX - 1, y, { rot: 90 as Rotation, props });
        b.pipe(from, P(id, "in"), "return", f, { via });
        from = P(id, "out");
        via = [];
        y += 3;
      }
      if (cfg.expansion && opts.mag !== false) {
        b.add("jmag", "junction", "", retX, y + 1);
        // vessel on the side away from the flow riser
        b.add("mag", "expansion_vessel", "MAG", radiatorLeft ? retX - 4 : retX + 1, y, { rot: (radiatorLeft ? 270 : 90) as Rotation });
        b.pipe(P("mag", "conn"), P("jmag", radiatorLeft ? "l" : "r"), "return", []);
        b.pipe(from, P("jmag", "t"), "return", f, { via });
        from = P("jmag", "b");
        via = [];
      }
    }
    // the return may step aside right above its connection (crowded connections on top)
    if (opts.retSrcX !== undefined && opts.retSrcX !== retX) via = [...via, [retX, opts.retJogY ?? fromY - 1], [opts.retSrcX, opts.retJogY ?? fromY - 1]];
    b.pipe(from, ret, "return", f, { via });
  };


  /**
   * Shower upstairs fed from an external cylinder: hot water and circulation rise side by side
   * (circulation on the outside), the circulation pump sits in the basement. outward: side of the
   * risers seen from the cylinder (-1 = left, +1 = right).
   */
  const showerUp = (tx: number, ty: number, outward: 1 | -1, hotX: number, inletX: number) => {
    const draw: FlowCond = { c: "tap", s: "flowing" };
    const circOn: FlowCond = { c: "circ", s: "running" };
    const circX = hotX + outward;
    b.add("tap", "tap", t("wz.shower"), hotX - 6, SLAB - 9, { props: { variant: "shower" } });
    b.add("inlet", "water_inlet", t("type.water_inlet"), inletX, ty + 9, outward > 0 ? { flip: true } : {});
    b.pipe(P("inlet", "out"), P("dhw", "cold"), "dhw_cold", [draw]);
    if (!cfg.circulation) {
      b.pipe(P("dhw", "hot"), P("tap", "hot"), "dhw_hot", [draw], { via: [[hotX, ty + 1], [hotX, SLAB - 8]] });
      return;
    }
    b.add("jww", "junction", "", hotX, SLAB - 7);
    b.pipe(P("dhw", "hot"), P("jww", "b"), "dhw_hot", [], { via: [[hotX, ty + 1]], flowAny: [draw, circOn] });
    b.pipe(P("jww", "t"), P("tap", "hot"), "dhw_hot", [draw], { via: [[hotX, SLAB - 8]] });
    b.add("circ", "pump", "PW2", circX - 1, ty + 2, { rot: 90 as Rotation, props: { role: "circulation" } });
    b.pipe(P("jww", outward > 0 ? "r" : "l"), P("circ", "in"), "circulation", [circOn], { via: [[circX, SLAB - 7]] });
    b.pipe(P("circ", "out"), P("dhw", "circ"), "circulation", [circOn], { via: [[circX, ty + 6]] });
  };

  if (bldTop) {
    // ------------------------------------------------ building section, floor-standing units (connections on top)
    const yTop = iy;
    const px = (id: string) => port(id).x;
    // heat pump / brine circuit: up beside the unit, through the basement wall below the ceiling
    if (outRight) {
      b.pipe(P("ou", "out"), P("iu", "src_in"), "supply", [IU], { via: [[ox + 10, oy + 6], [ox + 10, RAIL], [px("src_in"), RAIL]] });
      b.pipe(P("iu", "src_out"), P("ou", "in"), "return", [IU], { via: [[px("src_out"), RAIL + 1], [ox + 11, RAIL + 1], [ox + 11, oy + 5]] });
    } else if (probe) {
      // collector in the ground: the runs go down outside
      b.pipe(P("iu", "src_out"), P("ou", "in"), "return", [IU], { via: [[px("src_out"), RAIL], [WALL - 3, RAIL], [WALL - 3, oy + 5]] });
      b.pipe(P("ou", "out"), P("iu", "src_in"), "supply", [IU], { via: [[WALL - 2, oy + 6], [WALL - 2, RAIL + 1], [px("src_in"), RAIL + 1]] });
    } else {
      b.pipe(P("iu", "src_out"), P("ou", "in"), "return", [IU], { via: [[px("src_out"), RAIL], [WALL - 2, RAIL], [WALL - 2, oy + 5]] });
      b.pipe(P("ou", "out"), P("iu", "src_in"), "supply", [IU], { via: [[WALL - 3, oy + 6], [WALL - 3, RAIL + 1], [px("src_in"), RAIL + 1]] });
    }
    const chainY = SLAB + 6;
    if (variant === "tp70") {
      // built-in buffer and PC1: risers from the HK1 connections, radiator to the right of them
      const IPC1: FlowCond = { c: "iu", s: "pc1" };
      radiatorUp(P("iu", "ret"), P("iu", "sup"), px("ret"), yTop, [IPC1], false, false, { supSrcX: px("sup"), chainY, mag: false });
      // cylinder mirrored on the right: coil faces the unit, drinking water side faces away
      const tx = ix + 20;
      const ty = FLOOR - 11;
      b.add("dhw", "dhw_tank", cfg.dhwLabel || t("type.dhw_tank"), tx, ty, { flip: true, props: { volume: cfg.dhwVolume } });
      b.pipe(P("iu", "dhw_sup"), P("dhw", "coil_in"), "supply", [IU, B], { via: [[px("dhw_sup"), yTop - 2], [tx - 1, yTop - 2], [tx - 1, ty + 4]] });
      b.pipe(P("dhw", "coil_out"), P("iu", "dhw_ret"), "return", [IU, B], { via: [[tx - 2, ty + 9], [tx - 2, yTop - 1], [px("dhw_ret"), yTop - 1]] });
      showerUp(tx, ty, 1, tx + 8, tx + 10);
    } else if (variant === "t180") {
      // built-in cylinder: radiator on the left, shower above the unit (mirrored, fed from the left)
      const draw: FlowCond = { c: "tap", s: "flowing" };
      const circOn: FlowCond = { c: "circ", s: "running" };
      const IPC1: FlowCond = { c: "iu", s: "pc1" };
      if (extBuffer) {
        // buffer left of the unit, mirrored: its inlets face the unit, the risers to the radiator stay outside
        const bx = ix - 20;
        const by = FLOOR - 9;
        const rowS = yTop - 6;
        const rowR = yTop - 4;
        const flowR = [IU, ...A];
        b.add("buf", "buffer", cfg.bufferLabel || t("type.buffer"), bx, by, { flip: true, props: { volume: cfg.bufferVolume } });
        b.pipe(P("iu", "sup"), P("buf", "in_sup"), "supply", flowR, { via: [[px("sup"), rowS], [bx + 4, rowS]] });
        // return with separator, SC1 and the expansion vessel (flow towards the unit)
        let from: PortRef = P("buf", "in_ret");
        let via: [number, number][] = [[bx + 3, rowR]];
        let x = bx + 5;
        if (cfg.separator) {
          b.add("sep", "separator", t("wz.separator_short"), x, rowR - 1);
          b.add("sc1", "separator", "SC1", x + 3, rowR - 1, { props: { filter: true } });
          b.pipe(from, P("sep", "in"), "return", flowR, { via });
          b.pipe(P("sep", "out"), P("sc1", "in"), "return", flowR);
          from = P("sc1", "out");
          via = [];
          x += 7;
        }
        if (cfg.expansion) {
          b.add("jmag", "junction", "", x + 1, rowR);
          b.add("mag", "expansion_vessel", "MAG", x, rowR, { rot: 180 as Rotation });
          b.pipe(P("mag", "conn"), P("jmag", "b"), "return", []);
          b.pipe(from, P("jmag", "l"), "return", flowR, { via });
          from = P("jmag", "r");
          via = [];
        }
        b.pipe(from, P("iu", "ret"), "return", flowR, { via: [...via, [px("ret"), rowR]] });
        // flipped buffer: out_sup at bx+1, out_ret at bx+2; radiator to the right of the risers
        radiatorUp(P("buf", "out_ret"), P("buf", "out_sup"), bx + 2, by, [PC1], true, false, { supSrcX: bx + 1 });
      } else {
        // built-in PC1; the radiator risers step three columns left so the circulation pump fits
        radiatorUp(P("iu", "ret"), P("iu", "sup"), px("ret") - 3, yTop, [IPC1], false, true, {
          supSrcX: px("sup"),
          jogY: yTop - 2,
          retSrcX: px("ret"),
          retJogY: yTop - 1,
        });
      }
      const hotX = px("dhw_hot");
      b.add("tap", "tap", t("wz.shower"), hotX + 2, SLAB - 9, { flip: true, props: { variant: "shower" } });
      if (cfg.circulation) {
        b.add("jww", "junction", "", hotX, SLAB - 5);
        b.pipe(P("iu", "dhw_hot"), P("jww", "b"), "dhw_hot", [], { flowAny: [draw, circOn] });
        b.pipe(P("jww", "t"), P("tap", "hot"), "dhw_hot", [draw], { via: [[hotX, SLAB - 8]] });
        b.add("circ", "pump", "PW2", px("circ") - 1, extBuffer ? SLAB + 1 : yTop - 8, { rot: 90 as Rotation, props: { role: "circulation" } });
        b.pipe(P("jww", "l"), P("circ", "in"), "circulation", [circOn], { via: [[px("circ"), SLAB - 5]] });
        b.pipe(P("circ", "out"), P("iu", "circ"), "circulation", [circOn]);
      } else {
        b.pipe(P("iu", "dhw_hot"), P("tap", "hot"), "dhw_hot", [draw], { via: [[hotX, SLAB - 8]] });
      }
      // mains water enters through the outer wall
      b.add("inlet", "water_inlet", t("type.water_inlet"), WALL - 4, yTop - 5, { flip: true });
      b.pipe(P("inlet", "out"), P("iu", "dhw_cold"), "dhw_cold", [draw], { via: [[px("dhw_cold"), yTop - 4]] });
    } else {
      // brine compact unit: heating to the right (optionally via a buffer), cylinder on the far right
      const flowHc: FlowCond[] = [IU, ...A];
      let cx = ix + 14;
      if (extBuffer) {
        const bx = ix + 17;
        const by = FLOOR - 9;
        b.add("buf", "buffer", cfg.bufferLabel || t("type.buffer"), bx, by, { props: { volume: cfg.bufferVolume } });
        b.pipe(P("iu", "sup"), P("buf", "in_sup"), "supply", flowHc, { via: [[px("sup"), yTop - 1], [bx + 1, yTop - 1]] });
        b.pipe(P("buf", "in_ret"), P("iu", "ret"), "return", flowHc, { via: [[bx + 2, yTop - 2], [px("ret"), yTop - 2]] });
        radiatorUp(P("buf", "out_ret"), P("buf", "out_sup"), bx + 3, by, [PC1], true, true, { chainY, pumpY: SLAB + 2 });
        cx = bx + 16;
      } else {
        radiatorUp(P("iu", "ret"), P("iu", "sup"), px("ret"), yTop + 1, flowHc, false, true, { supSrcX: px("sup"), chainY, mag: false });
        cx = ix + 20;
      }
      if (extDhw) {
        const tx = cx;
        const ty = FLOOR - 11;
        b.add("dhw", "dhw_tank", cfg.dhwLabel || t("type.dhw_tank"), tx, ty, { flip: true, props: { volume: cfg.dhwVolume } });
        b.pipe(P("iu", "dhw_sup"), P("dhw", "coil_in"), "supply", [IU, B], { via: [[px("dhw_sup"), yTop - 4], [tx - 1, yTop - 4], [tx - 1, ty + 4]] });
        b.pipe(P("dhw", "coil_out"), P("iu", "dhw_ret"), "return", [IU, B], { via: [[tx - 2, ty + 9], [tx - 2, yTop - 3], [px("dhw_ret"), yTop - 3]] });
        showerUp(tx, ty, 1, tx + 8, tx + 10);
      }
    }
  } else   if (bld) {
    // ------------------------------------------------ building section (wall-hung, buffer, radiator upstairs)
    const bot = iy + 14;
    const px = (id: string) => port(id).x;
    // heat pump circuit: up beside the unit, through the basement wall just below the ceiling,
    // then up through the soil to the outdoor unit at ground level (two parallel runs, no crossing)
    b.pipe(P("iu", "src_out"), P("ou", "in"), "return", [IU], {
      via: [[px("src_out"), bot + 4], [ix - 2, bot + 4], [ix - 2, RAIL], [WALL - 2, RAIL], [WALL - 2, oy + 5]],
    });
    b.pipe(P("ou", "out"), P("iu", "src_in"), "supply", [IU], {
      via: [[WALL - 3, oy + 6], [WALL - 3, RAIL + 1], [ix - 3, RAIL + 1], [ix - 3, bot + 5], [px("src_in"), bot + 5]],
    });
    // DHW cylinder on the floor, left of the unit and below the pipe runs; drinking water by the wall
    if (extDhw) {
      // spread out: cylinder well left of the unit, below nothing
      const tx = ix - 14;
      const ty = FLOOR - 11;
      b.add("dhw", "dhw_tank", cfg.dhwLabel || t("type.dhw_tank"), tx, ty, { props: { volume: cfg.dhwVolume } });
      b.pipe(P("iu", "dhw_sup"), P("dhw", "coil_in"), "supply", [IU, B], { via: [[px("dhw_sup"), ty + 4]] });
      b.pipe(P("dhw", "coil_out"), P("iu", "dhw_ret"), "return", [IU, B], { via: [[px("dhw_ret"), ty + 9]] });
      // drinking water: shower upstairs, hot water and circulation rise side by side along the outer wall
      const draw: FlowCond = { c: "tap", s: "flowing" };
      const circOn: FlowCond = { c: "circ", s: "running" };
      const hotX = tx - 2;
      b.add("tap", "tap", t("wz.shower"), hotX - 6, SLAB - 9, { props: { variant: "shower" } });
      b.add("inlet", "water_inlet", t("type.water_inlet"), WALL + 1, ty + 9);
      b.pipe(P("inlet", "out"), P("dhw", "cold"), "dhw_cold", [draw]);
      if (cfg.circulation) {
        b.add("jww", "junction", "", hotX, SLAB - 7);
        b.pipe(P("dhw", "hot"), P("jww", "b"), "dhw_hot", [], { via: [[hotX, ty + 1]], flowAny: [draw, circOn] });
        b.pipe(P("jww", "t"), P("tap", "hot"), "dhw_hot", [draw], { via: [[hotX, SLAB - 8]] });
        b.add("circ", "pump", "PW2", hotX - 2, ty + 2, { rot: 90 as Rotation, props: { role: "circulation" } });
        b.pipe(P("jww", "l"), P("circ", "in"), "circulation", [circOn], { via: [[hotX - 1, SLAB - 7]] });
        b.pipe(P("circ", "out"), P("dhw", "circ"), "circulation", [circOn], { via: [[hotX - 1, ty + 6]] });
      } else {
        b.pipe(P("dhw", "hot"), P("tap", "hot"), "dhw_hot", [draw], { via: [[hotX, ty + 1], [hotX, SLAB - 8]] });
      }
    }
    // buffer on the floor; return accessories in one run in front of the indoor unit
    const bx = ix + 27;
    const by = FLOOR - 9;
    // flow run above, return run with its accessories below (as in the installation schemes)
    const row = bot + 5;
    const flowR = [IU, ...A];
    b.add("buf", "buffer", cfg.bufferLabel || t("type.buffer"), bx, by, { props: { volume: cfg.bufferVolume } });
    b.pipe(P("iu", "sup"), P("buf", "in_sup"), "supply", flowR, { via: [[px("sup"), bot + 3], [bx + 1, bot + 3]] });
    const chain: { inP: PortRef; outP: PortRef }[] = [];
    if (cfg.separator) {
      b.add("sep", "separator", t("wz.separator_short"), px("sup") + 10, row - 1, { rot: 180 as Rotation });
      chain.push({ inP: P("sep", "in"), outP: P("sep", "out") });
    }
    if (cfg.expansion) {
      b.add("jmag", "junction", "", px("sup") + 6, row);
      b.add("mag", "expansion_vessel", "MAG", px("sup") + 5, row + 1, { rot: 180 as Rotation });
      b.pipe(P("mag", "conn"), P("jmag", "b"), "return", []);
      chain.push({ inP: P("jmag", "r"), outP: P("jmag", "l") });
    }
    if (cfg.separator) {
      b.add("sc1", "separator", "SC1", px("sup") + 2, row - 1, { rot: 180 as Rotation, props: { filter: true } });
      chain.push({ inP: P("sc1", "in"), outP: P("sc1", "out") });
    }
    for (let i = 0; i < chain.length - 1; i++) b.pipe(chain[i].outP, chain[i + 1].inP, "return", flowR);
    if (chain.length) {
      b.pipe(chain[chain.length - 1].outP, P("iu", "ret"), "return", flowR, { via: [[px("ret"), row]] });
      b.pipe(P("buf", "in_ret"), chain[0].inP, "return", flowR, { via: [[bx + 2, row]] });
    } else {
      b.pipe(P("buf", "in_ret"), P("iu", "ret"), "return", flowR, { via: [[bx + 2, row], [px("ret"), row]] });
    }
    radiatorUp(P("buf", "out_ret"), P("buf", "out_sup"), bx + 3, by, [PC1], true);
  } else if (tp70) {
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
    grid: bldTop ? { w: outRight ? ox + 15 : variant === "tp70" ? 70 : extBuffer ? 82 : 68, h: FLOOR + FLOOR_GAP + 2 } : bld ? { w: 80, h: FLOOR + FLOOR_GAP + 2 } : tp70 ? { w: 58, h: 49 } : { w: n > 1 ? 76 : 66, h: Math.max(38, (top ? 46 : 38) + (n - 1) * 10) },
    components: b.components,
    pipes: b.pipes,
    settings: previous?.settings ?? { style: "flat", demo: true },
  };
  plant.settings = { ...plant.settings, wizard: cfg, layout_edited: false, building: bld || bldTop ? { show: true, floor: FLOOR + FLOOR_GAP, wall: WALL, slab: SLAB, ground: SLAB + 2, outside: outRight ? "right" : "left" } : undefined };

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
  const qs = typeof location !== "undefined" ? new URLSearchParams(location.search) : null;
  if (qs?.get("buffer") === "none") cfg.buffer = "none";
  if (qs?.get("outdoor")) cfg.outdoorModel = qs.get("outdoor")!;
  const plant = generatePlant(cfg);
  // ?style=iso previews the 2.5D style
  if (typeof location !== "undefined" && new URLSearchParams(location.search).get("style") === "iso") plant.settings.style = "iso";
  return plant;
}

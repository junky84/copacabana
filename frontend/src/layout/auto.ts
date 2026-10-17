/**
 * Automatic arrangement for the editor.
 *
 * Builds several candidate layouts – the curated wizard layout (real connection
 * positions) when the plant came from the wizard, plus layered layouts along the
 * water path – scores each one (pipe crossings, pipes through parts, overlapping
 * parts, pipe length) and returns the best.
 */

import { TYPES, sizeOf } from "../catalog";
import { routePipe, type Pt } from "../render/routing";
import { generatePlant } from "../templates";
import type { ComponentType, Plant, PlantComponent } from "../types";

export interface LayoutScore {
  crossings: number;
  overlaps: number;
  through: number;
  length: number;
  total: number;
}

export interface ArrangeResult {
  plant: Plant;
  kind: "template" | "layered";
  score: LayoutScore;
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

// ------------------------------------------------------------------ scoring

interface Seg {
  pipe: string;
  a: Pt;
  b: Pt;
}

function boxOf(c: PlantComponent) {
  const { w, h } = sizeOf(c);
  return { x0: c.x, y0: c.y, x1: c.x + w, y1: c.y + h };
}

export function scoreLayout(plant: Plant): LayoutScore {
  const byId = new Map(plant.components.map((c) => [c.id, c]));
  const segs: Seg[] = [];
  let length = 0;
  for (const p of plant.pipes) {
    const r = routePipe(p, byId);
    if (!r) continue;
    for (let i = 1; i < r.pts.length; i++) {
      segs.push({ pipe: p.id, a: r.pts[i - 1], b: r.pts[i] });
      length += Math.abs(r.pts[i].x - r.pts[i - 1].x) + Math.abs(r.pts[i].y - r.pts[i - 1].y);
    }
  }
  // pipe crossings and pipes running on top of each other
  let crossings = 0;
  let collinear = 0;
  for (let i = 0; i < segs.length; i++) {
    for (let j = i + 1; j < segs.length; j++) {
      const s = segs[i];
      const t = segs[j];
      if (s.pipe === t.pipe) continue;
      const sh = s.a.y === s.b.y;
      const th = t.a.y === t.b.y;
      if (sh !== th) {
        const H = sh ? s : t;
        const V = sh ? t : s;
        const hx0 = Math.min(H.a.x, H.b.x);
        const hx1 = Math.max(H.a.x, H.b.x);
        const vy0 = Math.min(V.a.y, V.b.y);
        const vy1 = Math.max(V.a.y, V.b.y);
        if (V.a.x > hx0 && V.a.x < hx1 && H.a.y > vy0 && H.a.y < vy1) crossings++;
      } else if (sh && s.a.y === t.a.y) {
        const o = Math.min(Math.max(s.a.x, s.b.x), Math.max(t.a.x, t.b.x)) - Math.max(Math.min(s.a.x, s.b.x), Math.min(t.a.x, t.b.x));
        if (o > 0) collinear++;
      } else if (!sh && s.a.x === t.a.x) {
        const o = Math.min(Math.max(s.a.y, s.b.y), Math.max(t.a.y, t.b.y)) - Math.max(Math.min(s.a.y, s.b.y), Math.min(t.a.y, t.b.y));
        if (o > 0) collinear++;
      }
    }
  }
  // pipes through parts (other than the ones they connect)
  let through = 0;
  const pipeEnds = new Map(plant.pipes.map((p) => [p.id, new Set([p.from.c, p.to.c])]));
  const solid = plant.components.filter((c) => !["junction", "label"].includes(c.type));
  for (const s of segs) {
    for (const c of solid) {
      if (pipeEnds.get(s.pipe)?.has(c.id)) continue;
      const b = boxOf(c);
      const x0 = Math.min(s.a.x, s.b.x);
      const x1 = Math.max(s.a.x, s.b.x);
      const y0 = Math.min(s.a.y, s.b.y);
      const y1 = Math.max(s.a.y, s.b.y);
      if (x1 > b.x0 && x0 < b.x1 && y1 > b.y0 && y0 < b.y1) through++;
    }
  }
  // overlapping parts (with a one-cell margin for labels)
  let overlaps = 0;
  for (let i = 0; i < solid.length; i++) {
    for (let j = i + 1; j < solid.length; j++) {
      const a = boxOf(solid[i]);
      const b = boxOf(solid[j]);
      if (a.x1 + 1 > b.x0 && b.x1 + 1 > a.x0 && a.y1 + 1 > b.y0 && b.y1 + 1 > a.y0) overlaps++;
    }
  }
  const total = crossings * 10 + collinear * 15 + through * 12 + overlaps * 40 + length * 0.05;
  return { crossings: crossings + collinear, overlaps, through, length, total };
}

// ------------------------------------------------------------------ candidates

const ROW_ORDER: Partial<Record<ComponentType, number>> = {
  outdoor_unit: 0,
  indoor_unit: 1,
  pump: 2,
  valve_3way: 2,
  mixer: 2,
  separator: 3,
  expansion_vessel: 4,
  buffer: 3,
  dhw_tank: 5,
  radiators: 1,
  floor_heating: 1,
  tap: 6,
  water_inlet: 7,
};

/** Layered layout along the water path, with barycenter ordering inside the columns. */
function layered(plant: Plant, gap: number, sweeps: number, mirrorRows: boolean): Plant {
  const p = clone(plant);
  const comps = p.components.filter((c) => !["label", "value_tile"].includes(c.type));
  const adj = new Map<string, Set<string>>(comps.map((c) => [c.id, new Set()]));
  for (const pipe of p.pipes) {
    adj.get(pipe.from.c)?.add(pipe.to.c);
    adj.get(pipe.to.c)?.add(pipe.from.c);
  }
  // columns: distance from the heat source
  const start =
    comps.find((c) => c.type === "outdoor_unit") || comps.find((c) => c.type === "indoor_unit") || comps[0];
  const layer = new Map<string, number>();
  if (start) {
    layer.set(start.id, 0);
    const queue = [start.id];
    while (queue.length) {
      const id = queue.shift()!;
      for (const n of adj.get(id) || []) {
        if (!layer.has(n)) {
          // junctions and small inline parts do not open a new column of their own
          const c = comps.find((x) => x.id === n)!;
          const inline = c.type === "junction" || (TYPES[c.type].passive && c.type !== "tap");
          layer.set(n, layer.get(id)! + (inline ? 0.5 : 1));
          queue.push(n);
        }
      }
    }
  }
  for (const c of comps) if (!layer.has(c.id)) layer.set(c.id, 0);
  const keys = [...new Set([...layer.values()].map((v) => Math.round(v * 2)))].sort((a, b) => a - b);
  const columns = keys.map((k) => comps.filter((c) => Math.round(layer.get(c.id)! * 2) === k));

  // initial order by type, then barycenter sweeps
  const sign = mirrorRows ? -1 : 1;
  for (const col of columns) col.sort((a, b) => sign * ((ROW_ORDER[a.type] ?? 5) - (ROW_ORDER[b.type] ?? 5)));
  const pos = new Map<string, number>();
  const index = () => columns.forEach((col) => col.forEach((c, i) => pos.set(c.id, i / Math.max(1, col.length - 1))));
  index();
  for (let s = 0; s < sweeps; s++) {
    for (const col of columns) {
      const bary = new Map(
        col.map((c) => {
          const ns = [...(adj.get(c.id) || [])].filter((n) => pos.has(n));
          return [c.id, ns.length ? ns.reduce((sum, n) => sum + pos.get(n)!, 0) / ns.length : pos.get(c.id)!];
        }),
      );
      col.sort((a, b) => bary.get(a.id)! - bary.get(b.id)!);
      index();
    }
  }

  // coordinates
  let x = 1;
  for (const col of columns) {
    const width = Math.max(1, ...col.map((c) => sizeOf(c).w));
    let y = 2;
    for (const c of col) {
      const { w, h } = sizeOf(c);
      c.x = Math.round(x + (width - w) / 2);
      c.y = y;
      y += h + gap + (TYPES[c.type].badges === "below" ? 3 : 0);
    }
    x += width + gap + 2;
  }
  // labels and tiles stay where they were; routes are recomputed automatically
  for (const pipe of p.pipes) {
    delete pipe.via;
    delete pipe.bend;
  }
  p.grid = { w: Math.max(p.grid.w, x + 4), h: Math.max(p.grid.h, ...comps.map((c) => c.y + sizeOf(c).h + 6)) };
  return p;
}

/** The curated wizard layout, applied to the components that still exist. */
function fromTemplate(plant: Plant): Plant | null {
  const wiz = plant.settings?.wizard;
  if (!wiz) return null;
  // the editor may have changed units since the wizard ran: lay out what is there now
  const iu = plant.components.find((c) => c.type === "indoor_unit");
  const has = (type: ComponentType) => plant.components.some((c) => c.type === type);
  const cfg = {
    ...wiz,
    indoorModel: iu?.model || wiz.indoorModel,
    dhw: has("dhw_tank") ? ("tank" as const) : wiz.dhw,
    buffer: has("buffer") ? (wiz.buffer === "none" ? ("parallel" as const) : wiz.buffer) : ("none" as const),
    circulation: has("tap") ? plant.components.some((c) => c.id === "circ") : wiz.circulation,
  };
  const gen = generatePlant(cfg, plant);
  const genById = new Map(gen.components.map((c) => [c.id, c]));
  const p = clone(plant);
  const placed: PlantComponent[] = [];
  const extras: PlantComponent[] = [];
  for (const c of p.components) {
    const g = genById.get(c.id);
    if (g && g.type === c.type) {
      c.x = g.x;
      c.y = g.y;
      if (g.rot !== undefined) c.rot = g.rot;
      else delete c.rot;
      if (g.flip) c.flip = true;
      else delete c.flip;
      placed.push(c);
    } else extras.push(c);
  }
  // template pipes keep their curated routing when they connect the same ports
  const key = (pp: { from: { c: string; p: string }; to: { c: string; p: string } }) => `${pp.from.c}.${pp.from.p}>${pp.to.c}.${pp.to.p}`;
  const genPipes = new Map(gen.pipes.map((pp) => [key(pp), pp]));
  for (const pipe of p.pipes) {
    const g = genPipes.get(key(pipe));
    delete pipe.bend;
    if (g?.via) pipe.via = g.via;
    else delete pipe.via;
  }
  // extra parts: first free spot below/right of the template area
  p.grid = { w: Math.max(p.grid.w, gen.grid.w), h: Math.max(p.grid.h, gen.grid.h) };
  for (const c of extras) {
    const { w, h } = sizeOf(c);
    const free = (x: number, y: number) =>
      [...placed].every((o) => {
        const b = boxOf(o);
        return x + w + 2 <= b.x0 || x >= b.x1 + 2 || y + h + 3 <= b.y0 || y >= b.y1 + 3;
      });
    let done = false;
    for (let y = 2; y + h < p.grid.h + 20 && !done; y += 2) {
      for (let x = 1; x + w < p.grid.w + 20 && !done; x += 2) {
        if (free(x, y)) {
          c.x = x;
          c.y = y;
          done = true;
        }
      }
    }
    placed.push(c);
  }
  return p;
}

/**
 * Local improvement: swap parts that share a column and nudge parts up/down or
 * left/right, keeping every change that lowers the score (deterministic).
 */
function refine(plant: Plant, rounds = 400): Plant {
  let best = clone(plant);
  let bestScore = scoreLayout(best).total;
  let seed = 12345;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  const movable = best.components.filter((c) => !["label", "value_tile"].includes(c.type)).map((c) => c.id);
  for (let i = 0; i < rounds; i++) {
    const cand = clone(best);
    const byId = new Map(cand.components.map((c) => [c.id, c]));
    const a = byId.get(movable[Math.floor(rnd() * movable.length)])!;
    const r = rnd();
    if (r < 0.35) {
      // swap with a part of similar column
      const others = cand.components.filter((c) => c.id !== a.id && Math.abs(c.x - a.x) <= 3 && movable.includes(c.id));
      if (!others.length) continue;
      const b = others[Math.floor(rnd() * others.length)];
      [a.y, b.y] = [b.y, a.y];
    } else {
      const d = [-4, -2, 2, 4][Math.floor(rnd() * 4)];
      if (r < 0.7) a.y = Math.max(1, a.y + d);
      else a.x = Math.max(1, a.x + d);
    }
    const sc = scoreLayout(cand).total;
    if (sc < bestScore) {
      best = cand;
      bestScore = sc;
    }
  }
  return best;
}

export function autoArrange(plant: Plant): ArrangeResult {
  // the curated wizard layout follows the real connection positions; generic layered
  // layouts only serve plants without one (they look technical rather than tidy)
  const tpl = fromTemplate(plant);
  const candidates: { plant: Plant; kind: ArrangeResult["kind"] }[] = [];
  if (tpl) candidates.push({ plant: tpl, kind: "template" });
  else {
    for (const gap of [3, 5]) {
      for (const sweeps of [0, 3]) {
        for (const mirror of [false, true]) candidates.push({ plant: layered(plant, gap, sweeps, mirror), kind: "layered" });
      }
    }
  }
  let best: ArrangeResult | null = null;
  for (const c of candidates) {
    const score = scoreLayout(c.plant);
    if (!best || score.total < best.score.total) best = { plant: c.plant, kind: c.kind, score };
  }
  if (best!.kind === "layered" || best!.score.crossings > 2) {
    const refined = refine(best!.plant);
    const score = scoreLayout(refined);
    if (score.total < best!.score.total) best = { plant: refined, kind: best!.kind, score };
  }
  return best!;
}

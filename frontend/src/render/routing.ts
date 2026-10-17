import { CELL, portPos } from "../catalog";
import type { Dir, Pipe, PlantComponent } from "../types";

export interface Pt {
  x: number;
  y: number;
}

const STUB = 1; // cells straight out of a port before turning

const VEC: Record<Dir, Pt> = { l: { x: -1, y: 0 }, r: { x: 1, y: 0 }, t: { x: 0, y: -1 }, b: { x: 0, y: 1 } };

function horizontal(d: Dir): boolean {
  return d === "l" || d === "r";
}

/**
 * Orthogonal route in cell coordinates. The middle segment sits at `pipe.bend`
 * (x for routes leaving horizontally, y for vertical ones) or halfway.
 */
export function routePipe(pipe: Pipe, byId: Map<string, PlantComponent>): { pts: Pt[]; horizontalStart: boolean } | null {
  const a = byId.get(pipe.from.c);
  const b = byId.get(pipe.to.c);
  if (!a || !b) return null;
  const pa = portPos(a, pipe.from.p);
  const pb = portPos(b, pipe.to.p);
  if (!pa || !pb) return null;
  const stubA = a.type === "junction" ? 0 : STUB;
  const stubB = b.type === "junction" ? 0 : STUB;
  const s = { x: pa.x, y: pa.y };
  const e = { x: pb.x, y: pb.y };
  const s1 = { x: s.x + VEC[pa.dir].x * stubA, y: s.y + VEC[pa.dir].y * stubA };
  const e1 = { x: e.x + VEC[pb.dir].x * stubB, y: e.y + VEC[pb.dir].y * stubB };
  const hStart = horizontal(pa.dir);
  const pts: Pt[] = [s, s1];

  if (pipe.via?.length) {
    // explicit waypoints: connect orthogonally, continuing in the current direction first
    let prevVertical = !hStart;
    for (const [x, y] of [...pipe.via, [e1.x, e1.y] as [number, number]]) {
      const last = pts[pts.length - 1];
      if (last.x !== x && last.y !== y) {
        const corner = prevVertical ? { x: last.x, y } : { x, y: last.y };
        pts.push(corner);
      }
      const prev = pts[pts.length - 1];
      prevVertical = prev.x === x;
      pts.push({ x, y });
    }
    pts.push(e);
    return { pts: simplify(pts), horizontalStart: hStart };
  }

  if (hStart) {
    if (s1.y === e1.y && pipe.bend === undefined) {
      pts.push(e1);
    } else {
      const mx = pipe.bend ?? (s1.x + e1.x) / 2;
      if (horizontal(pb.dir)) {
        pts.push({ x: mx, y: s1.y }, { x: mx, y: e1.y });
      } else {
        // horizontal start, vertical end: one corner, or Z through bend
        if (pipe.bend === undefined) pts.push({ x: e1.x, y: s1.y });
        else pts.push({ x: mx, y: s1.y }, { x: mx, y: e1.y });
      }
      pts.push(e1);
    }
  } else {
    if (s1.x === e1.x && pipe.bend === undefined) {
      pts.push(e1);
    } else {
      const my = pipe.bend ?? (s1.y + e1.y) / 2;
      if (!horizontal(pb.dir)) {
        pts.push({ x: s1.x, y: my }, { x: e1.x, y: my });
      } else if (pipe.bend === undefined) {
        pts.push({ x: s1.x, y: e1.y });
      } else {
        pts.push({ x: s1.x, y: my }, { x: e1.x, y: my });
      }
      pts.push(e1);
    }
  }
  pts.push(e);
  return { pts: simplify(pts), horizontalStart: hStart };
}

/** Remove duplicate and collinear points. */
function simplify(pts: Pt[]): Pt[] {
  const out: Pt[] = [];
  for (const p of pts) {
    const last = out[out.length - 1];
    if (last && last.x === p.x && last.y === p.y) continue;
    if (out.length >= 2) {
      const prev = out[out.length - 2];
      if ((prev.x === last.x && last.x === p.x) || (prev.y === last.y && last.y === p.y)) {
        out[out.length - 1] = p;
        continue;
      }
    }
    out.push(p);
  }
  return out;
}

/** SVG path (pixels) with rounded corners. */
export function pathD(pts: Pt[], radius = 8): string {
  if (pts.length === 0) return "";
  const P = pts.map((p) => ({ x: p.x * CELL, y: p.y * CELL }));
  let d = `M ${P[0].x} ${P[0].y}`;
  for (let i = 1; i < P.length - 1; i++) {
    const prev = P[i - 1];
    const cur = P[i];
    const next = P[i + 1];
    const d1 = Math.hypot(cur.x - prev.x, cur.y - prev.y);
    const d2 = Math.hypot(next.x - cur.x, next.y - cur.y);
    const r = Math.min(radius, d1 / 2, d2 / 2);
    const ax = cur.x - ((cur.x - prev.x) / d1) * r;
    const ay = cur.y - ((cur.y - prev.y) / d1) * r;
    const bx = cur.x + ((next.x - cur.x) / d2) * r;
    const by = cur.y + ((next.y - cur.y) / d2) * r;
    d += ` L ${ax} ${ay} Q ${cur.x} ${cur.y} ${bx} ${by}`;
  }
  const last = P[P.length - 1];
  return `${d} L ${last.x} ${last.y}`;
}

/** Midpoint of the longest segment (cells) – used for labels and the bend handle. */
export function longestSegmentMid(pts: Pt[]): Pt & { horizontal: boolean } {
  let best = { x: pts[0]?.x ?? 0, y: pts[0]?.y ?? 0, horizontal: true };
  let len = -1;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.abs(pts[i].x - pts[i - 1].x) + Math.abs(pts[i].y - pts[i - 1].y);
    if (l > len) {
      len = l;
      best = { x: (pts[i].x + pts[i - 1].x) / 2, y: (pts[i].y + pts[i - 1].y) / 2, horizontal: pts[i].y === pts[i - 1].y };
    }
  }
  return best;
}

/** The middle (bendable) segment: perpendicular to the start direction. */
export function bendHandle(pts: Pt[], horizontalStart: boolean): Pt | null {
  for (let i = 2; i < pts.length - 1; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const vertical = a.x === b.x;
    if (horizontalStart ? vertical : !vertical) return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }
  return null;
}

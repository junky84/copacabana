/**
 * Time machine: a value source that answers with the recorded state at a chosen
 * moment. Live: one batched recorder query for all bound entities; demo: the
 * simulator's own history (last 24 h).
 */

import { slotsOf } from "../catalog";
import type { Hass, HistoryPoint, Plant, PlantComponent, SlotValue } from "../types";
import { HassSource, parseState, type ValueSource } from "./values";

interface Series {
  pts: HistoryPoint[];
  unit?: string;
}

/** Last point at or before t (points sorted by time). */
function at(pts: HistoryPoint[], t: number): HistoryPoint | undefined {
  let lo = 0;
  let hi = pts.length - 1;
  if (hi < 0 || pts[0].t > t) return undefined;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (pts[mid].t <= t) lo = mid;
    else hi = mid - 1;
  }
  return pts[lo];
}

function toValue(p: HistoryPoint | undefined, unit?: string, entity?: string): SlotValue | undefined {
  if (!p) return undefined;
  if (p.raw !== undefined && (p.v === null || !Number.isFinite(p.v))) return parseState(p.raw, unit, entity);
  if (p.v === null) return { raw: null, num: null, unit, entity, available: false };
  return { raw: p.raw ?? p.v, num: p.v, unit, entity, available: true };
}

export class ReplaySource implements ValueSource {
  /** current replay time (epoch seconds) */
  t: number;
  readonly from: number;
  readonly to: number;
  private byEntity = new Map<string, Series>();
  private bySlot = new Map<string, Series>();

  private constructor(
    private live: ValueSource,
    from: number,
    to: number,
  ) {
    this.from = from;
    this.to = to;
    this.t = to;
  }

  /** Load the recorded values of the last `hours` hours. */
  static async load(plant: Plant, live: ValueSource, hours: number, hass?: Hass, extraEntities: string[] = []): Promise<ReplaySource> {
    const to = Date.now() / 1000;
    const r = new ReplaySource(live, to - hours * 3600, to);
    if (live instanceof HassSource && hass) {
      const ids = new Set<string>(extraEntities);
      for (const c of plant.components) Object.values(c.bindings || {}).forEach((id) => id && ids.add(id));
      for (const p of plant.pipes) if (p.bindings?.temp) ids.add(p.bindings.temp);
      if (ids.size) {
        const res = await hass.callWS<Record<string, { s: string; lu: number }[]>>({
          type: "history/history_during_period",
          start_time: new Date(r.from * 1000).toISOString(),
          end_time: new Date(to * 1000).toISOString(),
          entity_ids: [...ids],
          minimal_response: true,
          no_attributes: true,
          significant_changes_only: false,
        });
        for (const [id, rows] of Object.entries(res)) {
          const unit = hass.states[id]?.attributes?.unit_of_measurement;
          r.byEntity.set(id, { unit, pts: rows.map((row) => ({ t: row.lu, v: Number.isFinite(Number(row.s)) ? Number(row.s) : null, raw: String(row.s) })) });
        }
      }
      return r;
    }
    // demo: the simulator keeps per-slot history
    await Promise.all(
      plant.components.flatMap((c) =>
        slotsOf(c).map(async (s) => {
          const now = live.get(c, s.key);
          if (now === undefined) return;
          const pts = await live.history(c, s.key, hours);
          if (pts.length) r.bySlot.set(`${c.id}.${s.key}`, { pts, unit: now.unit });
        }),
      ),
    );
    return r;
  }

  /** Earliest recorded time (to limit the slider). */
  get start(): number {
    let min = this.to;
    for (const m of [this.byEntity, this.bySlot]) for (const s of m.values()) if (s.pts.length) min = Math.min(min, s.pts[0].t);
    return Math.max(this.from, min);
  }

  get empty(): boolean {
    return this.byEntity.size === 0 && this.bySlot.size === 0;
  }

  entityOf(c: PlantComponent, slot: string): string | undefined {
    return this.live.entityOf(c, slot);
  }

  get(c: PlantComponent, slot: string): SlotValue | undefined {
    const entity = this.live.entityOf(c, slot);
    if (entity) return this.getEntity(entity);
    const s = this.bySlot.get(`${c.id}.${slot}`);
    return s ? toValue(at(s.pts, this.t), s.unit) : undefined;
  }

  getEntity(entityId: string): SlotValue | undefined {
    const s = this.byEntity.get(entityId);
    return s ? toValue(at(s.pts, this.t), s.unit, entityId) : undefined;
  }

  history(c: PlantComponent, slot: string, hours: number): Promise<HistoryPoint[]> {
    return this.live.history(c, slot, hours);
  }
}

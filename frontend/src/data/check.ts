/**
 * Plant check: evaluates the last hours of operation against rules of thumb
 * for heat pump systems (mixing loss at the buffer, cycling, spread, defrosts,
 * backup heater, system pressure).
 */

import type { HistoryPoint, Plant, PlantComponent } from "../types";
import { normalizeActivity, type ValueSource } from "./values";
import type { Ampel } from "./efficiency";
import { fmtNum } from "../i18n";

export interface CheckResult {
  id: string;
  ampel: Ampel | "none";
  /** headline value */
  value?: string;
  /** translation key + params for the explanation */
  detail: string;
  params: Record<string, any>;
  /** translation key of the advice shown when not green */
  hint?: string;
}

const STEP = 60; // resampling grid in seconds

/** Step-hold resampling of an irregular series onto a fixed grid. */
function grid<T>(points: HistoryPoint[], t0: number, n: number, pick: (p: HistoryPoint) => T | null): (T | null)[] {
  const out: (T | null)[] = new Array(n).fill(null);
  const pts = [...points].sort((a, b) => a.t - b.t);
  let j = 0;
  let cur: T | null = null;
  for (let i = 0; i < n; i++) {
    const t = t0 + i * STEP;
    while (j < pts.length && pts[j].t <= t) cur = pick(pts[j++]);
    out[i] = cur;
  }
  return out;
}

const num = (p: HistoryPoint) => (p.v === null || Number.isNaN(p.v) ? null : p.v);

/** Contiguous true periods: [startIndex, endIndex) */
function periods(mask: boolean[]): [number, number][] {
  const out: [number, number][] = [];
  let start = -1;
  mask.forEach((m, i) => {
    if (m && start < 0) start = i;
    if (!m && start >= 0) {
      out.push([start, i]);
      start = -1;
    }
  });
  if (start >= 0) out.push([start, mask.length]);
  return out;
}

function mean(values: (number | null)[]): number | undefined {
  const v = values.filter((x): x is number => x !== null);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : undefined;
}

const first = (plant: Plant, ...types: string[]) => plant.components.find((c) => types.includes(c.type));

async function hist(src: ValueSource, c: PlantComponent | undefined, slot: string, hours: number): Promise<HistoryPoint[]> {
  if (!c || src.get(c, slot) === undefined) return [];
  try {
    return await src.history(c, slot, hours);
  } catch {
    return [];
  }
}

export async function runChecks(plant: Plant, src: ValueSource, hours = 24, now = Date.now() / 1000): Promise<CheckResult[]> {
  const ou = first(plant, "outdoor_unit");
  const iu = first(plant, "indoor_unit");
  const buf = first(plant, "buffer");
  const n = Math.floor((hours * 3600) / STEP);
  const t0 = now - n * STEP;

  const [compOn, compSpeed, heat, activity, sup, ret, bufTop, iuBuf, aux, vw1, pressure] = await Promise.all([
    hist(src, ou, "compressor_on", hours),
    hist(src, ou, "compressor_speed", hours),
    hist(src, ou, "heat_power", hours),
    hist(src, ou, "activity", hours),
    hist(src, iu, "supply_temp", hours),
    hist(src, iu, "return_temp", hours),
    hist(src, buf, "temp_top", hours),
    hist(src, iu, "buffer_temp", hours),
    hist(src, iu, "aux_level", hours),
    hist(src, iu, "vw1_position", hours),
    hist(src, iu, "pressure", hours),
  ]);

  // operating state per minute
  const onSrc = compOn.length ? compOn : compSpeed.length ? compSpeed : heat;
  const running = grid(onSrc, t0, n, num).map((v) => v !== null && v > (onSrc === heat ? 0.2 : 0));
  const act = grid(activity, t0, n, (p) => normalizeActivity({ raw: p.raw ?? null, num: null, available: p.raw !== undefined }) ?? null);
  const defrost = act.map((a) => a === "defrost");
  const dhw = grid(vw1, t0, n, num).map((v, i) => (v !== null ? v > 0 : act[i] === "hot_water"));
  const heating = running.map((r, i) => r && !defrost[i] && !dhw[i]);
  // ignore the first minutes after a start: temperatures still settle
  const steady = heating.map((h, i) => h && heating.slice(Math.max(0, i - 5), i).every(Boolean) && i >= 5);
  const hasData = onSrc.length > 0;

  const results: CheckResult[] = [];

  // ------------------------------------------------ mixing loss at the buffer
  const bufferSeries = bufTop.length ? bufTop : iuBuf;
  if (buf || iuBuf.length) {
    const s = grid(sup, t0, n, num);
    const b = grid(bufferSeries, t0, n, num);
    const diffs = s.map((v, i) => (steady[i] && v !== null && b[i] !== null ? v - (b[i] as number) : null));
    const loss = mean(diffs);
    results.push(
      loss === undefined
        ? { id: "mixing", ampel: "none", detail: "chk.nodata", params: {} }
        : {
            id: "mixing",
            ampel: loss <= 2 ? "green" : loss <= 4 ? "yellow" : "red",
            value: `${fmtNum(loss, 1)} K`,
            detail: "chk.mixing.detail",
            params: { value: loss, minutes: diffs.filter((d) => d !== null).length },
            hint: "chk.mixing.hint",
          },
    );
  }

  // ------------------------------------------------ cycling
  if (hasData) {
    const runs = periods(running);
    // runs touching the window start are incomplete
    const complete = runs.filter(([a]) => a > 0);
    const starts = complete.length;
    const avgRun = complete.length ? complete.reduce((s, [a, b]) => s + (b - a), 0) / complete.length : undefined;
    let maxPerHour = 0;
    for (let i = 0; i + 60 <= n; i += 10) maxPerHour = Math.max(maxPerHour, complete.filter(([a]) => a >= i && a < i + 60).length);
    const perHour = starts / hours;
    const ampel: Ampel = perHour <= 1 && maxPerHour <= 3 && (avgRun ?? 99) >= 20 ? "green" : maxPerHour > 4 || (avgRun ?? 99) < 10 ? "red" : "yellow";
    results.push({
      id: "cycling",
      ampel: starts === 0 ? "green" : ampel,
      value: `${starts}×`,
      detail: "chk.cycling.detail",
      params: { starts, perHour, maxPerHour, avgRun: avgRun ?? 0, hours },
      hint: "chk.cycling.hint",
    });
  } else {
    results.push({ id: "cycling", ampel: "none", detail: "chk.nodata", params: {} });
  }

  // ------------------------------------------------ spread supply / return
  {
    const s = grid(sup, t0, n, num);
    const r = grid(ret, t0, n, num);
    const spreads = s.map((v, i) => (steady[i] && v !== null && r[i] !== null ? v - (r[i] as number) : null));
    const spread = mean(spreads);
    results.push(
      spread === undefined
        ? { id: "spread", ampel: "none", detail: "chk.nodata", params: {} }
        : {
            id: "spread",
            ampel: spread >= 3 && spread <= 8 ? "green" : spread >= 2 && spread <= 10 ? "yellow" : "red",
            value: `${fmtNum(spread, 1)} K`,
            detail: "chk.spread.detail",
            params: { value: spread },
            hint: spread < 3 ? "chk.spread.hint_low" : "chk.spread.hint_high",
          },
    );
  }

  // ------------------------------------------------ defrosts
  if (activity.length) {
    const d = periods(defrost);
    const defrostMin = d.reduce((s, [a, b]) => s + (b - a), 0);
    const runMin = running.filter(Boolean).length || 1;
    const share = defrostMin / runMin;
    results.push({
      id: "defrost",
      ampel: share <= 0.08 ? "green" : share <= 0.15 ? "yellow" : "red",
      value: `${d.length}×`,
      detail: "chk.defrost.detail",
      params: { count: d.length, minutes: defrostMin, share: share * 100 },
      hint: "chk.defrost.hint",
    });
  }

  // ------------------------------------------------ backup heater
  if (aux.length) {
    const on = grid(aux, t0, n, num).map((v) => v !== null && v > 0);
    const minutes = on.filter(Boolean).length;
    results.push({
      id: "aux",
      ampel: minutes === 0 ? "green" : minutes <= 60 ? "yellow" : "red",
      value: minutes ? `${Math.round(minutes)} min` : "0",
      detail: "chk.aux.detail",
      params: { minutes },
      hint: "chk.aux.hint",
    });
  }

  // ------------------------------------------------ system pressure
  if (pressure.length && iu) {
    const vals = pressure.map(num).filter((v): v is number => v !== null);
    const lo = Number(iu.props.pressure_min ?? 1);
    const hi = Number(iu.props.pressure_max ?? 2.7);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const drop = vals.length ? vals[0] - vals[vals.length - 1] : 0;
    results.push({
      id: "pressure",
      ampel: min < lo || max > hi ? "red" : min < lo + 0.2 || drop > 0.2 ? "yellow" : "green",
      value: `${fmtNum(min, 1)}–${fmtNum(max, 1)} bar`,
      detail: "chk.pressure.detail",
      params: { min, max, lo, hi },
      hint: "chk.pressure.hint",
    });
  }

  return results;
}

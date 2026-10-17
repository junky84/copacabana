import { LitElement, css, html, nothing } from "lit";
import { fmtNum, t } from "../i18n";
import { icon, ui } from "../styles";
import type { Hass, Plant, PlantComponent } from "../types";
import type { ValueSource } from "../data/values";
import type { Simulator } from "../sim/simulator";
import { defaultCurve, flowTarget, suggestOffset, type CurveParams } from "../data/curve";
// ECharts is loaded on demand (separate chunk)
import type { ChartOption, ChartTheme } from "./echart";

interface Pt {
  tOut: number;
  flow: number;
  room?: number;
  age: number; // 0 = newest, 1 = oldest
}

/** Curve parameter ↔ heating circuit slot. */
const PARAMS: { key: keyof CurveParams; slot: string; min: number; max: number; step: number }[] = [
  { key: "design", slot: "design_temp", min: 28, max: 65, step: 1 },
  { key: "offset", slot: "offset_temp", min: -10, max: 10, step: 0.5 },
  { key: "limit", slot: "heating_limit", min: 10, max: 22, step: 0.5 },
  { key: "minFlow", slot: "min_flow_temp", min: 15, max: 40, step: 1 },
  { key: "maxFlow", slot: "max_flow_temp", min: 30, max: 75, step: 1 },
  { key: "minExt", slot: "min_ext_temp", min: -25, max: 0, step: 1 },
  { key: "roomSet", slot: "room_setpoint", min: 15, max: 25, step: 0.5 },
];

const DAYS = 14;
// chart range
const X0 = -20;
const X1 = 22;
const Y0 = 20;
const Y1 = 70;

let echartLoad: Promise<unknown> | null = null;

export class CpCurve extends LitElement {
  static properties = {
    plant: { attribute: false },
    src: { attribute: false },
    hass: { attribute: false },
    sim: { attribute: false },
    version: { type: Number },
    admin: { type: Boolean },
    _edit: { state: true },
    _points: { state: true },
    _hc: { state: true },
    _msg: { state: true },
    _confirm: { state: true },
  };
  plant!: Plant;
  src!: ValueSource;
  hass?: Hass;
  sim: Simulator | null = null;
  version = 0;
  admin = false;
  private _edit: Partial<CurveParams> = {};
  private _points: Pt[] | null = null;
  private _hc = "";
  private _msg = "";
  private _confirm = false;
  private _loadedFor: unknown = null;

  private get _circuits(): PlantComponent[] {
    return this.plant.components.filter((c) => c.type === "radiators" || c.type === "floor_heating");
  }

  private get _circuit(): PlantComponent | undefined {
    return this._circuits.find((c) => c.id === this._hc) || this._circuits[0];
  }

  /** Current parameters from the plant (or the simulator in demo mode). */
  private _current(): CurveParams {
    const hc = this._circuit;
    if (this.sim) return { ...this.sim.curve };
    const p = defaultCurve(hc?.type === "floor_heating");
    if (!hc) return p;
    for (const d of PARAMS) {
      const v = this.src.get(hc, d.slot);
      if (v?.available && v.num !== null) (p as any)[d.key] = v.num;
    }
    return p;
  }

  private _writable(key: keyof CurveParams): boolean {
    if (this.sim) return true;
    const hc = this._circuit;
    const d = PARAMS.find((x) => x.key === key)!;
    const entity = hc?.bindings[d.slot];
    return !!entity && /^(number|input_number)\./.test(entity) && this.admin;
  }

  protected willUpdate(): void {
    const key = `${this.sim ? "sim" : "ha"}:${this._circuit?.id}`;
    if (key !== this._loadedFor) {
      this._loadedFor = key;
      this._load();
    }
  }

  // ------------------------------------------------------------ history

  private async _load(): Promise<void> {
    this._points = null;
    const hc = this._circuit;
    const ou = this.plant.components.find((c) => c.type === "outdoor_unit");
    const iu = this.plant.components.find((c) => c.type === "indoor_unit");
    if (!hc || !ou) {
      this._points = [];
      return;
    }
    try {
      this._points = this.sim ? this._simPoints() : await this._hassPoints(hc, ou, iu);
    } catch {
      this._points = [];
    }
  }

  /** Demo: last 24 h from the simulation plus earlier days from the climate model. */
  private _simPoints(): Pt[] {
    const sim = this.sim!;
    const out: Pt[] = [];
    const tOut = sim.history("outdoor", "outdoor_temp", 24);
    const flow = sim.history("hc", "flow_temp", 24);
    const room = sim.history("hc", "room_temp", 24);
    for (let h = 0; h < 24; h++) {
      const from = sim.time - (24 - h) * 3600;
      const inHour = (arr: { t: number; v: number | null }[]) => arr.filter((p) => p.t >= from && p.t < from + 3600 && p.v !== null).map((p) => p.v as number);
      const a = inHour(tOut);
      const f = inHour(flow);
      const r = inHour(room);
      if (!a.length || !f.length) continue;
      const avg = (x: number[]) => x.reduce((s, v) => s + v, 0) / x.length;
      if (avg(a) >= sim.curve.limit) continue;
      out.push({ tOut: avg(a), flow: avg(f), room: r.length ? avg(r) : undefined, age: 0 });
    }
    // earlier days: what the plant would have done around the configured outdoor temperature
    for (let d = 1; d < DAYS; d++) {
      for (let h = 0; h < 24; h += 2) {
        const tt = sim.outdoorMean + 2.5 * Math.cos(((h - 15) / 24) * 2 * Math.PI) + Math.sin(d * 1.7 + h) * 3;
        const target = flowTarget(sim.curve, tt);
        if (target === null) continue;
        out.push({ tOut: tt, flow: target + Math.sin(d * 3.1 + h * 0.7) * 1.4 - 0.6, room: sim.curve.roomSet + Math.sin(d + h) * 0.3, age: d / DAYS });
      }
    }
    return out;
  }

  /** Hourly means from the recorder's long-term statistics. */
  private async _hassPoints(hc: PlantComponent, ou: PlantComponent, iu?: PlantComponent): Promise<Pt[]> {
    const ids = {
      out: ou.bindings.outdoor_temp,
      flow: hc.bindings.flow_temp || iu?.bindings.supply_temp,
      room: hc.bindings.room_temp,
      heat: ou.bindings.heat_power,
    };
    if (!ids.out || !ids.flow || !this.hass) return [];
    const now = new Date();
    const start = new Date(now.getTime() - DAYS * 86400_000);
    const res = await this.hass.callWS<Record<string, { start: number; mean?: number | null }[]>>({
      type: "recorder/statistics_during_period",
      start_time: start.toISOString(),
      end_time: now.toISOString(),
      statistic_ids: Object.values(ids).filter(Boolean),
      period: "hour",
      types: ["mean"],
    });
    const byStart = (id?: string) => new Map((id ? res[id] || [] : []).map((r) => [r.start, r.mean]));
    const out = byStart(ids.out);
    const flow = byStart(ids.flow);
    const room = byStart(ids.room);
    const heat = byStart(ids.heat);
    const limit = this._current().limit;
    const pts: Pt[] = [];
    for (const [ts, tOut] of out) {
      const f = flow.get(ts);
      if (tOut == null || f == null || tOut >= limit) continue;
      // with a heat output statistic, only hours in which the heat pump actually heated
      const q = heat.get(ts);
      if (heat.size && (q == null || q < 0.3)) continue;
      pts.push({ tOut, flow: f, room: room.get(ts) ?? undefined, age: (now.getTime() - ts) / (DAYS * 86400_000) });
    }
    return pts;
  }

  // ------------------------------------------------------------ actions

  private _set(key: keyof CurveParams, value: number) {
    this._edit = { ...this._edit, [key]: value };
    this._msg = "";
  }

  private async _apply() {
    this._confirm = false;
    const changes = Object.entries(this._edit) as [keyof CurveParams, number][];
    if (this.sim) {
      this.sim.curve = { ...this.sim.curve, ...this._edit };
    } else {
      const hc = this._circuit!;
      for (const [key, value] of changes) {
        const d = PARAMS.find((x) => x.key === key)!;
        const entity = hc.bindings[d.slot];
        if (!entity) continue;
        await this.hass!.callWS({
          type: "call_service",
          domain: entity.split(".")[0],
          service: "set_value",
          service_data: { entity_id: entity, value },
        });
      }
    }
    this._edit = {};
    this._msg = t("cv.applied");
  }

  // ------------------------------------------------------------ render

  private _chart(cur: CurveParams, next: CurveParams | null, pts: Pt[]) {
    const line = (p: CurveParams) => {
      const out: [number, number][] = [];
      for (let x = X0; x <= Math.min(X1, p.limit); x += 0.5) {
        const y = flowTarget(p, x);
        if (y === null) break;
        out.push([x, Math.round(y * 10) / 10]);
      }
      return out;
    };
    const hc = this._circuit;
    const ou = this.plant.components.find((c) => c.type === "outdoor_unit");
    const iu = this.plant.components.find((c) => c.type === "indoor_unit");
    const liveOut = ou ? this.src.get(ou, "outdoor_temp") : undefined;
    const liveFlow = (hc && this.src.get(hc, "flow_temp")) || (iu && this.src.get(iu, "supply_temp"));
    const lo = liveOut?.available ? liveOut.num : null;
    const lf = liveFlow?.available ? liveFlow.num : null;
    const target = lo !== null ? flowTarget(cur, lo) : null;
    const curLine = line(cur);
    const nextLine = next ? line(next) : [];
    const deg = (v: number) => `${fmtNum(v, Number.isInteger(v) ? 0 : 1)} °C`;
    const option = (th: ChartTheme): ChartOption => ({
      animation: false,
      textStyle: { fontFamily: "inherit" },
      grid: { left: 8, right: 16, top: 30, bottom: 8, containLabel: true },
      tooltip: {
        trigger: "item",
        backgroundColor: th.surface,
        borderColor: th.border,
        textStyle: { color: th.text, fontSize: 12 },
        formatter: (it: any) => {
          const [x, y] = it.value as [number, number];
          return `<b>${it.seriesName}</b><br>${t("cv.tip", { out: deg(x), flow: deg(y) })}`;
        },
      },
      xAxis: {
        type: "value",
        min: X0,
        max: X1,
        interval: 10,
        axisLabel: { color: th.muted, formatter: (v: number) => `${v} °C` },
        axisLine: { lineStyle: { color: th.border } },
        splitLine: { lineStyle: { color: th.border, type: "dashed" } },
      },
      yAxis: {
        type: "value",
        min: Y0,
        max: Y1,
        interval: 10,
        name: t("cv.axis_flow"),
        nameTextStyle: { color: th.muted, align: "left" },
        axisLine: { show: false, onZero: false },
        axisLabel: { color: th.muted },
        splitLine: { lineStyle: { color: th.border, type: "dashed" } },
      },
      series: [
        {
          name: t("cv.points", { days: DAYS }),
          type: "scatter",
          symbolSize: 6,
          z: 1,
          data: pts.map((p) => ({ value: [p.tOut, Math.round(p.flow * 10) / 10], itemStyle: { color: "#f5c542", opacity: 0.85 - p.age * 0.6 } })),
          markArea: {
            silent: true,
            itemStyle: { color: "rgba(77,159,255,0.08)" },
            label: { color: th.muted, position: "insideTop" },
            data: [[{ name: t("cv.no_heating"), xAxis: cur.limit }, { xAxis: X1 }]],
          },
        },
        {
          name: t("cv.curve"),
          type: "line",
          showSymbol: false,
          z: 3,
          data: curLine,
          lineStyle: { color: "#3ddc97", width: 3 },
          itemStyle: { color: "#3ddc97" },
        },
        {
          name: t("cv.preview"),
          type: "line",
          showSymbol: false,
          z: 4,
          data: nextLine,
          lineStyle: { color: "#4d9fff", width: 2.5, type: "dashed" },
          itemStyle: { color: "#4d9fff" },
        },
        {
          name: t("cv.target"),
          type: "scatter",
          z: 5,
          symbolSize: 13,
          data: lo !== null && target !== null ? [[lo, Math.round(target * 10) / 10]] : [],
          itemStyle: { color: "transparent", borderColor: "#3ddc97", borderWidth: 2 },
        },
        {
          name: t("cv.now"),
          type: "scatter",
          z: 6,
          symbolSize: 11,
          data: lo !== null && lf !== null ? [[lo, lf]] : [],
          itemStyle: { color: "#ff7a45", shadowBlur: 10, shadowColor: "#ff7a45" },
        },
      ],
    });
    return html`<cp-echart class="curve-chart" .option=${option}></cp-echart>`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    echartLoad ??= import("./echart");
  }

  render() {
    const cur = this._current();
    const edited = Object.keys(this._edit).length > 0;
    const next = edited ? { ...cur, ...this._edit } : null;
    const view = next || cur;
    const pts = this._points || [];
    const rooms = pts.filter((p) => p.age < 0.5 && p.room !== undefined).map((p) => p.room!);
    const roomMean = rooms.length ? rooms.reduce((a, b) => a + b, 0) / rooms.length : undefined;
    const dev = pts.length ? pts.reduce((s, p) => s + (p.flow - (flowTarget(cur, p.tOut) ?? p.flow)), 0) / pts.length : undefined;
    const suggestion = roomMean !== undefined ? suggestOffset(cur, roomMean) : 0;
    const circuits = this._circuits;
    return html`
      <div class="grid">
        <div class="card chart-card">
          <div class="row head">
            <h2>${t("cv.title")}</h2>
            ${circuits.length > 1
              ? html`<select @change=${(e: Event) => (this._hc = (e.target as HTMLSelectElement).value)}>
                  ${circuits.map((c) => html`<option value=${c.id} ?selected=${c.id === this._circuit?.id}>${c.label}</option>`)}
                </select>`
              : html`<span class="muted">${this._circuit?.label || ""}</span>`}
            <span class="spacer"></span>
            <span class="lg"><i class="l-curve"></i>${t("cv.curve")}</span>
            ${next ? html`<span class="lg"><i class="l-next"></i>${t("cv.preview")}</span>` : nothing}
            <span class="lg"><i class="l-pt"></i>${t("cv.points", { days: DAYS })}</span>
            <span class="lg"><i class="l-live"></i>${t("cv.now")}</span>
          </div>
          ${this._chart(cur, next, pts)}
          ${this.sim ? html`<p class="muted small">${t("cv.demo_note")}</p>` : nothing}
          ${!this.sim && this._points && !pts.length ? html`<p class="muted small">${t("cv.no_points")}</p>` : nothing}
        </div>
        <div class="side">
          <div class="card">
            <div class="cap">${t("cv.params")}</div>
            ${PARAMS.map((d) => {
              const v = (view as any)[d.key] as number;
              const changed = d.key in this._edit;
              const can = this._writable(d.key);
              return html`<label class="param ${changed ? "changed" : ""}">
                <span class="pname">${t(`cv.p.${d.key}`)}</span>
                <b>${fmtNum(v, d.step < 1 ? 1 : 0)} ${d.key === "offset" ? "K" : "°C"}</b>
                <input type="range" min=${d.min} max=${d.max} step=${d.step} .value=${String(v)} ?disabled=${!can}
                  @input=${(e: Event) => this._set(d.key, Number((e.target as HTMLInputElement).value))} />
              </label>`;
            })}
            ${!this.sim && !PARAMS.some((d) => this._writable(d.key)) ? html`<p class="muted small">${t("cv.readonly")}</p>` : nothing}
            <div class="row actions">
              <button ?disabled=${!edited} @click=${() => (this._edit = {})}>${t("discard")}</button>
              <span class="spacer"></span>
              <button class="primary" ?disabled=${!edited} @click=${() => (this._confirm = true)}>${icon("check")} ${t("apply")}</button>
            </div>
            ${this._msg ? html`<p class="ok">${this._msg}</p>` : nothing}
          </div>
          <div class="card">
            <div class="cap">${t("cv.analysis")}</div>
            ${dev !== undefined
              ? html`<p class="small">${t(dev >= 0 ? "cv.deviation_above" : "cv.deviation_below", { value: Math.abs(dev) })}</p>`
              : nothing}
            ${roomMean !== undefined
              ? html`<p class="small">${t("cv.room", { room: roomMean, set: cur.roomSet })}</p>
                  ${Math.abs(suggestion) >= 0.5
                    ? html`<div class="hint">${t(suggestion < 0 ? "cv.suggest_down" : "cv.suggest_up", { value: Math.abs(suggestion), target: cur.offset + suggestion })}
                        <button class="small-btn" @click=${() => this._set("offset", cur.offset + suggestion)}>${t("cv.try")}</button></div>`
                    : html`<p class="ok small">${t("cv.fits")}</p>`}`
              : html`<p class="muted small">${t("cv.no_room")}</p>`}
          </div>
        </div>
      </div>
      ${this._confirm
        ? html`<div class="backdrop" @click=${() => (this._confirm = false)}></div>
            <div class="dialog card">
              <h3>${t("cv.confirm_title")}</h3>
              <ul>${(Object.entries(this._edit) as [keyof CurveParams, number][]).map(
                ([k, v]) => html`<li>${t(`cv.p.${k}`)}: ${fmtNum((cur as any)[k], 1)} → <b>${fmtNum(v, 1)}</b></li>`,
              )}</ul>
              <p class="muted small">${this.sim ? t("cv.confirm_demo") : t("cv.confirm_live")}</p>
              <div class="row"><span class="spacer"></span>
                <button @click=${() => (this._confirm = false)}>${t("cancel")}</button>
                <button class="primary" @click=${this._apply}>${t("apply")}</button></div>
            </div>`
        : nothing}
    `;
  }

  static styles = [
    ui,
    css`
      :host { display: block; }
      .grid { display: grid; grid-template-columns: 1fr 320px; gap: 12px; align-items: start; }
      .head { margin-bottom: 6px; }
      .head h2 { margin: 0 10px 0 0; }
      .head select { width: auto; }
      .curve-chart { height: clamp(280px, 52vh, 520px); }
      .grid line.grid, line.grid { stroke: var(--cp-border); }
      .axis { fill: var(--cp-muted); font-size: 11px; }
      .axis.title { font-weight: 700; }
      .limit { fill: color-mix(in srgb, var(--cp-info) 7%, transparent); }
      .pt { fill: #f5c542; }
      .curve { fill: none; stroke: var(--cp-accent); stroke-width: 3; stroke-linecap: round; }
      .curve.next { stroke: var(--cp-select); stroke-dasharray: 7 6; }
      .target { fill: none; stroke: var(--cp-accent); stroke-width: 2; }
      .live circle { fill: #ff7a45; }
      .live circle.pulse { fill: rgba(255, 122, 69, 0.35); animation: cp-pulse 2s ease-in-out infinite; }
      @keyframes cp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      .lg { display: inline-flex; gap: 5px; align-items: center; font-size: 12px; color: var(--cp-muted); }
      .lg i { display: inline-block; width: 14px; height: 3px; border-radius: 2px; }
      .l-curve { background: var(--cp-accent); }
      .l-next { background: var(--cp-select); }
      .l-pt { width: 8px !important; height: 8px !important; border-radius: 50% !important; background: #f5c542; }
      .l-live { width: 8px !important; height: 8px !important; border-radius: 50% !important; background: #ff7a45; }
      .side { display: grid; gap: 12px; }
      .cap { font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); font-weight: 700; margin-bottom: 8px; }
      .param { display: grid; grid-template-columns: 1fr auto; gap: 2px 8px; margin-bottom: 10px; font-size: 13px; }
      .param input { grid-column: 1 / -1; }
      .param.changed b { color: var(--cp-select); }
      .pname { color: var(--cp-muted); }
      .actions { margin-top: 6px; }
      .small { font-size: 13px; line-height: 1.45; margin: 6px 0; }
      .ok { color: var(--cp-accent); }
      .hint { font-size: 13px; line-height: 1.45; padding: 8px 10px; border-radius: 10px; background: color-mix(in srgb, var(--cp-warn) 12%, var(--cp-surface-2)); display: grid; gap: 8px; }
      .small-btn { justify-self: start; padding: 4px 10px; font-size: 12px; }
      .backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); z-index: 40; }
      .dialog { position: fixed; z-index: 41; left: 50%; top: 30%; transform: translate(-50%, -30%); width: min(420px, 92vw); }
      .dialog h3 { margin-top: 0; color: var(--cp-text); text-transform: none; letter-spacing: 0; font-size: 16px; }
      .dialog ul { padding-left: 18px; font-size: 14px; }
      @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
    `,
  ];
}

if (!customElements.get("cp-curve")) customElements.define("cp-curve", CpCurve);

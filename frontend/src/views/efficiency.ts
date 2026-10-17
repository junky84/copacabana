import { LitElement, css, html, nothing, svg } from "lit";
import { fmtNum, getLang, t } from "../i18n";
import { ui } from "../styles";
import type { Hass, Plant } from "../types";
import type { ValueSource } from "../data/values";
import type { Simulator } from "../sim/simulator";
import {
  AMPEL_COLOR,
  ampel,
  hassEfficiency,
  liveCop,
  simEfficiency,
  spf,
  type EfficiencyData,
  type Energy,
} from "../data/efficiency";

const REFRESH_LIVE_MS = 10 * 60_000;
const REFRESH_DEMO_MS = 5_000;

function spfColor(v: number | undefined): string {
  if (v === undefined) return "var(--cp-muted)";
  return v >= 3.5 ? AMPEL_COLOR.green : v >= 3 ? AMPEL_COLOR.yellow : AMPEL_COLOR.red;
}

export class CpEfficiency extends LitElement {
  static properties = {
    plant: { attribute: false },
    src: { attribute: false },
    hass: { attribute: false },
    sim: { attribute: false },
    version: { type: Number },
    _data: { state: true },
    _error: { state: true },
  };
  plant!: Plant;
  src!: ValueSource;
  hass?: Hass;
  sim: Simulator | null = null;
  version = 0;
  private _data: EfficiencyData | null = null;
  private _error = "";
  private _loadedAt = 0;
  private _loadedFor: unknown = null;

  protected willUpdate(): void {
    const key = this.sim || this.plant;
    const age = Date.now() - this._loadedAt;
    if (key !== this._loadedFor || age > (this.sim ? REFRESH_DEMO_MS : REFRESH_LIVE_MS)) {
      this._loadedFor = key;
      this._loadedAt = Date.now();
      this._load();
    }
  }

  private async _load(): Promise<void> {
    try {
      this._error = "";
      if (this.sim) this._data = simEfficiency(this.sim);
      else if (this.hass && !this.hass.__standalone) this._data = await hassEfficiency(this.hass, this.plant);
    } catch (err: any) {
      this._error = err?.message || String(err);
    }
  }

  private _live() {
    const live = liveCop(this.plant, this.src);
    const R = 62;
    const C = 2 * Math.PI * R;
    const frac = live ? Math.min(1, live.cop / 7) : 0;
    const color = live ? AMPEL_COLOR[live.ampel] : "var(--cp-muted)";
    return html`<div class="card live">
      <div class="cap">${t("eff.live")}</div>
      <div class="gauge">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r=${R} class="track" />
          ${svg`<circle cx="80" cy="80" r=${R} class="bar" style="stroke:${color};stroke-dasharray:${C * frac} ${C}" />`}
        </svg>
        <div class="gv">
          <span class="big" style="color:${color}">${live ? fmtNum(live.cop, 1) : "–"}</span>
          <span class="muted">COP</span>
        </div>
      </div>
      ${live
        ? html`<div class="lv-row"><span>${t("eff.expected", { out: fmtNum(live.tOut, 0), flow: fmtNum(live.tFlow, 0) })}</span><b>${fmtNum(live.expected, 1)}</b></div>
            <div class="lv-row"><span>${t("eff.ratio")}</span><b style="color:${color}">${fmtNum(live.ratio * 100, 0)} %</b></div>
            <div class="verdict" style="border-color:${color}">${t(`eff.ampel.${live.ampel}`)}</div>`
        : html`<p class="muted small">${t("eff.no_live")}</p>`}
    </div>`;
  }

  private _tile(key: string, e: Energy | null, estimated: boolean) {
    const v = spf(e);
    const dhwShare = e && e.heat > 0 ? e.heatDhw / e.heat : undefined;
    const auxShare = e && e.el > 0 ? e.aux / e.el : undefined;
    return html`<div class="card tile">
      <div class="cap">${t(`eff.${key}`)} ${estimated ? html`<span class="est">${t("eff.estimate")}</span>` : nothing}</div>
      <div class="spf" style="color:${spfColor(v)}">${v !== undefined ? fmtNum(v, 2) : "–"}<small>${key === "today" || key === "yesterday" ? "AZ" : "JAZ"}</small></div>
      <div class="kv"><span>${t("eff.heat")}</span><b>${e ? fmtNum(e.heat, e.heat >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${t("eff.el")}</span><b>${e ? fmtNum(e.el, e.el >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${t("eff.dhw_share")}</span><b>${dhwShare !== undefined ? fmtNum(dhwShare * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${t("eff.aux_share")}</span><b>${auxShare !== undefined ? fmtNum(auxShare * 100, 1) + " %" : "–"}</b></div>
    </div>`;
  }

  private _chart(d: EfficiencyData) {
    const days = d.daily.slice(-30);
    if (!days.length) return nothing;
    const W = 720;
    const H = 200;
    const pad = { l: 34, r: 34, t: 10, b: 24 };
    const maxE = Math.max(1, ...days.map((x) => Math.max(x.heat, x.el)));
    const bw = (W - pad.l - pad.r) / days.length;
    const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / maxE);
    const ySpf = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - Math.min(6, v) / 6);
    const fmtDay = (ms: number) => new Date(ms).toLocaleDateString(getLang() === "de" ? "de-DE" : "en-GB", { day: "2-digit", month: "2-digit" });
    const pts = days
      .map((x, i) => {
        const v = spf(x);
        return v === undefined ? null : `${pad.l + i * bw + bw / 2},${ySpf(v)}`;
      })
      .filter(Boolean)
      .join(" ");
    return html`<div class="card chart">
      <div class="row head"><div class="cap">${t("eff.daily")}</div><span class="spacer"></span>
        <span class="lg"><i style="background:#ff8a3d"></i>${t("eff.heat")}</span>
        <span class="lg"><i style="background:#4d9fff"></i>${t("eff.el")}</span>
        <span class="lg"><i class="dot"></i>AZ</span></div>
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        ${[0, 0.5, 1].map((f) => svg`<line class="grid" x1=${pad.l} x2=${W - pad.r} y1=${y(maxE * f)} y2=${y(maxE * f)} />
          <text class="axis" x=${pad.l - 4} y=${y(maxE * f) + 3} text-anchor="end">${fmtNum(maxE * f, 0)}</text>`)}
        ${[2, 4, 6].map((v) => svg`<text class="axis" x=${W - pad.r + 4} y=${ySpf(v) + 3}>${v}</text>`)}
        ${days.map((x, i) => {
          const x0 = pad.l + i * bw;
          return svg`<g><title>${fmtDay(x.day)} · ${fmtNum(x.heat, 1)} / ${fmtNum(x.el, 1)} kWh · AZ ${spf(x) !== undefined ? fmtNum(spf(x)!, 2) : "–"}</title>
            <rect x=${x0 + bw * 0.12} y=${y(x.heat)} width=${bw * 0.36} height=${H - pad.b - y(x.heat)} rx="2" fill="#ff8a3d" />
            <rect x=${x0 + bw * 0.5} y=${y(x.el)} width=${bw * 0.36} height=${H - pad.b - y(x.el)} rx="2" fill="#4d9fff" />
            ${i % 5 === 0 ? svg`<text class="axis" x=${x0 + bw / 2} y=${H - 6} text-anchor="middle">${fmtDay(x.day)}</text>` : nothing}</g>`;
        })}
        ${svg`<polyline points=${pts} fill="none" stroke="var(--cp-text)" stroke-width="1.5" stroke-dasharray="3 3" />`}
        ${days.map((x, i) => {
          const v = spf(x);
          return v === undefined ? nothing : svg`<circle cx=${pad.l + i * bw + bw / 2} cy=${ySpf(v)} r="3" fill=${spfColor(v)} />`;
        })}
      </svg>
      ${d.estimated.month ? html`<p class="muted small">${t("eff.demo_note")}</p>` : nothing}
    </div>`;
  }

  render() {
    const d = this._data;
    return html`
      <div class="grid">
        ${this._live()}
        <div class="tiles">
          ${this._tile("today", d?.today ?? null, false)}
          ${this._tile("yesterday", d?.yesterday ?? null, false)}
          ${this._tile("month", d?.month ?? null, !!d?.estimated.month)}
          ${this._tile("year", d?.year ?? null, !!d?.estimated.year)}
        </div>
      </div>
      ${this._error ? html`<div class="card err">${this._error}</div>` : nothing}
      ${d?.missing ? html`<div class="card hint">${t(`eff.missing.${d.missing}`)}</div>` : nothing}
      ${d ? this._chart(d) : nothing}
    `;
  }

  static styles = [
    ui,
    css`
      :host { display: grid; gap: 12px; align-content: start; }
      .grid { display: grid; grid-template-columns: 280px 1fr; gap: 12px; }
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; }
      .cap { font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); font-weight: 700; }
      .live { display: grid; gap: 8px; justify-items: center; }
      .gauge { position: relative; width: 170px; height: 170px; }
      .gauge svg { width: 100%; height: 100%; transform: rotate(-90deg); }
      .track { fill: none; stroke: var(--cp-surface-2); stroke-width: 12; }
      .bar { fill: none; stroke-width: 12; stroke-linecap: round; transition: stroke-dasharray 0.6s; }
      .gv { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; }
      .big { font-size: 40px; font-weight: 800; font-variant-numeric: tabular-nums; line-height: 1; }
      .lv-row { display: flex; justify-content: space-between; width: 100%; font-size: 13px; color: var(--cp-muted); gap: 8px; }
      .lv-row b { color: var(--cp-text); }
      .verdict { width: 100%; text-align: center; font-size: 13px; font-weight: 700; padding: 6px; border-radius: 10px; border: 1px solid; }
      .tile { display: grid; gap: 6px; align-content: start; }
      .spf { font-size: 34px; font-weight: 800; font-variant-numeric: tabular-nums; }
      .spf small { font-size: 12px; color: var(--cp-muted); margin-left: 6px; font-weight: 700; }
      .kv { display: flex; justify-content: space-between; font-size: 13px; color: var(--cp-muted); }
      .kv b { color: var(--cp-text); font-variant-numeric: tabular-nums; }
      .est { font-size: 10px; color: var(--cp-notice); border: 1px solid currentColor; border-radius: 6px; padding: 0 5px; margin-left: 4px; text-transform: none; letter-spacing: 0; }
      .chart svg { width: 100%; height: 220px; display: block; }
      .head { margin-bottom: 6px; }
      .lg { display: inline-flex; gap: 5px; align-items: center; font-size: 12px; color: var(--cp-muted); }
      .lg i { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
      .lg i.dot { border-radius: 50%; background: var(--cp-text); }
      .grid line.grid, line.grid { stroke: var(--cp-border); }
      .axis { fill: var(--cp-muted); font-size: 10px; }
      .small { font-size: 12px; margin: 6px 0 0; }
      .hint { font-size: 13px; color: var(--cp-warn); }
      .err { color: var(--cp-error); }
      @media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
    `,
  ];
}

if (!customElements.get("cp-efficiency")) customElements.define("cp-efficiency", CpEfficiency);

export { ampel };

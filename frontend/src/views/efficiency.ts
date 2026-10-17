import { LitElement, css, html, nothing, svg } from "lit";
import "./echart";
import type { ChartOption, ChartTheme } from "./echart";
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
  if (v === undefined) return "#8b949e";
  return v >= 3.5 ? AMPEL_COLOR.green : v >= 3 ? AMPEL_COLOR.yellow : AMPEL_COLOR.red;
}

export class CpEfficiency extends LitElement {
  private _chartKey = "";
  private _chartOption?: (th: ChartTheme) => ChartOption;
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
    const locale = getLang() === "de" ? "de-DE" : "en-GB";
    const label = (ms: number) => new Date(ms).toLocaleDateString(locale, { day: "2-digit", month: "2-digit" });
    const longLabel = (ms: number) => new Date(ms).toLocaleDateString(locale, { weekday: "short", day: "2-digit", month: "2-digit" });
    const key = JSON.stringify(days);
    if (key !== this._chartKey) {
      this._chartKey = key;
      this._chartOption = (th: ChartTheme): ChartOption => ({
        animationDuration: 400,
        textStyle: { fontFamily: "inherit" },
        grid: { left: 8, right: 8, top: 34, bottom: 8, containLabel: true },
        legend: {
          top: 0,
          right: 0,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: { color: th.muted },
          inactiveColor: th.border,
          data: [t("eff.heat"), t("eff.el"), { name: t("eff.spf_short"), icon: "circle" }],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow", shadowStyle: { color: "rgba(127,127,127,0.12)" } },
          backgroundColor: th.surface,
          borderColor: th.border,
          textStyle: { color: th.text, fontSize: 12 },
          formatter: (items: any) => {
            const list = Array.isArray(items) ? items : [items];
            const i = list[0]?.dataIndex ?? 0;
            const rows = list
              .map((it: any) => {
                const v = it.value;
                if (v === null || v === undefined || v === "-") return "";
                const unit = it.seriesIndex === 2 ? "" : " kWh";
                return `<div style="display:flex;gap:10px;justify-content:space-between"><span>${it.marker}${it.seriesName}</span><b>${fmtNum(v, it.seriesIndex === 2 ? 2 : 1)}${unit}</b></div>`;
              })
              .join("");
            return `<div style="margin-bottom:4px;font-weight:700">${longLabel(days[i].day)}</div>${rows}`;
          },
        },
        dataZoom: [{ type: "inside", minValueSpan: 5 }],
        xAxis: {
          type: "category",
          data: days.map((x) => label(x.day)),
          axisLine: { lineStyle: { color: th.border } },
          axisTick: { show: false },
          axisLabel: { color: th.muted, hideOverlap: true },
        },
        yAxis: [
          {
            type: "value",
            name: "kWh",
            nameTextStyle: { color: th.muted, align: "left" },
            axisLabel: { color: th.muted },
            splitLine: { lineStyle: { color: th.border, type: "dashed" } },
          },
          {
            type: "value",
            name: t("eff.spf_short"),
            min: 0,
            max: 6,
            interval: 2,
            nameTextStyle: { color: th.muted, align: "right" },
            axisLabel: { color: th.muted },
            splitLine: { show: false },
          },
        ],
        series: [
          {
            name: t("eff.heat"),
            type: "bar",
            data: days.map((x) => Math.round(x.heat * 10) / 10),
            itemStyle: { color: "#ff8a3d", borderRadius: [3, 3, 0, 0] },
            barGap: "10%",
            barCategoryGap: "35%",
          },
          {
            name: t("eff.el"),
            type: "bar",
            data: days.map((x) => Math.round(x.el * 10) / 10),
            itemStyle: { color: "#4d9fff", borderRadius: [3, 3, 0, 0] },
          },
          {
            name: t("eff.spf_short"),
            type: "line",
            yAxisIndex: 1,
            smooth: 0.3,
            symbol: "circle",
            symbolSize: 7,
            connectNulls: true,
            lineStyle: { color: th.text, width: 1.5, type: "dashed", opacity: 0.7 },
            data: days.map((x) => {
              const v = spf(x);
              return v === undefined ? null : { value: Math.round(v * 100) / 100, itemStyle: { color: spfColor(v) } };
            }),
            markLine: {
              silent: true,
              symbol: "none",
              label: { show: false },
              lineStyle: { color: AMPEL_COLOR.yellow, type: "dotted", opacity: 0.6 },
              data: [{ yAxis: 3 }],
            },
          },
        ],
      });
    }
    return html`<div class="card chart">
      <div class="cap">${t("eff.daily")}</div>
      <cp-echart .option=${this._chartOption}></cp-echart>
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
      .chart .cap { margin-bottom: 4px; }
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

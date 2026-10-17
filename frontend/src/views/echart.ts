/**
 * Interactive chart based on Apache ECharts – the chart library Home Assistant
 * itself uses – with only the parts we need (tree-shaken), styled from the
 * panel's CSS variables so it follows light and dark mode.
 */

import { LitElement, css, html, type PropertyValues } from "lit";
import * as echarts from "echarts/core";
import { BarChart, LineChart, ScatterChart } from "echarts/charts";
import { DataZoomComponent, GridComponent, LegendComponent, MarkAreaComponent, MarkLineComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsCoreOption } from "echarts/core";

echarts.use([BarChart, LineChart, ScatterChart, GridComponent, TooltipComponent, LegendComponent, DataZoomComponent, MarkLineComponent, MarkAreaComponent, CanvasRenderer]);

export type ChartOption = EChartsCoreOption;

/** Theme colours resolved from CSS variables of the host. */
export interface ChartTheme {
  text: string;
  muted: string;
  border: string;
  surface: string;
}

export class CpEchart extends LitElement {
  static properties = { option: { attribute: false } };
  /** option builder: receives the resolved theme colours */
  option?: (theme: ChartTheme) => ChartOption;
  private _chart?: echarts.ECharts;
  private _ro?: ResizeObserver;
  private _mq = window.matchMedia("(prefers-color-scheme: dark)");

  private _theme(): ChartTheme {
    const cs = getComputedStyle(this);
    const v = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;
    return {
      text: v("--cp-text", "#e6edf3"),
      muted: v("--cp-muted", "#8b949e"),
      border: v("--cp-border", "#30363d"),
      surface: v("--cp-surface", "#161b22"),
    };
  }

  private _fresh = true;

  /** First draw and theme changes replace everything; data updates merge, so zoom and hidden series stay. */
  private _apply = () => {
    if (!this._chart || !this.option) return;
    this._chart.setOption(this.option(this._theme()), { notMerge: this._fresh, lazyUpdate: true });
    this._fresh = false;
  };

  private _retheme = () => {
    this._fresh = true;
    this._apply();
  };

  protected firstUpdated(): void {
    const el = this.renderRoot.querySelector(".c") as HTMLDivElement;
    this._chart = echarts.init(el, undefined, { renderer: "canvas" });
    this._apply();
    this._ro = new ResizeObserver(() => this._chart?.resize());
    this._ro.observe(el);
    this._mq.addEventListener("change", this._retheme);
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("option")) this._apply();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._ro?.disconnect();
    this._mq.removeEventListener("change", this._retheme);
    this._chart?.dispose();
    this._chart = undefined;
    this._fresh = true;
  }

  connectedCallback(): void {
    super.connectedCallback();
    // re-attached after a tab switch: rebuild
    if (this.hasUpdated && !this._chart) this.firstUpdated();
  }

  render() {
    return html`<div class="c"></div>`;
  }

  static styles = css`
    :host { display: block; height: 260px; }
    .c { width: 100%; height: 100%; }
  `;
}

if (!customElements.get("cp-echart")) customElements.define("cp-echart", CpEchart);

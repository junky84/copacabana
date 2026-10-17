/**
 * Energy layer: compact power flow diagram. Sources (PV, grid, battery) on top,
 * consumers (heat pump, house, wallbox) below, all joined by a bus line.
 * Dots flow in the direction of the power; line width follows the power.
 */

import { LitElement, css, html, nothing, svg, type SVGTemplateResult } from "lit";
import { fmtNum, t } from "../i18n";
import type { EnergyFlow } from "../data/energy";

type NodeId = "pv" | "grid" | "battery" | "hp" | "house" | "wallbox";

interface Layout {
  w: number;
  h: number;
  bus: number;
  busX: [number, number];
  pos: Record<NodeId, [number, number]>;
}

// phones: sources above the bus, consumers below; wide screens: one flat row
const TALL: Layout = {
  w: 640,
  h: 232,
  bus: 105,
  busX: [40, 540],
  pos: { pv: [80, 42], grid: [290, 42], battery: [500, 42], hp: [80, 168], house: [290, 168], wallbox: [500, 168] },
};
const WIDE: Layout = {
  w: 1240,
  h: 118,
  bus: 98,
  busX: [40, 1180],
  pos: { pv: [70, 34], grid: [265, 34], battery: [460, 34], hp: [705, 34], house: [900, 34], wallbox: [1095, 34] },
};

const COLOR: Record<NodeId, string> = {
  pv: "#ffc93c",
  grid: "#9aa7b4",
  battery: "#3ddc97",
  hp: "#ff8a3d",
  house: "#6cc4ff",
  wallbox: "#b48cff",
};

// own glyphs, 24 × 24, stroke only
const GLYPH: Record<NodeId, string> = {
  pv: "M3 18h18l-3-9H6zM9 9l-1 9M15 9l1 9M4.5 13.5h15M12 2v3M5 4l1.5 2M19 4l-1.5 2",
  grid: "M12 2l-6 20M12 2l6 20M8 9h8M7 14h10M5 20h14M12 2v4",
  battery: "M6 6h12v15H6zM10 3h4v3M9 13h6M12 10v6",
  hp: "M4 5h16v14H4zM10 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M10 12l2-3M10 12l-3 1M10 12l1 3M16 8h2M16 11h2M16 14h2",
  house: "M3 11l9-7l9 7M5 10v10h14V10M10 20v-6h4v6",
  wallbox: "M7 3h10v18H7zM10 8h4M12 12l-2 3h4l-2 3M17 14h2v4a2 2 0 0 0 2 2",
};

/** kW → dot speed step (fixed steps: changing durations would make the dots jump) */
function speed(kw: number): number {
  const a = Math.abs(kw);
  return a > 5 ? 0.6 : a > 2 ? 0.9 : a > 0.5 ? 1.3 : 1.9;
}

export class CpEnergy extends LitElement {
  static properties = { flow: { attribute: false } };
  flow!: EnergyFlow;

  private _node(L: Layout, id: NodeId, toBusKw: number | undefined, extra?: SVGTemplateResult): SVGTemplateResult {
    const [x, y] = L.pos[id];
    const above = y < L.bus;
    const missing = toBusKw === undefined;
    const kw = toBusKw ?? 0;
    const active = !missing && Math.abs(kw) >= 0.05;
    const color = COLOR[id];
    const width = active ? 2.5 + Math.min(6, Math.abs(kw) * 0.9) : 2;
    const y0 = above ? y + 26 : y - 26;
    const down = above === kw > 0;
    const label =
      id === "grid" && active ? t(kw > 0 ? "en.grid_import" : "en.grid_export") : id === "battery" && active ? t(kw > 0 ? "en.bat_discharge" : "en.bat_charge") : t(`en.${id}`);
    return svg`
      <line x1=${x} y1=${y0} x2=${x} y2=${L.bus} class="link" style="stroke:${active ? color : "var(--cp-border)"}; stroke-width:${width}" />
      ${active ? svg`<line x1=${x} y1=${y0} x2=${x} y2=${L.bus} class="dots ${down ? "down" : "up"}" style="animation-duration:${speed(kw)}s" />` : nothing}
      <g class="node ${missing ? "missing" : ""}" transform="translate(${x} ${y})">
        <circle r="25" class="ring" style="stroke:${active ? color : "var(--cp-border)"}" />
        <path d=${GLYPH[id]} transform="translate(-12 -12)" class="glyph" style="stroke:${active ? color : "var(--cp-muted)"}" />
      </g>
      <text x=${x + 36} y=${y - 4} class="lbl">${label}</text>
      <text x=${x + 36} y=${y + 15} class="val">${missing ? "–" : fmtNum(Math.abs(kw), Math.abs(kw) < 10 ? 2 : 1)}<tspan class="unit"> kW</tspan></text>
      ${extra ? svg`<g transform="translate(${x + 36} ${y + 23})">${extra}</g>` : nothing}
    `;
  }

  private _badge(text: string, cls: string): SVGTemplateResult {
    const w = text.length * 6.2 + 18;
    return svg`<rect width=${w} height="18" rx="9" class="badge ${cls}" /><text x=${w / 2} y="12.5" text-anchor="middle" class="badge-t">${text}</text>`;
  }

  private _wide = false;
  private _ro?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this._ro = new ResizeObserver(([e]) => {
      const wide = e.contentRect.width > 820;
      if (wide !== this._wide) {
        this._wide = wide;
        this.requestUpdate();
      }
    });
    this._ro.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._ro?.disconnect();
  }

  render() {
    const f = this.flow;
    if (!f) return nothing;
    const L = this._wide ? WIDE : TALL;
    const local = (f.pv ?? 0) + Math.max(0, f.battery ?? 0);
    const demand = (f.house ?? 0) + (f.wallbox ?? 0) + (f.hp ?? 0);
    const share = demand > 0.05 && (f.pv !== undefined || f.battery !== undefined) ? Math.min(1, local / demand) : undefined;
    const soc = f.soc;
    const socBar =
      soc !== undefined
        ? svg`<rect width="44" height="6" rx="3" class="soc-bg" />
            <rect width=${(44 * Math.max(0, Math.min(100, soc))) / 100} height="6" rx="3" style="fill:${COLOR.battery}" />
            <text x="50" y="7" class="soc">${Math.round(soc)} %</text>`
        : undefined;
    const neg = (v?: number) => (v === undefined ? undefined : -v);
    return html`<div class="head">
        <b>${t("en.title")}</b>
        ${share !== undefined ? html`<span class="share">${t("en.share", { pct: Math.round(share * 100) })}</span>` : nothing}
      </div>
      <svg viewBox="0 0 ${L.w} ${L.h}" class=${this._wide ? "wide" : ""} role="img" aria-label=${t("en.title")}>
        <line x1=${L.busX[0]} y1=${L.bus} x2=${L.busX[1]} y2=${L.bus} class="bus" />
        ${this._node(L, "pv", f.pv, f.pvSignal ? this._badge(t("en.pv_signal"), "eco") : undefined)}
        ${this._node(L, "grid", f.grid)}
        ${this._node(L, "battery", f.battery, socBar)}
        ${this._node(L, "hp", neg(f.hp), f.dim14a ? this._badge(t("en.dimmed", { kw: f.limit14a }), "warn") : undefined)}
        ${this._node(L, "house", neg(f.house))}
        ${this._node(L, "wallbox", neg(f.wallbox))}
      </svg>`;
  }

  static styles = css`
    :host { display: block; }
    .head { display: flex; align-items: baseline; gap: 12px; font-size: 14px; padding: 0 2px 2px; }
    .share { font-size: 12px; color: #3ddc97; font-weight: 700; }
    svg { width: 100%; height: auto; display: block; overflow: visible; }
    svg.wide { max-height: 130px; }
    .bus { stroke: var(--cp-muted); stroke-width: 3; stroke-linecap: round; opacity: 0.55; }
    .link { stroke-linecap: round; opacity: 0.55; }
    .dots { stroke: var(--cp-flow, #fff); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 2 13; animation: en-down 1s linear infinite; }
    .dots.up { animation-name: en-up; }
    @keyframes en-down { to { stroke-dashoffset: -15; } }
    @keyframes en-up { to { stroke-dashoffset: 15; } }
    .ring { fill: var(--cp-surface-2); stroke-width: 2.5; }
    .glyph { fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
    .missing { opacity: 0.45; }
    .lbl { fill: var(--cp-muted); font-size: 11.5px; font-weight: 600; }
    .val { fill: var(--cp-text); font-size: 17px; font-weight: 800; font-variant-numeric: tabular-nums; }
    .unit { fill: var(--cp-muted); font-size: 11px; font-weight: 600; }
    .soc-bg { fill: var(--cp-border); }
    .soc { fill: var(--cp-muted); font-size: 11px; font-weight: 700; }
    .badge { stroke-width: 1; }
    .badge.warn { fill: color-mix(in srgb, var(--cp-warn) 22%, transparent); stroke: var(--cp-warn); }
    .badge.eco { fill: color-mix(in srgb, #3ddc97 20%, transparent); stroke: #3ddc97; }
    .badge-t { fill: var(--cp-text); font-size: 11px; font-weight: 700; }
    @media (prefers-reduced-motion: reduce) { .dots { animation: none; } }
  `;
}

if (!customElements.get("cp-energy")) customElements.define("cp-energy", CpEnergy);

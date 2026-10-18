/**
 * Default component artwork. All drawings are original, brand-neutral shapes
 * so the project ships without manufacturer graphics.
 */

import { nothing, svg, type SVGTemplateResult } from "lit";
import { outdoorModel, variantOf } from "../catalog";
import { t } from "../i18n";
import type { PlantComponent } from "../types";
import { tempColor } from "../data/values";

export interface IconCtx {
  c: PlantComponent;
  w: number;
  h: number;
  flags: Set<string>;
  num: (slot: string) => number | undefined;
  text: (slot: string) => string | undefined;
}

const MODE_COLORS: Record<string, string> = {
  heating: "#ff8a3d",
  hot_water: "#ff4f8b",
  defrost: "#6cc4ff",
  compressor_alarm: "#ff4d4d",
  cooling: "#38d0ff",
  off: "#8b949e",
};

function casing(w: number, h: number, rx = 10, cls = "casing"): SVGTemplateResult {
  return svg`<rect class=${cls} x="0" y="0" width=${w} height=${h} rx=${rx} />
    <rect class="sheen" x="2" y="2" width=${w - 4} height=${Math.min(h * 0.35, 40)} rx=${rx - 2} />`;
}

function outdoor(ctx: IconCtx): SVGTemplateResult {
  const { w, h, flags, c } = ctx;
  const model = outdoorModel(c.model);
  if (model.source === "brine") return brine(ctx);
  const running = flags.has("running") && !flags.has("defrost");
  const defrost = flags.has("defrost");
  const alarm = flags.has("alarm");
  const cx = w * 0.36;
  const cy = h * 0.5;
  const r = Math.min(h * 0.38, w * 0.3);
  const speed = ctx.num("fan_speed") ?? (running ? 60 : 0);
  // seconds per revolution in three fixed steps: a changing animation-duration
  // restarts the rotation and makes the fan jump on every value update
  const dur = speed <= 0 ? 0 : speed < 45 ? 2.8 : speed < 70 ? 2 : 1.5;
  const led = alarm ? "#ff4d4d" : defrost ? "#6cc4ff" : running ? "#3ddc97" : "#5b6573";
  const blades = [0, 120, 240].map(
    (a) => svg`<path transform="rotate(${a})" d="M0 0 C ${r * 0.18} ${-r * 0.25}, ${r * 0.55} ${-r * 0.35}, ${r * 0.82} ${-r * 0.12} C ${r * 0.6} ${r * 0.05}, ${r * 0.25} ${r * 0.08}, 0 0 Z" />`,
  );
  return svg`
    <rect class="foot" x=${w * 0.12} y=${h - 2} width=${w * 0.16} height="6" rx="2" />
    <rect class="foot" x=${w * 0.72} y=${h - 2} width=${w * 0.16} height="6" rx="2" />
    ${casing(w, h, 12)}
    <circle class="grille-bg" cx=${cx} cy=${cy} r=${r + 4} />
    <g transform="translate(${cx} ${cy})">
      <g class=${dur ? "spin fan" : "fan"} style=${dur ? `--dur:${dur}s` : ""}>${blades}<circle r=${r * 0.12} class="hub" /></g>
    </g>
    ${[0.45, 0.72, 1].map((f) => svg`<circle class="grille" cx=${cx} cy=${cy} r=${r * f} />`)}
    <line class="grille" x1=${cx - r} y1=${cy} x2=${cx + r} y2=${cy} />
    <line class="grille" x1=${cx} y1=${cy - r} x2=${cx} y2=${cy + r} />
    ${[0, 1, 2, 3, 4, 5].map((i) => svg`<rect class="vent" x=${w * 0.73} y=${h * 0.22 + i * h * 0.1} width=${w * 0.19} height="3" rx="1.5" />`)}
    <circle cx=${w * 0.9} cy=${h * 0.12} r="4" fill=${led} class=${running || defrost ? "pulse" : ""} />
    ${model.refrigerant ? svg`<text class="tag" x=${w * 0.825} y=${h * 0.9} text-anchor="middle">${model.refrigerant}</text>` : ""}
    ${defrost
      ? svg`<rect x="2" y="2" width=${w - 4} height=${h - 4} rx="10" class="frost" />
        <g class="pulse" transform="translate(${cx} ${cy})">${snowflake(r * 0.55)}</g>`
      : ""}
    ${alarm ? svg`<rect x="1" y="1" width=${w - 2} height=${h - 2} rx="11" class="alarm-ring" />` : ""}
  `;
}

function brine(ctx: IconCtx): SVGTemplateResult {
  const { w, h, flags } = ctx;
  const running = flags.has("running");
  return svg`
    ${casing(w, h * 0.55, 10)}
    <text class="tag" x=${w / 2} y=${h * 0.32} text-anchor="middle">SOLE</text>
    <rect class="ground" x="0" y=${h * 0.62} width=${w} height=${h * 0.38} rx="6" />
    ${[0.2, 0.4, 0.6, 0.8].map(
      (f) => svg`<path class=${running ? "probe active" : "probe"} d="M${w * f - 6} ${h * 0.55} V ${h * 0.95} M${w * f + 6} ${h * 0.55} V ${h * 0.95} M${w * f - 6} ${h * 0.95} Q ${w * f} ${h} ${w * f + 6} ${h * 0.95}" />`,
    )}
  `;
}

function snowflake(r: number): SVGTemplateResult {
  const arms = [0, 60, 120].map(
    (a) => svg`<g transform="rotate(${a})"><line x1=${-r} y1="0" x2=${r} y2="0" />
      <path d="M${r * 0.6} 0 l ${r * 0.2} ${-r * 0.2} M${r * 0.6} 0 l ${r * 0.2} ${r * 0.2} M${-r * 0.6} 0 l ${-r * 0.2} ${-r * 0.2} M${-r * 0.6} 0 l ${-r * 0.2} ${r * 0.2}" /></g>`,
  );
  return svg`<g class="snow">${arms}</g>`;
}

// ------------------------------------------------------------ indoor unit

type P = [number, number];
const C = 20; // cell size in px (matches catalog CELL)

/** Internal pipe of a unit, drawn in cell coordinates; animated while water flows. */
function ipipe(pts: P[], color: string, active: boolean): SVGTemplateResult {
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"} ${x * C} ${y * C}`).join(" ");
  return svg`<path class="ipipe" d=${d} style="stroke:${color}" />
    ${active ? svg`<path class="ipipe-flow" d=${d} />` : nothing}`;
}

function ipump([x, y]: P, running: boolean, dir: "l" | "r" | "u" | "d" = "l", label = "PC0"): SVGTemplateResult {
  const r = 0.55 * C;
  const rot = { r: 0, d: 90, l: 180, u: 270 }[dir];
  return svg`<g transform="translate(${x * C} ${y * C})">
    ${running ? svg`<circle class="pump-glow pulse" r=${r + 4} />` : nothing}
    <circle class=${running ? "pump-body on" : "pump-body"} r=${r} />
    <path class=${running ? "pump-tri on" : "pump-tri"} transform="rotate(${rot})" d="M ${-r * 0.5} ${-r * 0.8} L ${r} 0 L ${-r * 0.5} ${r * 0.8} Z" />
    <circle class=${running ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${r * 0.36} />
    <text class="itag halo" y=${r + 9} text-anchor="middle">${label}</text>
  </g>`;
}

type Dir = "l" | "r" | "u" | "d";

/**
 * Diverter valve inside a unit: one triangle per connection, pointing along its pipe (inlet AB,
 * outlets A and B). Filled = open. dirs: side of the inlet, of A and of B.
 */
function ivalve([x, y]: P, b: boolean, dirs: [Dir, Dir, Dir], label = "VW1", left = false): SVGTemplateResult {
  const s = 0.5 * C;
  const tri = (d: Dir) => {
    const [px, py] = { l: [-1, 0], r: [1, 0], u: [0, -1], d: [0, 1] }[d];
    // base corners: s along the pipe, ±0.6 s across it
    const ax = px * s - py * s * 0.6;
    const ay = py * s + px * s * 0.6;
    const bx = px * s + py * s * 0.6;
    const by = py * s - px * s * 0.6;
    return `M ${ax} ${ay} L 0 0 L ${bx} ${by} Z`;
  };
  const [inD, aD, bD] = dirs;
  return svg`<g transform="translate(${x * C} ${y * C})">
    <path class="valve-tri on" d=${tri(inD)} />
    <path class=${b ? "valve-tri" : "valve-tri on"} d=${tri(aD)} />
    <path class=${b ? "valve-tri on" : "valve-tri"} d=${tri(bD)} />
    ${left
      ? svg`<text class="itag" x=${-s - 3} y=${-s * 0.4} text-anchor="end">${label} ${b ? "B" : "A"}</text>`
      : svg`<text class="itag" x=${s + 3} y=${-s} >${label} ${b ? "B" : "A"}</text>`}
  </g>`;
}

function iheater([x, y]: P, len: number, on: boolean): SVGTemplateResult {
  return svg`<g transform="translate(${x * C} ${y * C})">
    ${on ? svg`<rect class="aux-glow pulse" x=${-0.55 * C} y="-6" width=${1.1 * C} height=${len * C + 12} rx="10" />` : nothing}
    <rect class=${on ? "rod hot" : "rod"} x=${-0.35 * C} y="0" width=${0.7 * C} height=${len * C} rx="6" />
    <path class=${on ? "coil hot" : "coil"} d=${zigzagV(0, 6, len * C - 12, 4, 8)} />
  </g>`;
}

function zigzagV(x: number, y: number, len: number, amp: number, n: number): string {
  const step = len / n;
  let d = `M${x} ${y}`;
  for (let i = 1; i <= n; i++) d += ` L${x + (i % 2 ? -amp : amp)} ${y + i * step}`;
  return d;
}

function screen(ctx: IconCtx, x: number, y: number, w: number): SVGTemplateResult {
  const act = [...ctx.flags].find((f) => f.startsWith("mode_"))?.slice(5);
  const color = MODE_COLORS[act || "off"] || MODE_COLORS.off;
  return svg`<rect class="screen" x=${x} y=${y} width=${w} height="18" rx="4" />
    <rect x=${x + 4} y=${y + 4} width="14" height="10" rx="2" fill=${color} class=${act && act !== "off" ? "pulse" : ""} />
    <text class="screen-text" x=${x + 24} y=${y + 13}>${act ? t(`mode.${act}`) : ""}</text>`;
}

function indoor(ctx: IconCtx, variant: string): SVGTemplateResult {
  const { w, h, flags, c } = ctx;
  const run = flags.has("running");
  const b = flags.has("b");
  const aux = flags.has("aux");
  const pc1 = flags.has("pc1");
  const sup = tempColor(ctx.num("supply_temp"), "#ff7a45");
  const ret = tempColor(ctx.num("return_temp"), "#4d9fff");
  const name = (c.model || "").match(/w[ls]w\d{3}i/i)?.[0]?.toUpperCase().replace("I", "i") || "";
  let body: SVGTemplateResult;
  if (variant === "t180") {
    const dhwC = tempColor(ctx.num("dhw_temp"), "#ff4f8b");
    body = svg`
      <rect class="tank-in" x=${0.6 * C} y=${10 * C} width=${6.8 * C} height=${11.2 * C} rx=${C} style="fill:${dhwC}" />
      <path class=${run && b ? "tank-coil hot" : "tank-coil"} d=${coilSpiral(2.4, 14, 5.6, 19.6)} />
      ${screen(ctx, 1.6 * C, 0.8 * C, 4.6 * C)}
      ${ipipe([[6, 0], [6, 6.2], [4.6, 6.2]], sup, run)}
      ${ipipe([[4.6, 6.2], [3, 6.2], [3, 0]], sup, run && !b)}
      ${ipipe([[4.6, 6.2], [4.6, 14]], sup, run && b)}
      ${ipipe([[2.4, 19.6], [1.6, 19.6], [1.6, 7.6]], ret, run && b)}
      ${ipipe([[1, 0], [1, 7.6]], ret, run && !b)}
      ${ipipe([[1, 7.6], [7, 7.6], [7, 0]], ret, run)}
      ${ipipe([[4, 10.2], [4, 0]], dhwC, flags.has("flowing"))}
      ${ipipe([[5, 0], [5, 3], [5.6, 3], [5.6, 20.6]], "#38d0ff", flags.has("flowing"))}
      ${iheater([6, 1.4], 4, aux)}
      ${ivalve([4.6, 6.2], b, ["r", "l", "d"])}
      ${ipump([4.2, 7.6], run, "r")}
      ${pc1 || true ? svg`<g transform="translate(${3 * C} ${3.4 * C})"><circle class=${pc1 ? "pump-body on" : "pump-body"} r="8" /><text class="itag" x="12" y="4">PC1</text></g>` : nothing}`;
  } else if (variant === "tp70") {
    const bufC = tempColor(ctx.num("buffer_temp"), "#ff9f45");
    // columns: 1 HK1 flow (PC1), 2 HK1 return, 3/4 HK2, 5 from HP (aux heater, VW1), 6 to HP (PC0), 7/8 DHW
    body = svg`
      <rect class="tank-in" x=${0.6 * C} y=${9.4 * C} width=${7.8 * C} height=${4.2 * C} rx=${C} style="fill:${bufC}" />
      <text class="tank-label" x=${4.5 * C} y=${13 * C} text-anchor="middle">${c.props.buffer_l || 70} l</text>
      ${screen(ctx, 0.6 * C, 14.2 * C, 4.4 * C)}
      ${ipipe([[3, 0], [3, 1.2]], bufC, false)}
      ${ipipe([[4, 0], [4, 1.2]], ret, false)}
      ${ipipe([[2, 0], [2, 12.6]], ret, pc1)}
      ${ipipe([[1, 9.4], [1, 0]], bufC, pc1)}
      ${ipipe([[6, 9.4], [6, 8]], ret, run && !b)}
      ${ipipe([[8, 0], [8, 8], [6, 8]], ret, run && b)}
      ${ipipe([[6, 8], [6, 0]], ret, run)}
      ${ipipe([[5, 0], [5, 6.4]], sup, run)}
      ${ipipe([[5, 6.4], [5, 9.4]], sup, run && !b)}
      ${ipipe([[5, 6.4], [7, 6.4], [7, 0]], sup, run && b)}
      ${iheater([5, 1.6], 2.8, aux)}
      ${ivalve([5, 6.4], b, ["u", "d", "r"], "VW1", true)}
      ${ipump([6, 3.4], run, "u")}
      ${ipump([1, 5], pc1, "u", "PC1")}`;
  } else if (variant === "brine") {
    body = svg`
      ${screen(ctx, 1.6 * C, 0.8 * C, 4.6 * C)}
      <circle class="compressor" cx=${2.2 * C} cy=${8.5 * C} r=${1.2 * C} />
      <text class="itag" x=${2.2 * C} y=${10.4 * C} text-anchor="middle">Verdichter</text>
      ${ipipe([[1, 0], [1, 6], [2.2, 6], [2.2, 7.3]], "#38d0ff", run)}
      ${ipipe([[2.2, 9.7], [2.2, 11.5], [2, 11.5], [2, 0]], "#2b6cff", run)}
      ${ipipe([[4, 9], [4, 4], [5.5, 4], [5.5, 9]], sup, run)}
      ${ipipe([[5.5, 9], [7, 9], [7, 0]], sup, run && !b)}
      ${ipipe([[5.5, 9], [5.5, 10.4], [4, 10.4], [4, 0]], sup, run && b)}
      ${ipipe([[6, 0], [6, 11.6], [4, 11.6], [4, 9]], ret, run && !b)}
      ${ipipe([[5, 0], [5, 3.4]], ret, run && b)}
      ${iheater([4, 3], 3, aux)}
      ${ivalve([5.5, 9], b, ["u", "r", "d"])}
      ${ipump([5.5, 11.6], run, "l")}`;
  } else {
    // wall_e: everything enters and leaves at the bottom (ports at x 2,3 | 5,6 | 8,9)
    body = svg`
      ${screen(ctx, 2 * C, 0.8 * C, 6 * C)}
      ${ipipe([[3, 14], [3, 9.6], [4.3, 9.6], [4.3, 2.8], [7.6, 2.8], [7.6, 10.6]], sup, run)}
      ${ipipe([[7.6, 10.6], [9, 10.6], [9, 14]], sup, run && !b)}
      ${ipipe([[7.6, 10.6], [7.6, 11.6], [5, 11.6], [5, 14]], sup, run && b)}
      ${ipipe([[8, 14], [8, 12.8], [6, 12.8]], ret, run && !b)}
      ${ipipe([[6, 14], [6, 12.8]], ret, run && b)}
      ${ipipe([[6, 12.8], [2, 12.8], [2, 14]], ret, run)}
      ${iheater([4.3, 3.4], 5.4, aux)}
      ${ivalve([7.6, 10.6], b, ["u", "r", "d"])}
      ${ipump([4.3, 12.8], run, "l")}`;
  }
  return svg`
    ${casing(w, h, 10, "casing light")}
    ${body}
    ${variant === "wall_e" || variant === "tp70" ? nothing : svg`<text class="tag" x=${w / 2} y=${2.4 * C} text-anchor="middle">${name}</text>`}
  `;
}

function coilSpiral(x0: number, y0: number, x1: number, y1: number): string {
  const turns = 5;
  const step = (y1 - y0) / turns;
  let d = `M ${x1 * C} ${y0 * C - 2 * C}`;
  d += ` L ${x1 * C} ${y0 * C}`;
  for (let i = 0; i < turns; i++) {
    const y = (y0 + i * step) * C;
    d += ` C ${(x0 - 0.3) * C} ${y}, ${(x0 - 0.3) * C} ${y + (step / 2) * C}, ${x1 * C} ${y + (step / 2) * C}`;
    d += ` C ${(x1 + 0.3) * C} ${y + (step / 2) * C}, ${(x1 + 0.3) * C} ${y + step * C}, ${x0 * C} ${y + step * C}`;
  }
  return d;
}

// ------------------------------------------------------------ storage

function tank(ctx: IconCtx, kind: "buffer" | "dhw"): SVGTemplateResult {
  const { w, h, c, flags } = ctx;
  const top = ctx.num("temp_top");
  const bot = ctx.num("temp_bottom") ?? (top !== undefined ? top - 6 : undefined);
  const mid = ctx.num("temp_mid") ?? (top !== undefined && bot !== undefined ? (top + bot) / 2 : undefined);
  const gid = `tg-${c.id}`;
  const fallbackTop = kind === "dhw" ? "#ff4f8b" : "#ff7a45";
  const charging = flags.has("charging");
  const vol = c.props.volume ? `${c.props.volume} l` : "";
  const r = Math.min(w / 2, 2 * C);
  return svg`
    <defs>
      <linearGradient id=${gid} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.05" stop-color=${tempColor(top, fallbackTop)} />
        <stop offset="0.5" stop-color=${tempColor(mid, "#c084fc")} />
        <stop offset="0.95" stop-color=${tempColor(bot, "#4d9fff")} />
      </linearGradient>
    </defs>
    <rect class="insulation" x="-3" y="-3" width=${w + 6} height=${h + 6} rx=${r + 3} />
    <rect x="0" y="0" width=${w} height=${h} rx=${r} fill="url(#${gid})" class="tank-fill" />
    <rect class="tank-glass" x=${w * 0.1} y=${h * 0.06} width=${w * 0.12} height=${h * 0.88} rx=${w * 0.06} />
    ${kind === "dhw"
      ? svg`<path class=${charging ? "tank-coil hot" : "tank-coil"} d=${coilRight(w)} />
        <path class="dip" d="M 0 ${10 * C} H ${0.8 * C} V ${h - 0.4 * C}" />`
      : svg`
        <path class="dip" d="M ${2 * C} 0 V ${h - 0.5 * C}" />
        <path class="dip" d="M ${3 * C} 0 V ${h - 0.5 * C}" />
        ${[0.3, 0.55, 0.8].map((f) => svg`<line class="strat" x1=${w * 0.62} x2=${w * 0.9} y1=${h * f} y2=${h * f} />`)}`}
    <text class="tank-label" x=${w / 2} y=${h * (kind === "dhw" ? 0.3 : 0.5)} text-anchor="middle">${vol}</text>
    ${flags.has("disinfecting") ? svg`<text class="tank-badge" x=${w / 2} y=${h * 0.18} text-anchor="middle">60°</text>` : ""}
  `;
}

/** Heating coil entering at 4 cells and leaving at 9 cells on the right-hand side. */
function coilRight(w: number): string {
  const x1 = w;
  const xa = w * 0.78;
  const xb = w * 0.3;
  const y0 = 4 * C;
  const y1 = 9 * C;
  const turns = 5;
  const step = (y1 - y0) / turns;
  let d = `M ${x1} ${y0} H ${xa}`;
  for (let i = 0; i < turns; i++) {
    const y = y0 + i * step;
    d += ` C ${xb - 6} ${y}, ${xb - 6} ${y + step / 2}, ${xa} ${y + step / 2} C ${xa + 6} ${y + step / 2}, ${xa + 6} ${y + step}, ${xa} ${y + step}`;
  }
  return `${d} H ${x1}`;
}

function pump(ctx: IconCtx): SVGTemplateResult {
  const { w, h, flags } = ctx;
  const running = flags.has("running");
  const r = Math.min(w, h) / 2 - 2;
  const cx = w / 2;
  const cy = h / 2;
  return svg`
    ${running ? svg`<circle class="pump-glow pulse" cx=${cx} cy=${cy} r=${r + 5} />` : ""}
    <circle class=${running ? "pump-body on" : "pump-body"} cx=${cx} cy=${cy} r=${r} />
    <path class=${running ? "pump-tri on" : "pump-tri"} d="M ${cx - r * 0.5} ${cy - r * 0.82} L ${cx + r} ${cy} L ${cx - r * 0.5} ${cy + r * 0.82} Z" />
    <g transform="translate(${cx} ${cy})">
      <circle class=${running ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${r * 0.38} />
    </g>
  `;
}

function valve(ctx: IconCtx, mixer = false): SVGTemplateResult {
  const { w, h, flags } = ctx;
  const cx = w / 2;
  const cy = h / 2;
  const s = Math.min(w, h) / 2 - 2;
  const b = flags.has("b");
  const fill = (on: boolean) => (mixer ? "valve-tri on" : on ? "valve-tri on" : "valve-tri");
  return svg`
    <rect class="actuator" x=${cx - s * 0.35} y=${cy - s * 1.25} width=${s * 0.7} height=${s * 0.45} rx="2" />
    <line class="stem" x1=${cx} y1=${cy - s * 0.8} x2=${cx} y2=${cy} />
    <path class=${fill(true)} d="M ${cx - s} ${cy - s * 0.6} L ${cx} ${cy} L ${cx - s} ${cy + s * 0.6} Z" />
    <path class=${fill(!b)} d="M ${cx + s} ${cy - s * 0.6} L ${cx} ${cy} L ${cx + s} ${cy + s * 0.6} Z" />
    <path class=${fill(b)} d="M ${cx - s * 0.6} ${cy + s} L ${cx} ${cy} L ${cx + s * 0.6} ${cy + s} Z" />
    ${mixer ? "" : svg`<text class="valve-tag" x=${cx + s * 0.5} y=${cy - s * 0.75}>${b ? "B" : "A"}</text>`}
  `;
}

function radiators(ctx: IconCtx): SVGTemplateResult {
  const { w, h } = ctx;
  const flow = ctx.num("flow_temp");
  const ret = ctx.num("return_temp");
  const room = ctx.num("room_temp");
  const warm = flow !== undefined && room !== undefined ? flow - room > 6 : false;
  const fins = 9;
  const top = 0.45 * C; // supply connection at 1 cell sits in the upper header
  const bottom = h - 0.45 * C; // return connection at 5 cells in the lower header
  const fw = (w - 20) / fins;
  const gid = `rg-${ctx.c.id}`;
  return svg`
    <defs><linearGradient id=${gid} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color=${tempColor(flow, "#8b949e")} stop-opacity=${warm ? 0.85 : 0.25} />
      <stop offset="1" stop-color=${tempColor(ret, "#8b949e")} stop-opacity=${warm ? 0.6 : 0.2} />
    </linearGradient></defs>
    ${warm
      ? [0.3, 0.55, 0.8].map(
          (f, i) => svg`<path class="heat-wave" style="animation-delay:${i * 0.6}s" d="M ${w * f} ${top - 4} q 5 -6 0 -12 q -5 -6 0 -12" />`,
        )
      : ""}
    ${ctx.c.props?.variant === "bottom"
      ? svg`<line class="rad-stub" x1=${4 * C} x2=${4 * C} y1=${bottom - 2} y2=${h} /><line class="rad-stub" x1=${6 * C} x2=${6 * C} y1=${bottom - 2} y2=${h} />`
      : ""}
    <rect class="rad-frame" x="0" y=${top} width=${w - 4} height=${bottom - top} rx="6" />
    <rect class="rad-header" x="0" y=${C - 4} width=${w - 4} height="8" rx="4" />
    <rect class="rad-header" x="0" y=${5 * C - 4} width=${w - 4} height="8" rx="4" />
    ${Array.from({ length: fins }, (_, i) => svg`<rect x=${12 + i * fw} y=${top + 6} width=${fw - 3} height=${bottom - top - 12} rx=${(fw - 3) / 2} fill="url(#${gid})" class="fin" />`)}
  `;
}

function floor(ctx: IconCtx): SVGTemplateResult {
  const { w, h } = ctx;
  const flow = ctx.num("flow_temp");
  const color = tempColor(flow, "#8b949e");
  let d = `M 10 ${h * 0.25}`;
  const rows = 5;
  for (let i = 0; i < rows; i++) {
    d += i % 2 === 0 ? ` H ${w - 12} q 6 0 6 ${(h * 0.3) / rows} q 0 ${(h * 0.3) / rows} -6 ${(h * 0.3) / rows}` : ` H 16 q -6 0 -6 ${(h * 0.3) / rows} q 0 ${(h * 0.3) / rows} 6 ${(h * 0.3) / rows}`;
  }
  return svg`
    <rect class="floor-slab" x="2" y=${h * 0.15} width=${w - 4} height=${h * 0.75} rx="6" />
    <path d=${d} fill="none" stroke=${color} stroke-width="3" stroke-linecap="round" opacity="0.9" />
  `;
}

function shower(ctx: IconCtx): SVGTemplateResult {
  const { w, flags } = ctx;
  const flowing = flags.has("flowing");
  // arm from the supply (right) to a round shower head, water falling from it
  const hx = 1.3 * C;
  const hy = 1.6 * C;
  return svg`
    <path class="tap-body" d="M ${w} ${C - 3} H ${hx + 6} v 6 H ${w} Z" />
    <path class="tap-body" d="M ${hx + 4} ${C - 3} v ${hy - C - 3} h -4 v ${-(hy - C - 3)} Z" />
    <path class="tap-handle" d="M ${hx - 16} ${hy + 4} L ${hx - 10} ${hy - 5} H ${hx + 14} L ${hx + 20} ${hy + 4} Z" />
    ${[0, 1, 2, 3, 4].map((i) => {
      const x = hx - 12 + i * 7;
      return flowing
        ? svg`<line class="shower-jet" style="animation-delay:${(i % 3) * 0.18}s" x1=${x} y1=${hy + 8} x2=${x + (i - 2) * 3} y2=${hy + 2.8 * C} />`
        : svg`<circle class="shower-hole" cx=${x} cy=${hy + 6} r="1.4" />`;
    })}
  `;
}

function tap(ctx: IconCtx): SVGTemplateResult {
  if (ctx.c.props?.variant === "shower") return shower(ctx);
  const { w, h, flags } = ctx;
  const flowing = flags.has("flowing");
  // spout points left, supply comes from the right
  return svg`
    <path class="tap-body" d="M ${w} ${h * 0.25} H ${w * 0.45} a ${w * 0.25} ${w * 0.25} 0 0 0 ${-w * 0.25} ${w * 0.25} V ${h * 0.62} h ${w * 0.16} V ${h * 0.52} a ${w * 0.1} ${w * 0.1} 0 0 1 ${w * 0.1} ${-w * 0.1} H ${w} Z" />
    <rect class="tap-handle" x=${w * 0.46} y=${h * 0.06} width=${w * 0.26} height=${h * 0.12} rx="3" />
    ${flowing
      ? [0, 1, 2].map((i) => svg`<circle class="drop" style="animation-delay:${i * 0.25}s" cx=${w * 0.28} cy=${h * 0.7} r="2.5" />`)
      : ""}
  `;
}

function inlet(ctx: IconCtx): SVGTemplateResult {
  const { w, h } = ctx;
  return svg`
    <rect class="casing" x="0" y=${h * 0.2} width=${w} height=${h * 0.6} rx="5" />
    <text class="tag" x=${w * 0.45} y=${h * 0.62} text-anchor="middle">KW</text>
  `;
}

function separator(ctx: IconCtx): SVGTemplateResult {
  const { w, h, c } = ctx;
  if (c.props.filter) {
    // particle filter with sieve
    return svg`
      <rect class="casing" x=${w * 0.15} y=${h * 0.1} width=${w * 0.7} height=${h * 0.8} rx="5" />
      ${[0.3, 0.45, 0.6, 0.75].map((f) => svg`<line class="sieve" x1=${w * 0.25} x2=${w * 0.75} y1=${h * f} y2=${h * f} />`)}
      ${[0.35, 0.5, 0.65].map((f) => svg`<line class="sieve" x1=${w * f} x2=${w * f} y1=${h * 0.22} y2=${h * 0.8} />`)}`;
  }
  return svg`
    <rect class="casing" x=${w * 0.2} y="0" width=${w * 0.6} height=${h} rx=${w * 0.3} />
    <path class="magnet" d="M ${w * 0.38} ${h * 0.3} v ${h * 0.25} a ${w * 0.12} ${w * 0.12} 0 0 0 ${w * 0.24} 0 v ${-h * 0.25}" />
  `;
}

function vessel(ctx: IconCtx): SVGTemplateResult {
  const { w, h } = ctx;
  return svg`
    <line class="stem" x1=${w / 2} y1=${h * 0.8} x2=${w / 2} y2=${h} />
    <rect class="vessel" x="0" y="0" width=${w} height=${h * 0.82} rx=${w / 2} />
    <rect class="sheen" x=${w * 0.18} y=${h * 0.08} width=${w * 0.2} height=${h * 0.6} rx=${w * 0.1} />
  `;
}

export function renderDefaultIcon(ctx: IconCtx): SVGTemplateResult {
  switch (ctx.c.type) {
    case "outdoor_unit":
      return outdoor(ctx);
    case "indoor_unit":
      return indoor(ctx, variantOf(ctx.c)?.id || "wall_e");
    case "buffer":
      return tank(ctx, "buffer");
    case "dhw_tank":
      return tank(ctx, "dhw");
    case "pump":
      return pump(ctx);
    case "valve_3way":
      return valve(ctx);
    case "mixer":
      return valve(ctx, true);
    case "radiators":
      return radiators(ctx);
    case "floor_heating":
      return floor(ctx);
    case "tap":
      return tap(ctx);
    case "water_inlet":
      return inlet(ctx);
    case "separator":
      return separator(ctx);
    case "expansion_vessel":
      return vessel(ctx);
    case "junction":
      return svg`<circle class="junction" r="4" />`;
    default:
      return svg``;
  }
}

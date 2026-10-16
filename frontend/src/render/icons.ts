/**
 * Default component artwork. All drawings are original, brand-neutral shapes
 * so the project ships without manufacturer graphics.
 */

import { svg, type SVGTemplateResult } from "lit";
import { outdoorModel } from "../catalog";
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
  const dur = speed > 0 ? Math.max(0.35, 2.2 - speed / 50) : 0;
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

function indoor(ctx: IconCtx): SVGTemplateResult {
  const { w, h, flags, c } = ctx;
  const act = [...flags].find((f) => f.startsWith("mode_"))?.slice(5);
  const modeColor = MODE_COLORS[act || "off"] || MODE_COLORS.off;
  const aux = flags.has("aux");
  const sup = ctx.num("supply_temp");
  const ret = ctx.num("return_temp");
  const short = (c.model || "").includes("wlw186i") ? "WLW186i" : (c.model || "").includes("wlw176i") ? "WLW176i" : "";
  const y1 = 2 * 20;
  const y2 = 8 * 20;
  return svg`
    ${casing(w, h, 10, "casing light")}
    <rect class="screen" x=${w * 0.18} y=${h * 0.08} width=${w * 0.64} height=${h * 0.11} rx="4" />
    <rect x=${w * 0.22} y=${h * 0.105} width=${w * 0.14} height=${h * 0.06} rx="2" fill=${modeColor} class=${act && act !== "off" ? "pulse" : ""} />
    <text class="screen-text" x=${w * 0.42} y=${h * 0.155}>${act ? t(`mode.${act}`) : ""}</text>
    <path class="internal" style="stroke:${tempColor(sup, "#ff7a45")}" d="M0 ${y1} H ${w * 0.3} M ${w * 0.7} ${y1} H ${w}" />
    <path class="internal" style="stroke:${tempColor(ret, "#4d9fff")}" d="M0 ${y2} H ${w}" />
    <g transform="translate(${w * 0.3} ${y1 - 9})">
      <rect class=${aux ? "rod hot" : "rod"} x="0" y="0" width=${w * 0.4} height="18" rx="9" />
      <path class=${aux ? "coil hot" : "coil"} d=${zigzag(6, 9, w * 0.4 - 12, 5, 7)} />
    </g>
    ${aux ? svg`<rect class="aux-glow pulse" x=${w * 0.26} y=${y1 - 14} width=${w * 0.48} height="28" rx="14" />` : ""}
    <text class="tag" x=${w / 2} y=${h * 0.93} text-anchor="middle">${short}</text>
  `;
}

function zigzag(x: number, y: number, len: number, amp: number, n: number): string {
  const step = len / n;
  let d = `M${x} ${y}`;
  for (let i = 1; i <= n; i++) d += ` L${x + i * step} ${y + (i % 2 ? -amp : amp)}`;
  return d;
}

function tank(ctx: IconCtx, kind: "buffer" | "dhw"): SVGTemplateResult {
  const { w, h, c, flags } = ctx;
  const top = ctx.num("temp_top");
  const bot = ctx.num("temp_bottom") ?? (top !== undefined ? top - 6 : undefined);
  const mid = ctx.num("temp_mid") ?? (top !== undefined && bot !== undefined ? (top + bot) / 2 : undefined);
  const gid = `tg-${c.id}`;
  const fallbackTop = kind === "dhw" ? "#ff4f8b" : "#ff7a45";
  const charging = flags.has("charging");
  const vol = c.props.volume ? `${c.props.volume} l` : "";
  const r = w / 2;
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
    <rect class="tank-glass" x=${w * 0.12} y=${h * 0.06} width=${w * 0.16} height=${h * 0.88} rx=${w * 0.08} />
    ${kind === "dhw"
      ? svg`<path class=${charging ? "tank-coil hot" : "tank-coil"} d=${coilPath(w, h)} />`
      : svg`${[0.25, 0.5, 0.75].map((f) => svg`<line class="strat" x1=${w * 0.35} x2=${w * 0.85} y1=${h * f} y2=${h * f} />`)}`}
    <text class="tank-label" x=${w / 2} y=${h * (kind === "dhw" ? 0.3 : 0.52)} text-anchor="middle">${vol}</text>
    ${flags.has("disinfecting") ? svg`<text class="tank-badge" x=${w / 2} y=${h * 0.18} text-anchor="middle">60°</text>` : ""}
  `;
}

function coilPath(w: number, h: number): string {
  const x0 = w * 0.25;
  const x1 = w * 0.78;
  const y0 = 5 * 20;
  const y1 = 9 * 20;
  const turns = 5;
  const step = (y1 - y0) / turns;
  let d = `M0 ${y0} H ${x0}`;
  for (let i = 0; i < turns; i++) {
    const y = y0 + i * step;
    d += ` C ${x1 + 6} ${y}, ${x1 + 6} ${y + step / 2}, ${x0} ${y + step / 2} C ${x0 - 6} ${y + step / 2}, ${x0 - 6} ${y + step}, ${x0} ${y + step}`;
  }
  return `${d} H 0`;
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
  const fw = (w - 16) / fins;
  const gid = `rg-${ctx.c.id}`;
  return svg`
    <defs><linearGradient id=${gid} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color=${tempColor(flow, "#8b949e")} stop-opacity=${warm ? 0.85 : 0.25} />
      <stop offset="1" stop-color=${tempColor(ret, "#8b949e")} stop-opacity=${warm ? 0.6 : 0.2} />
    </linearGradient></defs>
    ${warm
      ? [0.25, 0.5, 0.75].map(
          (f, i) => svg`<path class="heat-wave" style="animation-delay:${i * 0.6}s" d="M ${w * f} ${h * 0.12} q 5 -6 0 -12 q -5 -6 0 -12" />`,
        )
      : ""}
    <rect class="rad-frame" x="4" y=${h * 0.18} width=${w - 8} height=${h * 0.72} rx="6" />
    ${Array.from({ length: fins }, (_, i) => svg`<rect x=${8 + i * fw + 1} y=${h * 0.22} width=${fw - 3} height=${h * 0.64} rx=${(fw - 3) / 2} fill="url(#${gid})" class="fin" />`)}
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

function tap(ctx: IconCtx): SVGTemplateResult {
  const { w, h, flags } = ctx;
  const flowing = flags.has("flowing");
  return svg`
    <path class="tap-body" d="M 0 ${h * 0.25} H ${w * 0.55} a ${w * 0.25} ${w * 0.25} 0 0 1 ${w * 0.25} ${w * 0.25} V ${h * 0.62} h ${-w * 0.16} V ${h * 0.52} a ${w * 0.1} ${w * 0.1} 0 0 0 ${-w * 0.1} ${-w * 0.1} H 0 Z" />
    <rect class="tap-handle" x=${w * 0.28} y=${h * 0.06} width=${w * 0.26} height=${h * 0.12} rx="3" />
    ${flowing
      ? [0, 1, 2].map(
          (i) => svg`<circle class="drop" style="animation-delay:${i * 0.25}s" cx=${w * 0.72} cy=${h * 0.7} r="2.5" />`,
        )
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
  const { w, h } = ctx;
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
      return indoor(ctx);
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

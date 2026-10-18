import { LitElement, css, html, svg, nothing, type PropertyValues, type SVGTemplateResult } from "lit";
import { CELL, TYPES, anchoredSlots, badgesOf, baseSize, outdoorModel, portPos, portsOf, sizeOf, slotsOf } from "../catalog";
import { shortLabel, slotLabel, t } from "../i18n";
import type { Pipe, PipeKind, Plant, PlantComponent, PortRef, UserIcon } from "../types";
import {
  pipeColor,
  componentFlags,
  formatValue,
  kindOf,
  pipeActive,
  pipeTemps,
  tempColor,
  type ValueSource,
} from "../data/values";
import { renderDefaultIcon } from "./icons";
import { pathD, routePipe, type Pt } from "./routing";

export type Selection = { kind: "c" | "p"; id: string } | null;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

const PILL_H = 18;

/** 2.5D style: depth vector of the extrusion (back and up-right) and its step count */
const ISO_DX = 16;
const ISO_DY = 10;
const ISO_STEPS = 8;

interface IsoBox {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

/** Solid body outline of a default icon in local px (unrotated), or null when it has no solid body. */
function isoBody(c: PlantComponent, w: number, h: number): IsoBox | null {
  if (c.icon) return null;
  switch (c.type) {
    case "outdoor_unit":
      return outdoorModel(c.model).source === "brine" ? { x: 0, y: 0, w, h: h * 0.55, r: 10 } : { x: 0, y: 0, w, h, r: 12 };
    case "indoor_unit":
      return { x: 0, y: 0, w, h, r: 10 };
    case "buffer":
    case "dhw_tank": {
      const r = Math.min(w / 2, 2 * CELL);
      return { x: -3, y: -3, w: w + 6, h: h + 6, r: r + 3 };
    }
    case "pump": {
      const r = Math.min(w, h) / 2 - 2;
      return { x: w / 2 - r, y: h / 2 - r, w: 2 * r, h: 2 * r, r };
    }
    case "radiators":
      return { x: 0, y: 0.45 * CELL, w: w - 4, h: h - 0.9 * CELL, r: 6 };
    case "floor_heating":
      return { x: 2, y: h * 0.15, w: w - 4, h: h * 0.75, r: 6 };
    case "water_inlet":
      return { x: 0, y: h * 0.2, w, h: h * 0.6, r: 5 };
    case "separator":
      return c.props.filter ? { x: w * 0.15, y: h * 0.1, w: w * 0.7, h: h * 0.8, r: 5 } : { x: w * 0.2, y: 0, w: w * 0.6, h, r: w * 0.3 };
    case "expansion_vessel":
      return { x: 0, y: 0, w, h: h * 0.82, r: w / 2 };
    case "value_tile":
      return { x: 0, y: 0, w, h, r: 10 };
    default:
      return null;
  }
}

interface PillPos {
  c: PlantComponent;
  slot: string;
  x: number;
  y: number;
  w: number;
}

const CHIP_W = 88;
const CHIP_H = 34;
const CHIP_GAP = 6;

function short(text: string, max = 17): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export class CpSchematic extends LitElement {
  static properties = {
    plant: { attribute: false },
    src: { attribute: false },
    icons: { attribute: false },
    edit: { type: Boolean },
    autoHeight: { type: Boolean, attribute: "auto-height" },
    selected: { attribute: false },
    version: { type: Number },
    _view: { state: true },
    _drag: { state: true },
    _valueDrag: { state: true },
    _connect: { state: true },
    _guides: { state: true },
    gridStep: { type: Number },
    showGrid: { type: Boolean },
    snapGrid: { type: Boolean },
    snapObjects: { type: Boolean },
  };
  /** editor: grid spacing in cells, shown as lines, positions snap to it */
  gridStep = 1;
  showGrid = false;
  snapGrid = true;
  /** editor: align with ports and edges of other parts while dragging */
  snapObjects = true;
  private _guides: { x?: number; y?: number } = {};

  plant!: Plant;
  src!: ValueSource;
  icons: Map<string, UserIcon> = new Map();
  edit = false;
  /** size own height from the content aspect ratio (narrow screens) */
  autoHeight = false;
  selected: Selection = null;
  version = 0;

  private _view: Box | null = null;
  private _drag: { id: string; dx: number; dy: number } | null = null;
  /** editor: value field being dragged (pixel position of its top left corner) */
  private _valueDrag: { id: string; slot: string; x: number; y: number } | null = null;
  private _connect: PortRef | null = null;
  private _pointers = new Map<number, { x: number; y: number }>();
  private _gesture: any = null;
  private _segments: { x1: number; x2: number; y1: number; y2: number }[] = [];
  private _pills: PillPos[] = [];

  /** Does any pipe pass through the given pixel rectangle (with a small margin)? */
  private _hitsPipe(x1: number, y1: number, x2: number, y2: number): boolean {
    const m = 5;
    return this._segments.some((s) => s.x1 <= x2 + m && s.x2 >= x1 - m && s.y1 <= y2 + m && s.y2 >= y1 - m);
  }
  private _lastMoved = false;
  private _structureKey = "";
  private _resizeObs?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this._resizeObs = new ResizeObserver(() => this.requestUpdate());
    this._resizeObs.observe(this);
    window.addEventListener("keydown", this._onKey);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObs?.disconnect();
    window.removeEventListener("keydown", this._onKey);
  }

  private _onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this._connect) {
      this._connect = null;
    }
  };

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("plant") && this.plant) {
      const key = `${this.plant.components.length}:${this.plant.grid.w}x${this.plant.grid.h}`;
      if (key !== this._structureKey || !this._view) {
        this._structureKey = key;
        if (!this.edit || !this._view) this._view = null;
      }
    }
  }

  protected updated(): void {
    if (!this.autoHeight) {
      // back from the narrow layout: let the stage size the schematic again
      if (this.style.height) this.style.height = "";
      return;
    }
    if (!this.plant) return;
    const box = this._contentBox();
    const width = this.getBoundingClientRect().width;
    // not laid out (hidden): keep the last height instead of collapsing to the minimum
    if (width <= 0) return;
    const h = Math.round(Math.max(240, Math.min(window.innerHeight * 0.75, (width * box.h) / box.w)));
    if (this.style.height !== `${h}px`) this.style.height = `${h}px`;
  }

  /** Fit view to content. */
  fit(): void {
    this._view = null;
    this.requestUpdate();
  }

  zoom(factor: number): void {
    const v = this._view || this._contentBox();
    const cx = v.x + v.w / 2;
    const cy = v.y + v.h / 2;
    this._view = { x: cx - (v.w * factor) / 2, y: cy - (v.h * factor) / 2, w: v.w * factor, h: v.h * factor };
  }

  // ------------------------------------------------------------- layout

  private _comp(c: PlantComponent): PlantComponent {
    if (this._drag && this._drag.id === c.id) return { ...c, x: this._drag.dx, y: this._drag.dy };
    return c;
  }

  private _shownSlots(c: PlantComponent): string[] {
    const slots = c.show ?? slotsOf(c).filter((s) => s.show).map((s) => s.key);
    return slots.filter((s) => this.src.get(c, s) !== undefined || (this.edit && !!c.bindings?.[s]));
  }

  /** Slots shown in the component's value list (not anchored to a pipe or a measuring point). */
  private _listSlots(c: PlantComponent): string[] {
    const anchored = new Set(anchoredSlots(c).filter((s) => s.at || s.pos).map((s) => s.key));
    return this._shownSlots(c).filter((s) => !anchored.has(s));
  }

  /** Position of a value field: dragged, moved in the editor, or the automatic one. */
  private _valueAt(c: PlantComponent, slot: string, x: number, y: number): { x: number; y: number } {
    const d = this._valueDrag;
    if (d && d.id === c.id && d.slot === slot) return { x: d.x, y: d.y };
    const p = c.valuePos?.[slot];
    return p ? { x: (c.x + p[0]) * CELL, y: (c.y + p[1]) * CELL } : { x, y };
  }

  private _badgeLayout(c: PlantComponent): { slot: string; x: number; y: number; w?: number }[] {
    return this._autoBadges(c).map((b) => ({ ...b, ...this._valueAt(c, b.slot, b.x, b.y) }));
  }

  private _autoBadges(c: PlantComponent): { slot: string; x: number; y: number; w?: number }[] {
    const badges = badgesOf(c);
    if (badges === "none" || badges === "inside") return [];
    const slots = this._listSlots(c);
    if (!slots.length) return [];
    const { w, h } = sizeOf(c);
    const x = c.x * CELL;
    const y = c.y * CELL;
    const wpx = w * CELL;
    const hpx = h * CELL;
    const out: { slot: string; x: number; y: number; w?: number }[] = [];
    if (badges === "tank") {
      const pos: Record<string, number> = { temp_top: 0.16, temp_mid: 0.48, temp_bottom: 0.8 };
      const below: string[] = [];
      for (const slot of slots) {
        if (slot in pos) out.push({ slot, x: x + 5, y: y + hpx * pos[slot] - 11, w: wpx - 10 });
        else below.push(slot);
      }
      // further values next to the tank, on a side without pipes
      const n = below.length;
      const stackH = n * (CHIP_H + CHIP_GAP);
      const options = [
        { x: x + wpx / 2 - CHIP_W / 2, y: y + hpx + 26, dy: CHIP_H + CHIP_GAP },
        { x: x + wpx + 12, y: y + hpx * 0.35, dy: CHIP_H + CHIP_GAP },
        { x: x - 12 - CHIP_W, y: y + hpx * 0.35, dy: CHIP_H + CHIP_GAP },
      ];
      const pick = options.find((o) => !this._hitsPipe(o.x, o.y, o.x + CHIP_W, o.y + stackH)) || options[0];
      below.forEach((slot, i) => out.push({ slot, x: pick.x, y: pick.y + i * pick.dy }));
      return out;
    }
    if (badges === "right") {
      slots.forEach((slot, i) => out.push({ slot, x: x + wpx + 12, y: y + 4 + i * (CHIP_H + CHIP_GAP) }));
    } else if (badges === "left") {
      slots.forEach((slot, i) => out.push({ slot, x: x - 12 - CHIP_W, y: y + 4 + i * (CHIP_H + CHIP_GAP) }));
    } else if (badges === "above" && (c.rot === 90 || c.rot === 270) && slots.length <= 2) {
      // part in a vertical run: values beside it, on the side without pipes
      const stackH = slots.length * (CHIP_H + CHIP_GAP) - CHIP_GAP;
      // flush with the top, so the name beside the part stays readable
      const y0 = y + hpx - 6 - stackH;
      const right = x + wpx + 10;
      const left = x - 10 - CHIP_W;
      const sx = !this._hitsPipe(right, y0, right + CHIP_W, y0 + stackH) || this._hitsPipe(left, y0, left + CHIP_W, y0 + stackH) ? right : left;
      slots.forEach((slot, i) => out.push({ slot, x: sx, y: y0 + i * (CHIP_H + CHIP_GAP) }));
    } else if (badges === "above") {
      // rows of three in catalog order, stacked upwards; further rows start flush with the first one
      const order = slotsOf(c).map((s) => s.key);
      slots.sort((p, q) => order.indexOf(p) - order.indexOf(q));
      const total = Math.min(3, slots.length) * (CHIP_W + CHIP_GAP) - CHIP_GAP;
      const x0 = x + wpx / 2 - total / 2;
      slots.forEach((slot, i) =>
        out.push({ slot, x: x0 + (i % 3) * (CHIP_W + CHIP_GAP), y: y - CHIP_H - 10 - Math.floor(i / 3) * (CHIP_H + CHIP_GAP) }),
      );
    } else {
      const cols = Math.max(2, Math.floor((wpx + 40) / (CHIP_W + CHIP_GAP)));
      const rows = Math.ceil(slots.length / cols);
      slots.forEach((slot, i) => {
        const row = Math.floor(i / cols);
        const inRow = row === rows - 1 ? slots.length - row * cols : cols;
        const total = inRow * (CHIP_W + CHIP_GAP) - CHIP_GAP;
        out.push({
          slot,
          x: x + wpx / 2 - total / 2 + (i % cols) * (CHIP_W + CHIP_GAP),
          y: y + hpx + 26 + row * (CHIP_H + CHIP_GAP),
        });
      });
    }
    return out;
  }

  private _contentBox(): Box {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    const add = (x: number, y: number) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    };
    for (const c of this.plant.components) {
      const { w, h } = sizeOf(c);
      add(c.x * CELL - 6, c.y * CELL - 6);
      add((c.x + w) * CELL + 6, (c.y + h) * CELL + 22);
      // parts connected from below get their name beside them: keep it in view
      if (c.label && portsOf(c).some((pt) => portPos(c, pt.id)?.dir === "b")) {
        add((c.x + w) * CELL + 12 + Math.min(28, c.label.length) * 7.5, (c.y + h) * CELL);
      }
      for (const b of this._badgeLayout(c)) {
        add(b.x, b.y);
        add(b.x + CHIP_W, b.y + CHIP_H);
      }
    }
    for (const p of this._pills) {
      add(p.x, p.y);
      add(p.x + p.w, p.y + PILL_H);
    }
    if (this.edit || !Number.isFinite(minX)) {
      add(0, 0);
      add(this.plant.grid.w * CELL, this.plant.grid.h * CELL);
    }
    const pad = 24;
    return { x: minX - pad, y: minY - pad, w: maxX - minX + 2 * pad, h: maxY - minY + 2 * pad };
  }

  // -------------------------------------------------------------- render

  render() {
    if (!this.plant) return nothing;
    const view = this._view || this._contentBox();
    const byId = new Map(this.plant.components.map((c) => [c.id, this._comp(c)]));
    const flags = new Map(this.plant.components.map((c) => [c.id, componentFlags(c, this.src)]));
    const temps = pipeTemps(this.plant, this.src);
    const routes = this.plant.pipes.map((p) => ({ pipe: p, route: routePipe(p, byId) }));
    this._segments = routes.flatMap(({ route }) =>
      (route?.pts || []).slice(1).map((b, i) => {
        const a = route!.pts[i];
        return { x1: Math.min(a.x, b.x) * CELL, x2: Math.max(a.x, b.x) * CELL, y1: Math.min(a.y, b.y) * CELL, y2: Math.max(a.y, b.y) * CELL };
      }),
    );

    this._pills = this._placePills(byId, routes);

    return html`
      <svg
        class=${this.edit ? "edit" : ""}
        viewBox="${view.x} ${view.y} ${view.w} ${view.h}"
        preserveAspectRatio="xMidYMid meet"
        @pointerdown=${this._onBgDown}
        @pointermove=${this._onMove}
        @pointerup=${this._onUp}
        @pointercancel=${this._onUp}
        @wheel=${this._onWheel}
      >
        ${this._building(view)}
        ${this._iso && !this.edit ? this._isoFloor(view) : nothing}
        ${this.edit ? this._grid() : nothing}
        ${this._iso ? this._isoLayer() : nothing}
        <g class="pipes ${this._iso ? "iso" : ""}">
          ${routes.map(({ pipe, route }) => {
            if (!route) return nothing;
            const d = pathD(route.pts);
            const active = pipeActive(pipe, flags);
            const color = pipeColor(pipe.kind, temps.get(pipe.id));
            const sel = this.selected?.kind === "p" && this.selected.id === pipe.id;
            return svg`<g class="pipe ${active ? "active" : ""} ${sel ? "selected" : ""}" data-pipe=${pipe.id}
                @pointerdown=${(e: PointerEvent) => this._onPipeDown(e, pipe.id)}>
              <path class="pipe-hit" d=${d} />
              ${sel ? svg`<path class="pipe-sel" d=${d} />` : nothing}
              <path class="pipe-outline" d=${d} />
              ${this._iso ? svg`<path class="pipe-depth" d=${d} style="stroke:${color}" />` : nothing}
              ${active ? svg`<path class="pipe-halo" d=${d} style="stroke:${color}" />` : nothing}
              <path class="pipe-base" d=${d} style="stroke:${color}" />
              ${this._iso ? svg`<path class="pipe-gloss" d=${d} />` : nothing}
              ${active ? svg`<path class="pipe-flow" d=${d} />` : nothing}
            </g>`;
          })}
        </g>
        <g class="components">
          ${this.plant.components.map((c0) => this._component(byId.get(c0.id)!, flags.get(c0.id)!))}
        </g>
        <g class="pills">${this._pills.map((p) => this._anchorPill(p))}</g>
        ${this.edit ? this._editOverlays(byId, routes) : nothing}
        ${this.edit ? this._guideLines() : nothing}
      </svg>
    `;
  }

  private _grid(): SVGTemplateResult {
    const { w, h } = this.plant.grid;
    if (!this.showGrid) {
      return svg`
        <defs><pattern id="cp-grid" width=${CELL} height=${CELL} patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1" class="grid-dot" />
        </pattern></defs>
        <rect class="grid-bg" x="0" y="0" width=${w * CELL} height=${h * CELL} fill="url(#cp-grid)" />`;
    }
    // lines every gridStep cells, every fifth line stronger
    const s = Math.max(1, this.gridStep) * CELL;
    const major = s * 5;
    return svg`
      <defs>
        <pattern id="cp-grid-minor" width=${s} height=${s} patternUnits="userSpaceOnUse">
          <path d="M ${s} 0 L 0 0 0 ${s}" class="grid-line" />
        </pattern>
        <pattern id="cp-grid-major" width=${major} height=${major} patternUnits="userSpaceOnUse">
          <rect width=${major} height=${major} fill="url(#cp-grid-minor)" />
          <path d="M ${major} 0 L 0 0 0 ${major}" class="grid-line major" />
        </pattern>
      </defs>
      <rect class="grid-bg" x="0" y="0" width=${w * CELL} height=${h * CELL} fill="url(#cp-grid-major)" />`;
  }

  /** Alignment guides of the object snap while dragging. */
  private _guideLines(): SVGTemplateResult | typeof nothing {
    const { x, y } = this._guides;
    if (x === undefined && y === undefined) return nothing;
    const { w, h } = this.plant.grid;
    return svg`<g class="guides">
      ${x !== undefined ? svg`<line x1=${x * CELL} x2=${x * CELL} y1="0" y2=${h * CELL} />` : nothing}
      ${y !== undefined ? svg`<line x1="0" x2=${w * CELL} y1=${y * CELL} y2=${y * CELL} />` : nothing}
    </g>`;
  }

  private get _iso(): boolean {
    return this.plant?.settings?.style === "iso";
  }

  /** Body outline of a component in schematic px, honouring rotation and mirroring. */
  private _isoBox(c: PlantComponent): IsoBox | null {
    const def = { ...TYPES[c.type], ...baseSize(c) };
    const { w: sw, h: sh } = sizeOf(c);
    const wpx = (c.type === "value_tile" ? sw : def.w) * CELL;
    const hpx = (c.type === "value_tile" ? sh : def.h) * CELL;
    const b = isoBody(c, wpx, hpx);
    if (!b) return null;
    let { x, y, w, h } = b;
    if (c.flip && def.mirrorable) x = wpx - (x + w);
    const rot = def.rotatable ? c.rot || 0 : 0;
    if (rot === 90) [x, y, w, h] = [hpx - (y + h), x, h, w];
    else if (rot === 180) [x, y] = [wpx - (x + w), hpx - (y + h)];
    else if (rot === 270) [x, y, w, h] = [y, wpx - (x + w), h, w];
    return { x: c.x * CELL + x, y: c.y * CELL + y, w, h, r: Math.min(b.r, w / 2, h / 2) };
  }

  /** 2.5D: soft shadows and extruded bodies, drawn behind pipes and components. */
  private _isoLayer(): SVGTemplateResult {
    const boxes = this.plant.components.map((c) => this._isoBox(c)).filter((b): b is IsoBox => !!b);
    const steps = Array.from({ length: ISO_STEPS }, (_, i) => (ISO_STEPS - i) / ISO_STEPS);
    return svg`
      <defs>
        <linearGradient id="cp-iso-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style="stop-color: var(--cp-iso-top)" />
          <stop offset="0.22" style="stop-color: var(--cp-iso-side)" />
          <stop offset="1" style="stop-color: var(--cp-iso-side)" />
        </linearGradient>
        <filter id="cp-iso-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <g class="iso-shadows" filter="url(#cp-iso-blur)">
        ${boxes.map((b) => svg`<rect x=${b.x + 6} y=${b.y + 10} width=${b.w} height=${b.h} rx=${b.r} />`)}
      </g>
      <g class="iso-bodies">
        ${boxes.map((b) => steps.map((f) => svg`<rect x=${b.x + ISO_DX * f} y=${b.y - ISO_DY * f} width=${b.w} height=${b.h} rx=${b.r} fill="url(#cp-iso-grad)" />`))}
      </g>`;
  }

  /** Building section: ground, outer wall, ceiling and room names (settings.building). */
  private _building(view: { x: number; y: number; w: number; h: number }): SVGTemplateResult {
    const b = this.plant.settings?.building;
    if (!b || b.show === false) return svg``;
    const { w } = this.plant.grid;
    const F = b.floor * CELL;
    const G = (b.ground ?? b.floor) * CELL;
    const S = b.slab !== undefined ? b.slab * CELL : undefined;
    const left = Math.min(0, view.x) - CELL * 4;
    const right = Math.max(w * CELL, view.x + view.w) + CELL * 4;
    const top = Math.min(0, view.y) - CELL * 4;
    const bottom = Math.max(F, G) + CELL * 30;
    const hasWall = b.wall !== undefined;
    const W = hasWall ? b.wall! * CELL : left;
    const outRight = b.outside === "right";
    // inside / outside spans along x
    const [inX0, inX1] = !hasWall ? [left, right] : outRight ? [left, W] : [W, right];
    const [outX0, outX1] = outRight ? [W, right] : [left, W];
    return svg`<g class="building">
      ${hasWall
        ? svg`<rect class="outside" x=${outX0} y=${top} width=${outX1 - outX0} height=${G - top} />
            <rect class="ground" x=${outX0} y=${G} width=${outX1 - outX0} height=${bottom - G} />
            <line class="floor-line" x1=${outX0} x2=${outX1} y1=${G} y2=${G} />
            <text class="room" x=${outRight ? w * CELL - 14 : W - 14} y=${G - CELL * 13} text-anchor="end">${t("bld.outside")}</text>`
        : nothing}
      <rect class="ground" x=${inX0} y=${F} width=${inX1 - inX0} height=${bottom - F} />
      <line class="floor-line" x1=${inX0} x2=${inX1} y1=${F} y2=${F} />
      ${hasWall ? svg`<rect class="wall" x=${W - 7} y=${top} width="14" height=${F + CELL - top} />` : nothing}
      ${S !== undefined
        ? svg`<rect class="slab" x=${inX0} y=${S} width=${inX1 - inX0} height="10" />
            <text class="room" x=${outRight ? W - 14 : W + 14} y=${S - 8} text-anchor=${outRight ? "end" : "start"}>${t("bld.living")}</text>
            <text class="room" x=${outRight ? W - 14 : W + 14} y=${S + CELL * 5.6} text-anchor=${outRight ? "end" : "start"}>${t(G < F ? "bld.basement" : "bld.plant_room")}</text>`
        : nothing}
    </g>`;
  }

  /** Isometric floor: two families of lines at ±30°. */
  private _isoFloor(view: { x: number; y: number; w: number; h: number }): SVGTemplateResult {
    const pw = CELL * 2 * Math.sqrt(3);
    const ph = CELL * 2;
    return svg`
      <defs><pattern id="cp-iso-floor" width=${pw} height=${ph} patternUnits="userSpaceOnUse">
        <path d="M 0 ${ph} L ${pw} 0 M 0 0 L ${pw} ${ph}" class="iso-floor-line" />
      </pattern></defs>
      <rect x=${view.x - view.w} y=${view.y - view.h} width=${view.w * 3} height=${view.h * 3} fill="url(#cp-iso-floor)" class="iso-floor" />`;
  }

  private _transform(c: PlantComponent): string {
    const def = { ...TYPES[c.type], ...baseSize(c) };
    const rot = c.rot || 0;
    let base = `translate(${c.x * CELL} ${c.y * CELL})`;
    if (c.flip && def.mirrorable) base += ` translate(${def.w * CELL} 0) scale(-1 1)`;
    if (!def.rotatable || rot === 0) return base;
    if (rot === 90) return `${base} translate(${def.h * CELL} 0) rotate(90)`;
    if (rot === 180) return `${base} translate(${def.w * CELL} ${def.h * CELL}) rotate(180)`;
    return `${base} translate(0 ${def.w * CELL}) rotate(270)`;
  }

  private _component(c: PlantComponent, flags: Set<string>): SVGTemplateResult {
    const def = { ...TYPES[c.type], ...baseSize(c), ports: portsOf(c), badges: badgesOf(c) };
    const { w, h } = sizeOf(c);
    const wpx = (c.type === "value_tile" ? w : def.w) * CELL;
    const hpx = (c.type === "value_tile" ? h : def.h) * CELL;
    const num = (slot: string) => {
      const v = this.src.get(c, slot);
      return v?.available && v.num !== null ? v.num : undefined;
    };
    const text = (slot: string) => {
      const v = this.src.get(c, slot);
      return v?.available ? String(v.raw) : undefined;
    };
    const iconId = c.icon || this.plant.settings.typeIcons?.[c.type];
    const userIcon = iconId ? this.icons.get(iconId) : undefined;
    const sel = this.selected?.kind === "c" && this.selected.id === c.id;
    let body: SVGTemplateResult;
    if (c.type === "value_tile") body = this._tile(c, wpx, hpx);
    else if (c.type === "label") body = svg`<text class="free-label" x="0" y=${CELL} style="font-size:${c.props.size || 18}px">${c.props.text || c.label}</text>`;
    else if (userIcon) {
      body = svg`${flags.has("running") ? svg`<rect class="user-glow pulse" x="-4" y="-4" width=${wpx + 8} height=${hpx + 8} rx="10" />` : nothing}
        <image href=${userIcon.data_url} x="0" y="0" width=${wpx} height=${hpx} preserveAspectRatio="xMidYMid meet" />`;
    } else body = renderDefaultIcon({ c, w: wpx, h: hpx, flags, num, text });

    const showLabel = !["junction", "label", "value_tile"].includes(c.type);
    // a pipe leaving downwards near the middle would cross a centred label: put it beside the part
    const bottomPipe = def.ports.some((p) => {
      const pos = portPos(c, p.id);
      return pos?.dir === "b" && Math.abs(pos.x - (c.x + w / 2)) < Math.max(0.6, w * 0.35);
    });
    let labelX = (c.x + w / 2) * CELL;
    let labelY = (c.y + h) * CELL + (def.badges === "above" ? 16 : 18);
    let anchor = "middle";
    if (bottomPipe) {
      // beside the part, on whichever side no pipe runs through
      const textW = Math.min(28, c.label.length) * 7.5;
      labelY = (c.y + h) * CELL + 4;
      const right = (c.x + w) * CELL + 6;
      const left = c.x * CELL - 6;
      const rightBlocked = this._hitsPipe(right, labelY - 12, right + textW, labelY + 3);
      const leftBlocked = this._hitsPipe(left - textW, labelY - 12, left, labelY + 3);
      if (rightBlocked && !leftBlocked) {
        labelX = left;
        anchor = "end";
      } else {
        labelX = right;
        anchor = "start";
      }
    }
    return svg`
      <g class="comp ${sel ? "selected" : ""}" data-id=${c.id}
         @pointerdown=${(e: PointerEvent) => this._onCompDown(e, c)}>
        <g class=${c.flip && TYPES[c.type].mirrorable ? "flipped" : ""} transform=${this._transform(c)}>
          ${body}
        </g>
        <rect class="comp-hit" x=${c.x * CELL - (c.type === "junction" ? 8 : 0)} y=${c.y * CELL - (c.type === "junction" ? 8 : 0)}
          width=${Math.max(16, w * CELL)} height=${Math.max(16, h * CELL)} rx="8" />
        ${sel ? svg`<rect class="sel-outline" x=${c.x * CELL - 6} y=${c.y * CELL - 6} width=${w * CELL + 12} height=${h * CELL + 12} rx="10" />` : nothing}
        ${showLabel ? svg`<text class="comp-label" x=${labelX} y=${labelY} text-anchor=${anchor}>${short(c.label, 28)}</text>` : nothing}
      </g>
      ${this._badgeLayout(c).map((b) => (b.w ? this._pill(c, b.slot, b.x, b.y, b.w) : this._chip(c, b.slot, b.x, b.y)))}
    `;
  }

  private _chip(c: PlantComponent, slot: string, x: number, y: number): SVGTemplateResult {
    const v = this.src.get(c, slot);
    const kind = kindOf(c, slot);
    const { text, unit } = formatValue(v, kind);
    const label = c.type === "value_tile" ? slot : slotLabel(c.type, slot);
    const isTemp = kind === "temp" && v?.num !== null && v?.available;
    const accent = isTemp ? tempColor(v!.num!, "#8b949e") : "var(--cp-accent)";
    return svg`
      <g class="chip ${v?.available === false ? "na" : ""}" @click=${(e: MouseEvent) => this._slotClick(e, c, slot)}
        @pointerdown=${(e: PointerEvent) => this._onValueDown(e, c, slot, x, y, CHIP_W, CHIP_H)}>
        <rect x=${x} y=${y} width=${CHIP_W} height=${CHIP_H} rx="8" />
        <rect class="chip-accent" x=${x} y=${y + 7} width="3" height=${CHIP_H - 14} rx="1.5" style="fill:${accent}" />
        <text class="chip-label" x=${x + 10} y=${y + 13}>${short(label)}</text>
        <text class="chip-value" x=${x + 10} y=${y + 28}>${text}<tspan class="chip-unit" dx="2">${unit}</tspan></text>
      </g>`;
  }

  /**
   * Values anchored to a pipe ("at") sit on that pipe; values with a measuring point ("pos")
   * sit at that point. Positions avoid overlapping each other.
   */
  private _placePills(
    byId: Map<string, PlantComponent>,
    routes: { pipe: Pipe; route: { pts: Pt[]; horizontalStart: boolean } | null }[],
  ): PillPos[] {
    const placed: PillPos[] = [];
    // keep pipe pills off other parts and their labels
    const blocks = [...byId.values()]
      .filter((c) => !["junction", "label"].includes(c.type))
      .map((c) => {
        const { w, h } = sizeOf(c);
        return { x: c.x * CELL - 4, y: c.y * CELL - 4, w: w * CELL + 8, h: h * CELL + 26 };
      });
    // ... and off the value chips beside the parts
    for (const c of byId.values()) {
      for (const v of this._badgeLayout(c)) if (!v.w) blocks.push({ x: v.x - 4, y: v.y - 4, w: CHIP_W + 8, h: CHIP_H + 8 });
    }
    const free = (x: number, y: number, w: number, pipe = true) =>
      placed.every((p) => x + w + 4 <= p.x || x >= p.x + p.w + 4 || y + PILL_H + 3 <= p.y || y >= p.y + PILL_H + 3) &&
      (!pipe || blocks.every((b) => x + w <= b.x || x >= b.x + b.w || y + PILL_H <= b.y || y >= b.y + b.h));
    for (const c of byId.values()) {
      const shown = new Set(this._shownSlots(c));
      for (const s of anchoredSlots(c)) {
        if (!shown.has(s.key) || (!s.at && !s.pos)) continue;
        const w = this._pillWidth(c, s.key);
        if (c.valuePos?.[s.key] || (this._valueDrag?.id === c.id && this._valueDrag.slot === s.key)) {
          placed.push({ c, slot: s.key, ...this._valueAt(c, s.key, 0, 0), w });
          continue;
        }
        if (s.pos) {
          placed.push({ c, slot: s.key, x: (c.x + s.pos[0]) * CELL - w / 2, y: (c.y + s.pos[1]) * CELL - PILL_H / 2, w });
          continue;
        }
        let spot: { x: number; y: number } | null = null;
        // walk away from this component along the pipe (and through passive parts like filters)
        let at: { c: string; p: string } | null = { c: c.id, p: s.at! };
        const seen = new Set<string>();
        for (let hop = 0; hop < 4 && at && !spot; hop++) {
          const cur: { c: string; p: string } = at;
          const r = routes.find(
            ({ pipe }) => !seen.has(pipe.id) && ((pipe.from.c === cur.c && pipe.from.p === cur.p) || (pipe.to.c === cur.c && pipe.to.p === cur.p)),
          );
          at = null;
          if (!r?.route) break;
          seen.add(r.pipe.id);
          const forward = r.pipe.from.c === cur.c && r.pipe.from.p === cur.p;
          const pts = forward ? r.route.pts : [...r.route.pts].reverse();
          for (let i = 1; i < pts.length && !spot; i++) {
            const a = pts[i - 1];
            const b = pts[i];
            const len = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
            if (len < 1 || (a.x === b.x && len < 3)) continue;
            for (const f of [0.5, 0.35, 0.65, 0.2, 0.8]) {
              const cx = (a.x + (b.x - a.x) * f) * CELL;
              const cy = (a.y + (b.y - a.y) * f) * CELL;
              const horizontal = a.y === b.y;
              if (horizontal && len * CELL < w + 8) break;
              const x = cx - w / 2;
              const y = cy - PILL_H / 2;
              if (free(x, y, w)) {
                spot = { x, y };
                break;
              }
            }
          }
          // continue through a passive part (filter, separator, junction, pump) to the next pipe
          const other = forward ? r.pipe.to : r.pipe.from;
          const oc = byId.get(other.c);
          if (!spot && oc && TYPES[oc.type].passive && oc.type !== "pump") {
            const next = portsOf(oc).find((p) => p.id !== other.p && routes.some(({ pipe }) => !seen.has(pipe.id) && ((pipe.from.c === oc.id && pipe.from.p === p.id) || (pipe.to.c === oc.id && pipe.to.p === p.id))));
            if (next) at = { c: oc.id, p: next.id };
          }
        }
        if (!spot) {
          const pp = portPos(c, s.at!);
          if (!pp) continue;
          spot = { x: pp.x * CELL + 6, y: pp.y * CELL + 6 };
        }
        placed.push({ c, slot: s.key, ...spot, w });
      }
    }
    return placed;
  }

  private _pillWidth(c: PlantComponent, slot: string): number {
    const { text, unit } = formatValue(this.src.get(c, slot), kindOf(c, slot));
    return Math.round((shortLabel(c.type, slot).length + text.length + unit.length) * 6.4 + 22);
  }

  private _anchorPill(p: PillPos): SVGTemplateResult {
    const v = this.src.get(p.c, p.slot);
    const kind = kindOf(p.c, p.slot);
    const { text, unit } = formatValue(v, kind);
    const accent = kind === "temp" && v?.available && v.num !== null ? tempColor(v.num, "#8b949e") : "var(--cp-accent)";
    return svg`
      <g class="apill" @click=${(e: MouseEvent) => this._slotClick(e, p.c, p.slot)}
        @pointerdown=${(e: PointerEvent) => this._onValueDown(e, p.c, p.slot, p.x, p.y, p.w, PILL_H)}>
        <title>${slotLabel(p.c.type, p.slot)}</title>
        <rect x=${p.x} y=${p.y} width=${p.w} height=${PILL_H} rx=${PILL_H / 2} style="stroke:${accent}" />
        <text x=${p.x + 8} y=${p.y + 13}><tspan class="apill-label">${shortLabel(p.c.type, p.slot)}</tspan> ${text}<tspan class="chip-unit" dx="1">${unit}</tspan></text>
      </g>`;
  }

  /** Compact value-only pill drawn inside a tank at the sensor height. */
  private _pill(c: PlantComponent, slot: string, x: number, y: number, w: number): SVGTemplateResult {
    const v = this.src.get(c, slot);
    const { text, unit } = formatValue(v, kindOf(c, slot));
    return svg`
      <g class="pill" @click=${(e: MouseEvent) => this._slotClick(e, c, slot)}
        @pointerdown=${(e: PointerEvent) => this._onValueDown(e, c, slot, x, y, w, 22)}>
        <title>${slotLabel(c.type, slot)}</title>
        <rect x=${x} y=${y} width=${w} height="22" rx="11" />
        <text x=${x + w / 2} y=${y + 15.5} text-anchor="middle">${text}<tspan class="chip-unit" dx="1">${unit}</tspan></text>
      </g>`;
  }

  private _tile(c: PlantComponent, w: number, h: number): SVGTemplateResult {
    const entries = (c.props.entries as { slot: string; label?: string; kind?: string }[]) || [];
    return svg`
      <rect class="tile" x="0" y="0" width=${w} height=${h} rx="12" />
      <text class="tile-title" x="14" y="22">${c.label}</text>
      ${entries.map((e, i) => {
        const v = this.src.get(c, e.slot);
        const { text, unit } = formatValue(v, (e.kind as any) || "text");
        const y = 46 + i * 26;
        return svg`<g class="tile-row" @click=${(ev: MouseEvent) => this._slotClick(ev, c, e.slot)}>
          <text class="tile-label" x="14" y=${y}>${short(e.label || e.slot, 22)}</text>
          <text class="tile-value" x=${w - 14} y=${y} text-anchor="end">${text} <tspan class="chip-unit">${unit}</tspan></text></g>`;
      })}`;
  }

  private _editOverlays(byId: Map<string, PlantComponent>, routes: { pipe: any; route: { pts: Pt[]; horizontalStart: boolean } | null }[]): SVGTemplateResult {
    const ports: SVGTemplateResult[] = [];
    for (const c of byId.values()) {
      for (const p of portsOf(c)) {
        const pos = portPos(c, p.id);
        if (!pos) continue;
        const isSrc = this._connect?.c === c.id && this._connect.p === p.id;
        const off = c.type === "junction" ? { l: -7, r: 7, t: 0, b: 0 }[pos.dir] ?? 0 : 0;
        const offY = c.type === "junction" ? { t: -7, b: 7, l: 0, r: 0 }[pos.dir] ?? 0 : 0;
        ports.push(svg`<circle class="port ${isSrc ? "src" : ""} ${this._connect ? "target" : ""}" cx=${pos.x * CELL + off} cy=${pos.y * CELL + offY} r=${c.type === "junction" ? 4 : 6}
          @pointerdown=${(e: PointerEvent) => this._onPortDown(e, { c: c.id, p: p.id })}><title>${p.id}</title></circle>`);
      }
    }
    // a handle on every straight run of the selected pipe (not on the short stubs at the ports)
    const handles: SVGTemplateResult[] = [];
    if (this.selected?.kind === "p") {
      const id = this.selected.id;
      const r = routes.find((x) => x.pipe.id === id)?.route;
      if (r) {
        const n = r.pts.length;
        for (let i = 0; i < n - 1; i++) {
          const a = r.pts[i];
          const b = r.pts[i + 1];
          const len = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
          // port stubs: first and last segment of a route with stubs
          if ((i === 0 || i === n - 2) && len <= 1 && n > 2) continue;
          const vertical = a.x === b.x;
          handles.push(svg`<rect class="bend-handle ${vertical ? "ew" : "ns"}" x=${((a.x + b.x) / 2) * CELL - 7} y=${((a.y + b.y) / 2) * CELL - 7} width="14" height="14" rx="4"
            @pointerdown=${(e: PointerEvent) => this._onSegmentDown(e, id, r.pts, i)} />`);
        }
      }
    }
    return svg`<g class="ports">${ports}</g>${handles}`;
  }

  // ---------------------------------------------------------- interaction

  private _svgPoint(e: PointerEvent | WheelEvent | MouseEvent): Pt {
    const svgEl = this.renderRoot.querySelector("svg") as SVGSVGElement;
    const pt = svgEl.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const m = svgEl.getScreenCTM();
    if (!m) return { x: 0, y: 0 };
    const r = pt.matrixTransform(m.inverse());
    return { x: r.x, y: r.y };
  }

  private _emit(name: string, detail: any): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _slotClick(e: MouseEvent, c: PlantComponent, slot: string): void {
    if (this.edit || this._lastMoved) return;
    e.stopPropagation();
    this._emit("cp-slot-click", { component: c, slot, x: e.clientX, y: e.clientY });
  }

  private _capture(e: PointerEvent): void {
    const svgEl = this.renderRoot.querySelector("svg") as SVGSVGElement;
    if (!svgEl.hasPointerCapture(e.pointerId)) svgEl.setPointerCapture(e.pointerId);
  }

  private _onCompDown(e: PointerEvent, c: PlantComponent): void {
    if (e.button !== 0) return;
    e.stopPropagation();
    this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const p = this._svgPoint(e);
    this._gesture = {
      type: this.edit ? "move" : "tap", id: c.id, start: p, ox: c.x, oy: c.y, cx: e.clientX, cy: e.clientY,
      moved: false, comp: c, view: { ...(this._view || this._contentBox()) },
    };
    if (this.edit) this._capture(e);
  }

  private _onPipeDown(e: PointerEvent, id: string): void {
    if (!this.edit || e.button !== 0) return;
    e.stopPropagation();
    this._emit("cp-select", { kind: "p", id });
  }

  private _onPortDown(e: PointerEvent, ref: PortRef): void {
    e.stopPropagation();
    if (!this._connect) {
      this._connect = ref;
      this._emit("cp-hint", t("ed.connecting"));
      return;
    }
    if (this._connect.c !== ref.c) this._emit("cp-connect", { from: this._connect, to: ref });
    this._connect = null;
    this._emit("cp-hint", "");
  }

  /**
   * Object snap: align a dragged part with the ports and edges of the other parts (within ¾ cell, so a part can still be nudged by one cell).
   * Ports first – aligned ports give straight pipes. Returns snapped positions and guide coordinates.
   */
  private _objectSnap(c: PlantComponent, fx: number, fy: number): { x?: number; y?: number; gx?: number; gy?: number } | null {
    const TOL = 0.75;
    const { w, h } = sizeOf(c);
    const ownPorts = portsOf(c)
      .map((pt) => portPos({ ...c, x: 0, y: 0 }, pt.id))
      .filter((q): q is NonNullable<typeof q> => !!q);
    const xs: { v: number; off: number }[] = [];
    const ys: { v: number; off: number }[] = [];
    for (const o of this.plant.components) {
      if (o.id === c.id || o.type === "label") continue;
      for (const pt of portsOf(o)) {
        const q = portPos(o, pt.id);
        if (!q) continue;
        for (const own of ownPorts) {
          xs.push({ v: q.x, off: own.x });
          ys.push({ v: q.y, off: own.y });
        }
      }
      const s = sizeOf(o);
      // edges and centres
      xs.push({ v: o.x, off: 0 }, { v: o.x + s.w, off: w }, { v: o.x + s.w / 2, off: w / 2 });
      ys.push({ v: o.y, off: 0 }, { v: o.y + s.h, off: h }, { v: o.y + s.h / 2, off: h / 2 });
    }
    const best = (cands: { v: number; off: number }[], pos: number) => {
      let r: { pos: number; guide: number; d: number } | null = null;
      for (const k of cands) {
        const target = k.v - k.off;
        if (!Number.isInteger(target)) continue;
        const d = Math.abs(target - pos);
        if (d <= TOL && (!r || d < r.d)) r = { pos: target, guide: k.v, d };
      }
      return r;
    };
    const bx = best(xs, fx);
    const by = best(ys, fy);
    if (!bx && !by) return null;
    return { x: bx?.pos, y: by?.pos, gx: bx?.guide, gy: by?.guide };
  }

  /**
   * Object snap for a value field (pixels): edges and centres of other value fields and parts,
   * and the pipes (field centred on a run).
   */
  private _valueSnap(id: string, slot: string, fx: number, fy: number, w: number, h: number): { x?: number; y?: number; gx?: number; gy?: number } | null {
    const TOL = CELL * 0.75;
    const xs: { v: number; off: number }[] = [];
    const ys: { v: number; off: number }[] = [];
    const box = (x: number, y: number, bw: number, bh: number) => {
      xs.push({ v: x, off: 0 }, { v: x + bw, off: w }, { v: x + bw / 2, off: w / 2 });
      ys.push({ v: y, off: 0 }, { v: y + bh, off: h }, { v: y + bh / 2, off: h / 2 });
    };
    for (const c0 of this.plant.components) {
      const c = this._comp(c0);
      if (c.type !== "label") {
        const sz = sizeOf(c);
        box(c.x * CELL, c.y * CELL, sz.w * CELL, sz.h * CELL);
      }
      for (const b of this._badgeLayout(c)) {
        if (c.id === id && b.slot === slot) continue;
        box(b.x, b.y, b.w ?? CHIP_W, b.w ? 22 : CHIP_H);
      }
    }
    for (const p of this._pills) if (!(p.c.id === id && p.slot === slot)) box(p.x, p.y, p.w, PILL_H);
    for (const sg of this._segments) {
      if (sg.x1 === sg.x2) xs.push({ v: sg.x1, off: w / 2 });
      if (sg.y1 === sg.y2) ys.push({ v: sg.y1, off: h / 2 });
    }
    const best = (cands: { v: number; off: number }[], pos: number) => {
      let r: { pos: number; guide: number; d: number } | null = null;
      for (const k of cands) {
        const d = Math.abs(k.v - k.off - pos);
        if (d <= TOL && (!r || d < r.d)) r = { pos: k.v - k.off, guide: k.v, d };
      }
      return r;
    };
    const bx = best(xs, fx);
    const by = best(ys, fy);
    if (!bx && !by) return null;
    return { x: bx?.pos, y: by?.pos, gx: bx ? bx.guide / CELL : undefined, gy: by ? by.guide / CELL : undefined };
  }

  /** Editor: value fields can be dragged anywhere (half-cell steps, Alt = free). */
  private _onValueDown(e: PointerEvent, c: PlantComponent, slot: string, x: number, y: number, w: number, h: number): void {
    if (!this.edit) return;
    e.stopPropagation();
    this._gesture = { type: "value", id: c.id, slot, ox: x, oy: y, w, h, start: this._svgPoint(e), cx: e.clientX, cy: e.clientY, moved: false };
    this._capture(e);
  }

  private _onSegmentDown(e: PointerEvent, id: string, pts: Pt[], index: number): void {
    e.stopPropagation();
    this._gesture = { type: "segment", id, pts: pts.map((p) => ({ ...p })), index, moved: false, start: this._svgPoint(e) };
    this._capture(e);
  }

  /** Move segment `index` of a route perpendicular by `delta` cells; returns the new waypoints. */
  private _shiftSegment(pts: Pt[], index: number, delta: number): [number, number][] {
    const p = pts.map((q) => ({ ...q }));
    const vertical = p[index].x === p[index + 1].x;
    const move = (q: Pt) => (vertical ? (q.x += delta) : (q.y += delta));
    const towards = (from: Pt, to: Pt): Pt => ({ x: from.x + Math.sign(to.x - from.x), y: from.y + Math.sign(to.y - from.y) });
    let a = index;
    let b = index + 1;
    // the segment touches a port: keep a one-cell stub and step aside after it
    if (a === 0) {
      const stub = towards(p[0], p[1]);
      p.splice(1, 0, stub, { ...stub });
      a = 2;
      b = 3;
    } else if (a === 1) {
      p.splice(2, 0, { ...p[1] });
      a = 2;
      b = 3;
    }
    const last = p.length - 1;
    if (b === last) {
      const stub = towards(p[last], p[last - 1]);
      p.splice(last, 0, { ...stub }, stub);
    } else if (b === last - 1) {
      p.splice(b, 0, { ...p[b] });
    }
    move(p[a]);
    move(p[b]);
    // waypoints: everything between the two stub ends
    return p.slice(2, -2).map((q) => [q.x, q.y] as [number, number]);
  }



  private _onBgDown(e: PointerEvent): void {
    this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this._pointers.size === 2) {
      const [a, b] = [...this._pointers.values()];
      this._gesture = { type: "pinch", dist: Math.hypot(a.x - b.x, a.y - b.y), view: { ...(this._view || this._contentBox()) }, moved: true };
      this._capture(e);
      return;
    }
    if (this.edit && e.target === e.currentTarget) this._emit("cp-select", null);
    if (this.edit && this._connect) {
      this._connect = null;
      this._emit("cp-hint", "");
    }
    this._gesture = { type: "pan", cx: e.clientX, cy: e.clientY, view: { ...(this._view || this._contentBox()) }, moved: false };
  }

  private _onMove(e: PointerEvent): void {
    if (this._pointers.has(e.pointerId)) this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = this._gesture;
    if (!g) return;
    if (g.type === "pinch" && this._pointers.size === 2) {
      const [a, b] = [...this._pointers.values()];
      const f = g.dist / Math.max(10, Math.hypot(a.x - b.x, a.y - b.y));
      const v = g.view;
      const cx = v.x + v.w / 2;
      const cy = v.y + v.h / 2;
      this._view = { x: cx - (v.w * f) / 2, y: cy - (v.h * f) / 2, w: v.w * f, h: v.h * f };
      return;
    }
    if (g.type === "pan") {
      const svgEl = this.renderRoot.querySelector("svg") as SVGSVGElement;
      const rect = svgEl.getBoundingClientRect();
      const scale = Math.max(g.view.w / rect.width, g.view.h / rect.height);
      const dx = (e.clientX - g.cx) * scale;
      const dy = (e.clientY - g.cy) * scale;
      if (!g.moved && Math.abs(e.clientX - g.cx) + Math.abs(e.clientY - g.cy) > 4) {
        g.moved = true;
        this._capture(e);
      }
      if (g.moved) this._view = { ...g.view, x: g.view.x - dx, y: g.view.y - dy };
      return;
    }
    if (g.type === "move") {
      const p = this._svgPoint(e);
      if (Math.abs(e.clientX - g.cx) + Math.abs(e.clientY - g.cy) > 3) g.moved = true;
      if (!g.moved) return;
      const free = !this.snapGrid || e.altKey;
      const step = free ? 1 : Math.max(1, this.gridStep);
      let nx = Math.max(0, Math.round((g.ox + (p.x - g.start.x) / CELL) / step) * step);
      let ny = Math.max(0, Math.round((g.oy + (p.y - g.start.y) / CELL) / step) * step);
      const snap = this.snapObjects && !e.altKey ? this._objectSnap(g.comp, g.ox + (p.x - g.start.x) / CELL, g.oy + (p.y - g.start.y) / CELL) : null;
      if (snap?.x !== undefined) nx = snap.x;
      if (snap?.y !== undefined) ny = snap.y;
      this._guides = { x: snap?.gx, y: snap?.gy };
      this._drag = { id: g.id, dx: Math.max(0, nx), dy: Math.max(0, ny) };
      return;
    }
    if (g.type === "tap") {
      // dragging across a component pans the view
      if (Math.abs(e.clientX - g.cx) + Math.abs(e.clientY - g.cy) > 6) {
        this._gesture = { type: "pan", cx: g.cx, cy: g.cy, view: g.view, moved: true };
        this._capture(e);
        this._onMove(e);
      }
      return;
    }
    if (g.type === "value") {
      const p = this._svgPoint(e);
      if (Math.abs(e.clientX - g.cx) + Math.abs(e.clientY - g.cy) > 3) g.moved = true;
      if (!g.moved) return;
      const step = e.altKey || !this.snapGrid ? 1 : CELL / 2;
      const fx = g.ox + p.x - g.start.x;
      const fy = g.oy + p.y - g.start.y;
      let x = Math.round(fx / step) * step;
      let y = Math.round(fy / step) * step;
      const snap = this.snapObjects && !e.altKey ? this._valueSnap(g.id, g.slot, fx, fy, g.w, g.h) : null;
      if (snap?.x !== undefined) x = snap.x;
      if (snap?.y !== undefined) y = snap.y;
      this._guides = { x: snap?.gx, y: snap?.gy };
      this._valueDrag = { id: g.id, slot: g.slot, x, y };
      return;
    }
    if (g.type === "segment") {
      const p = this._svgPoint(e);
      const a = g.pts[g.index];
      const vertical = a.x === g.pts[g.index + 1].x;
      const raw = ((vertical ? p.x - g.start.x : p.y - g.start.y) / CELL);
      const step = this.snapGrid && !e.altKey ? Math.max(1, this.gridStep) : 1;
      // snap the segment position (not the offset) to the grid
      const pos = Math.round(((vertical ? a.x : a.y) + raw) / step) * step;
      const delta = pos - (vertical ? a.x : a.y);
      if (delta === g.delta) return;
      g.delta = delta;
      g.moved = true;
      this._emit("cp-segment", { id: g.id, via: this._shiftSegment(g.pts, g.index, delta), live: true });
      return;
    }
    if (g.type === "bend") {
      const p = this._svgPoint(e);
      g.moved = true;
      const value = Math.round((g.horizontalStart ? p.x : p.y) / CELL);
      this._emit("cp-bend", { id: g.id, bend: value, live: true });
    }
  }

  private _onUp(e: PointerEvent): void {
    this._pointers.delete(e.pointerId);
    const g = this._gesture;
    if (this._pointers.size > 0 && g?.type === "pinch") return;
    this._gesture = null;
    this._lastMoved = !!g?.moved;
    setTimeout(() => (this._lastMoved = false), 0);
    if (!g) return;
    if (g.type === "move") {
      this._guides = {};
      if (g.moved && this._drag) {
        this._emit("cp-move", { id: g.id, x: this._drag.dx, y: this._drag.dy });
      } else {
        this._emit("cp-select", { kind: "c", id: g.id });
      }
      this._drag = null;
    } else if (g.type === "value") {
      this._guides = {};
      const d = this._valueDrag;
      const c = this.plant.components.find((k) => k.id === g.id);
      if (g.moved && d && c) {
        const r = (v: number) => Math.round(v * 100) / 100;
        this._emit("cp-value-move", { id: g.id, slot: g.slot, pos: [r(d.x / CELL - c.x), r(d.y / CELL - c.y)] });
      } else {
        this._emit("cp-select", { kind: "c", id: g.id });
      }
      this._valueDrag = null;
    } else if (g.type === "tap" && !g.moved) {
      this._emit("cp-component-click", { component: g.comp, x: e.clientX, y: e.clientY });
    } else if (g.type === "bend" && g.moved) {
      this._emit("cp-bend", { id: g.id, live: false });
    } else if (g.type === "segment" && g.moved) {
      this._emit("cp-segment", { id: g.id, live: false });
    }
  }

  private _onWheel(e: WheelEvent): void {
    e.preventDefault();
    const v = this._view || this._contentBox();
    const p = this._svgPoint(e);
    const f = Math.exp(e.deltaY * 0.0015);
    this._view = { x: p.x - (p.x - v.x) * f, y: p.y - (p.y - v.y) * f, w: v.w * f, h: v.h * f };
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    svg {
      width: 100%;
      height: 100%;
      display: block;
      font-family: var(--cp-font);
    }
    .grid-dot { fill: var(--cp-grid); }
    .grid-bg { pointer-events: none; }

    /* pipes */
    .pipe path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    .pipe-hit { stroke: transparent; stroke-width: 18; pointer-events: stroke; }
    /* the outline in background colour cuts a gap into pipes drawn earlier: crossings read as bridges */
    .pipe-outline { stroke: var(--cp-surface); stroke-width: 12; }
    .iso-floor-line { fill: none; stroke: var(--cp-iso-floor); stroke-width: 1; }
    .iso-shadows rect { fill: #000; opacity: 0.28; }
    /* 2.5D pipes: a darker body behind, offset like the extrusion, and a highlight on top */
    .pipe-depth { stroke-width: 7; opacity: 0.35; filter: brightness(0.45); transform: translate(4px, -2.5px); }
    .pipe.active .pipe-depth { opacity: 0.8; }
    .pipe-gloss { stroke: #fff; stroke-width: 1.4; opacity: 0.22; transform: translate(-0.8px, -1.2px); }
    .pipes.iso .pipe-base { stroke-width: 6; }
    .pipe-base { stroke-width: 5; opacity: 0.4; transition: opacity 0.6s; }
    .pipe.active .pipe-base { opacity: 1; }
    .pipe-halo { stroke-width: 12; opacity: 0.12; }
    .pipe-flow {
      stroke: var(--cp-flow);
      stroke-width: 2.6;
      stroke-dasharray: 2 13;
      animation: cp-flow 0.9s linear infinite;
    }
    .pipe-sel { stroke: var(--cp-select); stroke-width: 18; opacity: 0.35; }
    @keyframes cp-flow { to { stroke-dashoffset: -15; } }
    /* internal pipes: offset = one dash period (2 + 9), otherwise the dots jump each loop */
    @keyframes cp-iflow { to { stroke-dashoffset: -11; } }

    /* component artwork */
    .comp { cursor: default; }
    svg.edit .comp { cursor: grab; }
    svg.edit .chip, svg.edit .pill, svg.edit .apill { cursor: move; }
    .comp-hit { fill: transparent; }
    .sel-outline { fill: none; stroke: var(--cp-select); stroke-width: 2; stroke-dasharray: 6 4; pointer-events: none; }
    .comp-label {
      fill: var(--cp-text); font-size: 13px; font-weight: 600; letter-spacing: 0.2px; pointer-events: none;
      paint-order: stroke; stroke: var(--cp-surface); stroke-width: 4px; stroke-linejoin: round;
    }
    .casing { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.5; }
    .casing.light { fill: var(--cp-casing-light); }
    .sheen { fill: var(--cp-sheen); pointer-events: none; }
    .foot { fill: var(--cp-casing-stroke); }
    .grille-bg { fill: var(--cp-grille-bg); }
    .grille { fill: none; stroke: var(--cp-grille); stroke-width: 1.4; }
    .fan path { fill: var(--cp-fan); }
    .hub { fill: var(--cp-casing-stroke); }
    .vent { fill: var(--cp-grille); }
    .tag { fill: var(--cp-muted); font-size: 10px; font-weight: 700; letter-spacing: 1px; }
    .frost { fill: rgba(150, 205, 255, 0.28); stroke: rgba(180, 225, 255, 0.8); stroke-width: 2; }
    .snow line, .snow path { stroke: #e8f6ff; stroke-width: 2.2; stroke-linecap: round; fill: none; }
    .alarm-ring { fill: none; stroke: #ff4d4d; stroke-width: 3; animation: cp-pulse 1s ease-in-out infinite; }
    .ground { fill: var(--cp-ground); }
    .probe { fill: none; stroke: var(--cp-muted); stroke-width: 2; }
    .probe.active { stroke: #38d0ff; }
    .screen { fill: var(--cp-screen); }
    .screen-text { fill: #d8f3e8; font-size: 10px; font-weight: 600; }
    .internal { fill: none; stroke-width: 3; opacity: 0.55; }
    .rod { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); }
    .rod.hot { fill: #4a2412; stroke: #ff8a3d; }
    .coil { fill: none; stroke: var(--cp-muted); stroke-width: 2; }
    .coil.hot { stroke: #ffb35c; }
    .aux-glow { fill: rgba(255, 138, 61, 0.22); }
    .insulation { fill: var(--cp-insulation); stroke: var(--cp-casing-stroke); stroke-width: 1; }
    .tank-fill { opacity: 0.92; }
    .tank-glass { fill: rgba(255, 255, 255, 0.18); }
    .tank-coil { fill: none; stroke: rgba(255, 255, 255, 0.55); stroke-width: 2.5; }
    /* offset = one dash period (4 + 6), at the same speed as the pipes (15 px/s) */
    .tank-coil.hot { stroke: #fff; stroke-dasharray: 4 6; animation: cp-coil 0.667s linear infinite; }
    @keyframes cp-coil { to { stroke-dashoffset: -10; } }
    .strat { stroke: rgba(255, 255, 255, 0.35); stroke-width: 1; stroke-dasharray: 3 4; }
    .tank-label { fill: rgba(255, 255, 255, 0.92); font-size: 12px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,0.4); }
    .tank-badge { fill: #fff; font-size: 11px; font-weight: 800; }
    .pump-body { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.5; }
    .pump-body.on { stroke: var(--cp-accent); }
    .pump-tri { fill: var(--cp-muted); opacity: 0.5; }
    .pump-tri.on { fill: var(--cp-accent); opacity: 0.9; }
    .pump-glow { fill: var(--cp-accent); opacity: 0.18; }
    .impeller { fill: none; stroke: var(--cp-text); stroke-width: 2; stroke-dasharray: 4 3; opacity: 0.7; }
    .valve-tri { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.4; }
    .valve-tri.on { fill: var(--cp-accent); stroke: var(--cp-accent); opacity: 0.85; }
    .actuator { fill: var(--cp-casing-light); stroke: var(--cp-casing-stroke); }
    .stem { stroke: var(--cp-casing-stroke); stroke-width: 2; }
    .valve-tag {
      fill: var(--cp-accent); font-size: 12px; font-weight: 800;
      paint-order: stroke; stroke: var(--cp-surface); stroke-width: 3px; stroke-linejoin: round;
    }
    .rad-frame { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); }
    .shower-jet { stroke: #6cc4ff; stroke-width: 1.6; stroke-linecap: round; stroke-dasharray: 3 5; animation: cp-jet 0.53s linear infinite; opacity: 0.85; }
    @keyframes cp-jet { to { stroke-dashoffset: -16; } }
    .shower-hole { fill: var(--cp-muted); }
    /* mirrored parts keep their texts readable */
    .flipped text { transform-box: fill-box; transform-origin: center; transform: scaleX(-1); }
    .rad-stub { stroke: var(--cp-casing-stroke); stroke-width: 4; stroke-linecap: round; }
    .building { pointer-events: none; }
    .building .outside { fill: var(--cp-bld-outside); }
    .building .ground { fill: var(--cp-bld-ground); }
    .building .floor-line { stroke: var(--cp-bld-line); stroke-width: 3; }
    .building .wall, .building .slab { fill: var(--cp-bld-wall); stroke: var(--cp-bld-line); stroke-width: 1; }
    .building .room { fill: var(--cp-muted); font-size: 12px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; opacity: 0.7; }
    .rad-header { fill: var(--cp-casing-light); stroke: var(--cp-casing-stroke); stroke-width: 1; }
    .fin { stroke: rgba(255, 255, 255, 0.15); }
    .heat-wave { fill: none; stroke: #ff8a3d; stroke-width: 2; stroke-linecap: round; opacity: 0; animation: cp-rise 2.4s ease-in infinite; }
    .floor-slab { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); }
    .tap-body { fill: var(--cp-casing-light); stroke: var(--cp-casing-stroke); stroke-width: 1.4; }
    .tap-handle { fill: var(--cp-casing-stroke); }
    .drop { fill: #38d0ff; animation: cp-drop 0.75s linear infinite; }
    .magnet { fill: none; stroke: #e5484d; stroke-width: 3; }
    .sieve { stroke: var(--cp-muted); stroke-width: 1; }
    .vessel { fill: #c8343b; stroke: #8e1f25; }
    .junction { fill: var(--cp-text); }
    .user-glow { fill: var(--cp-accent); opacity: 0.12; }
    .free-label { fill: var(--cp-text); font-weight: 700; }
    .tile { fill: var(--cp-chip); stroke: var(--cp-chip-stroke); }
    .tile-title { fill: var(--cp-text); font-size: 13px; font-weight: 700; }
    .tile-label { fill: var(--cp-muted); font-size: 12px; }
    .tile-value { fill: var(--cp-text); font-size: 13px; font-weight: 700; }
    .tile-row { cursor: pointer; }

    /* chips */
    .chip { cursor: pointer; }
    .chip rect:first-child { fill: var(--cp-chip); stroke: var(--cp-chip-stroke); transition: fill 0.2s; }
    .chip:hover rect:first-child { fill: var(--cp-chip-hover); }
    .chip-label { fill: var(--cp-muted); font-size: 9.5px; }
    .chip-value { fill: var(--cp-text); font-size: 14px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .chip-unit { fill: var(--cp-muted); font-size: 10px; font-weight: 500; }
    .chip.na .chip-value { fill: var(--cp-muted); }
    .apill { cursor: pointer; }
    .apill rect { fill: var(--cp-chip); stroke-width: 1.4; }
    .apill text { fill: var(--cp-text); font-size: 11.5px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .apill-label { fill: var(--cp-muted); font-weight: 600; font-size: 10px; }
    .ipipe { fill: none; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; opacity: 0.85; }
    .ipipe-flow { fill: none; stroke: var(--cp-flow); stroke-width: 1.8; stroke-dasharray: 2 9; animation: cp-iflow 0.66s linear infinite; }
    .itag { fill: var(--cp-muted); font-size: 8.5px; font-weight: 700; }
    .itag.halo { paint-order: stroke; stroke: var(--cp-surface); stroke-width: 3px; stroke-linejoin: round; }
    .tank-in { opacity: 0.55; stroke: var(--cp-casing-stroke); }
    .compressor { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.5; }
    .dip { fill: none; stroke: rgba(255, 255, 255, 0.45); stroke-width: 2.5; stroke-dasharray: 5 4; }
    .pill { cursor: pointer; }
    .pill rect { fill: rgba(10, 14, 20, 0.62); stroke: rgba(255, 255, 255, 0.25); }
    .pill text { fill: #fff; font-size: 12.5px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .pill .chip-unit { fill: rgba(255, 255, 255, 0.75); font-size: 9.5px; }

    /* edit */
    .port { fill: var(--cp-port); stroke: var(--cp-bg); stroke-width: 2; cursor: crosshair; }
    .port:hover, .port.src { fill: var(--cp-select); r: 8; }
    .port.target { fill: var(--cp-accent); }
    .bend-handle { fill: var(--cp-select); stroke: var(--cp-bg); stroke-width: 2; }
    .grid-line { fill: none; stroke: var(--cp-grid); stroke-width: 1; }
    .grid-line.major { stroke-width: 1.6; opacity: 1.6; }
    .guides line { stroke: var(--cp-accent); stroke-width: 1.5; stroke-dasharray: 6 4; pointer-events: none; }
    .bend-handle.ew { cursor: ew-resize; }
    .bend-handle.ns { cursor: ns-resize; }

    /* animation helpers */
    /* spinning parts are drawn around their local origin (0,0); rotate exactly there, not around the bbox centre */
    .spin { animation: cp-spin var(--dur, 1.2s) linear infinite; transform-box: view-box; transform-origin: 0 0; }
    .pulse { animation: cp-pulse 2.2s ease-in-out infinite; }
    @keyframes cp-spin { to { transform: rotate(360deg); } }
    @keyframes cp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
    @keyframes cp-rise { 0% { opacity: 0; transform: translateY(6px); } 40% { opacity: 0.8; } 100% { opacity: 0; transform: translateY(-10px); } }
    @keyframes cp-drop { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(18px); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .spin, .pulse, .pipe-flow, .heat-wave, .drop, .tank-coil.hot { animation: none; }
    }
  `;
}

if (!customElements.get("cp-schematic")) customElements.define("cp-schematic", CpSchematic);

export function defaultKindFor(fromKind?: PipeKind, toKind?: PipeKind): PipeKind {
  return fromKind || toKind || "supply";
}

import { LitElement, css, html, nothing } from "lit";
import { INDOOR_MODELS, OUTDOOR_MODELS, TYPES, baseSize, portPos, sizeOf, slotsOf, type SlotKind } from "../catalog";
import { slotLabel, t } from "../i18n";
import { icon, ui } from "../styles";
import type { ComponentType, FlowCond, Hass, Pipe, PipeKind, Plant, PlantComponent, PortRef, Rotation, UserIcon } from "../types";
import { formatValue, type ValueSource, writeKind } from "../data/values";
import type { Selection } from "../render/schematic";
import "../render/schematic";
import { autoArrange } from "../layout/auto";

const PALETTE: ComponentType[] = [
  "outdoor_unit",
  "indoor_unit",
  "buffer",
  "dhw_tank",
  "pump",
  "valve_3way",
  "mixer",
  "radiators",
  "floor_heating",
  "tap",
  "water_inlet",
  "separator",
  "expansion_vessel",
  "junction",
  "value_tile",
  "label",
];

const KINDS: PipeKind[] = ["supply", "return", "dhw_hot", "dhw_cold", "circulation"];

const STATES: Partial<Record<ComponentType, string[]>> = {
  pump: ["running", "!running"],
  mixer: ["running"],
  valve_3way: ["a", "b"],
  outdoor_unit: ["running", "defrost", "!defrost"],
  indoor_unit: ["running", "a", "b", "aux", "pc1"],
  tap: ["flowing"],
  dhw_tank: ["charging"],
};

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

// ---------------------------------------------------------- entity picker

export class CpEntityPicker extends LitElement {
  static properties = { hass: { attribute: false }, value: {}, placeholder: {} };
  hass?: Hass;
  value = "";
  placeholder = "";
  private static _uid = 0;
  private _listId = `cp-ents-${CpEntityPicker._uid++}`;

  private _change(e: Event) {
    const v = (e.target as HTMLInputElement).value.trim();
    this.value = v;
    this.dispatchEvent(new CustomEvent("value-changed", { detail: v }));
  }

  render() {
    const ids = this.hass ? Object.keys(this.hass.states).sort() : [];
    return html`<input
        list=${this._listId}
        .value=${this.value || ""}
        placeholder=${this.placeholder || t("ed.entity_search")}
        @change=${this._change}
      />
      <datalist id=${this._listId}>
        ${ids.map((id) => html`<option value=${id}>${this.hass!.states[id].attributes.friendly_name || ""}</option>`)}
      </datalist>`;
  }

  static styles = [ui, css`:host { display: block; min-width: 0; } input { font-size: 12px; padding: 6px 8px; }`];
}
if (!customElements.get("cp-entity-picker")) customElements.define("cp-entity-picker", CpEntityPicker);

// ----------------------------------------------------------------- editor

export class CpEditor extends LitElement {
  static properties = {
    plant: { attribute: false },
    hass: { attribute: false },
    src: { attribute: false },
    icons: { attribute: false },
    version: { type: Number },
    _draft: { state: true },
    _sel: { state: true },
    _hint: { state: true },
    _dirty: { state: true },
    _gridCfg: { state: true },
  };
  /** grid display and snapping (per browser, not part of the plant) */
  private _gridCfg: { show: boolean; step: number; snap: boolean; osnap: boolean } = (() => {
    const def = { show: false, step: 1, snap: true, osnap: true };
    try {
      return { ...def, ...JSON.parse(localStorage.getItem("copilot.editor.grid") || "{}") };
    } catch {
      return def;
    }
  })();

  private _setGrid(patch: Partial<CpEditor["_gridCfg"]>) {
    this._gridCfg = { ...this._gridCfg, ...patch };
    try {
      localStorage.setItem("copilot.editor.grid", JSON.stringify(this._gridCfg));
    } catch {
      /* private mode */
    }
  }

  /** A straight run of a pipe was dragged: store its route as waypoints (undoable as one step). */
  private _onSegment(e: CustomEvent) {
    const { id, via, live } = e.detail;
    if (live) {
      if (!this._bendStart) this._bendStart = JSON.stringify(this._draft);
      const next = clone(this._draft);
      const x = next.pipes.find((p) => p.id === id);
      if (x) {
        x.via = via;
        delete x.bend;
      }
      this._draft = next;
    } else if (this._bendStart) {
      this._undo.push(this._bendStart);
      this._bendStart = undefined;
      this._dirty = true;
    }
  }
  plant!: Plant;
  hass?: Hass;
  src!: ValueSource;
  icons: Map<string, UserIcon> = new Map();
  version = 0;
  private _draft!: Plant;
  private _sel: Selection = null;
  private _hint = "";
  private _dirty = false;
  private _undo: string[] = [];
  private _redo: string[] = [];
  private _source?: Plant;

  protected willUpdate(): void {
    if (this.plant && this.plant !== this._source) {
      this._source = this.plant;
      this._draft = clone(this.plant);
      this._undo = [];
      this._redo = [];
      this._dirty = false;
      this._sel = null;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("keydown", this._onKey);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._onKey);
  }

  private _onKey = (e: KeyboardEvent) => {
    const tag = (e.composedPath()[0] as HTMLElement)?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if ((e.key === "Delete" || e.key === "Backspace") && this._sel) {
      e.preventDefault();
      this._delete();
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      e.preventDefault();
      e.shiftKey ? this._doRedo() : this._doUndo();
    } else if (e.key.toLowerCase() === "r" && this._sel?.kind === "c") {
      this._rotate();
    }
  };

  // ---------------------------------------------------------- mutations

  private _commit(mutate: (p: Plant) => void, record = true): void {
    if (record) {
      this._undo.push(JSON.stringify(this._draft));
      if (this._undo.length > 80) this._undo.shift();
      this._redo = [];
    }
    const next = clone(this._draft);
    mutate(next);
    this._draft = next;
    this._dirty = true;
  }

  private _doUndo() {
    const prev = this._undo.pop();
    if (!prev) return;
    this._redo.push(JSON.stringify(this._draft));
    this._draft = JSON.parse(prev);
    this._dirty = true;
  }

  private _doRedo() {
    const next = this._redo.pop();
    if (!next) return;
    this._undo.push(JSON.stringify(this._draft));
    this._draft = JSON.parse(next);
    this._dirty = true;
  }

  private _comp(id?: string): PlantComponent | undefined {
    return this._draft.components.find((c) => c.id === (id ?? this._sel?.id));
  }

  private _pipe(id?: string): Pipe | undefined {
    return this._draft.pipes.find((p) => p.id === (id ?? this._sel?.id));
  }

  private _newId(prefix: string): string {
    const ids = new Set([...this._draft.components.map((c) => c.id), ...this._draft.pipes.map((p) => p.id)]);
    let i = 1;
    while (ids.has(`${prefix}${i}`)) i++;
    return `${prefix}${i}`;
  }

  private _add(type: ComponentType) {
    const def = TYPES[type];
    const id = this._newId(`${type}_`);
    const comp: PlantComponent = {
      id,
      type,
      label: type === "junction" ? "" : t(`type.${type}`),
      ...this._freeSpot(def.variants ? baseSize({ type, props: {} } as PlantComponent).w : def.w, def.variants ? baseSize({ type, props: {} } as PlantComponent).h : def.h),
      bindings: {},
      props: type === "value_tile" ? { entries: [] } : type === "label" ? { text: t("type.label"), size: 18 } : {},
    };
    if (type === "pump") comp.props.role = "other";
    this._commit((p) => p.components.push(comp));
    this._sel = { kind: "c", id };
  }

  /** First grid position where a w×h box (plus margin) does not overlap anything. */
  private _freeSpot(w: number, h: number): { x: number; y: number } {
    const boxes = this._draft.components.map((c) => ({ c, ...sizeOf(c) }));
    const free = (x: number, y: number) =>
      boxes.every(({ c, w: cw, h: ch }) => x + w + 1 <= c.x || x >= c.x + cw + 1 || y + h + 2 <= c.y || y >= c.y + ch + 3);
    for (let y = 1; y + h < this._draft.grid.h; y += 2) {
      for (let x = 1; x + w < this._draft.grid.w; x += 2) if (free(x, y)) return { x, y };
    }
    return { x: 1, y: 1 };
  }

  private _delete() {
    const sel = this._sel;
    if (!sel) return;
    this._commit((p) => {
      if (sel.kind === "c") {
        p.components = p.components.filter((c) => c.id !== sel.id);
        p.pipes = p.pipes.filter((x) => x.from.c !== sel.id && x.to.c !== sel.id);
        p.pipes.forEach((x) => {
          x.flow = x.flow?.filter((f) => f.c !== sel.id);
          x.flowAny = x.flowAny?.filter((f) => f.c !== sel.id);
        });
      } else {
        p.pipes = p.pipes.filter((x) => x.id !== sel.id);
      }
    });
    this._sel = null;
  }

  private _rotate() {
    const c = this._comp();
    if (!c || !TYPES[c.type].rotatable) return;
    this._commit((p) => {
      const x = p.components.find((k) => k.id === c.id)!;
      x.rot = (((x.rot || 0) + 90) % 360) as Rotation;
    });
  }

  private _duplicate() {
    const c = this._comp();
    if (!c) return;
    const id = this._newId(`${c.type}_`);
    this._commit((p) => p.components.push({ ...clone(c), id, x: c.x + 2, y: c.y + 2 }));
    this._sel = { kind: "c", id };
  }

  private _connect(from: PortRef, to: PortRef) {
    const a = this._comp(from.c)!;
    const b = this._comp(to.c)!;
    const pa = portPos(a, from.p);
    const pb = portPos(b, to.p);
    const kind: PipeKind = pa?.def.kind || pb?.def.kind || "supply";
    const flow: FlowCond[] = [];
    const pump = [a, b].find((c) => c.type === "pump");
    if (pump) flow.push({ c: pump.id, s: "running" });
    for (const [c, ref] of [
      [a, from],
      [b, to],
    ] as [PlantComponent, PortRef][]) {
      if (c.type === "valve_3way" && (ref.p === "a" || ref.p === "b")) flow.push({ c: c.id, s: ref.p });
    }
    const id = this._newId("p");
    this._commit((p) => p.pipes.push({ id, from, to, kind, flow }));
    this._sel = { kind: "p", id };
  }

  private _set(mutate: (c: PlantComponent) => void, record = true) {
    const id = this._sel?.id;
    this._commit((p) => {
      const c = p.components.find((k) => k.id === id);
      if (c) mutate(c);
    }, record);
  }

  private _setPipe(mutate: (x: Pipe) => void, record = true) {
    const id = this._sel?.id;
    this._commit((p) => {
      const x = p.pipes.find((k) => k.id === id);
      if (x) mutate(x);
    }, record);
  }

  private _autoArrange() {
    const r = autoArrange(this._draft);
    this._commit((p) => {
      p.components = r.plant.components;
      p.pipes = r.plant.pipes;
      p.grid = r.plant.grid;
      p.settings = { ...p.settings, building: r.plant.settings.building, wizard: r.plant.settings.wizard };
    });
    this._sel = null;
    this._hint = t(r.kind === "template" ? "ed.auto_done_tpl" : "ed.auto_done", { crossings: r.score.crossings });
    window.setTimeout(() => (this._hint = ""), 6000);
  }

  private _save() {
    const plant = clone(this._draft);
    plant.settings = { ...plant.settings, layout_edited: true };
    this.dispatchEvent(new CustomEvent("save", { detail: plant, bubbles: true, composed: true }));
    this._dirty = false;
  }

  private _discard() {
    this._draft = clone(this.plant);
    this._undo = [];
    this._redo = [];
    this._dirty = false;
    this._sel = null;
  }

  // ------------------------------------------------------------ events

  private _onBend(e: CustomEvent) {
    const { id, bend, live } = e.detail;
    if (live) {
      if (!this._bendStart) this._bendStart = JSON.stringify(this._draft);
      const next = clone(this._draft);
      const x = next.pipes.find((p) => p.id === id);
      if (x) {
        x.bend = bend;
        delete x.via;
      }
      this._draft = next;
    } else if (this._bendStart) {
      this._undo.push(this._bendStart);
      this._bendStart = undefined;
      this._dirty = true;
    }
  }
  private _bendStart?: string;

  // ------------------------------------------------------------ render

  render() {
    if (!this._draft) return nothing;
    const sel = this._sel;
    return html`
      <div class="toolbar">
        <button class="icon" title=${t("undo")} ?disabled=${!this._undo.length} @click=${this._doUndo}>${icon("undo")}</button>
        <button class="icon" title=${t("redo")} ?disabled=${!this._redo.length} @click=${this._doRedo}>${icon("redo")}</button>
        <button class="icon" title=${t("ed.rotation")} ?disabled=${!(sel?.kind === "c" && TYPES[this._comp()?.type || "label"].rotatable)} @click=${this._rotate}>${icon("rotate")}</button>
        <button class="icon" title=${t("ed.duplicate")} ?disabled=${sel?.kind !== "c"} @click=${this._duplicate}>${icon("copy")}</button>
        <button class="icon danger" title=${t("delete")} ?disabled=${!sel} @click=${this._delete}>${icon("trash")}</button>
        <button title=${t("ed.auto_title")} @click=${this._autoArrange}>${icon("wand")} ${t("ed.auto")}</button>
        <span class="hint">${this._hint}</span>
        <span class="spacer"></span>
        ${this._dirty ? html`<span class="dirty">${t("unsaved")}</span>
          <button @click=${this._discard}>${t("discard")}</button>` : nothing}
        <button class="primary" ?disabled=${!this._dirty} @click=${this._save}>${icon("save")} ${t("save")}</button>
      </div>
      <div class="layout">
        <aside class="palette card">
          <div class="cap">${t("ed.palette")}</div>
          ${PALETTE.map((type) => html`<button class="pal" @click=${() => this._add(type)}>${icon("plus")} ${t(`type.${type}`)}</button>`)}
          <div class="cap">${t("ed.grid")}</div>
          <div class="row grid-size">
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.w)} @change=${(e: Event) => this._commit((p) => (p.grid.w = Number((e.target as HTMLInputElement).value) || p.grid.w))} />
            ×
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.h)} @change=${(e: Event) => this._commit((p) => (p.grid.h = Number((e.target as HTMLInputElement).value) || p.grid.h))} />
          </div>
          <label class="bld"><input type="checkbox" .checked=${!!this._draft.settings.building && this._draft.settings.building.show !== false}
            @change=${(e: Event) => this._commit((p) => {
              const on = (e.target as HTMLInputElement).checked;
              p.settings = { ...p.settings, building: { ...(p.settings.building || { floor: p.grid.h - 2 }), show: on } };
            })} /> ${t("ed.building")}</label>
          <div class="cap">${t("ed.raster")}</div>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.show} @change=${(e: Event) => this._setGrid({ show: (e.target as HTMLInputElement).checked })} /> ${t("ed.grid_show")}</label>
          <label class="field">${t("ed.grid_step")}
            <select @change=${(e: Event) => this._setGrid({ step: Number((e.target as HTMLSelectElement).value) })}>
              ${[1, 2, 5].map((v) => html`<option value=${v} ?selected=${this._gridCfg.step === v}>${t("ed.grid_cells", { n: v })}</option>`)}
            </select></label>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.snap} @change=${(e: Event) => this._setGrid({ snap: (e.target as HTMLInputElement).checked })} /> ${t("ed.grid_snap")}</label>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.osnap} @change=${(e: Event) => this._setGrid({ osnap: (e.target as HTMLInputElement).checked })} /> ${t("ed.object_snap")}</label>
          <p class="muted tiny">${t("ed.snap_hint")}</p>
        </aside>
        <div class="canvas card">
          <cp-schematic
            edit
            .plant=${this._draft}
            .src=${this.src}
            .icons=${this.icons}
            .selected=${sel}
            .version=${this.version}
            @cp-select=${(e: CustomEvent) => (this._sel = e.detail)}
            @cp-move=${(e: CustomEvent) => this._commit((p) => {
              const c = p.components.find((k) => k.id === e.detail.id);
              if (c) {
                c.x = e.detail.x;
                c.y = e.detail.y;
              }
            })}
            @cp-connect=${(e: CustomEvent) => this._connect(e.detail.from, e.detail.to)}
            @cp-bend=${this._onBend}
            @cp-segment=${this._onSegment}
            @cp-value-move=${(e: CustomEvent) => this._commit((p) => {
              const c = p.components.find((k) => k.id === e.detail.id);
              if (c) c.valuePos = { ...(c.valuePos || {}), [e.detail.slot]: e.detail.pos };
            })}
            .gridStep=${this._gridCfg.step}
            ?showGrid=${this._gridCfg.show}
            ?snapGrid=${this._gridCfg.snap}
            ?snapObjects=${this._gridCfg.osnap}
            @cp-hint=${(e: CustomEvent) => (this._hint = e.detail)}
          ></cp-schematic>
        </div>
        <aside class="props card">${sel?.kind === "c" ? this._compProps() : sel?.kind === "p" ? this._pipeProps() : html`<p class="muted">${t("ed.nothing")}</p>`}</aside>
      </div>
    `;
  }

  private _num(label: string, value: any, set: (v: number) => void, step = 1) {
    return html`<label class="field">${label}<input type="number" step=${step} .value=${value ?? ""} @change=${(e: Event) => set(Number((e.target as HTMLInputElement).value))} /></label>`;
  }

  private _compProps() {
    const c = this._comp();
    if (!c) return nothing;
    const def = TYPES[c.type];
    const shown = new Set(c.show ?? slotsOf(c).filter((s) => s.show).map((s) => s.key));
    const icons = [...this.icons.values()];
    return html`
      <div class="ptitle">${t(`type.${c.type}`)} <code>${c.id}</code></div>
      ${c.type !== "junction"
        ? html`<label class="field">${t("ed.label")}<input .value=${c.label} @change=${(e: Event) => this._set((k) => (k.label = (e.target as HTMLInputElement).value))} /></label>`
        : nothing}
      ${c.type === "outdoor_unit"
        ? html`<label class="field">${t("ed.model")}<select @change=${(e: Event) => this._set((k) => (k.model = (e.target as HTMLSelectElement).value))}>
              ${OUTDOOR_MODELS.map((m) => html`<option value=${m.id} ?selected=${m.id === c.model}>${m.label}</option>`)}
            </select></label>
            ${this._num(t("ed.nominal"), c.props.nominal_kw, (v) => this._set((k) => (k.props.nominal_kw = v)), 0.1)}
            ${this._num(t("ed.cop_ref"), c.props.cop_ref ?? 4.9, (v) => this._set((k) => (k.props.cop_ref = v)), 0.1)}`
        : nothing}
      ${c.type === "indoor_unit"
        ? html`<label class="field">${t("ed.model")}<select @change=${(e: Event) => this._set((k) => (k.model = (e.target as HTMLSelectElement).value))}>
              ${INDOOR_MODELS.map((m) => html`<option value=${m.id} ?selected=${m.id === c.model}>${m.label}</option>`)}
            </select></label>
            ${this._num(t("wz.aux_kw"), c.props.aux_kw, (v) => this._set((k) => (k.props.aux_kw = v)), 1)}
            <div class="cap">${t("ed.input_labels")}</div>
            ${[1, 2, 3, 4].map(
              (n) => html`<label class="field">${t(`slot.input${n}`)}<input .value=${c.props.input_labels?.[`input${n}`] || ""}
                @change=${(e: Event) => this._set((k) => (k.props.input_labels = { ...(k.props.input_labels || {}), [`input${n}`]: (e.target as HTMLInputElement).value }))} /></label>`,
            )}
            <div class="cap">${t("ed.pressure_limits")}</div>
            <div class="two">
              ${this._num("min", c.props.pressure_min ?? 1, (v) => this._set((k) => (k.props.pressure_min = v)), 0.1)}
              ${this._num("max", c.props.pressure_max ?? 2.7, (v) => this._set((k) => (k.props.pressure_max = v)), 0.1)}
            </div>`
        : nothing}
      ${c.type === "buffer" || c.type === "dhw_tank" ? this._num(t("ed.volume"), c.props.volume, (v) => this._set((k) => (k.props.volume = v))) : nothing}
      ${def.roles
        ? html`<label class="field">${t("ed.role")}<select @change=${(e: Event) => this._set((k) => (k.props.role = (e.target as HTMLSelectElement).value))}>
            ${def.roles.map((r) => html`<option value=${r} ?selected=${c.props.role === r}>${t(`role.${r}`)}</option>`)}
          </select></label>`
        : nothing}
      ${["radiators", "floor_heating", "mixer", "pump"].includes(c.type)
        ? this._num(t("ed.circuit"), c.props.circuit ?? 1, (v) => this._set((k) => (k.props.circuit = v)))
        : nothing}
      ${c.type === "dhw_tank" ? this._num(t("ed.dhw_circuit"), c.props.dhw_circuit ?? 1, (v) => this._set((k) => (k.props.dhw_circuit = v))) : nothing}
      ${c.type === "label"
        ? html`<label class="field">${t("ed.text")}<input .value=${c.props.text || ""} @change=${(e: Event) => this._set((k) => (k.props.text = (e.target as HTMLInputElement).value))} /></label>
            ${this._num("px", c.props.size || 18, (v) => this._set((k) => (k.props.size = v)))}`
        : nothing}
      ${def.rotatable
        ? html`<label class="field">${t("ed.rotation")}<select @change=${(e: Event) => this._set((k) => (k.rot = Number((e.target as HTMLSelectElement).value) as Rotation))}>
            ${[0, 90, 180, 270].map((r) => html`<option value=${r} ?selected=${(c.rot || 0) === r}>${r}°</option>`)}
          </select></label>`
        : nothing}
      ${c.type === "radiators" || c.type === "tap"
        ? html`<label class="field">${t(c.type === "tap" ? "ed.tap_kind" : "ed.connection")}<select @change=${(e: Event) => this._set((k) => (k.props.variant = (e.target as HTMLSelectElement).value))}>
            ${(c.type === "tap" ? ["tap", "shower"] : ["side", "bottom"]).map(
              (v) => html`<option value=${v} ?selected=${(c.props.variant || (c.type === "tap" ? "tap" : "side")) === v}>${t(c.type === "tap" ? `ed.tap.${v}` : `ed.conn.${v}`)}</option>`,
            )}
          </select></label>`
        : nothing}
      ${def.mirrorable
        ? html`<label class="field check"><input type="checkbox" .checked=${!!c.flip} @change=${(e: Event) => this._set((k) => {
            if ((e.target as HTMLInputElement).checked) k.flip = true;
            else delete k.flip;
          })} />${t("ed.flip")}</label>`
        : nothing}
      ${c.valuePos && Object.keys(c.valuePos).length
        ? html`<button class="ghost" @click=${() => this._set((k) => delete k.valuePos)}>${t("ed.values_reset")}</button>`
        : nothing}
      ${!["junction", "label", "value_tile"].includes(c.type)
        ? html`<label class="field">${t("ed.icon")}<select @change=${(e: Event) => this._set((k) => {
            const v = (e.target as HTMLSelectElement).value;
            if (v) k.icon = v;
            else delete k.icon;
          })}>
            <option value="">${t("ed.icon_default")}</option>
            ${icons.map((i) => html`<option value=${i.id} ?selected=${i.id === c.icon}>${i.name}</option>`)}
          </select></label>`
        : nothing}
      ${c.type === "value_tile" ? this._tileEntries(c) : this._bindings(c, shown)}
    `;
  }

  private _bindings(c: PlantComponent, shown: Set<string>) {
    const slots = slotsOf(c);
    if (!slots.length) return nothing;
    return html`<div class="cap">${t("ed.bindings")}</div>
      <div class="bindings">
        ${slots.map((s) => {
          const v = this.src.get(c, s.key);
          const { text, unit } = formatValue(v, s.kind);
          return html`<div class="bind">
            <div class="bhead">
              <label class="show" title=${t("ed.show")}><input type="checkbox" .checked=${shown.has(s.key)}
                @change=${(e: Event) => this._set((k) => {
                  const cur = new Set(k.show ?? slotsOf(k).filter((x) => x.show).map((x) => x.key));
                  (e.target as HTMLInputElement).checked ? cur.add(s.key) : cur.delete(s.key);
                  k.show = slotsOf(k).map((x) => x.key).filter((key) => cur.has(key));
                })} /></label>
              <span class="bname">${slotLabel(c.type, s.key)}</span>
              <span class="bval">${v ? `${text} ${unit}` : ""}</span>
              ${writeKind(c.bindings[s.key])
                ? html`<label class="wr" title=${t("wr.release")}><input type="checkbox" .checked=${(c.writable || []).includes(s.key)}
                    @change=${(e: Event) => this._set((k) => {
                      const w = new Set(k.writable || []);
                      (e.target as HTMLInputElement).checked ? w.add(s.key) : w.delete(s.key);
                      if (w.size) k.writable = [...w];
                      else delete k.writable;
                    })} />✎</label>`
                : nothing}
            </div>
            <cp-entity-picker .hass=${this.hass} .value=${c.bindings[s.key] || ""}
              @value-changed=${(e: CustomEvent) => this._set((k) => {
                if (e.detail) k.bindings[s.key] = e.detail;
                else delete k.bindings[s.key];
              })}></cp-entity-picker>
          </div>`;
        })}
      </div>`;
  }

  private _tileEntries(c: PlantComponent) {
    const entries = (c.props.entries as { slot: string; label: string; entity: string; kind: SlotKind }[]) || [];
    const kinds: SlotKind[] = ["temp", "power_kw", "power_w", "energy", "percent", "pressure", "flow", "count", "bool", "text"];
    return html`<div class="cap">${t("ed.entries")}</div>
      ${entries.map(
        (en, i) => html`<div class="bind">
          <div class="two">
            <input .value=${en.label || ""} placeholder=${t("ed.label")} @change=${(e: Event) => this._set((k) => (k.props.entries[i].label = (e.target as HTMLInputElement).value))} />
            <select @change=${(e: Event) => this._set((k) => (k.props.entries[i].kind = (e.target as HTMLSelectElement).value))}>
              ${kinds.map((kd) => html`<option value=${kd} ?selected=${en.kind === kd}>${kd}</option>`)}
            </select>
          </div>
          <div class="row nowrap">
            <cp-entity-picker .hass=${this.hass} .value=${en.entity || ""}
              @value-changed=${(e: CustomEvent) => this._set((k) => (k.props.entries[i].entity = e.detail))}></cp-entity-picker>
            <button class="icon danger" @click=${() => this._set((k) => k.props.entries.splice(i, 1))}>${icon("trash")}</button>
          </div>
        </div>`,
      )}
      <button @click=${() => this._set((k) => {
        k.props.entries = [...(k.props.entries || []), { slot: `v${Date.now().toString(36)}`, label: "", entity: "", kind: "text" }];
      })}>${icon("plus")} ${t("ed.add_entry")}</button>`;
  }

  private _conds(list: FlowCond[] | undefined, key: "flow" | "flowAny") {
    const comps = this._draft.components.filter((c) => STATES[c.type]);
    return html`${(list || []).map(
        (f, i) => html`<div class="row nowrap cond">
          <select @change=${(e: Event) => this._setPipe((x) => (x[key]![i].c = (e.target as HTMLSelectElement).value))}>
            ${comps.map((c) => html`<option value=${c.id} ?selected=${c.id === f.c}>${c.label || c.id}</option>`)}
          </select>
          <select @change=${(e: Event) => this._setPipe((x) => (x[key]![i].s = (e.target as HTMLSelectElement).value))}>
            ${(STATES[this._comp(f.c)?.type || "pump"] || []).map(
              (s) => html`<option value=${s} ?selected=${s === f.s}>${s.startsWith("!") ? `${t("ed.not")} ${t(`state.${s.slice(1)}`)}` : t(`state.${s}`)}</option>`,
            )}
          </select>
          <button class="icon danger" @click=${() => this._setPipe((x) => x[key]!.splice(i, 1))}>${icon("close")}</button>
        </div>`,
      )}
      <button ?disabled=${!comps.length} @click=${() => this._setPipe((x) => {
        const c = comps[0];
        x[key] = [...(x[key] || []), { c: c.id, s: STATES[c.type]![0] }];
      })}>${icon("plus")} ${t("ed.add_cond")}</button>`;
  }

  private _pipeProps() {
    const p = this._pipe();
    if (!p) return nothing;
    const name = (id: string) => this._comp(id)?.label || id;
    return html`
      <div class="ptitle">${t("ed.pipe")} <code>${p.id}</code></div>
      <p class="muted small">${name(p.from.c)} · ${p.from.p} → ${name(p.to.c)} · ${p.to.p}</p>
      <label class="field">${t("ed.kind")}<select @change=${(e: Event) => this._setPipe((x) => (x.kind = (e.target as HTMLSelectElement).value as PipeKind))}>
        ${KINDS.map((k) => html`<option value=${k} ?selected=${k === p.kind}>${t(`kind.${k}`)}</option>`)}
      </select></label>
      <div class="cap">${t("ed.flow_when")}</div>
      ${this._conds(p.flow, "flow")}
      <div class="cap">${t("ed.or")}</div>
      ${this._conds(p.flowAny, "flowAny")}
      <div class="cap">${t("ed.bindings")}</div>
      <label class="field">${t("ed.temp_entity")}
        <cp-entity-picker .hass=${this.hass} .value=${p.bindings?.temp || ""}
          @value-changed=${(e: CustomEvent) => this._setPipe((x) => (x.bindings = { ...(x.bindings || {}), temp: e.detail || undefined }))}></cp-entity-picker></label>
      <div class="row" style="margin-top:12px">
        <button ?disabled=${p.bend === undefined && !p.via} @click=${() => this._setPipe((x) => {
          delete x.bend;
          delete x.via;
        })}>${t("ed.reset_bend")}</button>
      </div>
    `;
  }

  static styles = [
    ui,
    css`
      :host { display: flex; flex-direction: column; gap: 10px; height: 100%; min-height: 0; }
      .toolbar { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
      .hint { font-size: 12px; color: var(--cp-select); margin-left: 6px; }
      .dirty { font-size: 12px; color: var(--cp-warn); }
      .layout { flex: 1; min-height: 0; display: grid; grid-template-columns: 190px 1fr 330px; gap: 10px; }
      .palette, .props { overflow: auto; padding: 12px; }
      .palette { display: flex; flex-direction: column; gap: 4px; }
      .pal { justify-content: flex-start; font-size: 12px; padding: 6px 8px; background: transparent; }
      .cap { font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; color: var(--cp-muted); margin: 14px 0 6px; font-weight: 700; }
      .palette .cap:first-child { margin-top: 0; }
      .grid-size { flex-wrap: nowrap; color: var(--cp-muted); }
      .grid-size input { width: 64px; }
      .canvas { position: relative; padding: 0; overflow: hidden; min-height: 420px; }
      cp-schematic { position: absolute; inset: 0; }
      .props { display: flex; flex-direction: column; gap: 10px; }
      .ptitle { font-weight: 800; font-size: 15px; }
      code { font-size: 11px; color: var(--cp-muted); font-weight: 500; }
      .small { font-size: 12px; margin: 0; }
      .two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .bindings { display: grid; gap: 8px; }
      .bind { display: grid; gap: 4px; padding: 8px; border-radius: 10px; background: var(--cp-surface-2); }
      .bhead { display: flex; gap: 6px; align-items: center; font-size: 12px; }
      .bname { font-weight: 600; flex: 1; }
      .bval { color: var(--cp-muted); font-variant-numeric: tabular-nums; }
      .tiny { font-size: 11px; margin: 6px 0 0; line-height: 1.4; }
      .bld { display: flex; gap: 8px; align-items: center; font-size: 13px; margin-top: 10px; }
      .bld input { width: auto; margin: 0; }
      .wr { display: inline-flex; align-items: center; gap: 2px; font-size: 12px; color: var(--cp-warn); cursor: pointer; }
      .wr input { width: auto; margin: 0; }
      .nowrap { flex-wrap: nowrap; }
      .cond select { font-size: 12px; padding: 6px; }
      @media (max-width: 1100px) {
        .layout { grid-template-columns: 1fr; grid-template-rows: 60vh auto auto; }
        .palette { flex-direction: row; flex-wrap: wrap; order: 2; }
        .palette .cap { width: 100%; }
        .props { order: 3; }
      }
    `,
  ];
}

if (!customElements.get("cp-editor")) customElements.define("cp-editor", CpEditor);


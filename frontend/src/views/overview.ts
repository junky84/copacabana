import { LitElement, css, html, nothing, svg } from "lit";
import { fmtNum, fmtTime, t } from "../i18n";
import { icon, ui } from "../styles";
import type { Hass, Plant, PlantComponent, PlantMessage, UserIcon } from "../types";
import { ReplaySource } from "../data/replay";
import { componentFlags, normalizeActivity, tempColor, type ValueSource } from "../data/values";
import type { Simulator } from "../sim/simulator";
import { AMPEL_COLOR, liveCop } from "../data/efficiency";
import { explainComponent, explainPlant, type ExplainTone } from "../data/explain";
import { energyAvailable, readEnergy } from "../data/energy";
import "../render/energy";
import type { CpSchematic } from "../render/schematic";
import "../render/schematic";
import "./widgets";

interface Kpi {
  key: string;
  label: string;
  value: string;
  unit: string;
  color?: string;
  sub?: string;
  comp?: PlantComponent;
  slot?: string;
}

const SPEEDS = [1, 10, 60, 300, 900];
const LS_EXPLAIN = "copilot.explain";
const LS_ENERGY = "copilot.energy";

const TONE: Record<ExplainTone, string> = {
  heat: "#ff8a3d",
  dhw: "#ff4f8b",
  cold: "#6cc4ff",
  warn: "var(--cp-warn)",
  error: "var(--cp-error)",
  eco: "#3ddc97",
  info: "var(--cp-muted)",
};

function lsGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function lsSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode */
  }
}

export class CpOverview extends LitElement {
  static properties = {
    plant: { attribute: false },
    src: { attribute: false },
    icons: { attribute: false },
    messages: { attribute: false },
    sim: { attribute: false },
    version: { type: Number },
    narrow: { type: Boolean },
    showDemo: { type: Boolean },
    showKpis: { type: Boolean },
    showSide: { type: Boolean },
    _pop: { state: true },
    _side: { state: true },
    _explain: { state: true },
    _comp: { state: true },
    _energy: { state: true },
    _tm: { state: true },
    _tmBusy: { state: true },
    _tick: { state: true },
    hass: { attribute: false },
  };
  hass?: Hass;
  plant!: Plant;
  src!: ValueSource;
  icons: Map<string, UserIcon> = new Map();
  messages: PlantMessage[] = [];
  sim: Simulator | null = null;
  version = 0;
  narrow = false;
  /** areas that the Lovelace card can switch off */
  showDemo = true;
  showKpis = true;
  showSide = true;
  private _pop: { component: PlantComponent; slot: string; x: number; y: number } | null = null;
  private _side = true;
  private _explain = lsGet(LS_EXPLAIN) === "1";
  private _energy = lsGet(LS_ENERGY) !== "0";
  private _comp: { component: PlantComponent; x: number; y: number } | null = null;

  private _toggleExplain() {
    this._explain = !this._explain;
    lsSet(LS_EXPLAIN, this._explain ? "1" : "0");
  }

  // ------------------------------------------------------------ time machine
  private _tm: { src: ReplaySource; playing: boolean; speed: number; hours: number; strip: { x: number; w: number; mode: string }[] } | null = null;
  private _tmBusy = false;
  private _tick = 0;
  private _raf = 0;
  private _last = 0;
  private _drawn = 0;

  /** values shown right now: live, or the recorded state at the replay time */
  private get _src(): ValueSource {
    return this._tm?.src ?? this.src;
  }

  private async _openTm(hours = 24) {
    if (this._tmBusy) return;
    this._tmBusy = true;
    try {
      const h = this.sim ? Math.min(hours, 24) : hours;
      const src = await ReplaySource.load(this.plant, this.src, h, this.hass);
      src.t = src.start;
      this._tm = { src, playing: false, speed: this._tm?.speed ?? 900, hours: h, strip: this._modeStrip(src) };
    } catch (err) {
      console.error("COPilot: history could not be loaded", err);
    } finally {
      this._tmBusy = false;
    }
  }

  private _closeTm() {
    cancelAnimationFrame(this._raf);
    this._tm = null;
  }

  /** Operating mode along the replay range, for the strip under the slider. */
  private _modeStrip(src: ReplaySource): { x: number; w: number; mode: string }[] {
    const ou = this._first("outdoor_unit");
    if (!ou) return [];
    const n = 240;
    const t0 = src.start;
    const span = Math.max(1, src.to - t0);
    const keep = src.t;
    const out: { x: number; w: number; mode: string }[] = [];
    for (let i = 0; i < n; i++) {
      src.t = t0 + (span * (i + 0.5)) / n;
      const f = componentFlags(ou, src);
      const act = normalizeActivity(src.get(ou, "activity"));
      const mode = f.has("defrost") ? "defrost" : act === "hot_water" ? "hot_water" : f.has("running") ? (act && act !== "off" ? act : "heating") : "off";
      const prev = out[out.length - 1];
      if (prev && prev.mode === mode) prev.w += 1 / n;
      else out.push({ x: i / n, w: 1 / n, mode });
    }
    src.t = keep;
    return out;
  }

  private _play() {
    const tm = this._tm;
    if (!tm) return;
    if (tm.src.t >= tm.src.to - 1) tm.src.t = tm.src.start;
    tm.playing = !tm.playing;
    this._tm = { ...tm };
    if (tm.playing) {
      this._last = performance.now();
      const step = (now: number) => {
        const cur = this._tm;
        if (!cur?.playing) return;
        const dt = Math.min(0.25, (now - this._last) / 1000);
        this._last = now;
        cur.src.t = Math.min(cur.src.to, cur.src.t + dt * cur.speed);
        if (cur.src.t >= cur.src.to) this._tm = { ...cur, playing: false };
        // redraw about 10× per second: smooth enough, light on the wall display
        if (now - this._drawn > 100) {
          this._drawn = now;
          this._tick++;
        }
        this._raf = requestAnimationFrame(step);
      };
      this._raf = requestAnimationFrame(step);
    }
  }

  private _seek(t: number) {
    if (!this._tm) return;
    this._tm.src.t = t;
    this._tick++;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    cancelAnimationFrame(this._raf);
  }

  private _tmBar() {
    const tm = this._tm;
    if (!tm) return nothing;
    const s = tm.src;
    const start = s.start;
    const d = new Date(s.t * 1000);
    const label = d.toLocaleString(undefined, { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    const MODE: Record<string, string> = { heating: "#ff8a3d", hot_water: "#ff4f8b", defrost: "#6cc4ff", compressor_alarm: "#ff5a5f", off: "transparent" };
    return html`<div class="tm">
      <button class="icon" title=${tm.playing ? t("tm.pause") : t("tm.play")} @click=${this._play}>${icon(tm.playing ? "pause" : "play")}</button>
      <div class="tm-track">
        <input type="range" min=${start} max=${s.to} step="60" .value=${String(s.t)}
          @input=${(e: Event) => this._seek(Number((e.target as HTMLInputElement).value))} aria-label=${t("tm.title")} />
        <svg class="strip" viewBox="0 0 1 1" preserveAspectRatio="none">
          ${tm.strip.map((p) => svg`<rect x=${p.x} y="0" width=${p.w + 0.001} height="1" fill=${MODE[p.mode] ?? "#8b949e"} />`)}
        </svg>
      </div>
      <span class="tm-time">${label}</span>
      <select title=${t("tm.speed")} @change=${(e: Event) => (this._tm = { ...tm, speed: Number((e.target as HTMLSelectElement).value) })}>
        ${[300, 900, 1800, 3600].map((v) => html`<option value=${v} ?selected=${tm.speed === v}>${t("tm.speed_v", { min: v / 60 })}</option>`)}
      </select>
      ${this.sim
        ? nothing
        : html`<select title=${t("tm.range")} @change=${(e: Event) => this._openTm(Number((e.target as HTMLSelectElement).value))}>
            ${[6, 24, 72].map((h) => html`<option value=${h} ?selected=${tm.hours === h}>${t("tm.hours", { h })}</option>`)}
          </select>`}
      <button class="live" @click=${this._closeTm}>${t("tm.live")}</button>
    </div>`;
  }

  private _toggleEnergy() {
    this._energy = !this._energy;
    lsSet(LS_ENERGY, this._energy ? "1" : "0");
  }

  private _onComponent(e: CustomEvent) {
    if (this._explain) this._comp = e.detail;
  }

  private _explainPanel() {
    const items = explainPlant(this.plant, this._src);
    return html`<div class="side-head"><b>${t("ex.title")}</b></div>
      ${items.length
        ? html`<ul class="explain">
            ${items.map(
              (it) => html`<li style="--tone:${TONE[it.tone]}">
                <span class="dot"></span>
                <div>
                  <div>${t(it.key, it.params)}</div>
                  ${it.hint ? html`<div class="ex-hint">${t(it.hint, it.params)}</div>` : nothing}
                </div>
              </li>`,
            )}
          </ul>`
        : html`<p class="muted">${t("ex.empty")}</p>`}
      <p class="ex-tip">${icon("info")} ${t("ex.tap_hint")}</p>`;
  }

  private _compPop() {
    const p = this._comp;
    if (!p) return nothing;
    const ex = explainComponent(p.component, this._src);
    const w = 300;
    const left = Math.max(12, Math.min(window.innerWidth - w - 12, p.x - w / 2));
    const top = Math.max(12, Math.min(window.innerHeight - 200, p.y + 14));
    return html`<div class="backdrop" @pointerdown=${() => (this._comp = null)}></div>
      <div class="cpop card" style="left:${left}px; top:${top}px; width:${w}px">
        <div class="row cpop-head">
          <div>
            <div class="cpop-title">${p.component.label || t(`type.${p.component.type}`)}</div>
            <div class="muted cpop-sub">${t(`type.${p.component.type}`)}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${() => (this._comp = null)} aria-label=${t("close")}>${icon("close")}</button>
        </div>
        ${ex.role ? html`<p>${t(ex.role, ex.params)}</p>` : nothing}
        ${ex.state ? html`<p class="cpop-state">${t(ex.state, ex.params)}</p>` : nothing}
      </div>`;
  }

  private _first(type: string): PlantComponent | undefined {
    return this.plant.components.find((c) => c.type === type);
  }

  private _num(c: PlantComponent | undefined, slot: string): number | undefined {
    if (!c) return undefined;
    const v = this._src.get(c, slot);
    return v?.available && v.num !== null ? v.num : undefined;
  }

  private _kpis(): Kpi[] {
    const ou = this._first("outdoor_unit");
    const iu = this._first("indoor_unit");
    const dhw = this._first("dhw_tank");
    const hc = this.plant.components.find((c) => c.type === "radiators" || c.type === "floor_heating");
    const vw = this.plant.components.find((c) => c.type === "valve_3way" && c.props.role === "dhw_switch");
    let mode = ou ? normalizeActivity(this._src.get(ou, "activity")) : undefined;
    if (!mode && ou) {
      const f = componentFlags(ou, this._src);
      const vf = vw ? componentFlags(vw, this._src) : new Set<string>();
      mode = f.has("running") ? (vf.has("b") ? "hot_water" : "heating") : "off";
    }
    const modeColors: Record<string, string> = {
      heating: "#ff8a3d",
      hot_water: "#ff4f8b",
      defrost: "#6cc4ff",
      compressor_alarm: "#ff5a5f",
      off: "#8a97a6",
    };
    const heat = this._num(ou, "heat_power");
    let el = this._num(ou, "el_power");
    const elUnit = ou ? this._src.get(ou, "el_power")?.unit : undefined;
    if (el !== undefined && elUnit === "kW") el *= 1000;
    const cop = heat !== undefined && el !== undefined && el > 50 && heat > 0.2 ? heat / (el / 1000) : undefined;
    const fmt = (n: number | undefined, d = 1) => (n === undefined ? "–" : fmtNum(n, d));
    const live = liveCop(this.plant, this._src);
    const out: Kpi[] = [
      { key: "mode", label: t("kpi.mode"), value: mode ? t(`mode.${mode}`) : "–", unit: "", color: modeColors[mode || "off"] },
      { key: "out", label: t("kpi.outdoor"), value: fmt(this._num(ou, "outdoor_temp")), unit: "°C", comp: ou, slot: "outdoor_temp" },
      { key: "heat", label: t("kpi.heat"), value: fmt(heat), unit: "kW", comp: ou, slot: "heat_power" },
      { key: "power", label: t("kpi.power"), value: el === undefined ? "–" : el >= 1000 ? fmtNum(el / 1000, 2) : fmtNum(el, 0), unit: el !== undefined && el >= 1000 ? "kW" : "W", comp: ou, slot: "el_power" },
      {
        key: "cop",
        label: t("kpi.cop"),
        value: fmt(cop),
        unit: "",
        color: live ? AMPEL_COLOR[live.ampel] : undefined,
        sub: live ? `${t("kpi.target")} ${fmt(live.expected)}` : undefined,
      },
      {
        key: "supply",
        label: t("kpi.supply"),
        value: fmt(this._num(iu, "supply_temp")),
        unit: "°C",
        color: tempColor(this._num(iu, "supply_temp"), ""),
        sub: this._num(iu, "target_flow_temp") !== undefined ? `${t("kpi.target")} ${fmt(this._num(iu, "target_flow_temp"))}` : undefined,
        comp: iu,
        slot: "supply_temp",
      },
    ];
    if (dhw) out.push({ key: "dhw", label: t("kpi.dhw"), value: fmt(this._num(dhw, "temp_top")), unit: "°C", color: tempColor(this._num(dhw, "temp_top"), ""), comp: dhw, slot: "temp_top" });
    if (hc && this._num(hc, "room_temp") !== undefined) out.push({ key: "room", label: t("kpi.room"), value: fmt(this._num(hc, "room_temp")), unit: "°C", comp: hc, slot: "room_temp" });
    return out;
  }

  private _openPop(e: CustomEvent) {
    this._pop = e.detail;
  }

  private _scenario(name: string) {
    this.dispatchEvent(new CustomEvent("scenario", { detail: name, bubbles: true, composed: true }));
  }

  private _demoBar() {
    const sim = this.sim;
    if (!sim || !this.showDemo) return nothing;
    const scenarios = ["winter", "transition", "shower", "defrost", "dim14a", "pv", "disinfect", "fault", "reset"];
    const toggles: Record<string, boolean> = { dim14a: sim.dim14a, pv: sim.pv, fault: sim.fault, disinfect: sim.disinfect };
    return html`<div class="demo">
      <span class="demo-tag">${icon("flask")} ${t("demo.active")}</span>
      <span class="clock" title=${t("demo.time")}>${fmtTime(sim.time)}</span>
      <label class="ctl">${t("demo.speed")}
        <select @change=${(e: Event) => (sim.speed = Number((e.target as HTMLSelectElement).value))}>
          ${SPEEDS.map((s) => html`<option value=${s} ?selected=${sim.speed === s}>${s}×</option>`)}
        </select>
      </label>
      <label class="ctl slider">${t("demo.outdoor")} <b>${fmtNum(sim.outdoorMean, 0)} °C</b>
        <input type="range" min="-15" max="20" step="1" .value=${String(sim.outdoorMean)}
          @input=${(e: Event) => (sim.outdoorMean = Number((e.target as HTMLInputElement).value))} />
      </label>
      ${this.narrow
        ? html`<select class="scn-select" @change=${(e: Event) => {
            const sel = e.target as HTMLSelectElement;
            if (sel.value) this._scenario(sel.value);
            sel.value = "";
          }}>
            <option value="">${t("demo.scenarios")} …</option>
            ${scenarios.map((s) => html`<option value=${s}>${toggles[s] ? "✓ " : ""}${t(`scn.${s}`)}</option>`)}
          </select>`
        : html`<div class="scn">
            ${scenarios.map(
              (s) => html`<button class=${toggles[s] ? "primary" : ""} @click=${() => this._scenario(s)}>${t(`scn.${s}`)}</button>`,
            )}
          </div>`}
    </div>`;
  }

  render() {
    if (!this.plant) return nothing;
    const kpis = this._kpis();
    const hasEnergy = energyAvailable(this.plant, this._tm ? null : this.sim);
    const activeCount = this.messages.filter((m) => m.active && (m.level === "warning" || m.level === "error")).length;
    return html`
      ${this._tm ? nothing : this._demoBar()}
      ${this.showKpis ? html`<div class="kpis">
        ${kpis.map(
          (k) => html`<button class="kpi" ?disabled=${!k.comp} @click=${(e: MouseEvent) => k.comp && (this._pop = { component: k.comp, slot: k.slot!, x: e.clientX, y: e.clientY })}>
            <span class="k-label">${k.label}</span>
            <span class="k-value" style=${k.color ? `color:${k.color}` : ""}>${k.value}<small>${k.unit}</small></span>
            ${k.sub ? html`<span class="k-sub">${k.sub}</span>` : nothing}
          </button>`,
        )}
      </div>` : nothing}
      ${hasEnergy && this._energy
        ? html`<div class="energy card"><cp-energy .flow=${readEnergy(this.plant, this._src, this._tm ? null : this.sim)}></cp-energy></div>`
        : nothing}
      <div class="main ${this._explain || (this._side && this.showSide) ? "with-side" : ""}">
        <div class="stage card">
          <cp-schematic
            ?auto-height=${this.narrow}
            .plant=${this.plant}
            .src=${this._src}
            .icons=${this.icons}
            .version=${this.version * 100000 + this._tick}
            @cp-slot-click=${this._openPop}
            @cp-component-click=${this._onComponent}
          ></cp-schematic>
          ${this._tmBar()}
          <div class="zoom">
            ${hasEnergy
              ? html`<button class="icon ${this._energy ? "on" : ""}" title=${t("en.toggle")} aria-pressed=${this._energy ? "true" : "false"} @click=${this._toggleEnergy}>${icon("bolt")}</button>`
              : nothing}
            <button class="icon ${this._tm ? "on" : ""} ${this._tmBusy ? "busy" : ""}" title=${t("tm.title")} aria-pressed=${this._tm ? "true" : "false"}
              @click=${() => (this._tm ? this._closeTm() : this._openTm())}>${icon("history")}</button>
            <button class="icon ${this._explain ? "on" : ""}" title=${t("ex.toggle")} aria-pressed=${this._explain ? "true" : "false"} @click=${this._toggleExplain}>${icon("info")}</button>
            <button class="icon" title=${t("zoom_in")} @click=${() => this._sch()?.zoom(0.8)}>${icon("plus")}</button>
            <button class="icon" title=${t("zoom_out")} @click=${() => this._sch()?.zoom(1.25)}>${icon("minus")}</button>
            <button class="icon" title=${t("fit")} @click=${() => this._sch()?.fit()}>${icon("fit")}</button>
            ${this.narrow || !this.showSide
              ? nothing
              : html`<button class="icon" title=${t("msg.title")} @click=${() => (this._side = !this._side)}>
                  ${icon("bell")}${activeCount ? html`<span class="badge">${activeCount}</span>` : nothing}</button>`}
          </div>
        </div>
        ${this._explain
          ? html`<aside class="side card">${this._explainPanel()}</aside>`
          : this.showSide && (this._side || this.narrow)
            ? html`<aside class="side card">
                <div class="side-head"><b>${t("msg.title")}</b></div>
                <cp-messages compact .messages=${this.messages}></cp-messages>
              </aside>`
            : nothing}
      </div>
      ${this._pop
        ? html`<cp-slot-popover
            .component=${this._pop.component}
            .slotKey=${this._pop.slot}
            .src=${this._src}
            .x=${this._pop.x}
            .y=${this._pop.y}
            .version=${this.version}
            @close=${() => (this._pop = null)}
          ></cp-slot-popover>`
        : nothing}
      ${this._compPop()}
    `;
  }

  private _sch(): CpSchematic | null {
    return this.renderRoot.querySelector("cp-schematic");
  }

  static styles = [
    ui,
    css`
      :host { display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; }
      .demo {
        display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px;
        padding: 10px 14px; border-radius: var(--cp-radius);
        background: linear-gradient(90deg, color-mix(in srgb, var(--cp-notice) 18%, var(--cp-surface)), var(--cp-surface));
        border: 1px solid color-mix(in srgb, var(--cp-notice) 35%, var(--cp-border));
      }
      .demo-tag { display: inline-flex; gap: 6px; align-items: center; font-weight: 700; color: var(--cp-notice); font-size: 13px; }
      .clock { font-variant-numeric: tabular-nums; font-weight: 700; font-size: 15px; }
      .ctl { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; color: var(--cp-muted); }
      .ctl select { width: auto; padding: 4px 8px; }
      .ctl.slider input { width: 140px; }
      .ctl b { color: var(--cp-text); min-width: 44px; }
      .scn { display: flex; gap: 6px; flex-wrap: wrap; }
      .scn button { padding: 5px 10px; font-size: 12px; }
      .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(118px, 1fr)); gap: 10px; }
      .kpi {
        display: grid; gap: 2px; justify-items: start; text-align: left;
        background: var(--cp-surface); border: 1px solid var(--cp-border); border-radius: var(--cp-radius);
        padding: 10px 14px; cursor: pointer;
      }
      .kpi:disabled { cursor: default; opacity: 1; }
      .k-label { font-size: 11px; color: var(--cp-muted); text-transform: uppercase; letter-spacing: 0.6px; font-weight: 600; }
      .k-value { font-size: 22px; font-weight: 800; font-variant-numeric: tabular-nums; white-space: nowrap; }
      .k-value small { font-size: 12px; color: var(--cp-muted); font-weight: 600; margin-left: 3px; }
      .k-sub { font-size: 11px; color: var(--cp-muted); }
      .main { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr); gap: 12px; }
      .main.with-side { grid-template-columns: 1fr 320px; }
      .stage { position: relative; padding: 0; overflow: hidden; min-height: 360px;
        background: radial-gradient(1200px 600px at 30% 0%, color-mix(in srgb, var(--cp-accent) 6%, transparent), transparent), var(--cp-surface); }
      cp-schematic { position: absolute; inset: 0; }
      .zoom { position: absolute; right: 10px; bottom: 10px; display: flex; gap: 6px; }
      .zoom button { background: var(--cp-chip); backdrop-filter: blur(6px); position: relative; }
      .zoom .badge { position: absolute; top: -6px; right: -6px; }
      .side { overflow: auto; padding: 12px 14px; min-height: 0; }
      .side-head { font-size: 14px; margin-bottom: 4px; }
      .energy { padding: 10px 14px 6px; }
      .tm { position: absolute; left: 10px; right: 10px; top: 10px; z-index: 2; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px;
        padding: 8px 12px; border-radius: 12px; background: color-mix(in srgb, var(--cp-surface) 88%, transparent);
        border: 1px solid color-mix(in srgb, var(--cp-accent) 45%, var(--cp-border)); backdrop-filter: blur(8px); }
      .tm-track { flex: 1; min-width: 180px; display: grid; gap: 3px; }
      .tm-track input { width: 100%; margin: 0; accent-color: var(--cp-accent); }
      .strip { width: 100%; height: 6px; border-radius: 3px; background: var(--cp-border); display: block; }
      .tm-time { font-weight: 800; font-variant-numeric: tabular-nums; min-width: 128px; }
      .tm select { width: auto; padding: 4px 8px; font-size: 12px; }
      .tm .live { padding: 5px 12px; font-size: 12px; font-weight: 700; }
      .zoom button.busy { opacity: 0.5; }
      .zoom button.on { background: var(--cp-accent); color: var(--cp-bg); }
      .explain { list-style: none; margin: 8px 0 0; padding: 0; display: grid; gap: 10px; font-size: 13px; line-height: 1.45; }
      .explain li { display: grid; grid-template-columns: 10px 1fr; gap: 10px; padding: 8px 10px; border-radius: 10px;
        background: color-mix(in srgb, var(--tone) 9%, transparent); border-left: 3px solid var(--tone); }
      .explain .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tone); margin-top: 6px; }
      .ex-hint { color: var(--cp-muted); font-size: 12px; margin-top: 3px; }
      .ex-tip { display: flex; gap: 6px; align-items: flex-start; color: var(--cp-muted); font-size: 12px; margin: 12px 0 0; }
      .ex-tip svg { flex: none; width: 15px; height: 15px; }
      .backdrop { position: fixed; inset: 0; z-index: 30; }
      .cpop { position: fixed; z-index: 31; box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45); padding: 14px; font-size: 13px; line-height: 1.45; }
      .cpop p { margin: 8px 0 0; }
      .cpop-head { flex-wrap: nowrap; align-items: flex-start; }
      .cpop-title { font-weight: 700; font-size: 15px; }
      .cpop-sub { font-size: 12px; }
      .cpop-state { color: var(--cp-accent); font-weight: 600; }
      @media (max-width: 900px) {
        :host { height: auto; }
        .main, .main.with-side { grid-template-columns: 1fr; grid-template-rows: auto; flex: none; }
        .stage { min-height: 0; }
        cp-schematic { position: relative; inset: auto; }
        .scn-select { width: auto; flex: 1; min-width: 160px; }
        .demo { gap: 8px 10px; padding: 8px 10px; }
        .side { max-height: none; }
        .kpis { grid-template-columns: repeat(auto-fit, minmax(96px, 1fr)); gap: 8px; }
        .kpi { padding: 8px 10px; }
        .k-value { font-size: 18px; }
        .ctl.slider input { width: 110px; }
      }
    `,
  ];
}

if (!customElements.get("cp-overview")) customElements.define("cp-overview", CpOverview);

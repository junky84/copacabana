import { LitElement, css, html, nothing } from "lit";
import { fmtNum, fmtTime, t } from "../i18n";
import { icon, ui } from "../styles";
import type { Plant, PlantComponent, PlantMessage, UserIcon } from "../types";
import { componentFlags, normalizeActivity, tempColor, type ValueSource } from "../data/values";
import type { Simulator } from "../sim/simulator";
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
  };
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

  private _first(type: string): PlantComponent | undefined {
    return this.plant.components.find((c) => c.type === type);
  }

  private _num(c: PlantComponent | undefined, slot: string): number | undefined {
    if (!c) return undefined;
    const v = this.src.get(c, slot);
    return v?.available && v.num !== null ? v.num : undefined;
  }

  private _kpis(): Kpi[] {
    const ou = this._first("outdoor_unit");
    const iu = this._first("indoor_unit");
    const dhw = this._first("dhw_tank");
    const hc = this.plant.components.find((c) => c.type === "radiators" || c.type === "floor_heating");
    const vw = this.plant.components.find((c) => c.type === "valve_3way" && c.props.role === "dhw_switch");
    let mode = ou ? normalizeActivity(this.src.get(ou, "activity")) : undefined;
    if (!mode && ou) {
      const f = componentFlags(ou, this.src);
      const vf = vw ? componentFlags(vw, this.src) : new Set<string>();
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
    const elUnit = ou ? this.src.get(ou, "el_power")?.unit : undefined;
    if (el !== undefined && elUnit === "kW") el *= 1000;
    const cop = heat !== undefined && el !== undefined && el > 50 && heat > 0.2 ? heat / (el / 1000) : undefined;
    const fmt = (n: number | undefined, d = 1) => (n === undefined ? "–" : fmtNum(n, d));
    const out: Kpi[] = [
      { key: "mode", label: t("kpi.mode"), value: mode ? t(`mode.${mode}`) : "–", unit: "", color: modeColors[mode || "off"] },
      { key: "out", label: t("kpi.outdoor"), value: fmt(this._num(ou, "outdoor_temp")), unit: "°C", comp: ou, slot: "outdoor_temp" },
      { key: "heat", label: t("kpi.heat"), value: fmt(heat), unit: "kW", comp: ou, slot: "heat_power" },
      { key: "power", label: t("kpi.power"), value: el === undefined ? "–" : el >= 1000 ? fmtNum(el / 1000, 2) : fmtNum(el, 0), unit: el !== undefined && el >= 1000 ? "kW" : "W", comp: ou, slot: "el_power" },
      { key: "cop", label: t("kpi.cop"), value: fmt(cop), unit: "", color: cop !== undefined ? (cop >= 4 ? "#3ddc97" : cop >= 3 ? "#f5c542" : "#ff8a3d") : undefined },
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
    const activeCount = this.messages.filter((m) => m.active && (m.level === "warning" || m.level === "error")).length;
    return html`
      ${this._demoBar()}
      ${this.showKpis ? html`<div class="kpis">
        ${kpis.map(
          (k) => html`<button class="kpi" ?disabled=${!k.comp} @click=${(e: MouseEvent) => k.comp && (this._pop = { component: k.comp, slot: k.slot!, x: e.clientX, y: e.clientY })}>
            <span class="k-label">${k.label}</span>
            <span class="k-value" style=${k.color ? `color:${k.color}` : ""}>${k.value}<small>${k.unit}</small></span>
            ${k.sub ? html`<span class="k-sub">${k.sub}</span>` : nothing}
          </button>`,
        )}
      </div>` : nothing}
      <div class="main ${this._side && this.showSide ? "with-side" : ""}">
        <div class="stage card">
          <cp-schematic
            ?auto-height=${this.narrow}
            .plant=${this.plant}
            .src=${this.src}
            .icons=${this.icons}
            .version=${this.version}
            @cp-slot-click=${this._openPop}
          ></cp-schematic>
          <div class="zoom">
            <button class="icon" title=${t("zoom_in")} @click=${() => this._sch()?.zoom(0.8)}>${icon("plus")}</button>
            <button class="icon" title=${t("zoom_out")} @click=${() => this._sch()?.zoom(1.25)}>${icon("minus")}</button>
            <button class="icon" title=${t("fit")} @click=${() => this._sch()?.fit()}>${icon("fit")}</button>
            ${this.narrow || !this.showSide
              ? nothing
              : html`<button class="icon" title=${t("msg.title")} @click=${() => (this._side = !this._side)}>
                  ${icon("bell")}${activeCount ? html`<span class="badge">${activeCount}</span>` : nothing}</button>`}
          </div>
        </div>
        ${this.showSide && (this._side || this.narrow)
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
            .src=${this.src}
            .x=${this._pop.x}
            .y=${this._pop.y}
            .version=${this.version}
            @close=${() => (this._pop = null)}
          ></cp-slot-popover>`
        : nothing}
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

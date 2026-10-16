import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { Api } from "./api";
import { resolveLang, setLang, t } from "./i18n";
import { icon, logo, tokens, ui } from "./styles";
import type { Hass, Plant, PlantMessage, UserIcon } from "./types";
import { HassSource, type ValueSource } from "./data/values";
import { Simulator } from "./sim/simulator";
import { SimSource, simParamsFor } from "./sim/source";
import { examplePlant } from "./templates";
import "./views/overview";
import "./views/editor";
import "./views/config";
import "./views/widgets";

type View = "overview" | "messages" | "config";
type Sub = "wizard" | "editor" | "mapping" | "icons" | "settings";

const LS_VIEW = "copilot.view";
const SIM_FPS = 4;

function lsGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function lsSet(key: string, v: string): void {
  try {
    localStorage.setItem(key, v);
  } catch {
    /* ignore */
  }
}

export class CopilotPanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { type: Boolean },
    route: { attribute: false },
    panel: { attribute: false },
    _plant: { state: true },
    _icons: { state: true },
    _messages: { state: true },
    _view: { state: true },
    _sub: { state: true },
    _version: { state: true },
    _error: { state: true },
    _toast: { state: true },
    _admin: { state: true },
    _backendVersion: { state: true },
  };

  hass!: Hass;
  narrow = false;
  route: unknown;
  panel: unknown;

  private _api?: Api;
  private _plant: Plant | null = null;
  private _icons: Map<string, UserIcon> = new Map();
  private _messages: PlantMessage[] = [];
  private _view: View = "overview";
  private _sub: Sub = "editor";
  private _version = 0;
  private _error = "";
  private _toast = "";
  private _admin = true;
  private _backendVersion = "";
  private _sim: Sim | null = null;
  private _raf = 0;
  private _lastFrame = 0;
  private _accum = 0;
  private _unsubMsg?: () => void;
  private _unsubSim?: () => void;
  private _boundIds: string[] = [];
  private _lastStates: unknown[] = [];
  private _loading = false;

  constructor() {
    super();
    const saved = lsGet(LS_VIEW);
    if (saved) {
      const [v, s] = saved.split(":");
      if (v === "overview" || v === "messages" || v === "config") this._view = v;
      if (s) this._sub = s as Sub;
    }
  }

  // --------------------------------------------------------------- data

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass") && this.hass) {
      const dark = this.hass.themes?.darkMode ?? true;
      this.toggleAttribute("light", !dark);
      setLang(resolveLang(this._plant?.settings.language, this.hass.language));
      if (!this._api) {
        this._api = new Api(this.hass);
        this._load();
      } else {
        this._api.setHass(this.hass);
      }
      if (this._plant && !this._plant.settings.demo) this._checkStates();
    }
  }

  /** Re-render on hass updates only when a bound entity actually changed. */
  private _checkStates(): void {
    const states = this._boundIds.map((id) => this.hass.states[id]);
    if (states.length !== this._lastStates.length || states.some((s, i) => s !== this._lastStates[i])) {
      this._lastStates = states;
      this._version++;
    }
  }

  private _collectBound(): void {
    const ids = new Set<string>();
    for (const c of this._plant?.components || []) {
      Object.values(c.bindings || {}).forEach((id) => id && ids.add(id));
      ((c.props.entries as { entity?: string }[]) || []).forEach((e) => e.entity && ids.add(e.entity));
    }
    for (const p of this._plant?.pipes || []) if (p.bindings?.temp) ids.add(p.bindings.temp);
    this._boundIds = [...ids];
    this._lastStates = [];
  }

  private async _load(): Promise<void> {
    if (this._loading || !this._api) return;
    this._loading = true;
    try {
      const cfg = await this._api.getConfig();
      this._admin = cfg.is_admin;
      this._backendVersion = cfg.version;
      let plant = cfg.plant;
      if (!plant) {
        plant = examplePlant();
        if (cfg.is_admin) await this._api.saveConfig(plant);
      }
      this._setPlant(plant);
      await this._loadIcons();
      if (!this._api.standalone) {
        this._messages = await this._api.listMessages();
        this._unsubMsg = await this._api.subscribeMessages((m) => this._mergeMessage(m));
      }
    } catch (err: any) {
      this._error = err?.message || String(err);
    } finally {
      this._loading = false;
    }
  }

  private async _loadIcons(): Promise<void> {
    const list = await this._api!.listIcons();
    this._icons = new Map(list.map((i) => [i.id, i]));
  }

  private _mergeMessage(m: PlantMessage): void {
    const idx = this._messages.findIndex((x) => x.id === m.id);
    const next = [...this._messages];
    if (idx >= 0) next[idx] = m;
    else next.push(m);
    this._messages = next;
  }

  private _setPlant(plant: Plant): void {
    const prevParams = JSON.stringify(simParamsFor(this._plant));
    this._plant = plant;
    setLang(resolveLang(plant.settings.language, this.hass?.language));
    this._collectBound();
    if (plant.settings.demo) {
      if (!this._sim || JSON.stringify(simParamsFor(plant)) !== prevParams) this._startSim();
    } else {
      this._stopSim();
      this._checkStates();
    }
    this._version++;
  }

  private async _save(plant: Plant): Promise<void> {
    try {
      await this._api!.saveConfig(plant);
      this._setPlant(plant);
      this._showToast(t("saved"));
    } catch (err: any) {
      this._showToast(err?.message || String(err));
    }
  }

  private _showToast(text: string): void {
    this._toast = text;
    window.setTimeout(() => (this._toast = ""), 2600);
  }

  // ---------------------------------------------------------------- sim

  private _startSim(): void {
    this._stopSim();
    const dhw = this._plant?.components.find((c) => c.type === "dhw_tank");
    const sim = new Simulator(simParamsFor(this._plant), undefined, { dhw: dhw?.label || t("type.dhw_tank") });
    this._sim = sim;
    this._unsubSim = sim.onMessage(() => (this._messages = [...sim.messages]));
    this._messages = [...sim.messages];
    this._lastFrame = performance.now();
    const loop = (now: number) => {
      const dt = (now - this._lastFrame) / 1000;
      this._lastFrame = now;
      if (!document.hidden) {
        sim.advance(dt);
        this._accum += dt;
        if (this._accum >= 1 / SIM_FPS) {
          this._accum = 0;
          this._version++;
        }
      }
      this._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);
  }

  private _stopSim(): void {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
    this._unsubSim?.();
    this._unsubSim = undefined;
    if (this._sim) {
      this._sim = null;
      this._messages = [];
      if (this._api && !this._api.standalone) this._api.listMessages().then((m) => (this._messages = m), () => undefined);
    }
  }

  private _scenario(name: string): void {
    const sim = this._sim;
    if (!sim) return;
    switch (name) {
      case "winter":
        sim.outdoorMean = -10;
        sim.tOut = -10;
        break;
      case "transition":
        sim.outdoorMean = 12;
        sim.tOut = 12;
        break;
      case "shower":
        sim.startDraw(8, 9);
        break;
      case "defrost":
        sim.ice = 1.01;
        sim.heatDemand = true;
        break;
      case "dim14a":
        sim.dim14a = !sim.dim14a;
        break;
      case "pv":
        sim.pv = !sim.pv;
        break;
      case "disinfect":
        sim.disinfect = true;
        break;
      case "fault":
        sim.fault = !sim.fault;
        break;
      case "reset":
        this._startSim();
        return;
      default:
        break;
    }
    sim.scenarioMessage(t(`scn.${name}`));
    this._version++;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopSim();
    this._unsubMsg?.();
    this._unsubMsg = undefined;
    this._api = undefined;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass && !this._api) {
      this._api = new Api(this.hass);
      this._load();
    }
    if (this._plant?.settings.demo && !this._sim) this._startSim();
  }

  // ------------------------------------------------------------- render

  private get _src(): ValueSource {
    if (this._sim) return new SimSource(this._sim);
    return new HassSource(this.hass);
  }

  private _go(view: View, sub?: Sub): void {
    this._view = view;
    if (sub) this._sub = sub;
    lsSet(LS_VIEW, `${this._view}:${this._sub}`);
  }

  private _fullscreen(): void {
    if (document.fullscreenElement) document.exitFullscreen();
    else this.requestFullscreen?.().catch(() => undefined);
  }

  render() {
    const plant = this._plant;
    const alerts = this._messages.filter((m) => m.active && (m.level === "warning" || m.level === "error")).length;
    return html`<div class="shell">
      <header>
        ${this.narrow
          ? html`<button class="ghost icon" title=${t("menu")} @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }))}>${icon("menu")}</button>`
          : nothing}
        <div class="brand">${logo}<span>COP<b>ilot</b></span></div>
        <nav>
          ${(["overview", "messages", "config"] as View[]).map(
            (v) => html`<button class="tab ${this._view === v ? "on" : ""}" @click=${() => this._go(v)}>
              ${icon(v === "overview" ? "grid" : v === "messages" ? "bell" : "gear")}
              <span class="tl">${t(`nav.${v}`)}</span>
              ${v === "messages" && alerts ? html`<span class="badge">${alerts}</span>` : nothing}
            </button>`,
          )}
        </nav>
        <span class="spacer"></span>
        ${plant?.settings.demo ? html`<span class="demo-pill">${icon("flask")}<span class="tl">${t("demo")}</span></span>` : nothing}
        <button class="ghost icon" title=${t("fullscreen")} @click=${this._fullscreen}>${icon("expand")}</button>
      </header>
      <main>
        ${this._error ? html`<div class="card err">${this._error}</div>` : nothing}
        ${this._api?.standalone ? html`<div class="note muted">${t("standalone_hint")}</div>` : nothing}
        ${!plant ? html`<div class="loading">${logo}</div>` : this._content(plant)}
      </main>
      ${this._toast ? html`<div class="toast">${this._toast}</div>` : nothing}
    </div>`;
  }

  private _content(plant: Plant) {
    const src = this._src;
    if (this._view === "overview") {
      return html`<cp-overview
        .plant=${plant}
        .src=${src}
        .icons=${this._icons}
        .messages=${this._messages}
        .sim=${this._sim}
        .version=${this._version}
        ?narrow=${this.narrow || window.innerWidth < 900}
        @scenario=${(e: CustomEvent) => this._scenario(e.detail)}
      ></cp-overview>`;
    }
    if (this._view === "messages") {
      return html`<div class="card pad"><cp-messages
        .messages=${this._messages}
        ?canClear=${this._admin && !this._sim}
        @clear=${async () => {
          await this._api!.clearMessages();
          this._messages = await this._api!.listMessages();
        }}
      ></cp-messages></div>`;
    }
    if (!this._admin) return html`<div class="card">${t("readonly_hint")}</div>`;
    const subs: Sub[] = ["wizard", "editor", "mapping", "icons", "settings"];
    const onSave = (e: CustomEvent) => this._save(e.detail);
    return html`
      <div class="subnav">
        ${subs.map((s) => html`<button class="sub ${this._sub === s ? "on" : ""}" @click=${() => this._go("config", s)}>${t(`cfg.${s}`)}</button>`)}
      </div>
      <div class="cfg ${this._sub === "editor" ? "fill" : ""}">
        ${this._sub === "wizard"
          ? html`<cp-wizard .plant=${plant} @plant-generated=${async (e: CustomEvent) => {
              await this._save(e.detail);
              this._showToast(t("wz.done"));
              this._go("config", "editor");
            }}></cp-wizard>`
          : nothing}
        ${this._sub === "editor"
          ? html`<cp-editor .plant=${plant} .hass=${this.hass} .src=${src} .icons=${this._icons} .version=${this._version} @save=${onSave}></cp-editor>`
          : nothing}
        ${this._sub === "mapping" ? html`<cp-mapping .plant=${plant} .hass=${this.hass} .api=${this._api} @save=${onSave}></cp-mapping>` : nothing}
        ${this._sub === "icons"
          ? html`<cp-icons .plant=${plant} .api=${this._api} .icons=${this._icons} @save=${onSave} @icons-changed=${() => this._loadIcons()}></cp-icons>`
          : nothing}
        ${this._sub === "settings"
          ? html`<cp-settings .plant=${plant} .version=${this._backendVersion} @save=${onSave}
              @reset-plant=${() => this._save({ ...examplePlant(), settings: { ...examplePlant().settings, demo: true } })}></cp-settings>`
          : nothing}
      </div>
    `;
  }

  static styles = [
    tokens,
    ui,
    css`
      :host {
        display: block;
        height: 100%;
        background: var(--cp-bg);
        color: var(--cp-text);
        font-family: var(--cp-font);
      }
      .shell {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 100vh;
        max-height: 100vh;
      }
      header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 16px;
        border-bottom: 1px solid var(--cp-border);
        background: color-mix(in srgb, var(--cp-surface) 85%, transparent);
        backdrop-filter: blur(8px);
        position: sticky;
        top: 0;
        z-index: 5;
      }
      .brand { display: flex; align-items: center; gap: 8px; font-size: 17px; letter-spacing: 0.2px; margin-right: 8px; }
      .brand b { font-weight: 800; }
      .logo { width: 26px; height: 26px; }
      nav { display: flex; gap: 4px; }
      .tab { background: transparent; border-color: transparent; color: var(--cp-muted); position: relative; }
      .tab.on { background: var(--cp-surface-2); color: var(--cp-text); border-color: var(--cp-border); }
      .tab .badge { margin-left: 2px; }
      .demo-pill { display: inline-flex; gap: 6px; align-items: center; font-size: 12px; font-weight: 700; color: var(--cp-notice);
        padding: 5px 10px; border-radius: 999px; background: color-mix(in srgb, var(--cp-notice) 15%, transparent); }
      main { flex: 1; min-height: 0; overflow: auto; padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 10px; }
      main > cp-overview { flex: 1; min-height: 0; }
      .pad { overflow: auto; }
      .note { font-size: 12px; }
      .err { color: var(--cp-error); }
      .loading { flex: 1; display: grid; place-items: center; }
      .loading svg { width: 64px; height: 64px; animation: spin 1.6s linear infinite; opacity: 0.8; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .subnav { display: flex; gap: 4px; flex-wrap: wrap; }
      .sub { background: transparent; border-color: transparent; color: var(--cp-muted); }
      .sub.on { background: var(--cp-surface-2); color: var(--cp-text); border-color: var(--cp-border); }
      .cfg { min-height: 0; overflow: auto; }
      .cfg.fill { flex: 1; overflow: visible; display: flex; flex-direction: column; }
      .cfg.fill > cp-editor { flex: 1; min-height: 640px; }
      @media (max-width: 900px) {
        main > cp-overview { flex: none; }
      }
      @media (max-width: 700px) {
        header { padding: 8px 10px; gap: 6px; }
        .brand span { display: none; }
        .tl { display: none; }
        main { padding: 10px; }
      }
    `,
  ];
}

type Sim = Simulator;

if (!customElements.get("copilot-panel")) customElements.define("copilot-panel", CopilotPanel);

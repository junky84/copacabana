import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { isConflict } from "./api";
import { PlantController } from "./controller";
import { t } from "./i18n";
import { icon, logo, tokens, ui } from "./styles";
import type { Hass, Plant } from "./types";
import { examplePlant } from "./templates";
import "./sidebar-icon";
import "./views/maintenance";
import "./views/overview";
import "./views/editor";
import "./views/config";
import "./views/widgets";
import "./views/efficiency";
import "./views/check";
import "./views/curve";
import "./card";

type View = "overview" | "efficiency" | "check" | "curve" | "maintenance" | "messages" | "config";
type Sub = "wizard" | "editor" | "mapping" | "icons" | "settings";

const LS_VIEW = "copilot.view";

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
    _view: { state: true },
    _sub: { state: true },
    _toast: { state: true },
  };

  hass!: Hass;
  narrow = false;
  route: unknown;
  panel: unknown;

  private _ctl = new PlantController(this);
  private _view: View = "overview";
  private _sub: Sub = "editor";
  private _toast = "";

  constructor() {
    super();
    const saved = lsGet(LS_VIEW);
    if (saved) {
      const [v, s] = saved.split(":");
      if (["overview", "efficiency", "check", "curve", "maintenance", "messages", "config"].includes(v)) this._view = v as View;
      if (s) this._sub = s as Sub;
    }
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass") && this.hass) this._ctl.setHass(this.hass);
  }

  /** @param rev revision the change is based on (default: the plant currently shown) */
  private async _save(plant: Plant, rev?: number): Promise<boolean> {
    try {
      await this._ctl.save(plant, rev);
      this._showToast(t("saved"));
      return true;
    } catch (err: any) {
      this._showToast(isConflict(err) ? t("sync.conflict") : err?.message || String(err));
      return false;
    }
  }

  private _showToast(text: string): void {
    this._toast = text;
    window.setTimeout(() => (this._toast = ""), 2600);
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
    const plant = this._ctl.plant;
    const alerts = this._ctl.messages.filter((m) => m.active && (m.level === "warning" || m.level === "error")).length;
    return html`<div class="shell">
      <header>
        ${this.narrow
          ? html`<button class="ghost icon" title=${t("menu")} @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }))}>${icon("menu")}</button>`
          : nothing}
        <div class="brand">${logo}<span>COP<b>ilot</b></span></div>
        <nav>
          ${(["overview", "efficiency", "check", "curve", "maintenance", "messages", "config"] as View[]).map(
            (v) => html`<button class="tab ${this._view === v ? "on" : ""}" title=${t(`nav.${v}`)} @click=${() => this._go(v)}>
              ${icon(v === "overview" ? "grid" : v === "efficiency" ? "chart" : v === "check" ? "check" : v === "curve" ? "curve" : v === "maintenance" ? "wrench" : v === "messages" ? "bell" : "gear")}
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
        ${this._ctl.error ? html`<div class="card err">${this._ctl.error}</div>` : nothing}
        ${this._ctl.api?.standalone ? html`<div class="note muted">${t("standalone_hint")}</div>` : nothing}
        ${!plant ? html`<div class="loading">${logo}</div>` : this._content(plant)}
      </main>
      ${this._toast ? html`<div class="toast">${this._toast}</div>` : nothing}
    </div>`;
  }

  private _content(plant: Plant) {
    const src = this._ctl.src;
    if (this._view === "overview") {
      return html`<cp-overview
        .plant=${plant}
        .src=${src}
        .icons=${this._ctl.icons}
        .messages=${this._ctl.messages}
        .sim=${this._ctl.sim}
        .hass=${this.hass}
        .api=${this._ctl.api}
        ?admin=${this._ctl.admin}
        .version=${this._ctl.version}
        ?narrow=${this.narrow || window.innerWidth < 900}
        @scenario=${(e: CustomEvent) => this._ctl.scenario(e.detail)}
      ></cp-overview>`;
    }
    if (this._view === "efficiency") {
      return html`<cp-efficiency
        .plant=${plant}
        .src=${src}
        .hass=${this.hass}
        .sim=${this._ctl.sim}
        .version=${this._ctl.version}
      ></cp-efficiency>`;
    }
    if (this._view === "check") {
      return html`<cp-check .plant=${plant} .src=${src} .sim=${this._ctl.sim} .version=${this._ctl.version}></cp-check>`;
    }
    if (this._view === "curve") {
      return html`<cp-curve .plant=${plant} .src=${src} .hass=${this.hass} .sim=${this._ctl.sim} .version=${this._ctl.version} ?admin=${this._ctl.admin}></cp-curve>`;
    }
    if (this._view === "maintenance") {
      return html`<cp-maintenance .plant=${plant} ?admin=${this._ctl.admin} @save=${(e: CustomEvent) => this._save(e.detail)}></cp-maintenance>`;
    }
    if (this._view === "messages") {
      return html`<div class="card pad"><cp-messages
        .messages=${this._ctl.messages}
        ?canClear=${this._ctl.admin && !this._ctl.sim}
        @clear=${() => this._ctl.clearMessages()}
      ></cp-messages></div>`;
    }
    if (!this._ctl.admin) return html`<div class="card">${t("readonly_hint")}</div>`;
    const subs: Sub[] = ["wizard", "editor", "mapping", "icons", "settings"];
    const onSave = (e: CustomEvent) => this._save(e.detail);
    return html`
      <div class="subnav">
        ${subs.map((s) => html`<button class="sub ${this._sub === s ? "on" : ""}" @click=${() => this._go("config", s)}>${t(`cfg.${s}`)}</button>`)}
      </div>
      <div class="cfg ${this._sub === "editor" ? "fill" : ""}">
        ${this._sub === "wizard"
          ? html`<cp-wizard .plant=${plant} @plant-generated=${async (e: CustomEvent) => {
              if (!(await this._save(e.detail))) return;
              this._showToast(t("wz.done"));
              this._go("config", "editor");
            }}></cp-wizard>`
          : nothing}
        ${this._sub === "editor"
          ? html`<cp-editor .plant=${plant} .rev=${this._ctl.rev} .hass=${this.hass} .src=${src} .icons=${this._ctl.icons} .version=${this._ctl.version}
              @save=${(e: CustomEvent) => this._save(e.detail.plant, e.detail.rev)}></cp-editor>`
          : nothing}
        ${this._sub === "mapping" ? html`<cp-mapping .plant=${plant} .hass=${this.hass} .api=${this._ctl.api} @save=${onSave}></cp-mapping>` : nothing}
        ${this._sub === "icons"
          ? html`<cp-icons .plant=${plant} .api=${this._ctl.api} .icons=${this._ctl.icons} @save=${onSave} @icons-changed=${() => this._ctl.loadIcons()}></cp-icons>`
          : nothing}
        ${this._sub === "settings"
          ? html`<cp-settings .plant=${plant} .hass=${this.hass} .api=${this._ctl.api} .version=${this._ctl.backendVersion} @save=${onSave}
              @plant-restored=${(e: CustomEvent) => {
                this._ctl.setPlant(e.detail.plant, e.detail.rev);
                this._showToast(t("bk.restored"));
              }}
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
      /* six tabs: show only the active tab's label when space gets tight */
      @media (max-width: 1250px) {
        .tab:not(.on) .tl { display: none; }
        .brand span { display: none; }
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

if (!customElements.get("copilot-panel")) customElements.define("copilot-panel", CopilotPanel);

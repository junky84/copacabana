/**
 * Lovelace card: the COPilot overview for any dashboard, e.g. as a
 * full-screen tab on a wall display (view type "panel").
 *
 *   type: custom:copilot-card
 *   show_kpis: true          # KPI tiles above the schematic
 *   show_messages: false     # messages column
 *   show_demo_controls: false
 *   height: 600px            # optional; panel views fill the screen
 */

import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { PlantController } from "./controller";
import { t } from "./i18n";
import { logo, tokens, ui } from "./styles";
import type { Hass } from "./types";
import "./views/overview";

export interface CardConfig {
  type: string;
  show_kpis?: boolean;
  show_messages?: boolean;
  show_demo_controls?: boolean;
  height?: string;
}

export class CopilotCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    isPanel: { type: Boolean },
    _config: { state: true },
    _narrow: { state: true },
  };

  hass?: Hass;
  /** set by Home Assistant when the card is the only card of a panel view */
  isPanel = false;
  private _config: CardConfig = { type: "custom:copilot-card" };
  private _ctl = new PlantController(this, false);
  /**
   * Narrow layout from the card's own width. Measured continuously and only while the card is
   * laid out: a render while the dashboard is hidden (screen off, other view) reports width 0 and
   * would otherwise stick in the narrow layout with a tiny schematic until the page is reloaded.
   */
  private _narrow = false;
  private _resizeObs?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this._resizeObs = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w > 0) this._narrow = w < 700;
    });
    this._resizeObs.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObs?.disconnect();
  }

  setConfig(config: CardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = { show_kpis: true, show_messages: false, show_demo_controls: false, ...config };
  }

  getCardSize(): number {
    return 10;
  }

  getGridOptions() {
    return { columns: 12, rows: 10, min_columns: 6, min_rows: 5 };
  }

  static getStubConfig(): Partial<CardConfig> {
    return { show_kpis: true, show_messages: false, show_demo_controls: false };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("copilot-card-editor");
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass") && this.hass) this._ctl.setHass(this.hass);
    // also measured on every update (Home Assistant pushes state changes all the time)
    const w = this.clientWidth;
    if (w > 0) this._narrow = w < 700;
  }

  render() {
    const c = this._config;
    const plant = this._ctl.plant;
    const height = c.height || (this.isPanel ? "calc(100vh - var(--header-height, 56px) - 16px)" : "560px");
    return html`<ha-card style="height:${height}">
      ${this._ctl.error ? html`<div class="err">${this._ctl.error}</div>` : nothing}
      ${!plant
        ? html`<div class="loading">${logo}</div>`
        : html`<cp-overview
            .plant=${plant}
            .src=${this._ctl.src}
            .icons=${this._ctl.icons}
            .messages=${this._ctl.messages}
            .sim=${this._ctl.sim}
            .hass=${this.hass}
            .api=${this._ctl.api}
            ?admin=${this._ctl.admin}
            .version=${this._ctl.version}
            .showKpis=${c.show_kpis !== false}
            .showSide=${!!c.show_messages}
            .showDemo=${!!c.show_demo_controls}
            ?narrow=${this._narrow}
            @scenario=${(e: CustomEvent) => this._ctl.scenario(e.detail)}
          ></cp-overview>`}
    </ha-card>`;
  }

  static styles = [
    tokens,
    ui,
    css`
      :host { display: block; }
      ha-card {
        display: flex;
        flex-direction: column;
        padding: 12px;
        box-sizing: border-box;
        overflow: hidden;
        background: var(--cp-bg);
        color: var(--cp-text);
        font-family: var(--cp-font);
      }
      cp-overview { flex: 1; min-height: 0; }
      .loading { flex: 1; display: grid; place-items: center; }
      .loading svg { width: 48px; height: 48px; opacity: 0.7; }
      .err { color: var(--cp-error); font-size: 13px; }
    `,
  ];
}

// ------------------------------------------------------------------ editor

export class CopilotCardEditor extends LitElement {
  static properties = { hass: { attribute: false }, _config: { state: true } };
  hass?: Hass;
  private _config: CardConfig = { type: "custom:copilot-card" };

  setConfig(config: CardConfig): void {
    this._config = config;
  }

  private _set(key: keyof CardConfig, value: unknown): void {
    const config = { ...this._config, [key]: value };
    if (value === "" || value === undefined) delete (config as any)[key];
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  render() {
    const c = this._config;
    const box = (key: keyof CardConfig, label: string, def: boolean) => html`<label class="row">
      <input type="checkbox" .checked=${(c[key] as boolean | undefined) ?? def} @change=${(e: Event) => this._set(key, (e.target as HTMLInputElement).checked)} />
      ${label}</label>`;
    return html`<div class="ed">
      ${box("show_kpis", t("card.show_kpis"), true)}
      ${box("show_messages", t("card.show_messages"), false)}
      ${box("show_demo_controls", t("card.show_demo"), false)}
      <label class="field">${t("card.height")}
        <input .value=${c.height || ""} placeholder="560px" @change=${(e: Event) => this._set("height", (e.target as HTMLInputElement).value.trim())} /></label>
      <p class="hint">${t("card.hint")}</p>
    </div>`;
  }

  static styles = [
    ui,
    css`
      .ed { display: grid; gap: 10px; color: var(--primary-text-color); }
      .row { display: flex; gap: 8px; align-items: center; font-size: 14px; }
      .field { color: var(--secondary-text-color); }
      input:not([type]) { background: transparent; color: var(--primary-text-color); border-color: var(--divider-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 0; }
    `,
  ];
}

if (!customElements.get("copilot-card")) customElements.define("copilot-card", CopilotCard);
if (!customElements.get("copilot-card-editor")) customElements.define("copilot-card-editor", CopilotCardEditor);

const w = window as any;
w.customCards = w.customCards || [];
if (!w.customCards.some((c: { type: string }) => c.type === "copilot-card")) {
  w.customCards.push({
    type: "copilot-card",
    name: "COPilot",
    description: "Animated heat pump schematic with live values",
    preview: false,
    documentationURL: "https://github.com/junky84/copilot",
  });
}

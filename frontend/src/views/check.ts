import { LitElement, css, html, nothing } from "lit";
import { fmtNum, t } from "../i18n";
import { ui } from "../styles";
import type { Plant } from "../types";
import type { ValueSource } from "../data/values";
import type { Simulator } from "../sim/simulator";
import { AMPEL_COLOR } from "../data/efficiency";
import { runChecks, type CheckResult } from "../data/check";

const REFRESH_DEMO_MS = 20_000;
const REFRESH_LIVE_MS = 5 * 60_000;

/** Numbers in check texts: one decimal unless whole. */
function params(p: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(p)) out[k] = typeof v === "number" ? fmtNum(v, Number.isInteger(v) ? 0 : 1) : v;
  return out;
}

export class CpCheck extends LitElement {
  static properties = {
    plant: { attribute: false },
    src: { attribute: false },
    sim: { attribute: false },
    version: { type: Number },
    _results: { state: true },
    _busy: { state: true },
  };
  plant!: Plant;
  src!: ValueSource;
  sim: Simulator | null = null;
  version = 0;
  private _results: CheckResult[] | null = null;
  private _busy = false;
  private _at = 0;
  private _for: unknown = null;

  protected willUpdate(): void {
    const key = this.sim || this.plant;
    if (key !== this._for || Date.now() - this._at > (this.sim ? REFRESH_DEMO_MS : REFRESH_LIVE_MS)) {
      this._for = key;
      this._at = Date.now();
      this._run();
    }
  }

  private async _run(): Promise<void> {
    if (this._busy) return;
    this._busy = true;
    try {
      this._results = await runChecks(this.plant, this.src, 24, this.sim ? this.sim.time : Date.now() / 1000);
    } finally {
      this._busy = false;
    }
  }

  render() {
    const r = this._results;
    const count = (a: string) => (r || []).filter((x) => x.ampel === a).length;
    return html`
      <div class="card head">
        <div>
          <h2>${t("chk.title")}</h2>
          <p class="muted">${t("chk.subtitle")}${this.sim ? ` ${t("chk.demo")}` : ""}</p>
        </div>
        <span class="spacer"></span>
        ${r
          ? html`<div class="sum">
              ${(["green", "yellow", "red"] as const).map((a) => html`<span class="dot" style="background:${AMPEL_COLOR[a]}"></span><b>${count(a)}</b>`)}
            </div>`
          : nothing}
        <button @click=${() => this._run()} ?disabled=${this._busy}>${t("chk.refresh")}</button>
      </div>
      ${!r
        ? html`<div class="card muted">${t("chk.running")}</div>`
        : html`<div class="list">
            ${r.map(
              (c) => html`<div class="card item ${c.ampel}">
                <span class="lamp" style="background:${c.ampel === "none" ? "var(--cp-muted)" : AMPEL_COLOR[c.ampel]}"></span>
                <div class="body">
                  <div class="row nowrap">
                    <b class="title">${t(`chk.${c.id}.title`)}</b>
                    <span class="spacer"></span>
                    ${c.value ? html`<span class="val">${c.value}</span>` : nothing}
                  </div>
                  <div class="detail">${t(c.detail, params(c.params))}</div>
                  ${c.hint && (c.ampel === "yellow" || c.ampel === "red") ? html`<div class="hint">${t(c.hint, params(c.params))}</div>` : nothing}
                  ${c.ampel === "green" ? html`<div class="ok">${t("chk.ok")}</div>` : nothing}
                </div>
              </div>`,
            )}
          </div>`}
    `;
  }

  static styles = [
    ui,
    css`
      :host { display: grid; gap: 12px; align-content: start; }
      .head { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
      .head p { margin: 0; font-size: 13px; }
      .sum { display: flex; align-items: center; gap: 6px; font-size: 15px; }
      .sum b { margin-right: 8px; }
      .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
      .list { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 12px; }
      .item { display: flex; gap: 12px; }
      .lamp { width: 14px; height: 14px; border-radius: 50%; margin-top: 3px; flex: none; box-shadow: 0 0 12px currentColor; }
      .body { flex: 1; display: grid; gap: 6px; }
      .nowrap { flex-wrap: nowrap; }
      .title { font-size: 15px; }
      .val { font-size: 18px; font-weight: 800; font-variant-numeric: tabular-nums; }
      .detail { font-size: 13px; color: var(--cp-muted); line-height: 1.45; }
      .hint { font-size: 13px; line-height: 1.45; padding: 8px 10px; border-radius: 10px; background: color-mix(in srgb, var(--cp-warn) 12%, var(--cp-surface-2)); }
      .item.red .hint { background: color-mix(in srgb, var(--cp-error) 14%, var(--cp-surface-2)); }
      .ok { font-size: 12px; color: var(--cp-accent); font-weight: 600; }
    `,
  ];
}

if (!customElements.get("cp-check")) customElements.define("cp-check", CpCheck);

import { LitElement, css, html, nothing, svg } from "lit";
import { fmtDateTime, fmtDuration, fmtNum, slotLabel, t } from "../i18n";
import { icon, ui } from "../styles";
import type { HistoryPoint, PlantComponent, PlantMessage } from "../types";
import { formatValue, kindOf, tempColor, type ValueSource } from "../data/values";

// ------------------------------------------------------------- sparkline

export class CpSparkline extends LitElement {
  static properties = { points: { attribute: false }, color: {}, step: { type: Boolean } };
  points: HistoryPoint[] = [];
  color = "var(--cp-accent)";
  step = false;

  render() {
    const pts = this.points.filter((p) => p.v !== null) as { t: number; v: number }[];
    if (pts.length < 2) return html`<div class="empty">${t("ov.no_history")}</div>`;
    const W = 300;
    const H = 90;
    const t0 = pts[0].t;
    const t1 = pts[pts.length - 1].t;
    let min = Math.min(...pts.map((p) => p.v));
    let max = Math.max(...pts.map((p) => p.v));
    if (max - min < 1e-6) {
      max += 1;
      min -= 1;
    }
    const pad = (max - min) * 0.1;
    min -= pad;
    max += pad;
    const x = (tt: number) => ((tt - t0) / Math.max(1, t1 - t0)) * W;
    const y = (v: number) => H - ((v - min) / (max - min)) * H;
    let d = `M ${x(pts[0].t)} ${y(pts[0].v)}`;
    for (let i = 1; i < pts.length; i++) {
      if (this.step) d += ` H ${x(pts[i].t)} V ${y(pts[i].v)}`;
      else d += ` L ${x(pts[i].t)} ${y(pts[i].v)}`;
    }
    const area = `${d} L ${W} ${H} L 0 ${H} Z`;
    return html`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.color} stop-opacity="0.35" /><stop offset="1" stop-color=${this.color} stop-opacity="0" />
      </linearGradient></defs>
      ${svg`<path d=${area} fill="url(#sg)" /><path d=${d} fill="none" stroke=${this.color} stroke-width="2" vector-effect="non-scaling-stroke" />`}
    </svg>`;
  }

  static styles = css`
    :host { display: block; height: 90px; }
    svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .empty { height: 100%; display: grid; place-items: center; color: var(--cp-muted); font-size: 12px; }
  `;
}

// --------------------------------------------------------------- popover

export class CpSlotPopover extends LitElement {
  static properties = {
    component: { attribute: false },
    slotKey: {},
    src: { attribute: false },
    x: { type: Number },
    y: { type: Number },
    version: { type: Number },
    _hist: { state: true },
  };
  component!: PlantComponent;
  slotKey = "";
  src!: ValueSource;
  x = 0;
  y = 0;
  version = 0;
  private _hist: HistoryPoint[] | null = null;
  private _loadedFor = "";

  protected updated(): void {
    const key = `${this.component?.id}:${this.slotKey}`;
    if (key !== this._loadedFor && this.component) {
      this._loadedFor = key;
      this._hist = null;
      this.src.history(this.component, this.slotKey, 24).then(
        (h) => (this._hist = h),
        () => (this._hist = []),
      );
    }
  }

  private _close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
  }

  private _more(entity: string) {
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: entity }, bubbles: true, composed: true }));
    this._close();
  }

  render() {
    if (!this.component) return nothing;
    const c = this.component;
    const kind = kindOf(c, this.slotKey);
    const v = this.src.get(c, this.slotKey);
    const { text, unit } = formatValue(v, kind);
    const entity = this.src.entityOf(c, this.slotKey);
    const hist = this._hist || [];
    const nums = hist.map((p) => p.v).filter((n): n is number => n !== null);
    const color = kind === "temp" && v?.num !== null && v?.num !== undefined ? tempColor(v.num, "#3ddc97") : "var(--cp-accent)";
    const w = 320;
    const left = Math.max(12, Math.min(window.innerWidth - w - 12, this.x - w / 2));
    const top = Math.max(12, Math.min(window.innerHeight - 260, this.y + 14));
    const label = c.type === "value_tile" ? this.slotKey : slotLabel(c.type, this.slotKey);
    return html`
      <div class="backdrop" @pointerdown=${this._close}></div>
      <div class="pop card" style="left:${left}px; top:${top}px; width:${w}px">
        <div class="row head">
          <div>
            <div class="title">${label}</div>
            <div class="muted sub">${c.label}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${this._close} aria-label=${t("close")}>${icon("close")}</button>
        </div>
        <div class="now"><span class="val">${text}</span><span class="unit">${unit}</span></div>
        <div class="muted cap">${t("ov.history24")}</div>
        ${this._hist === null ? html`<div class="loading"></div>` : html`<cp-sparkline .points=${hist} .color=${color} .step=${kind === "bool"}></cp-sparkline>`}
        ${nums.length && kind !== "bool" && kind !== "enum"
          ? html`<div class="row stats">
              <span>${t("ov.min")} <b>${fmtNum(Math.min(...nums))}</b></span>
              <span>${t("ov.max")} <b>${fmtNum(Math.max(...nums))}</b></span>
            </div>`
          : nothing}
        ${entity
          ? html`<div class="row foot"><code>${entity}</code><span class="spacer"></span>
              <button @click=${() => this._more(entity)}>${t("ov.open_entity")}</button></div>`
          : nothing}
      </div>
    `;
  }

  static styles = [
    ui,
    css`
      .backdrop { position: fixed; inset: 0; z-index: 30; }
      .pop { position: fixed; z-index: 31; box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45); padding: 14px; animation: pop 0.14s ease-out; }
      @keyframes pop { from { opacity: 0; transform: translateY(4px) scale(0.98); } }
      .head { flex-wrap: nowrap; align-items: flex-start; }
      .title { font-weight: 700; font-size: 15px; }
      .sub { font-size: 12px; }
      .now { margin: 8px 0 10px; }
      .val { font-size: 30px; font-weight: 800; font-variant-numeric: tabular-nums; }
      .unit { font-size: 15px; color: var(--cp-muted); margin-left: 4px; }
      .cap { font-size: 11px; margin-bottom: 4px; }
      .stats { gap: 16px; font-size: 12px; color: var(--cp-muted); margin-top: 6px; }
      .stats b { color: var(--cp-text); }
      .foot { margin-top: 10px; font-size: 11px; flex-wrap: nowrap; }
      code { color: var(--cp-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .loading { height: 90px; border-radius: 8px; background: linear-gradient(90deg, var(--cp-surface-2), var(--cp-surface), var(--cp-surface-2)); background-size: 200% 100%; animation: sh 1.2s infinite; }
      @keyframes sh { to { background-position: -200% 0; } }
    `,
  ];
}

// -------------------------------------------------------------- messages

const LEVEL_ICON: Record<string, string> = { info: "info", notice: "notice", warning: "warn", error: "error" };

export function messageText(m: PlantMessage): string {
  const params = { ...m.params };
  params.label_sfx = params.label ? ` (${params.label})` : "";
  if (m.key === "maintenance_due") params.task = params.task_key ? t(`mt.${params.task_key}`) : params.title;
  return t(`msgk.${m.key}`, params);
}

export class CpMessages extends LitElement {
  static properties = {
    messages: { attribute: false },
    compact: { type: Boolean },
    canClear: { type: Boolean },
    _filter: { state: true },
  };
  messages: PlantMessage[] = [];
  compact = false;
  canClear = false;
  private _filter = "all";

  private _row(m: PlantMessage) {
    const dur = m.end_ts ? m.end_ts - m.ts : null;
    return html`<li class="msg ${m.level} ${m.active ? "active" : ""}">
      <span class="lv">${icon(LEVEL_ICON[m.level] || "info")}</span>
      <div class="body">
        <div class="text">${messageText(m)}</div>
        <div class="meta">
          ${fmtDateTime(m.ts)}
          ${m.active ? html` · <b>${t("msg.active")}</b>` : dur !== null ? html` · ${t("msg.duration", { duration: fmtDuration(dur) })}` : nothing}
        </div>
      </div>
    </li>`;
  }

  render() {
    const list = [...this.messages].sort((a, b) => b.ts - a.ts);
    const filtered = this._filter === "all" ? list : list.filter((m) => m.level === this._filter);
    const active = filtered.filter((m) => m.active);
    const history = filtered.filter((m) => !m.active).slice(0, this.compact ? 12 : 300);
    return html`
      ${this.compact
        ? nothing
        : html`<div class="row filters">
            ${["all", "error", "warning", "notice", "info"].map(
              (f) => html`<button class=${this._filter === f ? "primary" : ""} @click=${() => (this._filter = f)}>
                ${f === "all" ? t("msg.filter_all") : t(`msg.level.${f}`)}</button>`,
            )}
            <span class="spacer"></span>
            ${this.canClear
              ? html`<button @click=${() => this.dispatchEvent(new CustomEvent("clear"))}>${icon("trash")} ${t("msg.clear")}</button>`
              : nothing}
          </div>`}
      ${active.length ? html`<h4>${t("msg.active")}</h4><ul>${active.map((m) => this._row(m))}</ul>` : nothing}
      <h4>${t("msg.history")}</h4>
      ${history.length ? html`<ul>${history.map((m) => this._row(m))}</ul>` : html`<div class="empty muted">${t("msg.empty")}</div>`}
    `;
  }

  static styles = [
    ui,
    css`
      :host { display: block; }
      .filters { margin-bottom: 8px; }
      h4 { margin: 12px 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); }
      ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
      .msg { display: flex; gap: 10px; padding: 9px 10px; border-radius: 11px; background: var(--cp-surface-2); border: 1px solid var(--cp-border); }
      .msg .lv { color: var(--cp-info); display: flex; padding-top: 1px; }
      .msg.notice .lv { color: var(--cp-notice); }
      .msg.warning .lv { color: var(--cp-warn); }
      .msg.error .lv { color: var(--cp-error); }
      .msg.active { border-color: color-mix(in srgb, currentColor 0%, var(--cp-border)); box-shadow: inset 3px 0 0 var(--cp-info); }
      .msg.active.notice { box-shadow: inset 3px 0 0 var(--cp-notice); }
      .msg.active.warning { box-shadow: inset 3px 0 0 var(--cp-warn); }
      .msg.active.error { box-shadow: inset 3px 0 0 var(--cp-error); background: color-mix(in srgb, var(--cp-error) 10%, var(--cp-surface-2)); }
      .text { font-size: 13px; font-weight: 600; line-height: 1.35; }
      .meta { font-size: 11px; color: var(--cp-muted); margin-top: 2px; }
      .empty { font-size: 13px; padding: 8px 2px; }
    `,
  ];
}

if (!customElements.get("cp-sparkline")) customElements.define("cp-sparkline", CpSparkline);
if (!customElements.get("cp-slot-popover")) customElements.define("cp-slot-popover", CpSlotPopover);
if (!customElements.get("cp-messages")) customElements.define("cp-messages", CpMessages);

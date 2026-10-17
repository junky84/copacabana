/**
 * Maintenance calendar: recurring tasks with interval and last date. Due tasks
 * also show up as messages (backend), so they can trigger a push notification.
 * The list is part of the plant and therefore backed up and exported with it.
 */

import { LitElement, css, html, nothing } from "lit";
import { fmtNum, t } from "../i18n";
import { icon, ui } from "../styles";
import type { MaintenanceTask, Plant } from "../types";

const DAY = 86400;
const MONTH = 30.44;

/** Typical tasks for the components of the plant (intervals in days). */
export function defaultTasks(plant: Plant): MaintenanceTask[] {
  const has = (type: string, pred: (props: Record<string, any>) => boolean = () => true) =>
    plant.components.find((c) => c.type === type && pred(c.props || {}));
  const out: MaintenanceTask[] = [];
  const add = (key: string, days: number, component?: string) => out.push({ id: key, key, interval_days: days, component });
  add("pressure", 91, has("indoor_unit")?.id);
  const filter = has("separator", (p) => !!p.filter);
  if (filter) add("filter", 365, filter.id);
  const sep = has("separator", (p) => !p.filter);
  if (sep) add("separator", 182, sep.id);
  const mag = has("expansion_vessel");
  if (mag) add("expansion", 365, mag.id);
  const ou = has("outdoor_unit");
  if (ou) add("outdoor", 182, ou.id);
  const dhw = has("dhw_tank");
  if (dhw) add("anode", 730, dhw.id);
  add("service", 365, ou?.id);
  return out;
}

type Status = "unknown" | "ok" | "soon" | "due";

function statusOf(task: MaintenanceTask, now: number): { status: Status; next?: number; days?: number } {
  if (!task.last_done) return { status: "unknown" };
  const next = task.last_done + task.interval_days * DAY;
  const days = Math.round((next - now) / DAY);
  return { status: days < 0 ? "due" : days <= 30 ? "soon" : "ok", next, days };
}

const dateStr = (ts: number) => new Date(ts * 1000).toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "numeric" });
const isoDate = (ts: number) => {
  const d = new Date(ts * 1000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export class CpMaintenance extends LitElement {
  static properties = { plant: { attribute: false }, admin: { type: Boolean }, _newTitle: { state: true }, _newMonths: { state: true } };
  plant!: Plant;
  admin = true;
  private _newTitle = "";
  private _newMonths = 12;

  private get _tasks(): MaintenanceTask[] {
    return this.plant.settings.maintenance?.tasks ?? defaultTasks(this.plant);
  }

  private _save(tasks: MaintenanceTask[]) {
    const plant: Plant = structuredClone(this.plant);
    plant.settings = { ...plant.settings, maintenance: { tasks } };
    this.dispatchEvent(new CustomEvent("save", { detail: plant, bubbles: true, composed: true }));
  }

  private _update(id: string, patch: Partial<MaintenanceTask>) {
    this._save(this._tasks.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }

  private _title(task: MaintenanceTask): string {
    return task.title || t(`mt.${task.key}`);
  }

  private _done(task: MaintenanceTask) {
    if (!confirm(t("mt.done_confirm", { task: this._title(task) }))) return;
    this._update(task.id, { last_done: Math.round(Date.now() / 1000) });
  }

  private _add() {
    const title = this._newTitle.trim();
    if (!title) return;
    const id = `custom_${Date.now().toString(36)}`;
    this._save([...this._tasks, { id, title, interval_days: Math.round(this._newMonths * MONTH) }]);
    this._newTitle = "";
  }

  private _remove(task: MaintenanceTask) {
    if (!confirm(t("mt.remove_confirm", { task: this._title(task) }))) return;
    this._save(this._tasks.filter((x) => x.id !== task.id));
  }

  render() {
    const now = Date.now() / 1000;
    const rank: Record<Status, number> = { due: 0, soon: 1, unknown: 2, ok: 3 };
    const tasks = [...this._tasks]
      .map((task) => ({ task, ...statusOf(task, now) }))
      .sort((a, b) => rank[a.status] - rank[b.status] || (a.next ?? 0) - (b.next ?? 0));
    const due = tasks.filter((x) => x.status === "due").length;
    const unknown = tasks.filter((x) => x.status === "unknown").length;
    return html`<div class="card wrap">
      <div class="row head">
        <h2>${t("mt.title")}</h2>
        ${due ? html`<span class="chip due">${t("mt.n_due", { n: due })}</span>` : nothing}
        ${unknown ? html`<span class="chip unknown">${t("mt.n_unknown", { n: unknown })}</span>` : nothing}
        ${!due && !unknown ? html`<span class="chip ok">${t("mt.all_ok")}</span>` : nothing}
      </div>
      <p class="muted hint">${t("mt.hint")}</p>
      <ul class="tasks">
        ${tasks.map(
          ({ task, status, next, days }) => html`<li class=${status}>
            <div class="main">
              <div class="t">${this._title(task)}</div>
              ${task.key ? html`<div class="muted small">${t(`mt.${task.key}_how`)}</div>` : nothing}
              <div class="meta">
                <span class="st ${status}">${status === "unknown"
                  ? t("mt.enter_date")
                  : status === "due"
                    ? t("mt.overdue", { n: -days! })
                    : t("mt.next", { date: dateStr(next!), n: days })}</span>
              </div>
            </div>
            <label class="f">${t("mt.last")}
              <input type="date" .value=${task.last_done ? isoDate(task.last_done) : ""} ?disabled=${!this.admin}
                @change=${(e: Event) => {
                  const v = (e.target as HTMLInputElement).value;
                  this._update(task.id, { last_done: v ? Math.round(new Date(`${v}T12:00:00`).getTime() / 1000) : undefined });
                }} /></label>
            <label class="f">${t("mt.every")}
              <span class="iv"><input type="number" min="1" max="120" .value=${fmtNum(task.interval_days / MONTH, 0)} ?disabled=${!this.admin}
                @change=${(e: Event) => this._update(task.id, { interval_days: Math.max(1, Math.round(Number((e.target as HTMLInputElement).value) * MONTH)) })} />
                ${t("mt.months")}</span></label>
            <div class="acts">
              <button class="primary" ?disabled=${!this.admin} @click=${() => this._done(task)}>${icon("check")} ${t("mt.done")}</button>
              <button class="ghost icon" title=${t("mt.remove")} ?disabled=${!this.admin} @click=${() => this._remove(task)}>${icon("trash")}</button>
            </div>
          </li>`,
        )}
      </ul>
      ${this.admin
        ? html`<div class="row add">
            <input placeholder=${t("mt.new")} .value=${this._newTitle} @input=${(e: Event) => (this._newTitle = (e.target as HTMLInputElement).value)}
              @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this._add()} />
            <span class="iv"><input type="number" min="1" max="120" .value=${String(this._newMonths)}
              @change=${(e: Event) => (this._newMonths = Number((e.target as HTMLInputElement).value) || 12)} /> ${t("mt.months")}</span>
            <button @click=${this._add} ?disabled=${!this._newTitle.trim()}>${icon("plus")} ${t("mt.add")}</button>
          </div>`
        : nothing}
    </div>`;
  }

  static styles = [
    ui,
    css`
      .wrap { max-width: 980px; display: grid; gap: 12px; }
      h2 { margin: 0; }
      .head { gap: 12px; align-items: center; }
      .chip { font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 999px; }
      .chip.due { background: color-mix(in srgb, var(--cp-warn) 22%, transparent); color: var(--cp-warn); }
      .chip.unknown { background: var(--cp-chip); color: var(--cp-muted); }
      .hint { font-size: 13px; margin: 0; }
      .chip.ok { background: color-mix(in srgb, #3ddc97 18%, transparent); color: #3ddc97; }
      .tasks { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
      .tasks li { display: grid; grid-template-columns: 1fr auto auto auto; gap: 12px; align-items: center; padding: 12px 14px;
        border: 1px solid var(--cp-border); border-left: 4px solid var(--cp-border); border-radius: 12px; }
      .tasks li.due { border-left-color: var(--cp-warn); }
      .tasks li.soon { border-left-color: #f5c542; }
      .tasks li.ok { border-left-color: #3ddc97; }
      .t { font-weight: 700; }
      .small { font-size: 12px; margin-top: 2px; }
      .meta { margin-top: 4px; font-size: 12px; }
      .st.due { color: var(--cp-warn); font-weight: 700; }
      .st.soon { color: #f5c542; font-weight: 700; }
      .st.ok { color: #3ddc97; }
      .st.unknown { color: var(--cp-muted); }
      .f { display: grid; gap: 4px; font-size: 11px; color: var(--cp-muted); font-weight: 600; }
      .f input[type="date"] { width: 150px; }
      .iv { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--cp-muted); }
      .iv input { width: 64px; }
      .acts { display: flex; gap: 6px; }
      .add { gap: 8px; }
      .add > input { flex: 1; min-width: 180px; }
      @media (max-width: 760px) {
        .tasks li { grid-template-columns: 1fr 1fr; }
        .tasks li .main { grid-column: 1 / -1; }
        .acts { grid-column: 1 / -1; justify-content: flex-end; }
      }
    `,
  ];
}

if (!customElements.get("cp-maintenance")) customElements.define("cp-maintenance", CpMaintenance);

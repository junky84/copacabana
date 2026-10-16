import { LitElement, css, html, nothing } from "lit";
import { INDOOR_MODELS, OUTDOOR_MODELS, slotsOf } from "../catalog";
import { slotLabel, t } from "../i18n";
import { icon, ui } from "../styles";
import type { ComponentType, Hass, Plant, UserIcon } from "../types";
import { exampleConfig, generatePlant, type WizardConfig } from "../templates";
import type { Api, ScanResult } from "../api";

function emit(el: HTMLElement, name: string, detail?: unknown) {
  el.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
}

// ----------------------------------------------------------------- wizard

export class CpWizard extends LitElement {
  static properties = { plant: { attribute: false }, _cfg: { state: true } };
  plant: Plant | null = null;
  private _cfg!: WizardConfig;

  connectedCallback(): void {
    super.connectedCallback();
    this._cfg = structuredClone(this.plant?.settings?.wizard || exampleConfig());
  }

  private _upd(patch: Partial<WizardConfig>) {
    this._cfg = { ...this._cfg, ...patch };
  }

  private _generate() {
    if (this.plant && !confirm(t("wz.replace_confirm"))) return;
    emit(this, "plant-generated", generatePlant(this._cfg, this.plant));
  }

  render() {
    const c = this._cfg;
    const inp = (key: keyof WizardConfig, type = "text") => html`<input type=${type} .value=${String(c[key] ?? "")}
      @change=${(e: Event) => {
        const v = (e.target as HTMLInputElement).value;
        this._upd({ [key]: type === "number" ? Number(v) : v } as any);
      }} />`;
    return html`
      <div class="card wrap">
        <h2>${t("wz.title")}</h2>
        <p class="muted">${t("wz.intro")}</p>
        <label class="field">${t("wz.name")} ${inp("name")}</label>

        <h3>${t("wz.hp")}</h3>
        <div class="grid">
          <label class="field">${t("wz.outdoor")}
            <select @change=${(e: Event) => this._upd({ outdoorModel: (e.target as HTMLSelectElement).value })}>
              ${OUTDOOR_MODELS.map((m) => html`<option value=${m.id} ?selected=${m.id === c.outdoorModel}>${m.label}</option>`)}
            </select></label>
          <label class="field">${t("ed.label")} ${inp("outdoorLabel")}</label>
          <label class="field">${t("ed.nominal")} ${inp("nominalKw", "number")}</label>
          <label class="field">${t("wz.indoor")}
            <select @change=${(e: Event) => this._upd({ indoorModel: (e.target as HTMLSelectElement).value })}>
              ${INDOOR_MODELS.map((m) => html`<option value=${m.id} ?selected=${m.id === c.indoorModel}>${m.label}</option>`)}
            </select></label>
          <label class="field">${t("ed.label")} ${inp("indoorLabel")}</label>
          <div class="field check">
            <label><input type="checkbox" .checked=${c.aux} @change=${(e: Event) => this._upd({ aux: (e.target as HTMLInputElement).checked })} /> ${t("wz.aux")}</label>
            ${c.aux ? html`<label class="field">${t("wz.aux_kw")} ${inp("auxKw", "number")}</label>` : nothing}
          </div>
        </div>

        <h3>${t("wz.buffer")}</h3>
        <div class="grid">
          <div class="radios">
            ${(["parallel", "serial", "none"] as const).map(
              (b) => html`<label><input type="radio" name="buf" .checked=${c.buffer === b} @change=${() => this._upd({ buffer: b })} /> ${t(`wz.buffer.${b}`)}</label>`,
            )}
          </div>
          ${c.buffer !== "none"
            ? html`<label class="field">${t("wz.buffer_volume")} ${inp("bufferVolume", "number")}</label>
                <label class="field">${t("ed.label")} ${inp("bufferLabel")}</label>`
            : nothing}
        </div>

        <h3>${t("wz.dhw")}</h3>
        <div class="grid">
          <div class="radios">
            ${(["tank", "none"] as const).map(
              (d) => html`<label><input type="radio" name="dhw" .checked=${c.dhw === d} @change=${() => this._upd({ dhw: d })} /> ${t(`wz.dhw.${d}`)}</label>`,
            )}
          </div>
          ${c.dhw === "tank"
            ? html`<label class="field">${t("wz.dhw_volume")} ${inp("dhwVolume", "number")}</label>
                <label class="field">${t("ed.label")} ${inp("dhwLabel")}</label>
                <label class="check"><input type="checkbox" .checked=${c.circulation} @change=${(e: Event) => this._upd({ circulation: (e.target as HTMLInputElement).checked })} /> ${t("wz.circulation")}</label>`
            : nothing}
        </div>

        <h3>${t("wz.circuits")}</h3>
        ${c.circuits.map(
          (hc, i) => html`<div class="circuit">
            <b>${t("wz.circuit", { n: i + 1 })}</b>
            <input .value=${hc.label} @change=${(e: Event) => this._circ(i, { label: (e.target as HTMLInputElement).value })} />
            <select @change=${(e: Event) => this._circ(i, { emitter: (e.target as HTMLSelectElement).value as any })}>
              <option value="radiators" ?selected=${hc.emitter === "radiators"}>${t("type.radiators")}</option>
              <option value="floor_heating" ?selected=${hc.emitter === "floor_heating"}>${t("type.floor_heating")}</option>
            </select>
            <label class="check"><input type="checkbox" .checked=${hc.mixed} @change=${(e: Event) => this._circ(i, { mixed: (e.target as HTMLInputElement).checked })} /> ${t("wz.mixed")}</label>
            <button class="ghost danger" ?disabled=${c.circuits.length < 2} @click=${() => this._upd({ circuits: c.circuits.filter((_, k) => k !== i) })}>${t("wz.remove")}</button>
          </div>`,
        )}
        <button ?disabled=${c.circuits.length >= 4} @click=${() =>
          this._upd({ circuits: [...c.circuits, { emitter: "floor_heating", mixed: true, label: t("wz.circuit", { n: c.circuits.length + 1 }) }] })}>
          ${icon("plus")} ${t("wz.add_circuit")}</button>

        <h3>${t("wz.extras")}</h3>
        <div class="radios">
          <label><input type="checkbox" .checked=${c.separator} @change=${(e: Event) => this._upd({ separator: (e.target as HTMLInputElement).checked })} /> ${t("wz.separator")}</label>
          <label><input type="checkbox" .checked=${c.expansion} @change=${(e: Event) => this._upd({ expansion: (e.target as HTMLInputElement).checked })} /> ${t("wz.expansion")}</label>
        </div>

        <div class="row actions">
          <button @click=${() => (this._cfg = exampleConfig())}>${t("wz.example")}</button>
          <span class="spacer"></span>
          <button class="primary" @click=${this._generate}>${icon("wand")} ${t("wz.generate")}</button>
        </div>
      </div>
    `;
  }

  private _circ(i: number, patch: Partial<WizardConfig["circuits"][number]>) {
    const circuits = this._cfg.circuits.map((hc, k) => (k === i ? { ...hc, ...patch } : hc));
    this._upd({ circuits });
  }

  static styles = [
    ui,
    css`
      .wrap { max-width: 920px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; align-items: end; }
      .radios { display: grid; gap: 6px; font-size: 14px; }
      .check { display: flex; gap: 8px; align-items: center; font-size: 14px; color: var(--cp-text); }
      .field.check { display: grid; }
      .circuit { display: grid; grid-template-columns: 110px 1fr 200px auto auto; gap: 8px; align-items: center; margin-bottom: 8px; }
      .actions { margin-top: 22px; }
      @media (max-width: 700px) { .circuit { grid-template-columns: 1fr 1fr; } }
    `,
  ];
}

// ---------------------------------------------------------------- mapping

export class CpMapping extends LitElement {
  static properties = {
    plant: { attribute: false },
    hass: { attribute: false },
    api: { attribute: false },
    _res: { state: true },
    _sel: { state: true },
    _busy: { state: true },
    _msg: { state: true },
  };
  plant!: Plant;
  hass?: Hass;
  api!: Api;
  private _res: ScanResult | null = null;
  private _sel = new Set<string>();
  private _busy = false;
  private _msg = "";

  private async _scan() {
    this._busy = true;
    try {
      this._res = await this.api.scan(this.plant);
      this._sel = new Set(
        this._res.suggestions
          .filter((s) => !this._comp(s.component_id)?.bindings[s.slot])
          .map((s) => `${s.component_id}|${s.slot}`),
      );
    } finally {
      this._busy = false;
    }
  }

  private _comp(id: string) {
    return this.plant.components.find((c) => c.id === id);
  }

  private _apply() {
    if (!this._res) return;
    const plant: Plant = structuredClone(this.plant);
    let n = 0;
    for (const s of this._res.suggestions) {
      if (!this._sel.has(`${s.component_id}|${s.slot}`)) continue;
      const c = plant.components.find((k) => k.id === s.component_id);
      if (c) {
        c.bindings[s.slot] = s.entity_id;
        n++;
      }
    }
    emit(this, "save", plant);
    this._msg = t("map.applied", { count: n });
  }

  render() {
    const standalone = !!this.hass?.__standalone;
    const res = this._res;
    const unbound = this.plant.components.flatMap((c) =>
      slotsOf(c)
        .filter((s) => !c.bindings[s.key] && !res?.suggestions.some((x) => x.component_id === c.id && x.slot === s.key))
        .map((s) => ({ c, s })),
    );
    return html`<div class="card">
      <h2>${t("map.title")}</h2>
      <p class="muted">${t("map.intro")}</p>
      ${standalone ? html`<p class="muted">${t("map.standalone")}</p>` : nothing}
      <div class="row">
        <button class="primary" ?disabled=${this._busy || standalone} @click=${this._scan}>${icon("search")} ${t("map.scan")}</button>
        ${res ? html`<span class="muted">${t("map.found", { count: res.entity_count })}</span>` : nothing}
        <span class="spacer"></span>
        ${this._msg ? html`<span class="ok">${icon("check")} ${this._msg}</span>` : nothing}
      </div>
      ${res && res.entity_count === 0 ? html`<div class="help"><b>${t("map.none")}</b><p>${t("map.none_help")}</p></div>` : nothing}
      ${res && res.suggestions.length
        ? html`<div class="tbl">
            <table>
              <thead><tr>
                <th><input type="checkbox" .checked=${this._sel.size === res.suggestions.length}
                  @change=${(e: Event) => (this._sel = (e.target as HTMLInputElement).checked ? new Set(res.suggestions.map((s) => `${s.component_id}|${s.slot}`)) : new Set())} /></th>
                <th>${t("map.component")}</th><th>${t("map.slot")}</th><th>${t("map.entity")}</th><th>${t("map.value")}</th><th>${t("map.confidence")}</th>
              </tr></thead>
              <tbody>
                ${res.suggestions.map((s) => {
                  const key = `${s.component_id}|${s.slot}`;
                  const c = this._comp(s.component_id);
                  const cur = c?.bindings[s.slot];
                  const st = this.hass?.states[s.entity_id];
                  return html`<tr>
                    <td><input type="checkbox" .checked=${this._sel.has(key)} @change=${(e: Event) => {
                      const next = new Set(this._sel);
                      (e.target as HTMLInputElement).checked ? next.add(key) : next.delete(key);
                      this._sel = next;
                    }} /></td>
                    <td>${c?.label || s.component_id}</td>
                    <td>${slotLabel(c?.type || "", s.slot)}</td>
                    <td><code>${s.entity_id}</code>${cur && cur !== s.entity_id ? html`<div class="muted small">${t("map.current")}: ${cur}</div>` : nothing}</td>
                    <td>${st ? `${st.state} ${st.attributes.unit_of_measurement || ""}` : "–"}</td>
                    <td><span class="conf ${s.confidence}">${t(`map.conf.${s.confidence}`)}</span></td>
                  </tr>`;
                })}
              </tbody>
            </table>
          </div>
          <div class="row"><span class="spacer"></span><button class="primary" ?disabled=${!this._sel.size} @click=${this._apply}>${t("map.apply")} (${this._sel.size})</button></div>`
        : nothing}
      <h3>${t("map.unbound")}</h3>
      <p class="muted small">${t("map.unbound_hint")}</p>
      <div class="chips">${unbound.slice(0, 80).map(({ c, s }) => html`<span class="chip">${c.label || c.id}: ${slotLabel(c.type, s.key)}</span>`)}</div>
    </div>`;
  }

  static styles = [
    ui,
    css`
      .help { margin-top: 12px; padding: 12px; border-radius: 10px; background: color-mix(in srgb, var(--cp-warn) 12%, var(--cp-surface-2)); }
      .help p { margin: 6px 0 0; font-size: 13px; }
      .tbl { overflow: auto; margin: 12px 0; }
      table { border-collapse: collapse; width: 100%; font-size: 13px; }
      th, td { text-align: left; padding: 7px 8px; border-bottom: 1px solid var(--cp-border); vertical-align: top; }
      th { font-size: 11px; color: var(--cp-muted); text-transform: uppercase; }
      code { font-size: 12px; }
      .small { font-size: 11px; }
      .conf { font-size: 11px; padding: 2px 8px; border-radius: 8px; background: var(--cp-surface-2); }
      .conf.high { color: var(--cp-accent); }
      .conf.medium { color: var(--cp-warn); }
      .ok { color: var(--cp-accent); display: inline-flex; gap: 4px; align-items: center; font-size: 13px; }
      .chips { display: flex; flex-wrap: wrap; gap: 6px; }
      .chip { font-size: 11px; padding: 3px 8px; border-radius: 8px; background: var(--cp-surface-2); color: var(--cp-muted); }
    `,
  ];
}

// ------------------------------------------------------------------ icons

const TYPE_LIST: ComponentType[] = ["outdoor_unit", "indoor_unit", "buffer", "dhw_tank", "pump", "valve_3way", "mixer", "radiators", "floor_heating", "tap", "separator", "expansion_vessel"];

export class CpIcons extends LitElement {
  static properties = { plant: { attribute: false }, api: { attribute: false }, icons: { attribute: false }, _err: { state: true }, _iso: { state: true } };
  plant!: Plant;
  api!: Api;
  icons: Map<string, UserIcon> = new Map();
  private _err = "";
  private _iso = false;

  private async _upload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    this._err = "";
    if (file.size > 256 * 1024) {
      this._err = t("ic.err.too_large");
      return;
    }
    const data = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).split(",")[1] || "");
      r.onerror = () => reject(r.error);
      r.readAsDataURL(file);
    });
    try {
      await this.api.uploadIcon(file.name.replace(/\.[^.]+$/, ""), file.type || "image/svg+xml", data, this._iso);
      emit(this, "icons-changed");
    } catch (err: any) {
      const code = err?.code || err?.error?.code || "invalid_data";
      this._err = t(`ic.err.${code}`);
    }
  }

  private async _delete(id: string) {
    await this.api.deleteIcon(id);
    emit(this, "icons-changed");
  }

  private _typeDefault(type: ComponentType, id: string) {
    const plant: Plant = structuredClone(this.plant);
    plant.settings.typeIcons = { ...(plant.settings.typeIcons || {}) };
    if (id) plant.settings.typeIcons[type] = id;
    else delete plant.settings.typeIcons[type];
    emit(this, "save", plant);
  }

  render() {
    const icons = [...this.icons.values()];
    return html`<div class="card">
      <h2>${t("ic.title")}</h2>
      <p class="muted">${t("ic.intro")}</p>
      <div class="row">
        <label class="btn primary up">${icon("upload")} ${t("ic.upload")}
          <input type="file" accept=".svg,.png,.webp,.jpg,.jpeg,image/svg+xml,image/png,image/webp,image/jpeg" @change=${this._upload} hidden /></label>
        <label class="row small"><input type="checkbox" .checked=${this._iso} @change=${(e: Event) => (this._iso = (e.target as HTMLInputElement).checked)} /> ${t("ic.iso")}</label>
        ${this._err ? html`<span class="err">${this._err}</span>` : nothing}
      </div>
      ${icons.length
        ? html`<div class="gallery">${icons.map(
            (i) => html`<div class="ic">
              <div class="prev"><img src=${i.data_url} alt=${i.name} /></div>
              <div class="name">${i.name}${i.iso ? html` <span class="muted">· iso</span>` : nothing}</div>
              <button class="ghost danger icon" @click=${() => this._delete(i.id)}>${icon("trash")}</button>
            </div>`,
          )}</div>`
        : html`<p class="muted">${t("ic.empty")}</p>`}
      <h3>${t("ic.type_default")}</h3>
      <div class="defaults">
        ${TYPE_LIST.map(
          (type) => html`<label class="field">${t(`type.${type}`)}
            <select @change=${(e: Event) => this._typeDefault(type, (e.target as HTMLSelectElement).value)}>
              <option value="">${t("ed.icon_default")}</option>
              ${icons.map((i) => html`<option value=${i.id} ?selected=${this.plant.settings.typeIcons?.[type] === i.id}>${i.name}</option>`)}
            </select></label>`,
        )}
      </div>
    </div>`;
  }

  static styles = [
    ui,
    css`
      .up { cursor: pointer; }
      .small { font-size: 13px; }
      .err { color: var(--cp-error); font-size: 13px; }
      .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; margin-top: 14px; }
      .ic { background: var(--cp-surface-2); border-radius: 12px; padding: 10px; display: grid; gap: 6px; position: relative; }
      .ic button { position: absolute; top: 4px; right: 4px; }
      .prev { height: 90px; display: grid; place-items: center; background: var(--cp-bg-2); border-radius: 8px; }
      .prev img { max-width: 90%; max-height: 80px; }
      .name { font-size: 12px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .defaults { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
    `,
  ];
}

// --------------------------------------------------------------- settings

export class CpSettings extends LitElement {
  static properties = { plant: { attribute: false }, version: {} };
  plant!: Plant;
  version = "";

  private _patch(patch: Partial<Plant["settings"]>) {
    const plant: Plant = structuredClone(this.plant);
    plant.settings = { ...plant.settings, ...patch };
    emit(this, "save", plant);
  }

  render() {
    const s = this.plant.settings;
    return html`<div class="card wrap">
      <h2>${t("st.title")}</h2>
      <label class="field">${t("st.style")}
        <select @change=${(e: Event) => this._patch({ style: (e.target as HTMLSelectElement).value as any })}>
          <option value="flat" ?selected=${s.style === "flat"}>${t("st.style.flat")}</option>
          <option value="iso" disabled>${t("st.style.iso")}</option>
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${s.demo} @change=${(e: Event) => this._patch({ demo: (e.target as HTMLInputElement).checked })} />
        <span><b>${t("st.demo")}</b><br /><span class="muted">${t("st.demo_hint")}</span></span></label>
      <label class="field">${t("st.language")}
        <select @change=${(e: Event) => this._patch({ language: (e.target as HTMLSelectElement).value as any })}>
          ${(["auto", "de", "en"] as const).map((l) => html`<option value=${l} ?selected=${(s.language || "auto") === l}>${l === "auto" ? t("st.lang.auto") : l === "de" ? "Deutsch" : "English"}</option>`)}
        </select></label>
      <label class="field">${t("st.heat_load")}
        <input type="number" step="0.1" .value=${String(s.heat_load ?? 6.2)} @change=${(e: Event) => this._patch({ heat_load: Number((e.target as HTMLInputElement).value) })} /></label>
      <div class="row foot">
        <span class="muted">${t("st.version")} ${this.version}</span>
        <span class="spacer"></span>
        <button class="danger" @click=${() => confirm(t("st.reset_confirm")) && emit(this, "reset-plant")}>${t("st.reset")}</button>
      </div>
    </div>`;
  }

  static styles = [
    ui,
    css`
      .wrap { max-width: 640px; display: grid; gap: 16px; }
      .toggle { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; }
      .toggle input { margin-top: 4px; }
      .foot { margin-top: 8px; }
    `,
  ];
}

for (const [name, cls] of [
  ["cp-wizard", CpWizard],
  ["cp-mapping", CpMapping],
  ["cp-icons", CpIcons],
  ["cp-settings", CpSettings],
] as const) {
  if (!customElements.get(name)) customElements.define(name, cls as any);
}

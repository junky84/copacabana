import { LitElement, css, html, nothing } from "lit";
import { INDOOR_MODELS, OUTDOOR_MODELS, slotsOf } from "../catalog";
import { slotLabel, t } from "../i18n";
import { icon, ui } from "../styles";
import type { ComponentType, EnergyConfig, Hass, Plant, UserIcon } from "../types";
import { suggestEnergy } from "../data/energy";
import { tariffOf } from "../data/costs";
import "./editor";
import { exampleConfig, generatePlant, type WizardConfig } from "../templates";
import type { Api, Backup, ScanResult } from "../api";

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

  /** Where an icon is in use: components with it as their own icon, types with it as default. */
  private _usage(id: string) {
    const comps = this.plant.components.filter((c) => c.icon === id).map((c) => c.label || t(`type.${c.type}`));
    const types = Object.entries(this.plant.settings.typeIcons || {})
      .filter(([, v]) => v === id)
      .map(([k]) => t(`type.${k}`));
    if (!comps.length && !types.length) return html`<div class="use muted">${t("ic.unused")}</div>`;
    return html`<div class="use">
      ${comps.length ? html`<div>${t("ic.used_by", { list: comps.join(", ") })}</div>` : nothing}
      ${types.length ? html`<div>${t("ic.default_for", { list: types.join(", ") })}</div>` : nothing}
    </div>`;
  }

  /** Components of this type that use an own icon (they override the type default). */
  private _ownHint(type: ComponentType) {
    const all = this.plant.components.filter((c) => c.type === type);
    const own = all.filter((c) => c.icon && this.icons.has(c.icon));
    if (!own.length) return nothing;
    const text =
      own.length === 1 && all.length === 1
        ? t("ic.own_one", { name: this.icons.get(own[0].icon!)!.name })
        : t("ic.own_some", { n: own.length, m: all.length });
    return html`<span class="hint">${text}</span>`;
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
              ${this._usage(i.id)}
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
            </select>${this._ownHint(type)}</label>`,
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
      .use { font-size: 11px; color: var(--cp-accent); line-height: 1.35; }
      .use.muted { color: var(--cp-muted); }
      .hint { font-size: 11px; color: var(--cp-accent); font-weight: 500; }
      .defaults { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
    `,
  ];
}

// --------------------------------------------------------------- settings

export class CpSettings extends LitElement {
  static properties = {
    plant: { attribute: false },
    version: {},
    hass: { attribute: false },
    api: { attribute: false },
    _energy: { state: true },
    _note: { state: true },
    _backups: { state: true },
    _tariff: { state: true },
    _bmsg: { state: true },
  };
  plant!: Plant;
  version = "";
  hass?: Hass;
  api?: Api;
  private _backups: Backup[] | null = null;
  private _tariff: Partial<import("../types").TariffConfig> | null = null;

  private _tariffSection() {
    const tf = { ...tariffOf(this.plant), ...(this._tariff || {}) };
    const set = (patch: Partial<import("../types").TariffConfig>) => (this._tariff = { ...(this._tariff || {}), ...patch });
    const num = (key: "price" | "feed_in" | "gas_price" | "gas_eff", label: string, step: string) =>
      html`<label class="field">${label}<input type="number" step=${step} min="0" .value=${String(tf[key])}
        @change=${(e: Event) => set({ [key]: Number((e.target as HTMLInputElement).value) })} /></label>`;
    return html`<div class="card wrap">
      <h2>${t("st.tariff")}</h2>
      <p class="muted">${t("st.tariff_hint")}</p>
      <div class="grid2">
        <label class="field">${t("st.t_mode")}
          <select @change=${(e: Event) => set({ mode: (e.target as HTMLSelectElement).value as "fixed" | "entity" })}>
            <option value="fixed" ?selected=${tf.mode === "fixed"}>${t("st.t_fixed")}</option>
            <option value="entity" ?selected=${tf.mode === "entity"}>${t("st.t_entity")}</option>
          </select></label>
        ${tf.mode === "entity"
          ? html`<label class="field">${t("st.t_entity_pick")}
              <cp-entity-picker .hass=${this.hass} .value=${tf.price_entity || ""} @value-changed=${(e: CustomEvent) => set({ price_entity: e.detail || undefined })}></cp-entity-picker></label>`
          : num("price", t("st.t_price"), "0.01")}
        ${num("feed_in", t("st.t_feed_in"), "0.001")}
        ${num("gas_price", t("st.t_gas"), "0.01")}
        ${num("gas_eff", t("st.t_gas_eff"), "1")}
      </div>
      <div class="row"><span class="spacer"></span>
        <button class="primary" ?disabled=${!this._tariff} @click=${() => {
          this._patch({ tariff: { ...(this.plant.settings.tariff || {}), ...this._tariff } });
          this._tariff = null;
        }}>${icon("save")} ${t("st.save")}</button></div>
    </div>`;
  }
  private _bmsg = "";

  connectedCallback(): void {
    super.connectedCallback();
    this._loadBackups();
  }

  private async _loadBackups() {
    try {
      this._backups = this.api ? await this.api.listBackups() : [];
    } catch {
      this._backups = [];
    }
  }

  private async _restore(b: Backup) {
    if (!this.api || !confirm(t("bk.restore_confirm", { date: new Date(b.ts * 1000).toLocaleString() }))) return;
    try {
      const plant = await this.api.restoreBackup(b.ts);
      emit(this, "plant-restored", plant);
      this._bmsg = t("bk.restored");
      await this._loadBackups();
    } catch (err: any) {
      this._bmsg = err?.message || String(err);
    }
  }

  private _export() {
    const blob = new Blob([JSON.stringify(this.plant, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    const day = new Date().toISOString().slice(0, 10);
    const name = (this.plant.name || "plant").replace(/[^\w-]+/g, "_");
    a.href = URL.createObjectURL(blob);
    a.download = `copilot-${name}-${day}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  private async _import(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    try {
      const plant = JSON.parse(await file.text()) as Plant;
      if (!Array.isArray(plant.components) || !Array.isArray(plant.pipes) || !plant.grid) throw new Error(t("bk.invalid"));
      if (!confirm(t("bk.import_confirm", { name: plant.name || file.name, n: plant.components.length }))) return;
      plant.settings = { ...this.plant.settings, ...(plant.settings || {}) };
      emit(this, "save", plant);
      this._bmsg = t("bk.imported");
      setTimeout(() => this._loadBackups(), 800);
    } catch (err: any) {
      this._bmsg = `${t("bk.invalid")} (${err?.message || err})`;
    }
  }

  private _backupSection() {
    const reason = (r: string) => t(`bk.reason.${r}`);
    return html`<div class="card wrap">
      <h2>${t("bk.title")}</h2>
      <p class="muted">${t("bk.hint")}</p>
      <div class="row">
        <button @click=${this._export}>${icon("download")} ${t("bk.export")}</button>
        <label class="filebtn">${icon("upload")} ${t("bk.import")}
          <input type="file" accept="application/json,.json" @change=${this._import} /></label>
        ${this._bmsg ? html`<span class="muted">${this._bmsg}</span>` : nothing}
      </div>
      ${this._backups === null
        ? nothing
        : this._backups.length
          ? html`<ul class="backups">
              ${this._backups.map(
                (b) => html`<li>
                  <div><b>${new Date(b.ts * 1000).toLocaleString()}</b>
                    <span class="muted"> · ${reason(b.reason)}${b.version ? ` · v${b.version}` : ""} · ${t("bk.components", { n: b.components })}</span></div>
                  <button @click=${() => this._restore(b)}>${icon("undo")} ${t("bk.restore")}</button>
                </li>`,
              )}
            </ul>`
          : html`<p class="muted">${t(this.api?.standalone ? "bk.demo" : "bk.none")}</p>`}
    </div>`;
  }
  /** unsaved energy settings */
  private _energy: EnergyConfig | null = null;
  private _note = "";

  private _en(): EnergyConfig {
    return this._energy ?? this.plant.settings.energy ?? {};
  }

  private _setEn(patch: Partial<EnergyConfig>) {
    this._energy = { ...this._en(), ...patch };
  }

  private _detect() {
    if (!this.hass) return;
    const s = suggestEnergy(this.hass);
    const found = Object.entries(s).some(([k, v]) => typeof v === "string" && k !== "enabled");
    this._energy = { ...this._en(), ...s };
    this._note = t(found ? "st.energy_detected" : "st.energy_none");
  }

  private _saveEnergy() {
    this._patch({ energy: this._en() });
    this._energy = null;
    this._note = "";
  }

  private _energySection() {
    const e = this._en();
    const pick = (key: keyof EnergyConfig, label: string) =>
      html`<label class="field">${label}
        <cp-entity-picker .hass=${this.hass} .value=${(e[key] as string) || ""}
          @value-changed=${(ev: CustomEvent) => this._setEn({ [key]: ev.detail || undefined })}></cp-entity-picker></label>`;
    const check = (key: keyof EnergyConfig, label: string, def = false) =>
      html`<label class="check"><input type="checkbox" .checked=${(e[key] as boolean | undefined) ?? def}
        @change=${(ev: Event) => this._setEn({ [key]: (ev.target as HTMLInputElement).checked })} />${label}</label>`;
    return html`<div class="card wrap">
      <h2>${t("st.energy")}</h2>
      <p class="muted">${t("st.energy_hint")}</p>
      ${check("enabled", t("st.energy_enabled"))}
      ${this.hass && !(this.hass as any).__standalone
        ? html`<div class="row"><button @click=${this._detect}>${icon("search")} ${t("st.energy_detect")}</button>
            ${this._note ? html`<span class="muted">${this._note}</span>` : nothing}</div>`
        : nothing}
      <div class="grid2">
        ${pick("pv", t("st.e_pv"))}
        <div>${pick("grid", t("st.e_grid"))}${check("grid_invert", t("st.e_grid_invert"))}</div>
        <div>${pick("battery", t("st.e_battery"))}${check("battery_invert", t("st.e_battery_invert"))}</div>
        ${pick("battery_soc", t("st.e_soc"))}
        <div>${pick("house", t("st.e_house"))}${check("house_includes_hp", t("st.e_house_hp"), true)}</div>
        ${pick("wallbox", t("st.e_wallbox"))}
        <label class="field">${t("st.e_limit")}
          <input type="number" step="0.1" min="0" .value=${String(e.limit_14a ?? 4.2)}
            @change=${(ev: Event) => this._setEn({ limit_14a: Number((ev.target as HTMLInputElement).value) })} /></label>
      </div>
      <div class="row"><span class="spacer"></span>
        <button class="primary" ?disabled=${!this._energy} @click=${this._saveEnergy}>${icon("save")} ${t("st.save")}</button></div>
    </div>`;
  }

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
          <option value="iso" ?selected=${s.style === "iso"}>${t("st.style.iso")}</option>
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${s.demo} @change=${(e: Event) => this._patch({ demo: (e.target as HTMLInputElement).checked })} />
        <span><b>${t("st.demo")}</b><br /><span class="muted">${t("st.demo_hint")}</span></span></label>
      <label class="field">${t("st.language")}
        <select @change=${(e: Event) => this._patch({ language: (e.target as HTMLSelectElement).value as any })}>
          ${(["auto", "de", "en"] as const).map((l) => html`<option value=${l} ?selected=${(s.language || "auto") === l}>${l === "auto" ? t("st.lang.auto") : l === "de" ? "Deutsch" : "English"}</option>`)}
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${!!s.write_non_admin} @change=${(e: Event) => this._patch({ write_non_admin: (e.target as HTMLInputElement).checked })} />
        <span><b>${t("st.write_non_admin")}</b><br /><span class="muted">${t("st.write_hint")}</span></span></label>
      <label class="field">${t("st.heat_load")}
        <input type="number" step="0.1" .value=${String(s.heat_load ?? 6.2)} @change=${(e: Event) => this._patch({ heat_load: Number((e.target as HTMLInputElement).value) })} /></label>
      <div class="row foot">
        <span class="muted">${t("st.version")} ${this.version}</span>
        <span class="spacer"></span>
        <button class="danger" @click=${() => confirm(t("st.reset_confirm")) && emit(this, "reset-plant")}>${t("st.reset")}</button>
      </div>
    </div>
    ${this._energySection()}
    ${this._tariffSection()}
    ${this._backupSection()}`;
  }

  static styles = [
    ui,
    css`
      .wrap { max-width: 640px; display: grid; gap: 16px; }
      .toggle { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; }
      .toggle input { margin-top: 4px; }
      .foot { margin-top: 8px; }
      :host { display: grid; gap: 16px; align-content: start; }
      h2 { margin: 0; }
      .grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 16px; }
      .check { display: flex; gap: 8px; align-items: center; font-size: 13px; margin-top: 6px; }
      .check input { width: auto; margin: 0; }
      .backups { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
      .backups li { display: flex; gap: 10px; align-items: center; justify-content: space-between; padding: 8px 10px;
        border: 1px solid var(--cp-border); border-radius: 10px; font-size: 13px; }
      .filebtn { position: relative; display: inline-flex; gap: 6px; align-items: center; cursor: pointer; padding: 7px 12px;
        border: 1px solid var(--cp-border); border-radius: 10px; font-size: 13px; font-weight: 600; }
      .filebtn input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
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

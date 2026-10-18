/**
 * Shared data layer for the panel and the Lovelace card: loads the plant,
 * icons and messages, follows Home Assistant states and runs the demo simulator.
 */

import type { ReactiveController, ReactiveControllerHost } from "lit";
import { Api, isConflict } from "./api";
import { resolveLang, setLang, t } from "./i18n";
import type { Hass, Plant, PlantMessage, UserIcon } from "./types";
import { HassSource, type ValueSource } from "./data/values";
import { Simulator } from "./sim/simulator";
import { SimSource, simParamsFor } from "./sim/source";
import { examplePlant, generatePlant } from "./templates";

const SIM_FPS = 4;

export class PlantController implements ReactiveController {
  hass?: Hass;
  api?: Api;
  plant: Plant | null = null;
  icons: Map<string, UserIcon> = new Map();
  /** messages from the integration's rule engine (live plant) */
  backendMessages: PlantMessage[] = [];
  /** messages of the demo simulator; shown instead while demo mode is on */
  simMessages: PlantMessage[] = [];
  sim: Simulator | null = null;
  version = 0;
  error = "";
  admin = true;
  backendVersion = "";
  /** revision of `plant` in the backend; sent with every save so a stale window cannot overwrite */
  rev: number | undefined = undefined;

  private _raf = 0;
  private _lastFrame = 0;
  private _accum = 0;
  private _unsubMsg?: () => void;
  private _unsubCfg?: () => void;
  /** plant (JSON) of a save in flight: its own push event must not count as a foreign change */
  private _pending?: string;
  private _unsubSim?: () => void;
  private _boundIds: string[] = [];
  private _lastStates: unknown[] = [];
  private _loading = false;
  private _connected = false;

  /**
   * @param saveExample store the example plant when none exists yet (panel only;
   *   a card must never write configuration on its own)
   */
  constructor(
    private host: ReactiveControllerHost & HTMLElement,
    private saveExample = true,
  ) {
    host.addController(this);
  }

  private _changed(): void {
    this.host.requestUpdate();
  }

  // ------------------------------------------------------------ lifecycle

  hostConnected(): void {
    this._connected = true;
    if (this.hass && !this.api) this._init();
    if (this.plant?.settings.demo && !this.sim) this._startSim();
  }

  hostDisconnected(): void {
    this._connected = false;
    this._stopSim();
    this._unsubMsg?.();
    this._unsubMsg = undefined;
    this._unsubCfg?.();
    this._unsubCfg = undefined;
    this.api = undefined;
  }

  setHass(hass: Hass): void {
    this.hass = hass;
    const dark = hass.themes?.darkMode ?? true;
    this.host.toggleAttribute("light", !dark);
    setLang(resolveLang(this.plant?.settings.language, hass.language));
    if (!this.api) {
      if (this._connected) this._init();
    } else {
      this.api.setHass(hass);
    }
    if (this.plant && !this.plant.settings.demo) this._checkStates();
  }

  private _init(): void {
    this.api = new Api(this.hass!);
    this._load();
  }

  // ----------------------------------------------------------------- data

  get messages(): PlantMessage[] {
    return this.sim ? this.simMessages : this.backendMessages;
  }

  get src(): ValueSource {
    return this.sim ? new SimSource(this.sim, this.hass) : new HassSource(this.hass!);
  }

  /** Re-render on hass updates only when a bound entity actually changed. */
  private _checkStates(): void {
    if (!this.hass) return;
    const states = this._boundIds.map((id) => this.hass!.states[id]);
    if (states.length !== this._lastStates.length || states.some((s, i) => s !== this._lastStates[i])) {
      this._lastStates = states;
      this.version++;
      this._changed();
    }
  }

  private _collectBound(): void {
    const ids = new Set<string>();
    for (const c of this.plant?.components || []) {
      Object.values(c.bindings || {}).forEach((id) => id && ids.add(id));
      ((c.props.entries as { entity?: string }[]) || []).forEach((e) => e.entity && ids.add(e.entity));
    }
    for (const p of this.plant?.pipes || []) if (p.bindings?.temp) ids.add(p.bindings.temp);
    const en = this.plant?.settings.energy;
    if (en?.enabled) for (const k of ["pv", "grid", "battery", "battery_soc", "house", "wallbox"] as const) if (en[k]) ids.add(en[k]!);
    this._boundIds = [...ids];
    this._lastStates = [];
  }

  private async _load(): Promise<void> {
    if (this._loading || !this.api) return;
    this._loading = true;
    try {
      const cfg = await this.api.getConfig();
      this.admin = cfg.is_admin;
      this.backendVersion = cfg.version;
      this.rev = cfg.rev;
      let plant = cfg.plant;
      let migrated = false;
      if (!plant) {
        plant = examplePlant();
        migrated = true;
      } else if ((plant.version ?? 1) < 5 && plant.settings?.wizard && !plant.settings.layout_edited) {
        // older generated layouts (separate PC0/VW1, circulation from the tap): rebuild from the wizard
        // answers. Layouts arranged by hand are never regenerated – migrations must keep positions.
        plant = generatePlant(plant.settings.wizard, plant);
        migrated = true;
      }
      if (migrated && cfg.is_admin && this.saveExample) {
        try {
          await this.save(plant);
        } catch (err) {
          // another window was faster: its plant arrives through the subscription below
          if (!isConflict(err)) throw err;
        }
      } else {
        this.setPlant(plant, cfg.rev);
      }
      await this.loadIcons();
      if (!this.api.standalone) {
        this._unsubCfg = await this.api.subscribeConfig((p, rev) => this._onRemote(p, rev));
        this.backendMessages = await this.api.listMessages();
        this._unsubMsg = await this.api.subscribeMessages((m) => this._mergeMessage(m));
      }
    } catch (err: any) {
      this.error = err?.message || String(err);
    } finally {
      this._loading = false;
      this._changed();
    }
  }

  async loadIcons(): Promise<void> {
    const list = await this.api!.listIcons();
    this.icons = new Map(list.map((i) => [i.id, i]));
    this._changed();
  }

  private _mergeMessage(m: PlantMessage): void {
    const idx = this.backendMessages.findIndex((x) => x.id === m.id);
    const next = [...this.backendMessages];
    if (idx >= 0) next[idx] = m;
    else next.push(m);
    this.backendMessages = next;
    this._changed();
  }

  /** A save from any window (or the current state after (re)subscribing). */
  private _onRemote(plant: Plant | null, rev: number): void {
    if (!plant || (this.rev !== undefined && rev <= this.rev)) return;
    if (this._pending !== undefined && JSON.stringify(plant) === this._pending) {
      // our own save: `save()` applies it once the result is in
      return;
    }
    this.setPlant(plant, rev);
  }

  setPlant(plant: Plant, rev?: number): void {
    if (rev !== undefined) this.rev = rev;
    const prevParams = JSON.stringify(simParamsFor(this.plant));
    this.plant = plant;
    setLang(resolveLang(plant.settings.language, this.hass?.language));
    this._collectBound();
    if (plant.settings.demo) {
      if (!this.sim || JSON.stringify(simParamsFor(plant)) !== prevParams) this._startSim();
    } else {
      this._stopSim();
      this._checkStates();
    }
    this.version++;
    this._changed();
  }

  /**
   * Save the plant. `rev` is the revision the change is based on (default: the one shown). When
   * another window saved in between, the newest plant is loaded and the conflict error rethrown.
   */
  async save(plant: Plant, rev: number | undefined = this.rev): Promise<void> {
    const api = this.api!;
    this._pending = JSON.stringify(plant);
    try {
      this.setPlant(plant, await api.saveConfig(plant, rev));
    } catch (err) {
      if (isConflict(err)) await this.reload();
      throw err;
    } finally {
      this._pending = undefined;
    }
  }

  /** Fetch the stored plant again (after a conflict). */
  async reload(): Promise<void> {
    const cfg = await this.api!.getConfig();
    if (cfg.plant) this.setPlant(cfg.plant, cfg.rev);
  }

  async clearMessages(): Promise<void> {
    await this.api!.clearMessages();
    this.backendMessages = await this.api!.listMessages();
    this._changed();
  }

  // ------------------------------------------------------------------ sim

  private _startSim(): void {
    this._stopSim();
    const dhw = this.plant?.components.find((c) => c.type === "dhw_tank");
    const sim = new Simulator(simParamsFor(this.plant), undefined, { dhw: dhw?.label || t("type.dhw_tank") });
    this.sim = sim;
    this._unsubSim = sim.onMessage(() => {
      this.simMessages = [...sim.messages];
      this._changed();
    });
    this.simMessages = [...sim.messages];
    this._lastFrame = performance.now();
    const loop = (now: number) => {
      const dt = (now - this._lastFrame) / 1000;
      this._lastFrame = now;
      if (!document.hidden) {
        sim.advance(dt);
        this._accum += dt;
        if (this._accum >= 1 / SIM_FPS) {
          this._accum = 0;
          this.version++;
          this._changed();
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
    if (this.sim) {
      this.sim = null;
      this.simMessages = [];
      if (this.api && !this.api.standalone)
        this.api.listMessages().then(
          (m) => {
            this.backendMessages = m;
            this._changed();
          },
          () => undefined,
        );
    }
  }

  scenario(name: string): void {
    const sim = this.sim;
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
    this.version++;
    this._changed();
  }
}

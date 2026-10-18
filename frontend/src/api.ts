import type { Hass, Plant, PlantMessage, UserIcon } from "./types";

export interface ScanResult {
  source: string;
  entity_count: number;
  entities: { key: string; entity_id: string }[];
  suggestions: { component_id: string; slot: string; entity_id: string; source_key: string; confidence: "high" | "medium" }[];
}

export interface ConfigResult {
  version: string;
  plant: Plant | null;
  /** revision of the stored plant (missing in the standalone demo) */
  rev?: number;
  options: Record<string, any>;
  is_admin: boolean;
}

const LS_PLANT = "copilot.standalone.plant";
const LS_ICONS = "copilot.standalone.icons";

function lsGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function lsSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: keep in memory only */
  }
}

/** Thin wrapper around the integration's websocket API (or local storage in the standalone demo). */
export interface Backup {
  ts: number;
  reason: "save" | "update" | "restore" | "import";
  version: string | null;
  name?: string;
  components: number;
}

/** True when a save was refused because another window saved first. */
export function isConflict(err: unknown): boolean {
  return (err as { code?: string } | null)?.code === "conflict";
}

export class Api {
  constructor(private hass: Hass) {}

  get standalone(): boolean {
    return !!this.hass.__standalone;
  }

  setHass(hass: Hass): void {
    this.hass = hass;
  }

  async getConfig(): Promise<ConfigResult> {
    if (this.standalone) return { version: "demo", plant: lsGet<Plant | null>(LS_PLANT, null), options: {}, is_admin: true };
    return this.hass.callWS<ConfigResult>({ type: "copilot/config/get" });
  }

  /**
   * Save the plant. With `rev` the backend refuses (error code `conflict`) when the plant was
   * changed elsewhere since that revision. Resolves to the new revision.
   */
  async saveConfig(plant: Plant, rev?: number): Promise<number | undefined> {
    if (this.standalone) {
      lsSet(LS_PLANT, plant);
      return undefined;
    }
    const msg: Record<string, unknown> = { type: "copilot/config/save", plant };
    if (rev !== undefined) msg.rev = rev;
    return (await this.hass.callWS<{ rev?: number }>(msg)).rev;
  }

  /** Follow saves from every window; the current state is delivered right away (and after reconnects). */
  async subscribeConfig(cb: (plant: Plant | null, rev: number) => void): Promise<() => void> {
    if (this.standalone || !this.hass.connection) return () => undefined;
    return this.hass.connection.subscribeMessage<{ plant: Plant | null; rev: number }>((ev) => cb(ev.plant, ev.rev), {
      type: "copilot/config/subscribe",
    });
  }

  async write(componentId: string, slot: string, value: string | number | boolean | null): Promise<{ old: string; new: unknown }> {
    return this.hass.callWS({ type: "copilot/write", component_id: componentId, slot, value });
  }

  async listBackups(): Promise<Backup[]> {
    if (this.standalone) return [];
    return (await this.hass.callWS<{ backups: Backup[] }>({ type: "copilot/backups/list" })).backups;
  }

  async restoreBackup(ts: number): Promise<{ plant: Plant; rev?: number }> {
    return this.hass.callWS<{ plant: Plant; rev?: number }>({ type: "copilot/backups/restore", ts });
  }

  async scan(plant: Plant): Promise<ScanResult> {
    if (this.standalone) return { source: "ems_esp", entity_count: 0, entities: [], suggestions: [] };
    return this.hass.callWS<ScanResult>({ type: "copilot/mapping/scan", source: "ems_esp", plant });
  }

  async listIcons(): Promise<UserIcon[]> {
    if (this.standalone) return lsGet<UserIcon[]>(LS_ICONS, []);
    return (await this.hass.callWS<{ icons: UserIcon[] }>({ type: "copilot/icons/list" })).icons;
  }

  async uploadIcon(name: string, mime: string, data: string, iso: boolean): Promise<UserIcon> {
    if (this.standalone) {
      const icons = lsGet<UserIcon[]>(LS_ICONS, []);
      const icon: UserIcon = { id: Math.random().toString(16).slice(2, 14), name, mime, iso, size: data.length, data_url: `data:${mime};base64,${data}` };
      icons.push(icon);
      lsSet(LS_ICONS, icons);
      return icon;
    }
    return (await this.hass.callWS<{ icon: UserIcon }>({ type: "copilot/icons/upload", name, mime, data, iso })).icon;
  }

  async deleteIcon(id: string): Promise<void> {
    if (this.standalone) return lsSet(LS_ICONS, lsGet<UserIcon[]>(LS_ICONS, []).filter((i) => i.id !== id));
    await this.hass.callWS({ type: "copilot/icons/delete", icon_id: id });
  }

  async listMessages(): Promise<PlantMessage[]> {
    if (this.standalone) return [];
    return (await this.hass.callWS<{ messages: PlantMessage[] }>({ type: "copilot/messages/list" })).messages;
  }

  async subscribeMessages(cb: (m: PlantMessage) => void): Promise<() => void> {
    if (this.standalone || !this.hass.connection) return () => undefined;
    return this.hass.connection.subscribeMessage<{ message: PlantMessage }>((ev) => cb(ev.message), {
      type: "copilot/messages/subscribe",
    });
  }

  async clearMessages(): Promise<void> {
    if (this.standalone) return;
    await this.hass.callWS({ type: "copilot/messages/clear" });
  }
}

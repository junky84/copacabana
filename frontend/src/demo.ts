/** Standalone demo: mounts the panel with a fake `hass` object (no Home Assistant needed). */
import "./panel";
import type { Hass } from "./types";

const params = new URLSearchParams(location.search);
const dark = params.get("theme") ? params.get("theme") === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;

const hass: Hass = {
  __standalone: true,
  states: {},
  language: params.get("lang") || navigator.language || "de",
  themes: { darkMode: dark },
  user: { is_admin: true, name: "Demo" },
  async callWS() {
    throw new Error("No Home Assistant in standalone demo");
  },
};

// screenshot helpers: ?explain=1, ?energy=0|1, ?view=efficiency|check|curve|messages|config
for (const [param, key] of [["explain", "copilot.explain"], ["energy", "copilot.energy"]]) {
  const v = params.get(param);
  if (v !== null) localStorage.setItem(key, v === "1" ? "1" : "0");
}

const el = document.querySelector("copilot-panel") as any;
if (params.get("view")) el._view = params.get("view");
el.hass = hass;
el.narrow = window.innerWidth < 870;
window.addEventListener("resize", () => (el.narrow = window.innerWidth < 870));

// ?card=1 shows the Lovelace card instead of the panel (as in a "panel" view)
if (params.get("card")) {
  el.remove();
  const card = document.createElement("copilot-card") as any;
  card.setConfig({ type: "custom:copilot-card", show_messages: params.get("messages") === "1" });
  card.isPanel = true;
  card.hass = hass;
  document.body.style.padding = "8px";
  document.body.appendChild(card);
}

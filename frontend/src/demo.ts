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

const el = document.querySelector("copilot-panel") as any;
el.hass = hass;
el.narrow = window.innerWidth < 870;
window.addEventListener("resize", () => (el.narrow = window.innerWidth < 870));

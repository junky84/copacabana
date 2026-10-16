"""COPilot – SCADA-style heat pump dashboard for Home Assistant."""

from __future__ import annotations

from dataclasses import dataclass
import logging
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from . import websocket_api
from .const import (
    DOMAIN,
    FRONTEND_FILE,
    FRONTEND_URL_BASE,
    NAME,
    PANEL_ICON,
    PANEL_URL_PATH,
    PANEL_WEBCOMPONENT,
    VERSION,
)
from .messages import MessageEngine
from .store import CopilotStore

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

_DATA_STATIC = f"{DOMAIN}_static_registered"


@dataclass
class CopilotRuntime:
    """Objects shared by the panel API while the entry is loaded."""

    entry: ConfigEntry
    store: CopilotStore
    messages: MessageEngine


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    websocket_api.async_register(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    store = CopilotStore(hass)
    await store.async_load()
    messages = MessageEngine(hass)
    await messages.async_load()

    runtime = CopilotRuntime(entry=entry, store=store, messages=messages)
    hass.data[DOMAIN] = runtime
    messages.async_set_plant(store.plant)

    if not hass.data.get(_DATA_STATIC):
        # static paths cannot be unregistered, so only do this once per HA run
        await hass.http.async_register_static_paths(
            [StaticPathConfig(FRONTEND_URL_BASE, str(Path(__file__).parent / "frontend"), False)]
        )
        hass.data[_DATA_STATIC] = True

    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_WEBCOMPONENT,
        sidebar_title=entry.options.get("sidebar_title") or NAME,
        sidebar_icon=PANEL_ICON,
        module_url=f"{FRONTEND_URL_BASE}/{FRONTEND_FILE}?v={VERSION}",
        require_admin=False,
        config={"version": VERSION},
    )
    entry.async_on_unload(entry.add_update_listener(_async_options_updated))
    return True


async def _async_options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
    runtime: CopilotRuntime | None = hass.data.pop(DOMAIN, None)
    if runtime:
        runtime.messages.async_shutdown()
    return True

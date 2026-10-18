"""WebSocket API used by the COPilot panel."""

from __future__ import annotations

import json
from typing import TYPE_CHECKING, Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from . import adapters
from .const import DOMAIN, PLANT_MAX_BYTES, SOURCE_EMS_ESP, VERSION
from .store import IconError

if TYPE_CHECKING:
    from . import CopilotRuntime


def _runtime(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> CopilotRuntime | None:
    runtime = hass.data.get(DOMAIN)
    if runtime is None:
        connection.send_error(msg["id"], "not_loaded", "COPilot is not set up")
    return runtime


@callback
def async_register(hass: HomeAssistant) -> None:
    for handler in (
        ws_config_get,
        ws_config_save,
        ws_config_subscribe,
        ws_mapping_scan,
        ws_icons_list,
        ws_icons_upload,
        ws_icons_delete,
        ws_messages_list,
        ws_messages_subscribe,
        ws_messages_clear,
        ws_backups_list,
        ws_backups_restore,
        ws_write,
    ):
        websocket_api.async_register_command(hass, handler)


@websocket_api.websocket_command({vol.Required("type"): "copilot/config/get"})
@websocket_api.async_response
async def ws_config_get(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (rt := _runtime(hass, connection, msg)) is None:
        return
    connection.send_result(
        msg["id"],
        {
            "version": VERSION,
            "plant": rt.store.plant,
            "rev": rt.store.rev,
            "options": dict(rt.entry.options),
            "is_admin": connection.user.is_admin,
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "copilot/config/save",
        vol.Required("plant"): dict,
        # revision the plant was based on; omitted by old clients, which then always save
        vol.Optional("rev"): int,
    }
)
@websocket_api.async_response
async def ws_config_save(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (rt := _runtime(hass, connection, msg)) is None:
        return
    plant = msg["plant"]
    if len(json.dumps(plant)) > PLANT_MAX_BYTES:
        connection.send_error(msg["id"], "too_large", "Plant configuration too large")
        return
    if not isinstance(plant.get("components"), list) or not isinstance(plant.get("pipes", []), list):
        connection.send_error(msg["id"], "invalid", "components and pipes must be lists")
        return
    if "rev" in msg and msg["rev"] != rt.store.rev:
        connection.send_error(msg["id"], "conflict", "The plant was changed elsewhere in the meantime")
        return
    await rt.store.async_save_plant(plant)
    rt.messages.async_set_plant(plant)
    connection.send_result(msg["id"], {"saved": True, "rev": rt.store.rev})


@websocket_api.websocket_command({vol.Required("type"): "copilot/config/subscribe"})
@websocket_api.async_response
async def ws_config_subscribe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Push the plant after every save; the current state is sent right away (also after a reconnect)."""
    if (rt := _runtime(hass, connection, msg)) is None:
        return

    @callback
    def forward(plant: dict[str, Any] | None, rev: int) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], {"plant": plant, "rev": rev}))

    connection.subscriptions[msg["id"]] = rt.store.async_subscribe(forward)
    connection.send_result(msg["id"])
    forward(rt.store.plant, rt.store.rev)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "copilot/mapping/scan",
        vol.Optional("source", default=SOURCE_EMS_ESP): vol.In(adapters.SOURCES),
        vol.Optional("plant"): dict,
    }
)
@websocket_api.async_response
async def ws_mapping_scan(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (rt := _runtime(hass, connection, msg)) is None:
        return
    plant = msg.get("plant") or rt.store.plant
    connection.send_result(msg["id"], adapters.async_scan(hass, msg["source"], plant, dict(rt.entry.options)))


@websocket_api.websocket_command({vol.Required("type"): "copilot/icons/list"})
@websocket_api.async_response
async def ws_icons_list(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (rt := _runtime(hass, connection, msg)) is None:
        return
    connection.send_result(msg["id"], {"icons": await rt.store.async_list_icons()})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "copilot/icons/upload",
        vol.Required("name"): str,
        vol.Required("mime"): str,
        vol.Required("data"): str,
        vol.Optional("iso", default=False): bool,
    }
)
@websocket_api.async_response
async def ws_icons_upload(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (rt := _runtime(hass, connection, msg)) is None:
        return
    try:
        icon = await rt.store.async_add_icon(msg["name"], msg["mime"], msg["data"], msg["iso"])
    except IconError as err:
        connection.send_error(msg["id"], str(err), str(err))
        return
    connection.send_result(msg["id"], {"icon": icon})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "copilot/icons/delete", vol.Required("icon_id"): str}
)
@websocket_api.async_response
async def ws_icons_delete(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (rt := _runtime(hass, connection, msg)) is None:
        return
    connection.send_result(msg["id"], {"deleted": await rt.store.async_delete_icon(msg["icon_id"])})


@websocket_api.websocket_command({vol.Required("type"): "copilot/messages/list"})
@websocket_api.async_response
async def ws_messages_list(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (rt := _runtime(hass, connection, msg)) is None:
        return
    connection.send_result(msg["id"], {"messages": rt.messages.async_list()})


@websocket_api.websocket_command({vol.Required("type"): "copilot/messages/subscribe"})
@websocket_api.async_response
async def ws_messages_subscribe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (rt := _runtime(hass, connection, msg)) is None:
        return

    @callback
    def forward(message: dict[str, Any]) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], {"message": message}))

    connection.subscriptions[msg["id"]] = rt.messages.async_subscribe(forward)
    connection.send_result(msg["id"])


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "copilot/messages/clear"})
@websocket_api.async_response
async def ws_messages_clear(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (rt := _runtime(hass, connection, msg)) is None:
        return
    rt.messages.async_clear()
    connection.send_result(msg["id"], {"cleared": True})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "copilot/backups/list"})
@websocket_api.async_response
async def ws_backups_list(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (rt := _runtime(hass, connection, msg)) is None:
        return
    connection.send_result(msg["id"], {"backups": rt.store.list_backups()})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "copilot/backups/restore", vol.Required("ts"): vol.Coerce(float)})
@websocket_api.async_response
async def ws_backups_restore(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (rt := _runtime(hass, connection, msg)) is None:
        return
    plant = await rt.store.async_restore_backup(msg["ts"])
    if plant is None:
        connection.send_error(msg["id"], "not_found", "Backup not found")
        return
    rt.messages.async_set_plant(plant)
    connection.send_result(msg["id"], {"plant": plant, "rev": rt.store.rev})


# domains that can be written, and how
_NUMBER = ("number", "input_number")
_SELECT = ("select", "input_select")
_SWITCH = ("switch", "input_boolean")
_BUTTON = ("button", "input_button")


@websocket_api.websocket_command(
    {
        vol.Required("type"): "copilot/write",
        vol.Required("component_id"): str,
        vol.Required("slot"): str,
        vol.Optional("value"): vol.Any(str, int, float, bool, None),
    }
)
@websocket_api.async_response
async def ws_write(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Change a value the plant explicitly marks as writable."""
    if (rt := _runtime(hass, connection, msg)) is None:
        return
    plant = rt.store.plant or {}
    settings = plant.get("settings") or {}
    if not connection.user.is_admin and not settings.get("write_non_admin"):
        connection.send_error(msg["id"], "unauthorized", "Only administrators may change values")
        return
    component = next((c for c in plant.get("components", []) if c.get("id") == msg["component_id"]), None)
    slot = msg["slot"]
    if component is None or slot not in (component.get("writable") or []):
        connection.send_error(msg["id"], "not_writable", "This value is not released for writing")
        return
    entity_id = (component.get("bindings") or {}).get(slot)
    state = hass.states.get(entity_id) if entity_id else None
    if state is None:
        connection.send_error(msg["id"], "no_entity", "The value is not bound to an available entity")
        return
    domain = entity_id.split(".", 1)[0]
    value = msg.get("value")
    old = state.state
    try:
        if domain in _NUMBER:
            number = float(value)  # type: ignore[arg-type]
            lo = float(state.attributes.get("min", number))
            hi = float(state.attributes.get("max", number))
            if not lo <= number <= hi:
                raise ValueError(f"{number} outside {lo}…{hi}")
            await hass.services.async_call(domain, "set_value", {"entity_id": entity_id, "value": number}, blocking=True, context=connection.context(msg))
            new = number
        elif domain in _SELECT:
            if value not in (state.attributes.get("options") or []):
                raise ValueError(f"{value} is not an option")
            await hass.services.async_call(domain, "select_option", {"entity_id": entity_id, "option": value}, blocking=True, context=connection.context(msg))
            new = value
        elif domain in _SWITCH:
            on = value in (True, "on", "true", 1)
            await hass.services.async_call(domain, "turn_on" if on else "turn_off", {"entity_id": entity_id}, blocking=True, context=connection.context(msg))
            new = "on" if on else "off"
        elif domain in _BUTTON:
            await hass.services.async_call(domain, "press", {"entity_id": entity_id}, blocking=True, context=connection.context(msg))
            new = "pressed"
        else:
            connection.send_error(msg["id"], "unsupported", f"Entities of domain {domain} cannot be written")
            return
    except (ValueError, TypeError) as err:
        connection.send_error(msg["id"], "invalid_value", str(err))
        return
    rt.messages.async_log(
        "info",
        "value_changed",
        {
            "component": component.get("label") or component.get("type"),
            "type": component.get("type"),
            "slot": slot,
            "old": old,
            "new": new,
            "user": connection.user.name,
        },
        component.get("id"),
    )
    connection.send_result(msg["id"], {"old": old, "new": new})

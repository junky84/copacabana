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
        ws_mapping_scan,
        ws_icons_list,
        ws_icons_upload,
        ws_icons_delete,
        ws_messages_list,
        ws_messages_subscribe,
        ws_messages_clear,
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
            "options": dict(rt.entry.options),
            "is_admin": connection.user.is_admin,
        },
    )


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "copilot/config/save", vol.Required("plant"): dict}
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
    await rt.store.async_save_plant(plant)
    rt.messages.async_set_plant(plant)
    connection.send_result(msg["id"], {"saved": True})


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

"""Setup, websocket API and message engine tests."""

import base64

from pytest_homeassistant_custom_component.common import MockConfigEntry

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er

from custom_components.copilot.const import DOMAIN, EVENT_MESSAGE

PLANT = {
    "version": 1,
    "components": [
        {
            "id": "iu",
            "type": "indoor_unit",
            "label": "Inneneinheit",
            "props": {"input_labels": {"input1": "§14a"}},
            "bindings": {"pressure": "sensor.press", "input1": "binary_sensor.in1", "last_error": "sensor.lastcode"},
        },
        {"id": "ou", "type": "outdoor_unit", "label": "Außeneinheit", "bindings": {"activity": "sensor.activity"}},
        {"id": "ww", "type": "dhw_tank", "label": "WW", "bindings": {"charging": "binary_sensor.charging"}},
    ],
    "pipes": [],
}


async def _setup(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(domain=DOMAIN, options={"source": "ems_esp", "mqtt_base": "ems-esp"})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_setup_registers_panel_and_unloads(hass: HomeAssistant) -> None:
    entry = await _setup(hass)
    assert entry.state is ConfigEntryState.LOADED
    assert "copilot" in hass.data["frontend_panels"]
    extra = hass.data["frontend_extra_module_url"]
    assert any("copilot-panel.js" in url for url in extra.urls)
    assert await hass.config_entries.async_unload(entry.entry_id)
    assert "copilot" not in hass.data["frontend_panels"]
    assert not any("copilot-panel.js" in url for url in extra.urls)


async def test_config_roundtrip(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    ws = await hass_ws_client(hass)
    await ws.send_json({"id": 1, "type": "copilot/config/get"})
    res = await ws.receive_json()
    assert res["success"] and res["result"]["plant"] is None
    await ws.send_json({"id": 2, "type": "copilot/config/save", "plant": PLANT})
    assert (await ws.receive_json())["success"]
    await ws.send_json({"id": 3, "type": "copilot/config/get"})
    res = await ws.receive_json()
    assert res["result"]["plant"]["components"][0]["id"] == "iu"
    await ws.send_json({"id": 4, "type": "copilot/config/save", "plant": {"components": "x"}})
    assert not (await ws.receive_json())["success"]


async def test_mapping_scan(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    registry = er.async_get(hass)
    registry.async_get_or_create("sensor", "mqtt", "boiler_hptc1", suggested_object_id="boiler_hptc1")
    ws = await hass_ws_client(hass)
    await ws.send_json({"id": 1, "type": "copilot/mapping/scan", "plant": PLANT})
    res = (await ws.receive_json())["result"]
    assert res["entity_count"] == 1
    assert res["suggestions"][0]["entity_id"] == "sensor.boiler_hptc1"


async def test_icons(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    ws = await hass_ws_client(hass)
    svg = base64.b64encode(b'<svg xmlns="http://www.w3.org/2000/svg"><circle r="4"/></svg>').decode()
    await ws.send_json({"id": 1, "type": "copilot/icons/upload", "name": "Pumpe", "mime": "image/svg+xml", "data": svg})
    res = await ws.receive_json()
    assert res["success"], res
    icon_id = res["result"]["icon"]["id"]
    bad = base64.b64encode(b'<svg onload="alert(1)"></svg>').decode()
    await ws.send_json({"id": 2, "type": "copilot/icons/upload", "name": "x", "mime": "image/svg+xml", "data": bad})
    res = await ws.receive_json()
    assert not res["success"] and res["error"]["code"] == "unsafe_svg"
    await ws.send_json({"id": 3, "type": "copilot/icons/list"})
    icons = (await ws.receive_json())["result"]["icons"]
    assert icons[0]["data_url"].startswith("data:image/svg+xml;base64,")
    await ws.send_json({"id": 4, "type": "copilot/icons/delete", "icon_id": icon_id})
    assert (await ws.receive_json())["result"]["deleted"]


async def test_message_rules(hass: HomeAssistant, hass_ws_client) -> None:
    hass.states.async_set("sensor.press", "1.6")
    hass.states.async_set("binary_sensor.in1", "off")
    hass.states.async_set("sensor.lastcode", "A01(5455) 23.01.2023")
    hass.states.async_set("sensor.activity", "Heizen")
    hass.states.async_set("binary_sensor.charging", "off")
    await _setup(hass)
    events = []
    hass.bus.async_listen(EVENT_MESSAGE, callback(lambda e: events.append(e.data)))

    ws = await hass_ws_client(hass)
    await ws.send_json({"id": 1, "type": "copilot/config/save", "plant": PLANT})
    assert (await ws.receive_json())["success"]
    await ws.send_json({"id": 2, "type": "copilot/messages/subscribe"})
    assert (await ws.receive_json())["success"]
    # initial old error code must not alarm
    assert events == []

    hass.states.async_set("sensor.activity", "Abtauen")
    hass.states.async_set("binary_sensor.in1", "on")
    hass.states.async_set("sensor.press", "0.8")
    hass.states.async_set("sensor.lastcode", "A11(1037) 16.10.2026")
    await hass.async_block_till_done()
    keys = [e["key"] for e in events]
    assert keys == ["defrost", "input_active", "pressure_low", "error_code"]
    assert events[1]["params"]["label"] == "§14a"
    pushed = await ws.receive_json()
    assert pushed["event"]["message"]["key"] == "defrost"

    hass.states.async_set("sensor.activity", "Heizen")
    await hass.async_block_till_done()
    await ws.send_json({"id": 3, "type": "copilot/messages/list"})
    while (res := await ws.receive_json()).get("id") != 3:
        pass
    defrost = next(m for m in res["result"]["messages"] if m["key"] == "defrost")
    assert defrost["active"] is False and defrost["end_ts"]

    # repeated state does not create duplicates
    hass.states.async_set("binary_sensor.in1", "on", {"x": 1})
    await hass.async_block_till_done()
    assert [e["key"] for e in events].count("input_active") == 1


async def test_takes_over_copilot_data(hass: HomeAssistant, hass_ws_client, hass_storage) -> None:
    hass_storage["copilot.plant"] = {"version": 1, "minor_version": 1, "key": "copilot.plant", "data": {"plant": PLANT}}
    await _setup(hass)
    ws = await hass_ws_client(hass)
    await ws.send_json({"id": 1, "type": "copilot/config/get"})
    res = await ws.receive_json()
    assert res["result"]["plant"]["components"][0]["id"] == "iu"
    assert hass_storage["copilot.plant"]["data"]["plant"]["components"][0]["id"] == "iu"

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


async def test_save_with_stale_rev_is_rejected(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    ws = await hass_ws_client(hass)
    await ws.send_json({"id": 1, "type": "copilot/config/get"})
    rev = (await ws.receive_json())["result"]["rev"]
    await ws.send_json({"id": 2, "type": "copilot/config/save", "plant": PLANT, "rev": rev})
    res = await ws.receive_json()
    assert res["success"] and res["result"]["rev"] == rev + 1
    # a second window still based on the old revision must not overwrite the newer plant
    stale = {**PLANT, "settings": {"typeIcons": {}}}
    await ws.send_json({"id": 3, "type": "copilot/config/save", "plant": stale, "rev": rev})
    res = await ws.receive_json()
    assert not res["success"] and res["error"]["code"] == "conflict"
    await ws.send_json({"id": 4, "type": "copilot/config/get"})
    res = (await ws.receive_json())["result"]
    assert res["rev"] == rev + 1 and "settings" not in res["plant"]
    # clients without a revision keep saving as before
    await ws.send_json({"id": 5, "type": "copilot/config/save", "plant": stale})
    res = await ws.receive_json()
    assert res["success"] and res["result"]["rev"] == rev + 2


async def test_rev_survives_restart(hass: HomeAssistant, hass_storage) -> None:
    hass_storage["copilot.plant"] = {"version": 1, "minor_version": 1, "key": "copilot.plant", "data": {"plant": PLANT, "rev": 41}}
    await _setup(hass)
    assert hass.data[DOMAIN].store.rev == 41


async def test_config_subscribe_pushes_saves(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    viewer = await hass_ws_client(hass)
    editor = await hass_ws_client(hass)
    await viewer.send_json({"id": 1, "type": "copilot/config/subscribe"})
    assert (await viewer.receive_json())["success"]
    # the current state comes right away
    first = await viewer.receive_json()
    assert first["type"] == "event" and first["event"] == {"plant": None, "rev": 0}
    await editor.send_json({"id": 1, "type": "copilot/config/save", "plant": PLANT, "rev": 0})
    assert (await editor.receive_json())["success"]
    ev = await viewer.receive_json()
    assert ev["id"] == 1 and ev["event"]["rev"] == 1
    assert ev["event"]["plant"]["components"][0]["id"] == "iu"
    # a restored backup is pushed as well
    await editor.send_json({"id": 2, "type": "copilot/config/save", "plant": {**PLANT, "pipes": [{"id": "p"}]}})
    assert (await editor.receive_json())["success"]
    assert (await viewer.receive_json())["event"]["rev"] == 2
    await editor.send_json({"id": 3, "type": "copilot/backups/list"})
    ts = (await editor.receive_json())["result"]["backups"][0]["ts"]
    await editor.send_json({"id": 4, "type": "copilot/backups/restore", "ts": ts})
    res = await editor.receive_json()
    assert res["success"] and res["result"]["rev"] == 3
    ev = await viewer.receive_json()
    assert ev["event"]["rev"] == 3 and ev["event"]["plant"]["pipes"] == []
    # unsubscribing stops the pushes
    await viewer.send_json({"id": 2, "type": "unsubscribe_events", "subscription": 1})
    assert (await viewer.receive_json())["success"]
    assert hass.data[DOMAIN].store._listeners == []


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



async def test_saves_keep_backups_and_restore(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    ws = await hass_ws_client(hass)
    moved = {**PLANT, "components": [{**PLANT["components"][0], "x": 7, "y": 3}, *PLANT["components"][1:]]}
    await ws.send_json({"id": 1, "type": "copilot/config/save", "plant": PLANT})
    assert (await ws.receive_json())["success"]
    await ws.send_json({"id": 2, "type": "copilot/config/save", "plant": moved})
    assert (await ws.receive_json())["success"]
    await ws.send_json({"id": 3, "type": "copilot/backups/list"})
    backups = (await ws.receive_json())["result"]["backups"]
    assert len(backups) == 1 and backups[0]["reason"] == "save" and backups[0]["components"] == 3
    await ws.send_json({"id": 4, "type": "copilot/backups/restore", "ts": backups[0]["ts"]})
    res = await ws.receive_json()
    assert res["success"] and "x" not in res["result"]["plant"]["components"][0]
    await ws.send_json({"id": 5, "type": "copilot/config/get"})
    assert "x" not in (await ws.receive_json())["result"]["plant"]["components"][0]
    # the moved layout is a backup now, so restoring can be undone
    await ws.send_json({"id": 6, "type": "copilot/backups/list"})
    assert (await ws.receive_json())["result"]["backups"][0]["reason"] == "restore"


async def test_update_keeps_a_backup(hass: HomeAssistant, hass_ws_client, hass_storage) -> None:
    hass_storage["copilot.plant"] = {"version": 1, "minor_version": 1, "key": "copilot.plant", "data": {"plant": PLANT}}
    hass_storage["copilot.backups"] = {"version": 1, "minor_version": 1, "key": "copilot.backups", "data": {"last_version": "0.0.1", "backups": []}}
    await _setup(hass)
    ws = await hass_ws_client(hass)
    await ws.send_json({"id": 1, "type": "copilot/backups/list"})
    backups = (await ws.receive_json())["result"]["backups"]
    assert backups[0]["reason"] == "update" and backups[0]["version"] == "0.0.1"
    await ws.send_json({"id": 2, "type": "copilot/config/get"})
    assert (await ws.receive_json())["result"]["plant"] == PLANT


async def test_maintenance_due_message(hass: HomeAssistant, hass_ws_client) -> None:
    import time as _time

    await _setup(hass)
    ws = await hass_ws_client(hass)
    tasks = [
        {"id": "sep", "key": "separator", "interval_days": 180, "last_done": _time.time() - 200 * 86400},
        {"id": "mag", "key": "expansion", "interval_days": 365, "last_done": _time.time() - 10 * 86400},
        {"id": "new", "key": "service", "interval_days": 365},
    ]
    plant = {**PLANT, "settings": {"maintenance": {"tasks": tasks}}}
    await ws.send_json({"id": 1, "type": "copilot/config/save", "plant": plant})
    assert (await ws.receive_json())["success"]
    await ws.send_json({"id": 2, "type": "copilot/messages/list"})
    msgs = (await ws.receive_json())["result"]["messages"]
    due = [m for m in msgs if m["key"] == "maintenance_due" and m["active"]]
    assert len(due) == 1 and due[0]["params"]["task_key"] == "separator" and due[0]["params"]["since"] == 20
    # marking the task done closes the message
    tasks[0]["last_done"] = _time.time()
    await ws.send_json({"id": 3, "type": "copilot/config/save", "plant": {**PLANT, "settings": {"maintenance": {"tasks": tasks}}}})
    assert (await ws.receive_json())["success"]
    await ws.send_json({"id": 4, "type": "copilot/messages/list"})
    msgs = (await ws.receive_json())["result"]["messages"]
    assert not [m for m in msgs if m["key"] == "maintenance_due" and m["active"]]
    # only the first save (PLANT → PLANT with tasks) is not a layout change either: no backups
    await ws.send_json({"id": 5, "type": "copilot/backups/list"})
    assert (await ws.receive_json())["result"]["backups"] == []


async def test_write_only_released_values(hass: HomeAssistant, hass_ws_client) -> None:
    from homeassistant.setup import async_setup_component

    assert await async_setup_component(hass, "input_number", {"input_number": {"dhw_set": {"min": 40, "max": 60, "step": 1, "initial": 50}}})
    await _setup(hass)
    ws = await hass_ws_client(hass)
    plant = {
        **PLANT,
        "components": [
            {"id": "ww", "type": "dhw_tank", "label": "WW", "bindings": {"setpoint": "input_number.dhw_set", "temp_top": "input_number.dhw_set"}, "writable": ["setpoint"]},
        ],
    }
    await ws.send_json({"id": 1, "type": "copilot/config/save", "plant": plant})
    assert (await ws.receive_json())["success"]
    # released slot: written and logged
    await ws.send_json({"id": 2, "type": "copilot/write", "component_id": "ww", "slot": "setpoint", "value": 55})
    res = await ws.receive_json()
    assert res["success"] and res["result"]["new"] == 55
    assert float(hass.states.get("input_number.dhw_set").state) == 55
    await ws.send_json({"id": 3, "type": "copilot/messages/list"})
    msgs = (await ws.receive_json())["result"]["messages"]
    assert any(m["key"] == "value_changed" and m["params"]["new"] == 55 for m in msgs)
    # out of range and not released slots are refused
    await ws.send_json({"id": 4, "type": "copilot/write", "component_id": "ww", "slot": "setpoint", "value": 80})
    assert (await ws.receive_json())["error"]["code"] == "invalid_value"
    await ws.send_json({"id": 5, "type": "copilot/write", "component_id": "ww", "slot": "temp_top", "value": 45})
    assert (await ws.receive_json())["error"]["code"] == "not_writable"
    assert float(hass.states.get("input_number.dhw_set").state) == 55

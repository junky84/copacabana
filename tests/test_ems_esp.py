"""EMS-ESP adapter tests."""

from types import SimpleNamespace

from custom_components.copilot.adapters.ems_esp import (
    EmsKey,
    collect_entities,
    parse_unique_id,
    suggest_bindings,
)


def test_parse_single_short():
    assert parse_unique_id("boiler_hptc1") == EmsKey("boiler", None, "hptc1")
    assert parse_unique_id("boiler_dhw_curtemp") == EmsKey("boiler", "dhw", "curtemp")
    assert parse_unique_id("thermostat_hc1_seltemp") == EmsKey("thermostat", "hc1", "seltemp")
    assert parse_unique_id("boiler_dhwprio") == EmsKey("boiler", None, "dhwprio")


def test_parse_multi_and_legacy():
    assert parse_unique_id("ems-esp_boiler_hptc0", "ems-esp") == EmsKey("boiler", None, "hptc0")
    # unknown base name is stripped automatically
    assert parse_unique_id("keller_boiler_hptc0") == EmsKey("boiler", None, "hptc0")
    # 3.6 legacy format: dhw values prefixed with ww
    assert parse_unique_id("boiler_wwcurtemp") == EmsKey("boiler", "dhw", "curtemp")
    assert parse_unique_id("boiler_dhw1_curtemp") == EmsKey("boiler", "dhw", "curtemp")


def test_parse_rejects_foreign():
    assert parse_unique_id("solax_grid_power") is None
    assert parse_unique_id("thermostat_hc1") is None


def _entry(entity_id, unique_id, platform="mqtt", disabled=None):
    return SimpleNamespace(entity_id=entity_id, unique_id=unique_id, platform=platform, disabled_by=disabled)


def test_collect_and_suggest():
    entries = [
        _entry("sensor.boiler_hptc1", "boiler_hptc1"),
        _entry("sensor.boiler_curflowtemp", "boiler_curflowtemp"),
        _entry("sensor.boiler_outdoortemp", "boiler_outdoortemp"),
        _entry("sensor.boiler_dhw_curtemp", "boiler_dhw_curtemp"),
        _entry("binary_sensor.boiler_dhw_charging", "boiler_dhw_charging"),
        _entry("sensor.thermostat_hc1_currtemp", "thermostat_hc1_currtemp"),
        _entry("sensor.thermostat_hc2_currtemp", "thermostat_hc2_currtemp"),
        _entry("sensor.other", "boiler_hptc0", platform="template"),
        _entry("sensor.boiler_hptc3", "boiler_hptc3", disabled="user"),
    ]
    entities = collect_entities(entries, None)
    assert EmsKey("boiler", None, "hptc0") not in entities
    assert EmsKey("boiler", None, "hptc3") not in entities
    plant = {
        "components": [
            {"id": "iu", "type": "indoor_unit"},
            {"id": "ou", "type": "outdoor_unit"},
            {"id": "ww", "type": "dhw_tank"},
            {"id": "hk2", "type": "radiators", "props": {"circuit": 2}},
        ]
    }
    got = {(s["component_id"], s["slot"]): s for s in suggest_bindings(plant, entities)}
    assert got[("iu", "supply_temp")]["entity_id"] == "sensor.boiler_hptc1"
    assert got[("iu", "supply_temp")]["confidence"] == "high"
    assert got[("ou", "outdoor_temp")]["entity_id"] == "sensor.boiler_outdoortemp"
    assert got[("ww", "temp_top")]["entity_id"] == "sensor.boiler_dhw_curtemp"
    assert got[("ww", "charging")]["entity_id"] == "binary_sensor.boiler_dhw_charging"
    assert got[("hk2", "room_temp")]["entity_id"] == "sensor.thermostat_hc2_currtemp"
    assert ("iu", "return_temp") not in got


def test_suggest_falls_back_to_second_candidate():
    entities = {EmsKey("boiler", None, "curflowtemp"): "sensor.boiler_curflowtemp"}
    got = suggest_bindings({"components": [{"id": "iu", "type": "indoor_unit"}]}, entities)
    assert got == [
        {
            "component_id": "iu",
            "slot": "supply_temp",
            "entity_id": "sensor.boiler_curflowtemp",
            "source_key": "boiler/curflowtemp",
            "confidence": "medium",
        }
    ]

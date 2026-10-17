"""EMS-ESP adapter: maps EMS-ESP MQTT-discovery entities onto plant components.

EMS-ESP (https://emsesp.org) publishes Home Assistant discovery configs whose
``uniq_id`` encodes device, optional tag (hc1, dhw, ...) and the EMS-ESP
short name, for example ``boiler_hptc1``, ``boiler_dhw_curtemp`` or, with the
"multiple instances" entity format, ``ems-esp_boiler_hptc1``. The legacy 3.6
format writes DHW values as ``boiler_wwcurtemp``. The very old 3.4 long-name
format is not supported.

The short names below were taken from the EMS-ESP v3.8.6 sources
(``src/devices/boiler.cpp`` and ``thermostat.cpp``).
"""

from __future__ import annotations

from collections.abc import Iterable
from dataclasses import dataclass
import re
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

DEVICES = (
    "boiler",
    "thermostat",
    "heatpump",
    "mixer",
    "solar",
    "water",
    "ventilation",
    "extension",
    "gateway",
    "connect",
    "alert",
    "pool",
    "controller",
    "switch",
)

_TAG_RE = r"hc\d+|dhw\d*|ahs\d*|hs\d+"
# devices whose names are distinctive enough to find behind an unknown MQTT base
_FALLBACK_DEVICES = ("boiler", "thermostat", "heatpump", "mixer", "solar")
_BASE_RE = re.compile(r"(?!0x)[a-z][a-z0-9-]*(?:_[a-z0-9-]+)?")
_KEY_RE = re.compile(
    rf"^(?P<device>{'|'.join(DEVICES)})_(?:(?P<tag>{_TAG_RE})_)?(?P<short>[a-z0-9]+)$"
)

# DHW short names that the legacy "single instance, 3.6" format prefixes with "ww".
_DHW_SHORTS = {
    "curtemp", "curtemp2", "settemp", "seltemp", "charging", "onetime",
    "disinfecting", "circ", "3wayvalve", "nrg", "nrgsupp", "nrgconscomp",
    "storagetemp1", "storagetemp2", "curflow", "active", "tempok", "recharging",
    "starts", "workm", "chargepump", "mixertemp", "cylmiddletemp",
}


@dataclass(frozen=True, slots=True)
class EmsKey:
    """Device / tag / short name triple of an EMS-ESP value."""

    device: str
    tag: str | None
    short: str

    def __str__(self) -> str:
        return "/".join(p for p in (self.device, self.tag, self.short) if p)


def parse_unique_id(unique_id: str, base: str | None = None) -> EmsKey | None:
    """Parse an EMS-ESP unique_id into an EmsKey, or None if it is not one."""
    uid = unique_id.lower()
    if base:
        prefix = base.lower().replace("/", "_") + "_"
        if uid.startswith(prefix):
            uid = uid[len(prefix):]
    match = _KEY_RE.match(uid)
    if match is None:
        # unknown basename: strip everything up to the first core EMS device word.
        # Only plain names qualify as a base (no Zigbee IEEE addresses such as 0x…).
        for device in _FALLBACK_DEVICES:
            idx = uid.find(f"_{device}_")
            if idx > 0 and _BASE_RE.fullmatch(uid[:idx]):
                match = _KEY_RE.match(uid[idx + 1:])
                if match:
                    break
    if match is None:
        return None
    if uid.endswith(("_zigbee2mqtt", "_z2m")):
        return None
    device, tag, short = match.group("device"), match.group("tag"), match.group("short")
    if tag is None and re.fullmatch(_TAG_RE, short):
        return None  # climate / water_heater entity of a circuit, not a value
    if tag is None and device == "boiler" and short.startswith("ww") and short[2:] in _DHW_SHORTS:
        tag, short = "dhw", short[2:]
    if tag == "dhw1":
        tag = "dhw"
    return EmsKey(device, tag, short)


# Candidate EMS-ESP values per (component type, role, slot), best first.
# Tags may contain "{hc}" (heating circuit) or "{dhw}" (DHW circuit) placeholders.
Cand = tuple[str, str | None, str]

RULES: dict[tuple[str, str | None], dict[str, list[Cand]]] = {
    ("outdoor_unit", None): {
        "outdoor_temp": [("boiler", None, "outdoortemp"), ("thermostat", None, "dampedoutdoortemp")],
        "air_in_temp": [("boiler", None, "hptl2")],
        "activity": [("boiler", None, "hpactivity")],
        "compressor_on": [("boiler", None, "hpcompon")],
        "compressor_speed": [("boiler", None, "hpcompspd")],
        "fan_speed": [("boiler", None, "fanspd"), ("boiler", None, "fan")],
        "heat_power": [("boiler", None, "hppower")],
        "el_power": [("boiler", None, "hpcurrpower")],
        "compressor_starts": [("boiler", None, "totalcompstarts")],
        "evap_in_temp": [("boiler", None, "hptr4")],
        "comp_out_temp": [("boiler", None, "hptr6")],
        "comp_in_temp": [("boiler", None, "hptr5")],
        "hp_temp": [("boiler", None, "hpph1")],
        "lp_temp": [("boiler", None, "hppl1")],
        "drain_pan_temp": [("boiler", None, "hpta4")],
        "silent_mode": [("boiler", None, "silentmode")],
    },
    ("indoor_unit", None): {
        "supply_temp": [("boiler", None, "hptc1"), ("boiler", None, "curflowtemp")],
        "return_temp": [("boiler", None, "hptc0"), ("boiler", None, "rettemp")],
        "condenser_temp": [("boiler", None, "hptc3")],
        "target_flow_temp": [("boiler", None, "selflowtemp")],
        "pressure": [("boiler", None, "syspress")],
        "flow": [("boiler", None, "pc0flow")],
        "aux_level": [("boiler", None, "auxheaterlevel")],
        "aux_status": [("boiler", None, "auxheaterstatus")],
        "aux_step1": [("boiler", None, "elheatstep1")],
        "aux_step2": [("boiler", None, "elheatstep2")],
        "aux_step3": [("boiler", None, "elheatstep3")],
        "service_code": [("boiler", None, "servicecode")],
        "service_code_number": [("boiler", None, "servicecodenumber")],
        "last_error": [("boiler", None, "lastcode")],
        "input1": [("boiler", None, "hpin1")],
        "input2": [("boiler", None, "hpin2")],
        "input3": [("boiler", None, "hpin3")],
        "input4": [("boiler", None, "hpin4")],
        "el_energy_total": [("boiler", None, "nrgconstotal"), ("boiler", None, "metertotal")],
        "el_energy_heating": [("boiler", None, "nrgconscompheating"), ("boiler", None, "meterheat")],
        "el_energy_dhw": [("boiler", "dhw", "nrgconscomp"), ("boiler", "dhw", "meter")],
        "heat_energy_total": [("boiler", None, "nrgsupptotal"), ("boiler", None, "nrgtotal")],
        "heat_energy_heating": [("boiler", None, "nrgsuppheating"), ("boiler", None, "nrgheat")],
        "heat_energy_dhw": [("boiler", "dhw", "nrgsupp"), ("boiler", "dhw", "nrg")],
        "aux_energy_total": [("boiler", None, "auxelecheatnrgconstotal"), ("boiler", None, "metereheat")],
        "uptime_total": [("boiler", None, "uptimetotal")],
        "heating_active": [("boiler", None, "heatingactive"), ("boiler", None, "hpheatingon")],
        "dhw_active": [("boiler", None, "tapwateractive"), ("boiler", "dhw", "hpdhwon")],
    },
    ("pump", "primary"): {
        "running": [("boiler", None, "heatingpump"), ("boiler", None, "primepump")],
        "speed": [("boiler", None, "primepumpmod"), ("boiler", None, "heatingpumpmod")],
        "flow": [("boiler", None, "pc0flow")],
    },
    ("pump", "secondary"): {
        "flow": [("boiler", None, "pc1flow")],
    },
    ("pump", "circulation"): {
        "running": [("boiler", "{dhw}", "circ"), ("thermostat", "{dhw}", "circ")],
    },
    ("pump", "hc"): {
        "running": [("mixer", "{hc}", "pumpstatus")],
    },
    ("valve_3way", "dhw_switch"): {
        "position": [("boiler", "{dhw}", "3wayvalve"), ("boiler", None, "hpswitchvalve"), ("boiler", None, "hp3way")],
    },
    ("buffer", None): {
        "temp_top": [("boiler", None, "headertemp")],
    },
    ("dhw_tank", None): {
        "temp_top": [("boiler", "{dhw}", "curtemp"), ("boiler", None, "hptw1")],
        "temp_bottom": [("boiler", "{dhw}", "curtemp2"), ("boiler", "{dhw}", "storagetemp2")],
        "setpoint": [("boiler", "{dhw}", "settemp"), ("boiler", "{dhw}", "seltemp")],
        "charging": [("boiler", "{dhw}", "charging")],
        "onetime": [("boiler", "{dhw}", "onetime"), ("thermostat", "{dhw}", "onetime")],
        "disinfecting": [("boiler", "{dhw}", "disinfecting")],
    },
    ("heating_circuit", None): {
        "target_flow_temp": [("thermostat", "{hc}", "targetflowtemp")],
        "room_temp": [("thermostat", "{hc}", "currtemp")],
        "room_setpoint": [("thermostat", "{hc}", "seltemp")],
        "mode": [("thermostat", "{hc}", "mode")],
        "summer_mode": [("thermostat", "{hc}", "summermode")],
        "operating_state": [("thermostat", "{hc}", "hpoperatingstate")],
        "design_temp": [("thermostat", "{hc}", "designtemp")],
        "offset_temp": [("thermostat", "{hc}", "offsettemp")],
        "min_flow_temp": [("thermostat", "{hc}", "minflowtemp")],
        "max_flow_temp": [("thermostat", "{hc}", "maxflowtemp")],
    },
    ("mixer", None): {
        "position": [("mixer", "{hc}", "valvestatus")],
        "flow_temp": [("mixer", "{hc}", "flowtemphc")],
    },
}

_DOMAIN_ORDER = ("sensor", "binary_sensor", "number", "switch", "select", "climate", "water_heater")


def _component_rules(component: dict[str, Any]) -> dict[str, list[Cand]]:
    ctype = component.get("type", "")
    if ctype in ("radiators", "floor_heating"):
        ctype = "heating_circuit"
    role = (component.get("props") or {}).get("role")
    return RULES.get((ctype, role)) or RULES.get((ctype, None)) or {}


def _resolve_tag(tag: str | None, component: dict[str, Any]) -> str | None:
    if tag is None:
        return None
    props = component.get("props") or {}
    hc = int(props.get("circuit") or 1)
    dhw = int(props.get("dhw_circuit") or 1)
    return tag.replace("{hc}", f"hc{hc}").replace("{dhw}", "dhw" if dhw == 1 else f"dhw{dhw}")


def collect_entities(
    entries: Iterable[er.RegistryEntry], base: str | None
) -> dict[EmsKey, str]:
    """Return EmsKey -> entity_id for all enabled EMS-ESP MQTT entities."""
    found: dict[EmsKey, tuple[int, str]] = {}
    for entry in entries:
        if entry.platform != "mqtt" or entry.disabled_by is not None or not entry.unique_id:
            continue
        key = parse_unique_id(entry.unique_id, base)
        if key is None:
            continue
        domain = entry.entity_id.split(".", 1)[0]
        rank = _DOMAIN_ORDER.index(domain) if domain in _DOMAIN_ORDER else len(_DOMAIN_ORDER)
        if key not in found or rank < found[key][0]:
            found[key] = (rank, entry.entity_id)
    return {key: entity_id for key, (_, entity_id) in found.items()}


def suggest_bindings(
    plant: dict[str, Any] | None, entities: dict[EmsKey, str]
) -> list[dict[str, Any]]:
    """Suggest an entity for every slot of every component that has a rule."""
    suggestions: list[dict[str, Any]] = []
    for component in (plant or {}).get("components", []):
        for slot, candidates in _component_rules(component).items():
            for rank, (device, tag, short) in enumerate(candidates):
                key = EmsKey(device, _resolve_tag(tag, component), short)
                entity_id = entities.get(key)
                if entity_id:
                    suggestions.append(
                        {
                            "component_id": component.get("id"),
                            "slot": slot,
                            "entity_id": entity_id,
                            "source_key": str(key),
                            "confidence": "high" if rank == 0 else "medium",
                        }
                    )
                    break
    return suggestions


def async_scan(hass: HomeAssistant, plant: dict[str, Any] | None, base: str | None) -> dict[str, Any]:
    """Scan the entity registry and return detected entities plus suggestions."""
    registry = er.async_get(hass)
    entities = collect_entities(registry.entities.values(), base)
    return {
        "source": "ems_esp",
        "entity_count": len(entities),
        "entities": sorted(
            ({"key": str(key), "entity_id": entity_id} for key, entity_id in entities.items()),
            key=lambda item: item["key"],
        ),
        "suggestions": suggest_bindings(plant, entities),
    }

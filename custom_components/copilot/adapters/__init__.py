"""Data source adapters. Each adapter maps a gateway's entities onto plant component slots."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant

from ..const import SOURCE_EMS_ESP
from . import ems_esp

SOURCES = (SOURCE_EMS_ESP,)


def async_scan(hass: HomeAssistant, source: str, plant: dict[str, Any] | None, options: dict[str, Any]) -> dict[str, Any]:
    """Run the adapter for ``source`` and return detected entities and suggestions."""
    if source == SOURCE_EMS_ESP:
        return ems_esp.async_scan(hass, plant, options.get("mqtt_base"))
    raise ValueError(f"unknown source {source}")

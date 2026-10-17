"""Persistence for the plant layout and user icons."""

from __future__ import annotations

import base64
import binascii
from pathlib import Path
import re
import secrets
import time
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import (
    ICON_DIR,
    ICON_MAX_BYTES,
    ICON_MAX_COUNT,
    ICON_MIME_TYPES,
    LEGACY_DOMAIN,
    STORAGE_KEY_ICONS,
    STORAGE_KEY_PLANT,
    STORAGE_VERSION,
)

# SVGs are only ever rendered as <image> data URLs (no script execution), but we
# still refuse anything active so a stored file stays harmless if opened elsewhere.
_SVG_FORBIDDEN = re.compile(
    rb"<\s*script|<\s*foreignObject|\son[a-z]+\s*=|javascript:|<\s*iframe|<\s*embed|<\s*object",
    re.IGNORECASE,
)
_MAGIC = {
    "image/png": b"\x89PNG\r\n\x1a\n",
    "image/jpeg": b"\xff\xd8\xff",
}


class IconError(ValueError):
    """Raised when an uploaded icon is rejected."""


class CopilotStore:
    """Plant layout and icon storage."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._plant_store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY_PLANT)
        self._icon_store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY_ICONS)
        self._icon_dir = Path(hass.config.path(ICON_DIR))
        self.plant: dict[str, Any] | None = None
        self.icons: dict[str, dict[str, Any]] = {}

    async def async_load(self) -> None:
        data = await self._plant_store.async_load()
        icons = await self._icon_store.async_load()
        if data is None and icons is None:
            data, icons = await self._async_migrate_legacy()
        self.plant = (data or {}).get("plant")
        self.icons = (icons or {}).get("icons", {})

    async def _async_migrate_legacy(self) -> tuple[dict[str, Any] | None, dict[str, Any] | None]:
        """Take over plant and icons stored under the former project name (COPilot)."""
        data = await Store(self.hass, STORAGE_VERSION, f"{LEGACY_DOMAIN}.plant").async_load()
        icons = await Store(self.hass, STORAGE_VERSION, f"{LEGACY_DOMAIN}.icons").async_load()
        if data is not None:
            await self._plant_store.async_save(data)
        if icons is not None:
            old_dir = Path(self.hass.config.path(f"{LEGACY_DOMAIN}/icons"))

            def _copy() -> None:
                if not old_dir.is_dir():
                    return
                self._icon_dir.mkdir(parents=True, exist_ok=True)
                for path in old_dir.iterdir():
                    target = self._icon_dir / path.name
                    if path.is_file() and not target.exists():
                        target.write_bytes(path.read_bytes())

            await self.hass.async_add_executor_job(_copy)
            await self._icon_store.async_save(icons)
        return data, icons

    async def async_save_plant(self, plant: dict[str, Any]) -> None:
        self.plant = plant
        await self._plant_store.async_save({"plant": plant})

    # ---------------------------------------------------------------- icons

    async def async_list_icons(self) -> list[dict[str, Any]]:
        """Return all icons including a data URL for rendering."""

        def _read() -> list[dict[str, Any]]:
            result = []
            for icon_id, meta in self.icons.items():
                path = self._icon_dir / meta["file"]
                if not path.is_file():
                    continue
                data = base64.b64encode(path.read_bytes()).decode()
                result.append({**meta, "id": icon_id, "data_url": f"data:{meta['mime']};base64,{data}"})
            return sorted(result, key=lambda item: item.get("name", ""))

        return await self.hass.async_add_executor_job(_read)

    async def async_add_icon(self, name: str, mime: str, data_b64: str, iso: bool = False) -> dict[str, Any]:
        """Validate and store an uploaded icon."""
        ext = ICON_MIME_TYPES.get(mime)
        if ext is None:
            raise IconError("unsupported_type")
        if len(self.icons) >= ICON_MAX_COUNT:
            raise IconError("too_many")
        try:
            raw = base64.b64decode(data_b64, validate=True)
        except (binascii.Error, ValueError) as err:
            raise IconError("invalid_data") from err
        if not raw or len(raw) > ICON_MAX_BYTES:
            raise IconError("too_large")
        if mime == "image/svg+xml":
            if b"<svg" not in raw[:4096].lower() or _SVG_FORBIDDEN.search(raw):
                raise IconError("unsafe_svg")
        elif mime in _MAGIC and not raw.startswith(_MAGIC[mime]):
            raise IconError("invalid_data")
        elif mime == "image/webp" and not (raw[:4] == b"RIFF" and raw[8:12] == b"WEBP"):
            raise IconError("invalid_data")

        icon_id = secrets.token_hex(6)
        filename = f"{icon_id}.{ext}"

        def _write() -> None:
            self._icon_dir.mkdir(parents=True, exist_ok=True)
            (self._icon_dir / filename).write_bytes(raw)

        await self.hass.async_add_executor_job(_write)
        meta = {
            "name": name.strip()[:60] or icon_id,
            "mime": mime,
            "file": filename,
            "iso": bool(iso),
            "size": len(raw),
            "created": time.time(),
        }
        self.icons[icon_id] = meta
        await self._icon_store.async_save({"icons": self.icons})
        return {**meta, "id": icon_id}

    async def async_delete_icon(self, icon_id: str) -> bool:
        meta = self.icons.pop(icon_id, None)
        if meta is None:
            return False
        path = self._icon_dir / meta["file"]
        await self.hass.async_add_executor_job(lambda: path.unlink(missing_ok=True))
        await self._icon_store.async_save({"icons": self.icons})
        return True

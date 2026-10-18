"""Persistence for the plant layout and user icons."""

from __future__ import annotations

import base64
import binascii
from pathlib import Path
import re
import secrets
import time
from typing import Any, Callable

from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.helpers.storage import Store

from .const import (
    ICON_DIR,
    ICON_MAX_BYTES,
    ICON_MAX_COUNT,
    ICON_MIME_TYPES,
    BACKUP_MAX,
    STORAGE_KEY_BACKUPS,
    STORAGE_KEY_ICONS,
    STORAGE_KEY_PLANT,
    STORAGE_VERSION,
    VERSION,
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


def _without_maintenance(plant: dict[str, Any]) -> dict[str, Any]:
    """Plant without the maintenance log: ticking off a task is no reason for a backup."""
    settings = dict(plant.get("settings") or {})
    settings.pop("maintenance", None)
    return {**plant, "settings": settings}


class IconError(ValueError):
    """Raised when an uploaded icon is rejected."""


class CopilotStore:
    """Plant layout and icon storage."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._plant_store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY_PLANT)
        self._icon_store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY_ICONS)
        self._backup_store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY_BACKUPS)
        self.backups: list[dict[str, Any]] = []
        self._last_version: str | None = None
        self._icon_dir = Path(hass.config.path(ICON_DIR))
        self.plant: dict[str, Any] | None = None
        # bumped on every save; panels send it back so a stale window cannot overwrite newer changes
        self.rev = 0
        self._listeners: list[Callable[[dict[str, Any] | None, int], None]] = []
        self.icons: dict[str, dict[str, Any]] = {}

    async def async_load(self) -> None:
        data = await self._plant_store.async_load()
        icons = await self._icon_store.async_load()
        self.plant = (data or {}).get("plant")
        self.rev = int((data or {}).get("rev") or 0)
        self.icons = (icons or {}).get("icons", {})
        backups = await self._backup_store.async_load() or {}
        self.backups = backups.get("backups", [])
        self._last_version = backups.get("last_version")
        # an update (or downgrade) of the integration: keep the layout as it was before
        if self.plant is not None and self._last_version != VERSION:
            self._push_backup(self.plant, "update", self._last_version)
            self._last_version = VERSION
            await self._save_backups()

    async def async_save_plant(self, plant: dict[str, Any], reason: str = "save") -> None:
        """Persist the plant; the previous layout is kept as a backup."""
        if self.plant is not None and _without_maintenance(self.plant) != _without_maintenance(plant):
            self._push_backup(self.plant, reason, VERSION)
            await self._save_backups()
        self.plant = plant
        self.rev += 1
        await self._plant_store.async_save({"plant": plant, "rev": self.rev})
        for listener in list(self._listeners):
            listener(plant, self.rev)

    @callback
    def async_subscribe(self, listener: Callable[[dict[str, Any] | None, int], None]) -> CALLBACK_TYPE:
        """Call `listener(plant, rev)` after every save; returns the unsubscribe function."""
        self._listeners.append(listener)

        @callback
        def unsubscribe() -> None:
            if listener in self._listeners:
                self._listeners.remove(listener)

        return unsubscribe

    # ---------------------------------------------------------------- backups

    def _push_backup(self, plant: dict[str, Any], reason: str, version: str | None) -> None:
        if self.backups and self.backups[0]["plant"] == plant:
            return
        self.backups.insert(0, {"ts": time.time(), "reason": reason, "version": version, "plant": plant})
        del self.backups[BACKUP_MAX:]

    async def _save_backups(self) -> None:
        await self._backup_store.async_save({"last_version": self._last_version or VERSION, "backups": self.backups})

    def list_backups(self) -> list[dict[str, Any]]:
        """Backups without the plant bodies (newest first)."""
        return [
            {
                "ts": b["ts"],
                "reason": b["reason"],
                "version": b.get("version"),
                "name": (b["plant"] or {}).get("name"),
                "components": len((b["plant"] or {}).get("components", [])),
            }
            for b in self.backups
        ]

    async def async_restore_backup(self, ts: float) -> dict[str, Any] | None:
        backup = next((b for b in self.backups if b["ts"] == ts), None)
        if backup is None:
            return None
        await self.async_save_plant(backup["plant"], "restore")
        return backup["plant"]

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

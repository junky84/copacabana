"""Constants for COPilot."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "copilot"
NAME: Final = "COPilot"
VERSION: Final = "0.3.10"

PANEL_URL_PATH: Final = "copilot"
PANEL_WEBCOMPONENT: Final = "copilot-panel"
# provided by the frontend bundle (custom icon set "copilot")
PANEL_ICON: Final = "copilot:logo"
FRONTEND_URL_BASE: Final = "/copilot_frontend"
FRONTEND_FILE: Final = "copilot-panel.js"

STORAGE_VERSION: Final = 1
STORAGE_KEY_PLANT: Final = f"{DOMAIN}.plant"
STORAGE_KEY_ICONS: Final = f"{DOMAIN}.icons"
STORAGE_KEY_MESSAGES: Final = f"{DOMAIN}.messages"
STORAGE_KEY_BACKUPS: Final = f"{DOMAIN}.backups"
BACKUP_MAX: Final = 15

ICON_DIR: Final = "copilot/icons"
ICON_MAX_BYTES: Final = 256 * 1024
ICON_MAX_COUNT: Final = 100
ICON_MIME_TYPES: Final = {
    "image/svg+xml": "svg",
    "image/png": "png",
    "image/webp": "webp",
    "image/jpeg": "jpg",
}

PLANT_MAX_BYTES: Final = 1024 * 1024
MESSAGES_MAX: Final = 300

CONF_SOURCE: Final = "source"
CONF_MQTT_BASE: Final = "mqtt_base"
SOURCE_EMS_ESP: Final = "ems_esp"
DEFAULT_MQTT_BASE: Final = "ems-esp"

EVENT_MESSAGE: Final = f"{DOMAIN}_message"
SIGNAL_PLANT_UPDATED: Final = f"{DOMAIN}_plant_updated"

"""Config flow for COPilot."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback

from .const import CONF_MQTT_BASE, CONF_SOURCE, DEFAULT_MQTT_BASE, DOMAIN, NAME, SOURCE_EMS_ESP


class CopilotConfigFlow(ConfigFlow, domain=DOMAIN):
    """Single-instance setup: the plant itself is configured in the panel."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(
                title=NAME,
                data={},
                options={
                    CONF_SOURCE: user_input[CONF_SOURCE],
                    CONF_MQTT_BASE: user_input.get(CONF_MQTT_BASE, DEFAULT_MQTT_BASE),
                },
            )
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_SOURCE, default=SOURCE_EMS_ESP): vol.In([SOURCE_EMS_ESP]),
                    vol.Optional(CONF_MQTT_BASE, default=DEFAULT_MQTT_BASE): str,
                }
            ),
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        return CopilotOptionsFlow()


class CopilotOptionsFlow(OptionsFlow):
    """Options: data source and panel title."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(data=user_input)
        options = self.config_entry.options
        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_SOURCE, default=options.get(CONF_SOURCE, SOURCE_EMS_ESP)): vol.In([SOURCE_EMS_ESP]),
                    vol.Optional(CONF_MQTT_BASE, default=options.get(CONF_MQTT_BASE, DEFAULT_MQTT_BASE)): str,
                    vol.Optional("sidebar_title", default=options.get("sidebar_title", NAME)): str,
                }
            ),
        )

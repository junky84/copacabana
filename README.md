# COPilot

SCADA-style heat pump dashboard for Home Assistant – modern, animated, configurable.
Built first for Buderus/Bosch heat pumps read via an **EMS-ESP gateway** (BBQKees E32 V2), designed to support other data sources later.

> Status: **v0.1 (preview)** – early test version, not yet verified on a real plant. Not affiliated with Bosch, Buderus or BBQKees.

## Features (v0.1)

- **Own sidebar panel** in Home Assistant: overview, messages, configuration
- **Animated hydraulic schematic**: pipes coloured by water temperature, flow animation while pumps run, spinning fan, defrost frost overlay, glowing backup heater, tank stratification, heat waves on radiators
- **Live values at the components** (temperatures, power, pressure, flow …) – tap any value for a 24 h sparkline popover
- **Configurable components**: outdoor/indoor unit, buffer, DHW cylinder, pumps, 3-way valve, mixer, radiators, underfloor heating, tap, cold water, dirt separator, expansion vessel, junctions, value tiles, labels
- **Plant wizard** generates a laid-out schematic (parallel/serial/no buffer, DHW via diverter, up to 4 circuits, mixed circuits, circulation …)
- **Grid editor**: drag & drop, connect ports, bendable routing, rotate, undo/redo, per-pipe animation conditions
- **EMS-ESP auto mapping**: scans MQTT-discovery entities and suggests bindings per component (Buderus WLW186i/WLW176i, Bosch CS5800i/CS6800i and other EMS heat pumps). Any Home Assistant entity can be bound manually (e.g. a smart plug driving the circulation pump)
- **Messages**: backend rule engine (defrost, DHW charging, disinfection, backup heater, external inputs such as §14a / PV, pressure limits, new error codes, gateway offline). Fires a `copilot_message` event for your own automations (push, ntfy …)
- **Demo mode with physics simulator**: realistic heat pump behaviour (heating curve, buffer stratification, COP, icing/defrost, DHW draws, aux heater) plus scenarios: winter morning, mild season (cycling), shower, defrost, §14a limit, PV surplus, disinfection, fault
- **Custom icons**: bundled artwork is original and brand-neutral; upload your own SVG/PNG/WebP/JPG per component or per type
- German & English, light & dark (follows HA theme), wall display / phone / tablet / desktop

## Installation (HACS)

1. HACS → ⋮ (top right) → **Custom repositories** → URL `https://github.com/junky84/copilot`, type **Integration** → *Add*.
2. Search for **COPilot** in HACS → **Download**.
3. Restart Home Assistant.
4. *Settings → Devices & services → Add integration → COPilot*.
5. Open **COPilot** in the sidebar. An example plant in demo mode is created automatically.

Updates appear in HACS (and under *Settings → Updates*); install them and restart Home Assistant.

Manual installation: copy `custom_components/copilot` from the release zip to `/config/custom_components/` and restart.

## Connecting the EMS-ESP gateway

1. In EMS-ESP: enable **MQTT**, enable **Home Assistant MQTT Discovery**, entity ID format **“Single instance, short names”** (default). The “multiple instances” format works too – set the MQTT base in the integration options.
2. Make sure the **MQTT integration** is running in Home Assistant and the EMS-ESP entities appear.
3. COPilot → *Configuration → Mapping → Scan entities*, review the suggestions and apply.
4. Values that do not come from EMS (circulation smart plug, buffer sensors, PV/inverter values, room sensor …) can be bound in the editor with the entity search.
5. Switch off demo mode in *Configuration → Settings*.

EMS-ESP enum values (e.g. compressor activity) are published in the EMS-ESP UI language; COPilot understands English, German, Dutch, French, Polish, Swedish and Italian wording.

## Roadmap

- **v0.2**: isometric 2.5D style, live COP / SPF with traffic light vs. datasheet, interactive heating curve, plant check (mixing loss buffer ≤ 2 K, cycling, spread), “what is happening” explanation, energy layer (PV, battery, grid, wallbox, §14a), Lovelace card
- **v0.3**: time machine (replay the schematic from recorder history), costs & PV share (fixed or entity tariff), maintenance calendar (anode, separator, expansion vessel …), export/import, write access for selected values

## Development

```bash
cd frontend
npm install
npm run dev        # standalone demo at http://localhost:5173 (no Home Assistant needed)
npm run build      # builds custom_components/copilot/frontend/copilot-panel.js
```

Backend tests:

```bash
uv venv --python 3.13 .venv
VIRTUAL_ENV=.venv uv pip install -r requirements_test.txt
.venv/bin/python -m pytest
```

The built panel bundle is committed so the integration works without a build step on the Home Assistant host.

## Credits & notes

- EMS-ESP short names and unique-id formats are based on the [EMS-ESP](https://github.com/emsesp/EMS-ESP32) sources (v3.8.6).
- Product names (Buderus, Bosch, Logatherm, Compress …) are trademarks of their owners and are used only to identify compatible devices.
- The model list and the simulator use plausible values, not certified manufacturer data.

License: MIT

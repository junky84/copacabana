"""Message engine: turns state changes of bound entities into plant messages.

Messages are stored with a translation ``key`` plus ``params`` so the frontend
can render them in the user's language. Most rules are *conditions* (active while
true, closed when false), which keeps the engine idempotent across restarts.
"""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
import logging
import secrets
import time
from typing import Any

from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import CALLBACK_TYPE, Event, EventStateChangedData, HomeAssistant, State, callback
from datetime import timedelta

from homeassistant.helpers.event import async_call_later, async_track_state_change_event, async_track_time_interval
from homeassistant.helpers.storage import Store

from .const import EVENT_MESSAGE, MESSAGES_MAX, STORAGE_KEY_MESSAGES, STORAGE_VERSION

_LOGGER = logging.getLogger(__name__)

LEVEL_INFO = "info"
LEVEL_NOTICE = "notice"
LEVEL_WARNING = "warning"
LEVEL_ERROR = "error"

_TRUE = {"on", "true", "1", "yes", "ja", "ein", "an", "active", "aktiv", "open", "offen"}

# EMS-ESP publishes enum states in its configured language.
ACTIVITY_ALIASES: dict[str, tuple[str, ...]] = {
    "off": ("off", "aus", "uit", "av", "arrêt", "wył", "spento"),
    "heating": ("heating", "heizen", "verwarmen", "uppvärmning", "chauffage", "ogrzewanie", "riscaldamento"),
    "cooling": ("cooling", "kühlen", "koelen", "kyler", "refroidissement", "chłodzenie", "raffreddamento"),
    "hot_water": ("hot water", "warmwasser", "warm water", "varmvatten", "eau chaude", "c.w.u.", "acqua calda"),
    "pool": ("pool", "zwembad", "piscine", "basen", "piscina"),
    "pool_heating": ("pool heating", "pool beheizen", "zwembadverwarming", "chauffage piscine"),
    "defrost": ("defrost", "abtauen", "ontdooien", "avfrostning", "dégivrage", "odladzanie", "scongelamento"),
    "compressor_alarm": ("compressor alarm", "kompressor alarm", "kompressoralarm", "compressor alarm"),
}


def is_truthy(state: State | None) -> bool | None:
    """Interpret a state as boolean; None if unavailable."""
    if state is None or state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN, ""):
        return None
    value = state.state.strip().lower()
    if value in _TRUE:
        return True
    try:
        return float(value) > 0
    except ValueError:
        return False


def as_float(state: State | None) -> float | None:
    if state is None:
        return None
    try:
        return float(state.state)
    except (TypeError, ValueError):
        return None


def normalize_activity(state: State | None) -> str | None:
    if state is None or state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
        return None
    value = state.state.strip().lower()
    for canonical, aliases in ACTIVITY_ALIASES.items():
        if value in aliases:
            return canonical
    if "abtau" in value or "defrost" in value:
        return "defrost"
    return value


@dataclass(slots=True)
class Binding:
    component_id: str
    component_type: str
    label: str
    slot: str
    props: dict[str, Any]


class MessageEngine:
    """Evaluates rules for plant bindings and keeps the message log."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY_MESSAGES)
        self.messages: list[dict[str, Any]] = []
        self._seen: dict[str, str] = {}
        self._active: dict[str, str] = {}
        self._bindings: dict[str, list[Binding]] = {}
        self._unsub_track: CALLBACK_TYPE | None = None
        self._unsub_avail: CALLBACK_TYPE | None = None
        self._unsub_maint: CALLBACK_TYPE | None = None
        self._maintenance: list[dict[str, Any]] = []
        self._listeners: list[Callable[[dict[str, Any]], None]] = []

    # ------------------------------------------------------------ lifecycle

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.messages = data.get("messages", [])
        self._seen = data.get("seen", {})
        self._active = {m["ident"]: m["id"] for m in self.messages if m.get("active") and m.get("ident")}

    @callback
    def async_shutdown(self) -> None:
        if self._unsub_track:
            self._unsub_track()
            self._unsub_track = None
        if self._unsub_avail:
            self._unsub_avail()
            self._unsub_avail = None
        if self._unsub_maint:
            self._unsub_maint()
            self._unsub_maint = None

    @callback
    def async_set_plant(self, plant: dict[str, Any] | None) -> None:
        """(Re)bind to the entities of the given plant."""
        self.async_shutdown()
        self._bindings = {}
        for component in (plant or {}).get("components", []):
            for slot, entity_id in (component.get("bindings") or {}).items():
                if not isinstance(entity_id, str) or "." not in entity_id:
                    continue
                self._bindings.setdefault(entity_id, []).append(
                    Binding(
                        component_id=component.get("id", ""),
                        component_type=component.get("type", ""),
                        label=component.get("label") or component.get("type", ""),
                        slot=slot,
                        props=component.get("props") or {},
                    )
                )
        known = {
            f"{b.component_id}:{b.slot}" for bindings in self._bindings.values() for b in bindings
        }
        # close conditions whose binding disappeared
        for ident in list(self._active):
            parts = ident.split("|")
            if len(parts) >= 3 and parts[1] != "_plant" and f"{parts[1]}:{parts[2]}" not in known:
                self._close(ident)
        if self._bindings:
            self._unsub_track = async_track_state_change_event(
                self.hass, list(self._bindings), self._async_state_changed
            )
        for entity_id in self._bindings:
            self._evaluate(entity_id, None, self.hass.states.get(entity_id), initial=True)
        self._schedule_availability_check()
        settings = (plant or {}).get("settings") or {}
        self._maintenance = list(((settings.get("maintenance") or {}).get("tasks")) or [])
        self._check_maintenance()
        self._unsub_maint = async_track_time_interval(self.hass, self._check_maintenance, timedelta(hours=1))

    # ----------------------------------------------------- maintenance

    @callback
    def _check_maintenance(self, _now: Any = None) -> None:
        """Open a message for every maintenance task that is due."""
        now = time.time()
        idents = set()
        for task in self._maintenance:
            task_id = str(task.get("id", ""))
            last = task.get("last_done")
            days = task.get("interval_days")
            if not task_id or not isinstance(last, (int, float)) or not isinstance(days, (int, float)) or days <= 0:
                continue
            ident = f"maint|_plant|{task_id}"
            idents.add(ident)
            due = last + days * 86400
            params = {"task_key": task.get("key"), "title": task.get("title") or "", "since": round(max(0.0, now - due) / 86400)}
            self._condition(ident, now >= due, LEVEL_NOTICE, "maintenance_due", params, task.get("component"))
        for ident in [i for i in self._active if i.startswith("maint|") and i not in idents]:
            self._close(ident)

    # ----------------------------------------------------------- listeners

    @callback
    def async_subscribe(self, listener: Callable[[dict[str, Any]], None]) -> CALLBACK_TYPE:
        self._listeners.append(listener)

        @callback
        def _remove() -> None:
            if listener in self._listeners:
                self._listeners.remove(listener)

        return _remove

    def _notify(self, message: dict[str, Any]) -> None:
        for listener in list(self._listeners):
            listener(message)

    # ---------------------------------------------------------- messages

    def _public(self, message: dict[str, Any]) -> dict[str, Any]:
        return {k: v for k, v in message.items() if k != "ident"}

    def _add(self, level: str, key: str, params: dict[str, Any], component_id: str | None,
             ident: str | None = None, active: bool = False) -> dict[str, Any]:
        message = {
            "id": secrets.token_hex(6),
            "ts": time.time(),
            "level": level,
            "key": key,
            "params": params,
            "component_id": component_id,
            "active": active,
            "end_ts": None,
            "ident": ident,
        }
        self.messages.append(message)
        if len(self.messages) > MESSAGES_MAX:
            self.messages = self.messages[-MESSAGES_MAX:]
        if ident and active:
            self._active[ident] = message["id"]
        public = self._public(message)
        self.hass.bus.async_fire(EVENT_MESSAGE, public)
        self._notify(public)
        self._save()
        return message

    @callback
    def async_log(self, level: str, key: str, params: dict[str, Any], component_id: str | None) -> None:
        """Add a one-off message (e.g. a value changed from the panel)."""
        self._add(level, key, params, component_id)

    def _open(self, ident: str, level: str, key: str, params: dict[str, Any], component_id: str | None) -> None:
        if ident in self._active:
            return
        self._add(level, key, params, component_id, ident=ident, active=True)

    def _close(self, ident: str) -> None:
        message_id = self._active.pop(ident, None)
        if message_id is None:
            return
        for message in self.messages:
            if message["id"] == message_id:
                message["active"] = False
                message["end_ts"] = time.time()
                self._notify(self._public(message))
                break
        self._save()

    def _condition(self, ident: str, active: bool | None, level: str, key: str,
                   params: dict[str, Any], component_id: str | None) -> None:
        if active is None:
            return
        if active:
            self._open(ident, level, key, params, component_id)
        else:
            self._close(ident)

    def _save(self) -> None:
        self._store.async_delay_save(
            lambda: {"messages": self.messages, "seen": self._seen}, 5
        )

    @callback
    def async_list(self) -> list[dict[str, Any]]:
        return [self._public(m) for m in self.messages]

    @callback
    def async_clear(self) -> None:
        """Remove all inactive messages."""
        self.messages = [m for m in self.messages if m.get("active")]
        self._save()

    # ------------------------------------------------------------- rules

    @callback
    def _async_state_changed(self, event: Event[EventStateChangedData]) -> None:
        self._evaluate(event.data["entity_id"], event.data["old_state"], event.data["new_state"])
        self._schedule_availability_check()

    def _evaluate(self, entity_id: str, old: State | None, new: State | None, initial: bool = False) -> None:
        for binding in self._bindings.get(entity_id, []):
            try:
                self._apply_rule(binding, entity_id, old, new, initial)
            except Exception:  # noqa: BLE001 - a broken rule must never break HA
                _LOGGER.exception("Rule failed for %s / %s", binding.component_id, binding.slot)

    def _apply_rule(self, b: Binding, entity_id: str, old: State | None, new: State | None, initial: bool) -> None:
        ident = f"{b.slot}|{b.component_id}|{b.slot}"
        base = {"component": b.label}
        ctype, slot = b.component_type, b.slot

        if ctype == "dhw_tank" and slot == "charging":
            self._condition(ident, is_truthy(new), LEVEL_INFO, "dhw_charging", base, b.component_id)
        elif ctype == "dhw_tank" and slot == "disinfecting":
            self._condition(ident, is_truthy(new), LEVEL_INFO, "dhw_disinfection", base, b.component_id)
        elif ctype == "indoor_unit" and slot in ("input1", "input2", "input3", "input4"):
            num = slot[-1]
            label = (b.props.get("input_labels") or {}).get(slot) or ""
            level = LEVEL_WARNING if b.props.get("input_levels", {}).get(slot) == "warning" else LEVEL_NOTICE
            self._condition(ident, is_truthy(new), level, "input_active", {**base, "input": num, "label": label}, b.component_id)
        elif ctype == "indoor_unit" and slot in ("aux_level", "aux_step1", "aux_step2", "aux_step3"):
            self._condition(f"aux|{b.component_id}|{slot}", is_truthy(new), LEVEL_NOTICE, "aux_heater", base, b.component_id)
        elif ctype == "outdoor_unit" and slot == "activity":
            activity = normalize_activity(new)
            if activity is None:
                return
            self._condition(f"defrost|{b.component_id}|activity", activity == "defrost", LEVEL_INFO, "defrost", base, b.component_id)
            self._condition(f"alarm|{b.component_id}|activity", activity == "compressor_alarm", LEVEL_ERROR, "compressor_alarm", base, b.component_id)
        elif ctype == "indoor_unit" and slot == "pressure":
            value = as_float(new)
            if value is None:
                return
            low = float(b.props.get("pressure_min", 1.0))
            high = float(b.props.get("pressure_max", 2.7))
            params = {**base, "value": value, "min": low, "max": high}
            self._condition(f"plow|{b.component_id}|pressure", value < low, LEVEL_WARNING, "pressure_low", params, b.component_id)
            self._condition(f"phigh|{b.component_id}|pressure", value > high, LEVEL_WARNING, "pressure_high", params, b.component_id)
        elif ctype == "indoor_unit" and slot == "last_error":
            if new is None or new.state in (STATE_UNAVAILABLE, STATE_UNKNOWN, ""):
                return
            seen_key = f"{b.component_id}:last_error"
            previous = self._seen.get(seen_key)
            if previous == new.state:
                return
            self._seen[seen_key] = new.state
            if previous is None and initial:
                # first time we see the value: remember it, do not alarm on old errors
                self._save()
                return
            self._add(LEVEL_ERROR, "error_code", {**base, "code": new.state}, b.component_id)

    # ----------------------------------------------------- availability

    def _schedule_availability_check(self) -> None:
        if self._unsub_avail:
            self._unsub_avail()
        self._unsub_avail = async_call_later(self.hass, 90, self._async_check_availability)

    @callback
    def _async_check_availability(self, _now: Any) -> None:
        self._unsub_avail = None
        if not self._bindings:
            return
        missing = [
            eid for eid in self._bindings
            if (st := self.hass.states.get(eid)) is None or st.state == STATE_UNAVAILABLE
        ]
        share = len(missing) / len(self._bindings)
        self._condition(
            "avail|_plant|all", share > 0.5, LEVEL_WARNING, "data_unavailable",
            {"missing": len(missing), "total": len(self._bindings)}, None,
        )

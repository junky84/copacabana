/**
 * Heating curve model of the Logamatic BC400 / RC310 family: the flow
 * temperature rises from the room setpoint at the heating limit to the design
 * temperature at the minimum outdoor temperature (curved for radiators),
 * shifted by the parallel offset and clamped to min/max flow temperature.
 */

export interface CurveParams {
  /** flow temperature at the minimum outdoor temperature (Auslegungstemperatur) */
  design: number;
  /** minimum (design) outdoor temperature */
  minExt: number;
  /** parallel shift in K */
  offset: number;
  roomSet: number;
  minFlow: number;
  maxFlow: number;
  /** heating limit: no heating at or above this outdoor temperature */
  limit: number;
  /** 1.3 radiators, 1.1 underfloor heating */
  exponent: number;
}

export function defaultCurve(floor: boolean, minExt = -12): CurveParams {
  return {
    design: floor ? 35 : 50,
    minExt,
    offset: 0,
    roomSet: 21,
    minFlow: floor ? 22 : 25,
    maxFlow: floor ? 40 : 55,
    limit: 16,
    exponent: floor ? 1.1 : 1.3,
  };
}

/** Target flow temperature, or null when the outdoor temperature is above the heating limit. */
export function flowTarget(p: CurveParams, tOut: number): number | null {
  if (tOut >= p.limit) return null;
  const span = Math.max(1, p.roomSet - p.minExt);
  const x = Math.max(0, (p.roomSet - tOut) / span);
  const base = p.roomSet + (p.design - p.roomSet) * Math.pow(x, 1 / p.exponent);
  return Math.max(p.minFlow, Math.min(p.maxFlow, base + p.offset));
}

/**
 * Suggested change of the parallel shift from the mean room temperature during
 * heating. Rule of thumb: 1 K room temperature ≈ 2.5 K flow (radiators) / 1.5 K (floor).
 */
export function suggestOffset(p: CurveParams, roomMean: number): number {
  const factor = p.exponent > 1.2 ? 2.5 : 1.5;
  const delta = (p.roomSet - roomMean) * factor;
  return Math.round(delta * 2) / 2;
}

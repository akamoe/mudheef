/**
 * Where things actually are.
 *
 * Coordinates live here rather than in `lib/i18n.ts` on purpose: geography is
 * not translated, and the English and Arabic dictionaries must not be able to
 * disagree about where Babylon is. A dictionary names a stop and points at an
 * id; this file decides the point on the ground.
 *
 * Values are `[longitude, latitude]`, the order MapLibre, GeoJSON and every
 * component in `components/ui/map.tsx` expect.
 */
export type PlaceId =
  | "baghdad"
  | "babylon"
  | "ur"
  | "uruk"
  | "nineveh"
  | "nasiriyah"
  | "chibayish"
  | "hammar-marshes"
  | "hawizeh-marshes"
  | "mutanabbi-street"
  | "old-baghdad"
  | "tigris-corniche"
  | "kadhimiya-market"

export const places: Record<PlaceId, [number, number]> = {
  baghdad: [44.3615, 33.3152],
  babylon: [44.4211, 32.5364],
  ur: [46.1033, 30.9626],
  uruk: [45.64, 31.3242],
  nineveh: [43.1527, 36.3594],

  nasiriyah: [46.2573, 31.0439],
  chibayish: [47.0039, 30.9553],
  "hammar-marshes": [46.65, 30.75],
  "hawizeh-marshes": [47.7, 31.25],

  "mutanabbi-street": [44.3889, 33.3384],
  "old-baghdad": [44.385, 33.332],
  "tigris-corniche": [44.397, 33.325],
  "kadhimiya-market": [44.337, 33.379],
}

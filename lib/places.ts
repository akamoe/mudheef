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

/**
 * The historical sites of Karbala and its governorate, mapped on
 * `/karbala`. Kept in their own record rather than folded into `places`
 * because the two sets answer different questions: `places` locates stops on
 * the national journeys, this one locates one city's sites.
 */
export type KarbalaSiteId =
  | "imam-husayn-shrine"
  | "bayn-al-haramayn"
  | "abbas-shrine"
  | "al-hurr-mosque"
  | "white-bridge"
  | "al-ukhaidir-fortress"
  | "al-aqiser"
  | "imam-ali-dropper-shrine"
  | "simeon-palace"
  | "mujada-ruins"
  | "tar-caves"
  | "khan-al-atshan"
  | "al-rubu-caravansarai"

export const karbalaSites: Record<KarbalaSiteId, [number, number]> = {
  // The old city. The two shrines are 380 m apart, so every stop in this
  // group lands within a few streets of the others.
  "imam-husayn-shrine": [44.032313, 32.616365],
  "bayn-al-haramayn": [44.034265, 32.616777],
  "abbas-shrine": [44.036217, 32.617189],

  // The city's edges: the two road gates on the way in.
  "al-hurr-mosque": [43.985, 32.6513],
  "white-bridge": [44.081, 32.6408],

  // The desert ring. Ordered the way the map draws its circuit.
  "imam-ali-dropper-shrine": [43.797172, 32.516599],
  "al-aqiser": [43.575278, 32.4975],
  "al-ukhaidir-fortress": [43.602493, 32.44053],
  "simeon-palace": [43.7117, 32.4626],
  "mujada-ruins": [43.804244, 32.34873],
  "tar-caves": [43.73991, 32.27534],
  "khan-al-atshan": [44.017, 32.3498],
  "al-rubu-caravansarai": [44.158851, 32.473536],
}

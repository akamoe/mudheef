"use client"

import { useEffect, useRef, useState } from "react"

import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerPopup,
  useMap,
} from "@/components/ui/map"

export type JourneyMapStop = {
  name: string
  /** `[longitude, latitude]` — `lib/places.ts` owns the value. */
  coordinates: [number, number]
  /** What sort of place it is, e.g. "Ancient city". */
  kind: string
  /** Two lines on what the visitor is looking at. */
  note: string
  /** The one thing not to leave without seeing. */
  see: string
}

/**
 * The brand orange, spelled out twice because MapLibre paints the route into
 * WebGL and cannot resolve a CSS custom property. Keep in step with `--orange`
 * in `globals.css` (light, then dark). Exported so the Karbala map draws its
 * circuit in the same two colours instead of keeping a second copy.
 */
export const ROUTE_COLORS = { light: "#e66c3f", dark: "#f0824f" }

/**
 * Everything that lives inside the map context: the route, the numbered stop
 * pins, and the initial framing.
 *
 * Split from `JourneyMap` because `useMap()` only works below `<Map>`, and the
 * resolved theme we need for the route colour comes from that same context.
 */
function JourneyLayers({
  stops,
  stopLabel,
  seeLabel,
}: {
  stops: JourneyMapStop[]
  stopLabel: string
  seeLabel: string
}) {
  const { map, isLoaded, resolvedTheme } = useMap()

  const coordinates = stops.map((stop) => stop.coordinates)
  const total = stops.length

  /**
   * Frames the whole route once the map is ready.
   *
   * Deliberately keyed on the map instance and not on `coordinates`: the parent
   * rebuilds the stop array on every render, so depending on it would re-fit
   * the bounds mid-gesture and yank the map back while the visitor is panning.
   */
  useEffect(() => {
    if (!map || !isLoaded || coordinates.length < 2) return

    const longitudes = coordinates.map(([longitude]) => longitude)
    const latitudes = coordinates.map(([, latitude]) => latitude)

    map.fitBounds(
      [
        [Math.min(...longitudes), Math.min(...latitudes)],
        [Math.max(...longitudes), Math.max(...latitudes)],
      ],
      { padding: 48, duration: 0, maxZoom: 11 },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, isLoaded])

  return (
    <>
      <MapControls position="bottom-right" showFullscreen />
      <MapRoute
        coordinates={coordinates}
        color={ROUTE_COLORS[resolvedTheme]}
        width={3}
        opacity={0.9}
        activeColor={ROUTE_COLORS[resolvedTheme]}
        activeWidth={4}
      />
      {stops.map((stop, index) => (
        <MapMarker
          key={`${stop.name}-${index}`}
          longitude={stop.coordinates[0]}
          latitude={stop.coordinates[1]}
        >
          <MarkerContent>
            <span className="journey-pin">{index + 1}</span>
          </MarkerContent>
          {/* `MarkerPopup` attaches itself to the pin, so MapLibre opens it on
              click without any state here. */}
          <MarkerPopup closeButton className="journey-popup">
            <p className="journey-popup-index">
              {stopLabel} {index + 1} / {total}
            </p>
            <p className="journey-popup-name">{stop.name}</p>
            <p className="journey-popup-kind">{stop.kind}</p>
            <p className="journey-popup-note">{stop.note}</p>
            <p className="journey-popup-see-label">{seeLabel}</p>
            <p className="journey-popup-see">{stop.see}</p>
          </MarkerPopup>
        </MapMarker>
      ))}
    </>
  )
}

/**
 * A map of one suggested journey, sized for a card: the route drawn through
 * every stop, a numbered pin per stop, and a popup holding that stop's details.
 */
function JourneyMap({
  stops,
  label,
  stopLabel,
  seeLabel,
}: {
  stops: JourneyMapStop[]
  /** Accessible name for the map region. */
  label: string
  /** Word that precedes the number in a popup, e.g. "Stop". */
  stopLabel: string
  /** Label above the "worth seeing" line in a popup. */
  seeLabel: string
}) {
  const holderRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  /**
   * Three maps on one page is three WebGL contexts and three basemap style
   * fetches competing with the hero for the first paint. Mount when the card
   * comes anywhere near the viewport, then keep it.
   *
   * The holder keeps its height while empty, so nothing shifts when the map
   * arrives, and the placeholder is also the floor if this never fires.
   */
  useEffect(() => {
    const node = holderRef.current
    if (!node || mounted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin: "400px" },
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [mounted])

  return (
    <div ref={holderRef} className="journey-map">
      {mounted && (
        <Map
          aria-label={label}
          /* Opening on the middle stop beats opening on the whole world and
             fitting later. `JourneyLayers` reframes once the style has loaded. */
          center={stops[Math.floor(stops.length / 2)]?.coordinates}
          zoom={7}
          /* Without this the map swallows the page scroll: a one-finger drag
             pans the map instead of the page, which is maddening when the map
             is a card and not the destination. Zoom/pan still work with two
             fingers, or with the controls. */
          cooperativeGestures
        >
          <JourneyLayers
            stops={stops}
            stopLabel={stopLabel}
            seeLabel={seeLabel}
          />
        </Map>
      )}
      {/* The pins are canvas and MapLibre's popups open on click only, so the
          stop names exist nowhere in the accessibility tree without this.
          Announced, never drawn. */}
      <ul className="sr-only">
        {stops.map((stop) => (
          <li key={stop.name}>
            {stop.name} — {stop.kind}. {stop.note} {seeLabel}: {stop.see}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { JourneyMap }

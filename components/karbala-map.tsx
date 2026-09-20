"use client"

import { useEffect, useRef, useState } from "react"

import { ROUTE_COLORS, type JourneyMapStop } from "@/components/journey-map"
import { Button } from "@/components/ui/button"
import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerPopup,
  useMap,
} from "@/components/ui/map"

export type KarbalaMapView = {
  id: string
  label: string
  /** The line under the label: how many stops, and how they are made. */
  hint: string
  stops: JourneyMapStop[]
}

/**
 * The stops for one view: the route, the numbered pins, and the framing.
 *
 * Split from `KarbalaMap` because `useMap()` only works below `<Map>`, and the
 * resolved theme the route colour needs comes from that same context.
 */
function KarbalaLayers({
  stops,
  stopLabel,
  seeLabel,
  viewKey,
}: {
  stops: JourneyMapStop[]
  stopLabel: string
  seeLabel: string
  /** Which view is drawn. Changing it re-frames the map; the stop list itself
   *  is rebuilt on every render, so it cannot be the dependency. */
  viewKey: string
}) {
  const { map, isLoaded, resolvedTheme } = useMap()

  const coordinates = stops.map((stop) => stop.coordinates)

  useEffect(() => {
    if (!map || !isLoaded || coordinates.length < 2) return

    const longitudes = coordinates.map(([longitude]) => longitude)
    const latitudes = coordinates.map(([, latitude]) => latitude)
    const north = Math.max(...latitudes)
    const south = Math.min(...latitudes)
    const east = Math.max(...longitudes)
    const west = Math.min(...longitudes)

    // One map carries both scales, and they are two orders of magnitude apart:
    // the old city is a 380 m walk, the ring around it is 60 km across. Fitting
    // the three shrine stops without a ceiling would land past street level,
    // where the pins collide; fitting the circuit needs no ceiling at all.
    const span = Math.max(east - west, north - south)

    map.fitBounds(
      [
        [west, south],
        [east, north],
      ],
      { padding: 56, duration: 0, maxZoom: span < 0.05 ? 17 : 12 }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, isLoaded, viewKey])

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
          key={`${viewKey}-${stop.name}-${index}`}
          longitude={stop.coordinates[0]}
          latitude={stop.coordinates[1]}
        >
          <MarkerContent>
            <span className="journey-pin">{index + 1}</span>
          </MarkerContent>
          {/* `MarkerPopup` attaches itself to the pin, so MapLibre opens it on
              click without any state here. The popup classes are the journeys
              section's: a stop reads the same on both maps. */}
          <MarkerPopup closeButton className="journey-popup">
            <p className="journey-popup-index">
              {stopLabel} {index + 1} / {stops.length}
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
 * The sites of Karbala on one map, in two framings.
 *
 * A single view cannot hold them: the two shrines are 380 m apart and the
 * desert sites run 60 km out, so a map fitted to everything drops the city's
 * pins on top of each other. The switcher changes the framing, the pins and the
 * route together — one map instance, so one set of tiles and one WebGL context.
 */
function KarbalaMap({
  views,
  label,
  viewLabel,
  stopLabel,
  seeLabel,
}: {
  views: KarbalaMapView[]
  /** Accessible name for the map region. */
  label: string
  /** Label over the view switcher. */
  viewLabel: string
  /** Word that precedes the number in a popup, e.g. "Stop". */
  stopLabel: string
  /** Label above the "worth seeing" line in a popup. */
  seeLabel: string
}) {
  const holderRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [activeId, setActiveId] = useState(views[0].id)

  const active = views.find((view) => view.id === activeId) ?? views[0]

  /**
   * The map is at the bottom of a long page and the basemap style is a network
   * fetch, so mount it when it comes near the viewport and keep it. The holder
   * keeps its height while empty, so nothing shifts when the map arrives.
   */
  useEffect(() => {
    const node = holderRef.current
    if (!node || mounted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin: "400px" }
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [mounted])

  return (
    <div className="karbala-map-shell">
      <div className="karbala-map-views" role="group" aria-label={viewLabel}>
        {views.map((view) => (
          <Button
            key={view.id}
            variant={view.id === active.id ? "default" : "outline"}
            size="lg"
            className="karbala-map-view"
            aria-pressed={view.id === active.id}
            onClick={() => setActiveId(view.id)}
          >
            <span className="karbala-map-view-label">{view.label}</span>
            <span className="karbala-map-view-hint">{view.hint}</span>
          </Button>
        ))}
      </div>
      <div ref={holderRef} className="karbala-map">
        {mounted && (
          <Map
            aria-label={label}
            center={
              active.stops[Math.floor(active.stops.length / 2)]?.coordinates
            }
            zoom={10}
            /* Without this the map swallows the page scroll: a one-finger drag
               pans the map instead of the page. Zoom and pan still work with
               two fingers, or with the controls. */
            cooperativeGestures
          >
            <KarbalaLayers
              stops={active.stops}
              stopLabel={stopLabel}
              seeLabel={seeLabel}
              viewKey={active.id}
            />
          </Map>
        )}
        {/* The pins are canvas and MapLibre's popups open on click only, so the
            stop names exist nowhere in the accessibility tree without this.
            Announced, never drawn. */}
        <ul className="sr-only">
          {active.stops.map((stop) => (
            <li key={stop.name}>
              {stop.name} — {stop.kind}. {stop.note} {seeLabel}: {stop.see}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { KarbalaMap }

"use client"

import {
  ArrowUpRight,
  Building,
  Castle,
  Church,
  Droplets,
  Flag,
  GraduationCap,
  HeartPulse,
  Landmark,
  Milestone,
  Mosque,
  Mountain,
  Palmtree,
  Tent,
  Waves,
} from "lucide-react"

import Image from "next/image"
import { DocumentTitle } from "@/components/document-title"
import { KarbalaMap, type KarbalaMapView } from "@/components/karbala-map"
import { useLanguage } from "@/components/language-provider"
import { MarginNote, SiteFooter, SiteHeader } from "@/components/site-chrome"
import ScrollExpand from "@/components/ScrollExpand"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import type { KarbalaSiteIcon, KarbalaTourismId } from "@/lib/i18n"
import { karbalaSites } from "@/lib/places"

const siteIcons: Record<KarbalaSiteIcon, typeof Landmark> = {
  shrine: Mosque,
  axis: Landmark,
  standard: Flag,
  bridge: Waves,
  fortress: Castle,
  church: Church,
  palace: Building,
  marker: Milestone,
  cave: Mountain,
  khan: Tent,
  spring: Droplets,
}

const tourismConfig: Record<
  KarbalaTourismId,
  {
    Icon: React.ElementType
    className: string
    image?: string
  }
> = {
  religious: {
    Icon: Mosque,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    image: "/images/karbala-shrine.webp",
  },
  archaeological: {
    Icon: Castle,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    image: "/images/experiences/walk-800.webp",
  },
  natural: {
    Icon: Palmtree,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    image: "/images/experiences/water-800.webp",
  },
  educational: {
    Icon: GraduationCap,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    image: "/images/experiences/craft-800.webp",
  },
  medical: {
    Icon: HeartPulse,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
}

function TourismCardBackground({ id }: { id: KarbalaTourismId }) {
  const config = tourismConfig[id]

  if (config.image) {
    return (
      <>
        <Image
          src={config.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-30 dark:opacity-25 dark:group-hover:opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/20 dark:from-card dark:via-card/80 dark:to-card/30" />
      </>
    )
  }

  return (
    <>
      <div className="absolute -bottom-10 -end-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80 dark:bg-emerald-400/10" />
      <svg
        className="absolute end-4 bottom-8 h-40 w-40 text-foreground/10 transition-transform duration-500 group-hover:scale-105"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="75" strokeDasharray="4 6" opacity="0.4" />
        <path
          d="M35 100h30l15-28 20 56 15-28h45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/85 to-transparent" />
    </>
  )
}

/**
 * Karbala on its own page: the city, its thirteen historical sites, and the
 * map they share.
 *
 * The map is the journeys map from the landing page, with one addition — the
 * sites span two scales that a single framing cannot hold, so the map carries a
 * view switcher (see `components/karbala-map.tsx`).
 */
export default function KarbalaPage() {
  const { messages } = useLanguage()
  const { karbala, a11y } = messages
  const { hero, city, tourism, sites, maps, plate } = karbala

  // One lookup for the map: a view names its stops by id, and everything the
  // pin needs already sits on the site it points at.
  const siteById = new Map(sites.items.map((site) => [site.id, site]))
  const views: KarbalaMapView[] = maps.views.map((view) => ({
    id: view.id,
    label: view.label,
    hint: view.hint,
    stops: view.stops.flatMap((id) => {
      const site = siteById.get(id)

      return site
        ? [
            {
              name: site.name,
              coordinates: karbalaSites[id],
              kind: site.kind,
              note: site.description,
              see: site.see,
            },
          ]
        : []
    }),
  }))

  const links = [
    { label: karbala.nav.city, href: "#city" },
    { label: karbala.nav.tourism, href: "#tourism" },
    { label: karbala.nav.sites, href: "#sites" },
    { label: karbala.nav.map, href: "#map" },
  ]

  return (
    <>
      <DocumentTitle title={karbala.meta.title} />
      <a href="#main" className="skip-link">
        {a11y.skip}
      </a>
      <div className="page-guides" aria-hidden="true" />
      <SiteHeader
        links={links}
        cta={{ label: karbala.nav.all, href: "/#destinations" }}
      />
      <main id="main">
        <section
          className="hero hero-copy-only"
          aria-labelledby="karbala-title"
        >
          <div className="hero-copy">
            <h1 id="karbala-title">
              {hero.titleLine1}
              <br />
              {hero.titleLine2}
            </h1>
            <p>
              {hero.bodyLine1}
              <br className="desktop-break" /> {hero.bodyLine2}
            </p>
            <Button
              className="explore-button"
              size="lg"
              render={<a href="#sites" />}
              nativeButton={false}
            >
              {hero.cta} <ArrowUpRight data-icon="inline-end" />
            </Button>
          </div>
          <p className="margin-note left-note">
            <MarginNote lines={hero.noteLeft} />
          </p>
          <p className="margin-note right-note">
            <MarginNote lines={hero.noteRight} />
          </p>
        </section>
        {/* The shrine plate, straight under the intro: the landing page's
            scroll-expand component, which is now this page's opening image
            rather than its closing one. It keeps the story section's metrics
            so the two plates stay the same size on both pages. */}
        <section className="our-story plate-band" aria-label={plate.label}>
          <ScrollExpand
            className="story-expand shrine-expand"
            src="/images/karbala-shrine.webp"
            alt={plate.expandAlt}
            title={plate.heldLine}
            scrollHint={plate.expandHint}
            startWidth={56}
            startHeight={46}
            mediaZoom={1.25}
            scrollDistance={0.8}
            holdDistance={0.2}
            overlayScrim={0.95}
            useWindowScroll
          >
            <h3>{plate.overlayTitle}</h3>
            <p>{plate.overlayBody}</p>
          </ScrollExpand>
        </section>
        <section
          id="city"
          className="section-shell"
          aria-labelledby="city-title"
        >
          <div className="section-heading">
            <p className="section-index">{city.index}</p>
            <h2 id="city-title">
              {city.titleLine1}
              <br />
              {city.titleLine2}
            </h2>
            <p>
              {city.bodyLine1}
              <br className="desktop-break" /> {city.bodyLine2}
            </p>
          </div>
          <div className="city-grid">
            <div className="city-prose">
              <h3>{city.historyTitle}</h3>
              {city.history.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="city-pull">{city.pull}</p>
            </div>
            <div className="city-facts">
              <p className="section-index">{city.factsLabel}</p>
              <dl>
                {city.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
        <section
          id="tourism"
          className="section-shell"
          aria-labelledby="tourism-title"
        >
          <div className="section-heading">
            <p className="section-index">{tourism.index}</p>
            <h2 id="tourism-title">
              {tourism.titleLine1}
              <br />
              {tourism.titleLine2}
            </h2>
            <p>
              {tourism.bodyLine1}
              <br className="desktop-break" /> {tourism.bodyLine2}
            </p>
          </div>
          <BentoGrid className="lg:grid-rows-3">
            {tourism.items.map((item) => {
              const config = tourismConfig[item.id]

              return (
                <BentoCard
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  cta={item.cta}
                  href={item.href}
                  Icon={config.Icon}
                  className={config.className}
                  background={<TourismCardBackground id={item.id} />}
                />
              )
            })}
          </BentoGrid>
        </section>
        <section
          id="sites"
          className="section-shell"
          aria-labelledby="sites-title"
        >
          <div className="section-heading">
            <p className="section-index">{sites.index}</p>
            <h2 id="sites-title">
              {sites.titleLine1}
              <br />
              {sites.titleLine2}
            </h2>
            <p>
              {sites.bodyLine1}
              <br className="desktop-break" /> {sites.bodyLine2}
            </p>
          </div>
          <div className="destination-grid">
            {sites.items.map((site) => {
              const Icon = siteIcons[site.icon]

              return (
                <Dialog key={site.id}>
                  {/* The destinations ticket, without the illustrated plate: it
                      is the same card the landing page uses for a place, and
                      there is one per site here. */}
                  <Card className="destination-card site-card">
                    <CardHeader>
                      <div className="stamp-top">
                        <Icon aria-hidden="true" />
                        <span>{site.number}</span>
                      </div>
                      <CardTitle>
                        <h3>{site.name}</h3>
                      </CardTitle>
                      <CardDescription>{site.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <span>{site.area}</span>
                      <DialogTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`${sites.openLabel} ${site.name}`}
                          />
                        }
                      >
                        <ArrowUpRight />
                      </DialogTrigger>
                    </CardFooter>
                  </Card>
                  <DialogContent className="destination-dialog">
                    <DialogHeader>
                      <p className="section-index">
                        {site.area} / {site.number}
                      </p>
                      <DialogTitle>{site.name}</DialogTitle>
                      <DialogDescription>{site.kind}</DialogDescription>
                    </DialogHeader>
                    <div className="dialog-body">
                      <p>{site.detail}</p>
                    </div>
                    <div className="dialog-places">
                      <p className="section-index">{sites.seeLabel}</p>
                      <p className="site-see">{site.see}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
          <p className="collection-note">{sites.collectionNote}</p>
        </section>
        <section id="map" className="section-shell" aria-labelledby="map-title">
          <div className="section-heading">
            <p className="section-index">{maps.index}</p>
            <h2 id="map-title">
              {maps.titleLine1}
              <br />
              {maps.titleLine2}
            </h2>
            <p>
              {maps.bodyLine1}
              <br className="desktop-break" /> {maps.bodyLine2}
            </p>
          </div>
          <KarbalaMap
            views={views}
            label={maps.mapLabel}
            viewLabel={maps.viewLabel}
            stopLabel={maps.stopLabel}
            seeLabel={maps.seeLabel}
          />
        </section>
      </main>
      <Separator />
      <SiteFooter
        links={[{ label: karbala.nav.all, href: "/#destinations" }]}
      />
    </>
  )
}

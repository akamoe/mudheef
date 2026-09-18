"use client"

import { createRef, Fragment, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowDown,
  ArrowUpRight,
  Clock,
  Footprints,
  Landmark,
  MapPin,
  MoonStar,
  Music,
  Palette,
  Route,
  Ship,
  Sun,
  Utensils,
  Waves,
  Wind,
} from "lucide-react"

import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { JourneyMap } from "@/components/journey-map"
import { ThemeToggle } from "@/components/theme-toggle"
import ScrollExpand from "@/components/ScrollExpand"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { DestinationIcon, ExperienceIcon } from "@/lib/i18n"
import { places } from "@/lib/places"

const destinationIcons: Record<DestinationIcon, typeof Landmark> = {
  landmark: Landmark,
  waves: Waves,
  wind: Wind,
}

const experienceIcons: Record<ExperienceIcon, typeof Landmark> = {
  faith: MoonStar,
  food: Utensils,
  music: Music,
  water: Ship,
  craft: Palette,
  walk: Footprints,
}

/** Vintage plates for the chips. Add a key here and the chip switches to a
 *  photo; anything without one keeps its icon. */
const experienceImages: Partial<Record<ExperienceIcon, string>> = {
  faith: "/images/experiences/faith.webp",
  food: "/images/experiences/food.webp",
  music: "/images/experiences/music.webp",
  water: "/images/experiences/water.webp",
  craft: "/images/experiences/craft.webp",
  walk: "/images/experiences/walk.webp",
}

/** The header mark is the Arabic wordmark on its own — the English lockup is
 *  only used in the footer. */
function Brand({ mark = false }: { mark?: boolean }) {
  const { messages } = useLanguage()

  return (
    <span className="brand">
      <span className="brand-name" lang={mark ? "ar" : undefined}>
        {mark ? messages.brand.logo : messages.brand.name}
      </span>
      {mark ? null : (
        <span className="brand-alt" lang={messages.brand.altLang}>
          {messages.brand.alt}
        </span>
      )}
    </span>
  )
}

function MarginNote({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
      <span />
    </>
  )
}

function Newsletter() {
  const { messages } = useLanguage()
  const { newsletter, a11y } = messages
  const [consent, setConsent] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  return (
    <section
      className="section-shell newsletter"
      aria-labelledby="newsletter-title"
    >
      {/* The email input stays uncontrolled on purpose: there is no endpoint
          yet, so the browser's own `required` and `type="email"` validation
          does the work and the only state we keep is the confirmation flag. */}
      <form
        className="newsletter-coupon"
        aria-label={a11y.newsletterForm}
        onSubmit={(event) => {
          event.preventDefault()
          setSubscribed(true)
        }}
      >
        <p className="section-index">{newsletter.index}</p>
        <h2 id="newsletter-title">{newsletter.title}</h2>
        <p className="newsletter-body">{newsletter.body}</p>
        {subscribed ? (
          <p className="newsletter-success" role="status">
            {newsletter.success}
          </p>
        ) : (
          <>
            <div className="newsletter-form">
              <Label htmlFor="newsletter-email" className="sr-only">
                {newsletter.emailLabel}
              </Label>
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={newsletter.emailPlaceholder}
              />
              <Button type="submit" size="lg">
                {newsletter.submit}
              </Button>
            </div>
            <div className="newsletter-consent">
              <Checkbox
                id="newsletter-consent"
                name="consent"
                required
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked)}
              />
              <Label htmlFor="newsletter-consent">{newsletter.consent}</Label>
            </div>
          </>
        )}
      </form>
    </section>
  )
}

export default function Page() {
  const { messages, dir } = useLanguage()
  const {
    header,
    hero,
    destinations,
    experiences,
    placeInfo,
    journeys,
    events,
    journal,
    story,
    footer,
    a11y,
  } = messages

  const threadsRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const [chipRefs] = useState(() =>
    experiences.items.map(() => createRef<HTMLLIElement>())
  )

  return (
    <>
      <a href="#main" className="skip-link">
        {a11y.skip}
      </a>
      <div className="page-guides" aria-hidden="true" />
      <header className="site-header">
        <nav className="header-nav" aria-label={a11y.primaryNav}>
          <Button
            variant="ghost"
            render={<a href="#destinations" />}
            nativeButton={false}
          >
            {header.destinations}
          </Button>
          <Button
            variant="ghost"
            render={<a href="#our-story" />}
            nativeButton={false}
          >
            {header.story}
          </Button>
        </nav>
        <a href="#" className="brand-link" aria-label={a11y.home}>
          <Brand mark />
        </a>
        <div className="header-actions">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            className="header-cta"
            variant="ghost"
            render={<a href="#destinations" />}
            nativeButton={false}
          >
            {header.cta} <ArrowUpRight data-icon="inline-end" />
          </Button>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
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
              render={<a href="#destinations" />}
              nativeButton={false}
            >
              {hero.cta} <ArrowUpRight data-icon="inline-end" />
            </Button>
          </div>
          <div
            className="hero-landscape"
            role="img"
            aria-label={a11y.heroArt}
          />
          <p className="margin-note left-note">
            <MarginNote lines={hero.noteLeft} />
          </p>
          <p className="margin-note right-note">
            <MarginNote lines={hero.noteRight} />
          </p>
          <a
            href="#destinations"
            className="scroll-cue"
            aria-label={a11y.scrollToDestinations}
          >
            <ArrowDown aria-hidden="true" />
          </a>
        </section>
        <section
          id="destinations"
          className="destinations"
          aria-labelledby="destinations-title"
        >
          <div className="section-heading">
            <p className="section-index">{destinations.index}</p>
            <h2 id="destinations-title">
              {destinations.titleLine1}
              <br />
              {destinations.titleLine2}
            </h2>
            <p>
              {destinations.bodyLine1}
              <br className="desktop-break" /> {destinations.bodyLine2}
            </p>
          </div>
          <div className="destination-grid">
            {destinations.places.map((place) => {
              const Icon = destinationIcons[place.icon]

              return (
                <Dialog key={place.number}>
                  <Card className="destination-card">
                    <CardHeader>
                      <div className="stamp-top">
                        <Icon aria-hidden="true" />
                        <span>{place.number}</span>
                      </div>
                      <CardTitle>
                        <h3>
                          {place.name}
                          <br />
                          {place.subtitle}
                        </h3>
                      </CardTitle>
                      <CardDescription>{place.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="destination-art-content">
                      <div
                        className={`destination-art ${place.art}`}
                        role="img"
                        aria-label={place.artAlt}
                      />
                    </CardContent>
                    <CardFooter>
                      <span>{place.location}</span>
                      <DialogTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={place.exploreLabel}
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
                        {place.location} / {place.number}
                      </p>
                      <DialogTitle>
                        {place.name}
                        <br />
                        {place.subtitle}
                      </DialogTitle>
                      <DialogDescription>{place.detail}</DialogDescription>
                    </DialogHeader>
                    <div
                      className={`destination-art dialog-art ${place.art}`}
                      role="img"
                      aria-label={place.artAlt}
                    />
                    <p className="dialog-note">{place.note}</p>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
          <p className="collection-note">{destinations.collectionNote}</p>
        </section>
        <section
          id="experiences"
          className="section-shell experiences"
          aria-labelledby="experiences-title"
        >
          <div className="section-heading">
            <p className="section-index">{experiences.index}</p>
            <h2 id="experiences-title">
              {experiences.titleLine1}
              <br />
              {experiences.titleLine2}
            </h2>
            <p>
              {experiences.bodyLine1}
              <br className="desktop-break" /> {experiences.bodyLine2}
            </p>
          </div>
          <p className="rail-hint">{experiences.hint}</p>
          <div className="experience-threads" ref={threadsRef}>
            {experiences.items.map((item, index) => (
              <AnimatedBeam
                key={`${dir}-${item.id}`}
                containerRef={threadsRef}
                fromRef={chipRefs[index]}
                toRef={hubRef}
                curvature={[-70, 0, 70][index % 3]}
                endYOffset={[-10, 0, 10][index % 3]}
                reverse={index < 3 === (dir === "rtl")}
                duration={4}
                delay={(index % 3) * 0.5}
                pathColor="var(--border)"
                pathOpacity={0.8}
                pathWidth={2}
                gradientStartColor="var(--orange)"
                gradientStopColor="var(--orange)"
              />
            ))}
            <div className="experience-hub" ref={hubRef}>
              <Brand mark />
            </div>
            <ul className="experience-rail" aria-label={a11y.experiencesList}>
              {experiences.items.map((item, index) => {
                const Icon = experienceIcons[item.icon]
                const photo = experienceImages[item.icon]

                return (
                  <li key={item.id} ref={chipRefs[index]}>
                    <Dialog>
                      <DialogTrigger
                        render={
                          <Button
                            variant="outline"
                            className="experience-chip"
                          />
                        }
                      >
                        {photo ? (
                          <Image
                            className="experience-chip-art"
                            src={photo}
                            alt=""
                            width={64}
                            height={64}
                            aria-hidden="true"
                          />
                        ) : (
                          <span
                            className="experience-chip-icon"
                            aria-hidden="true"
                          >
                            <Icon />
                          </span>
                        )}
                        {item.label}
                      </DialogTrigger>
                      <DialogContent className="section-dialog">
                        <DialogHeader>
                          <p className="section-index">{item.label}</p>
                          <DialogTitle>{item.title}</DialogTitle>
                          <DialogDescription>{item.detail}</DialogDescription>
                        </DialogHeader>
                        <div className="dialog-places">
                          <p className="section-index">
                            {experiences.placesLabel}
                          </p>
                          <ul>
                            {item.places.map((place) => (
                              <li key={place}>
                                <MapPin aria-hidden="true" />
                                {place}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        <section
          id="journeys"
          className="section-shell journeys"
          aria-labelledby="journeys-title"
        >
          <div className="section-heading">
            <p className="section-index">{journeys.index}</p>
            <h2 id="journeys-title">
              {journeys.titleLine1}
              <br />
              {journeys.titleLine2}
            </h2>
            <p>
              {journeys.bodyLine1}
              <br className="desktop-break" /> {journeys.bodyLine2}
            </p>
          </div>
          <div className="destination-grid">
            {journeys.cards.map((journey) => {
              // Resolve ids to coordinates and copy once per card so the map
              // component stays dumb and `lib/places.ts` stays the only source
              // of truth for where anything is.
              const stops = journey.stops.map((stop) => ({
                name: stop.name,
                coordinates: places[stop.id],
                ...placeInfo[stop.id],
              }))

              return (
                <Card
                  key={journey.number}
                  /* `destination-card` is the ticket treatment — perforated edge,
                     clipped art frame, hover lift. It is reused verbatim rather
                     than copied so the journey grid cannot drift away from the
                     destination grid. */
                  className="destination-card journey-card"
                >
                  <CardHeader>
                    <div className="stamp-top">
                      <Route aria-hidden="true" />
                      <span>{journey.number}</span>
                    </div>
                    <CardTitle>
                      <h3>
                        {journey.name}
                        <br />
                        {journey.subtitle}
                      </h3>
                    </CardTitle>
                    <CardDescription>{journey.description}</CardDescription>
                  </CardHeader>
                  {/* The map takes the row the destination art takes in the
                      other grid: same ticket, the picture swapped for the
                      route. The printed stop list went with it — the pins say
                      the same thing, and clicking one says more. */}
                  <CardContent className="journey-map-content">
                    <JourneyMap
                      stops={stops}
                      label={`${journeys.mapLabel} — ${journey.name}`}
                      stopLabel={journeys.stopLabel}
                      seeLabel={journeys.seeLabel}
                    />
                  </CardContent>
                  <CardFooter>
                    <Badge variant="outline" className="duration-badge">
                      <Clock data-icon="inline-start" aria-hidden="true" />
                      {journey.duration}
                    </Badge>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>
        <section
          id="events"
          className="section-shell events"
          aria-labelledby="events-title"
        >
          <div className="section-heading">
            <p className="section-index">{events.index}</p>
            <h2 id="events-title">
              {events.titleLine1}
              <br />
              {events.titleLine2}
            </h2>
            <p>
              {events.bodyLine1}
              <br className="desktop-break" /> {events.bodyLine2}
            </p>
          </div>
          <ul className="event-list">
            {events.items.map((event) => (
              <li key={event.title}>
                <Card className="event-row">
                  <span className="event-window">{event.window}</span>
                  <div className="event-detail">
                    <div className="event-head">
                      <h3>{event.title}</h3>
                      <Badge variant="secondary" className="event-category">
                        {event.category}
                      </Badge>
                    </div>
                    <p>{event.description}</p>
                  </div>
                  <span className="event-place">
                    <MapPin aria-hidden="true" />
                    {event.place}
                  </span>
                </Card>
              </li>
            ))}
          </ul>
        </section>
        <section
          id="journal"
          className="section-shell journal"
          aria-labelledby="journal-title"
        >
          <div className="section-heading">
            <p className="section-index">{journal.index}</p>
            <h2 id="journal-title">
              {journal.titleLine1}
              <br />
              {journal.titleLine2}
            </h2>
            <p>
              {journal.bodyLine1}
              <br className="desktop-break" /> {journal.bodyLine2}
            </p>
          </div>
          <div className="journal-grid">
            {journal.items.map((item) => (
              <Dialog key={item.title}>
                <Card className="journal-card">
                  <CardHeader>
                    <p className="section-index journal-kicker">
                      {item.kicker}
                    </p>
                    <CardTitle>
                      <h3>{item.title}</h3>
                    </CardTitle>
                    <CardDescription>{item.dek}</CardDescription>
                    <p className="journal-byline">
                      {item.author} · {item.place}
                    </p>
                  </CardHeader>
                  <CardFooter>
                    <Badge variant="outline" className="journal-time">
                      <Clock data-icon="inline-start" aria-hidden="true" />
                      {item.readTime}
                    </Badge>
                    <DialogTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`${journal.openLabel}: ${item.title}`}
                        />
                      }
                    >
                      <ArrowUpRight />
                    </DialogTrigger>
                  </CardFooter>
                </Card>
                <DialogContent className="section-dialog">
                  <DialogHeader>
                    <p className="section-index">{item.kicker}</p>
                    <DialogTitle>{item.title}</DialogTitle>
                    <DialogDescription>{item.dek}</DialogDescription>
                  </DialogHeader>
                  <p className="dialog-byline">
                    {item.author} · {item.place} · {item.when}
                  </p>
                  {/* Lede, pull line, then the piece. The dialog is the article;
                      the card is only its first line. */}
                  <p className="dialog-excerpt">{item.excerpt}</p>
                  <p className="dialog-pull">{item.pull}</p>
                  <div className="dialog-body">
                    {item.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>
        <section
          id="our-story"
          className="our-story"
          aria-labelledby="story-title"
        >
          <Sun aria-hidden="true" />
          <p className="section-index">{story.index}</p>
          <h2 id="story-title">
            {story.titleLine1}
            <br />
            {story.titleLine2}
          </h2>
          <p>
            {story.bodyLine1}
            <br className="desktop-break" /> {story.bodyLine2}
          </p>
          <Button
            variant="link"
            render={<a href="#destinations" />}
            nativeButton={false}
          >
            {story.cta} <ArrowUpRight data-icon="inline-end" />
          </Button>
          {/* The mudhif plate opens to full bleed on the page scroll: the hero's
              land-of-stories line holds over the resting frame, then hands the
              stage to the hero's invitation as the engraving fills it. */}
          <ScrollExpand
            className="story-expand"
            src="/images/mudhif-engraving.webp"
            alt={story.expandAlt}
            title={`${hero.titleLine1} ${hero.titleLine2}`}
            scrollHint={story.expandHint}
            startWidth={56}
            startHeight={46}
            mediaZoom={1.25}
            scrollDistance={0.8}
            holdDistance={0.2}
            overlayScrim={0.95}
            useWindowScroll
          >
            <h3>{hero.bodyLine1}</h3>
            <p>{hero.bodyLine2}</p>
          </ScrollExpand>
        </section>
        <Newsletter />
      </main>
      <Separator />
      <footer className="site-footer">
        <a href="#" aria-label={a11y.home}>
          <Brand />
        </a>
        <p>{footer.tagline}</p>
        <span>
          © {new Date().getFullYear()} {footer.name}
        </span>
      </footer>
    </>
  )
}

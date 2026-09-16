"use client"

import { Fragment } from "react"
import {
  ArrowDown,
  ArrowUpRight,
  Landmark,
  Sun,
  Waves,
  Wind,
} from "lucide-react"

import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import type { DestinationIcon } from "@/lib/i18n"

const destinationIcons: Record<DestinationIcon, typeof Landmark> = {
  landmark: Landmark,
  waves: Waves,
  wind: Wind,
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

export default function Page() {
  const { messages } = useLanguage()
  const { header, hero, destinations, story, footer, a11y } = messages

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
        </section>
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

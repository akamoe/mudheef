"use client"

import {
  ArrowDown,
  ArrowUpRight,
  Landmark,
  Sun,
  Waves,
  Wind,
} from "lucide-react"
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

const destinations = [
  {
    number: "01",
    name: "Ishtar Gate,",
    subtitle: "Gateway of Babylon.",
    location: "BABYLON",
    icon: Landmark,
    description:
      "A story written in blue. Discover the beauty and wonder of ancient Iraq.",
    detail:
      "Let the blue bricks and golden details of Ishtar Gate be your introduction to Babylon. This illustrated glimpse celebrates a place where architecture, art, and ancient stories meet.",
    note: "For the curious · Art, architecture & ancient stories",
    art: "babylon",
  },
  {
    number: "02",
    name: "The Iraqi Marshes,",
    subtitle: "Life at a slower pace.",
    location: "SOUTHERN IRAQ",
    icon: Waves,
    description:
      "Reed houses, quiet waterways, and a welcome that feels like coming home.",
    detail:
      "Follow the water into a landscape of reeds, palms, and traditional mudhifs. Picture a slow journey in a mashoof boat, the sound of water, and time shared over a small glass of tea.",
    note: "For the slow traveler · Water, nature & local life",
    art: "marshes",
  },
  {
    number: "03",
    name: "Baghdad,",
    subtitle: "A city with a soul.",
    location: "BAGHDAD",
    icon: Wind,
    description:
      "Wander through old streets, shared stories, and the everyday poetry of a city.",
    detail:
      "Look up at wooden balconies, wander through brick-lined streets, and make room for an unhurried conversation. Our glimpse of Baghdad is about the small details that make a city stay with you.",
    note: "For the wanderer · City walks, culture & conversation",
    art: "baghdad",
  },
]
function Brand() {
  return (
    <span className="brand">
      <Sun aria-hidden="true" />
      <span>mudheef</span>
      <span className="brand-arabic" lang="ar">
        مُضيف
      </span>
    </span>
  )
}
export default function Page() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="page-guides" aria-hidden="true" />
      <header className="site-header">
        <nav className="header-nav" aria-label="Main navigation">
          <Button
            variant="ghost"
            render={<a href="#destinations" />}
            nativeButton={false}
          >
            Destinations
          </Button>
          <Button
            variant="ghost"
            render={<a href="#our-story" />}
            nativeButton={false}
          >
            Our story
          </Button>
        </nav>
        <a href="#" className="brand-link" aria-label="Mudheef home">
          <Brand />
        </a>
        <Button
          className="header-cta"
          variant="ghost"
          render={<a href="#destinations" />}
          nativeButton={false}
        >
          Find your next story <ArrowUpRight data-icon="inline-end" />
        </Button>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              A land of stories.
              <br />A place for yours.
            </h1>
            <p>
              Explore Iraq’s timeless places, living culture, and generous
              people.
              <br className="desktop-break" /> Real stories. Deeper connections.
              A more human way to travel.
            </p>
            <Button
              className="explore-button"
              size="lg"
              render={<a href="#destinations" />}
              nativeButton={false}
            >
              Explore Iraq <ArrowUpRight data-icon="inline-end" />
            </Button>
          </div>
          <div
            className="hero-landscape"
            role="img"
            aria-label="An engraved illustration of a traditional Iraqi reed Mudhif beside palms and still marsh water"
          />
          <p className="margin-note left-note">
            IRAQ,
            <br />
            AND ALWAYS
            <br />A GOOD STORY.
            <span />
          </p>
          <p className="margin-note right-note">
            PLACES.
            <br />
            PEOPLE.
            <br />A WARM WELCOME.
            <span />
          </p>
          <a
            href="#destinations"
            className="scroll-cue"
            aria-label="Scroll to destinations"
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
            <p className="section-index">A FEW PLACES TO BEGIN</p>
            <h2 id="destinations-title">
              Extraordinary places.
              <br />
              Unforgettable stories.
            </h2>
            <p>
              Ancient cities, living traditions, and landscapes like no other.
              <br className="desktop-break" /> Discover a different side of
              Iraq.
            </p>
          </div>
          <div className="destination-grid">
            {destinations.map((place) => (
              <Dialog key={place.number}>
                <Card className="destination-card">
                  <CardHeader>
                    <div className="stamp-top">
                      <place.icon aria-hidden="true" />
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
                      aria-label={`Vintage travel illustration of ${place.name.replace(",", "")}`}
                    />
                  </CardContent>
                  <CardFooter>
                    <span>{place.location}</span>
                    <DialogTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Explore ${place.name.replace(",", "")}`}
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
                    aria-label={`Illustration of ${place.name.replace(",", "")}`}
                  />
                  <p className="dialog-note">{place.note}</p>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          <p className="collection-note">
            Not just places to see. Places to feel.
          </p>
        </section>
        <section
          id="our-story"
          className="our-story"
          aria-labelledby="story-title"
        >
          <Sun aria-hidden="true" />
          <p className="section-index">THE SPIRIT OF MUDHEEF</p>
          <h2 id="story-title">
            Every journey begins
            <br />
            with a welcome.
          </h2>
          <p>
            Inspired by the mudhif — a place to gather, share stories, and
            welcome guests.
            <br className="desktop-break" /> We believe the best way to discover
            Iraq is to feel at home in it.
          </p>
          <Button
            variant="link"
            render={<a href="#destinations" />}
            nativeButton={false}
          >
            Find your place in the story <ArrowUpRight data-icon="inline-end" />
          </Button>
        </section>
      </main>
      <Separator />
      <footer className="site-footer">
        <a href="#" aria-label="Mudheef home">
          <Brand />
        </a>
        <p>Made of stories. Rooted in Iraq.</p>
        <span>© {new Date().getFullYear()} Mudheef</span>
      </footer>
    </>
  )
}

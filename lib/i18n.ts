import type { KarbalaSiteId, PlaceId } from "@/lib/places"

export const locales = ["en", "ar"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

/** Cookie the server reads so the first paint already has the right language. */
export const localeCookieName = "mudheef-locale"

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (locales as readonly string[]).includes(value)
  )
}

export function directionFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr"
}

export type DestinationArt = "babylon" | "marshes" | "baghdad"
export type DestinationIcon = "landmark" | "waves" | "wind"

export type Destination = {
  number: string
  name: string
  subtitle: string
  location: string
  icon: DestinationIcon
  art: DestinationArt
  artAlt: string
  exploreLabel: string
  description: string
  detail: string
  note: string
}

export type ExperienceIcon =
  "faith" | "food" | "music" | "water" | "craft" | "walk"

export type Experience = {
  id: string
  label: string
  icon: ExperienceIcon
  title: string
  detail: string
  places: string[]
}

export type JourneyStop = {
  /** Stable key into `lib/places.ts`, which owns the coordinate. This
   *  dictionary owns the name only, so translating a stop cannot move it. */
  id: PlaceId
  name: string
}

export type Journey = {
  number: string
  name: string
  subtitle: string
  duration: string
  description: string
  stops: JourneyStop[]
}

/** What a map pin cannot say by itself. */
export type PlaceInfo = {
  /** One phrase for what sort of place this is: "Ancient city", "Wetland". */
  kind: string
  /** Two lines on what the visitor is looking at. */
  note: string
  /** The one thing not to leave without seeing. */
  see: string
}

/** The marker a site gets on the Karbala map and on its card. */
export type KarbalaSiteIcon =
  | "shrine"
  | "axis"
  | "standard"
  | "bridge"
  | "fortress"
  | "church"
  | "palace"
  | "marker"
  | "cave"
  | "khan"
  | "spring"

/**
 * One historical site in Karbala or its governorate.
 *
 * The same entry feeds three surfaces: the card, its dialog, and the map
 * popup — so the popup's "what it is" line is the card's own `description`
 * and cannot drift from it.
 */
export type KarbalaSite = {
  /** Stable key into `karbalaSites` in `lib/places.ts`. */
  id: KarbalaSiteId
  number: string
  name: string
  /** What sort of place it is: "Holy shrine", "Ottoman caravansarai". */
  kind: string
  /** How far out it sits: "City centre", "About 50 km south-west". */
  area: string
  icon: KarbalaSiteIcon
  /** The card's two lines, reused verbatim as the map popup's note. */
  description: string
  /** The dialog's longer account. */
  detail: string
  /** The one thing not to leave without seeing. */
  see: string
}

export type KarbalaTourismId =
  | "religious"
  | "archaeological"
  | "natural"
  | "educational"
  | "medical"

export type KarbalaTourismItem = {
  id: KarbalaTourismId
  name: string
  description: string
  cta: string
  href: string
}

/** One framing of the Karbala map: a group of sites that belong together. */
export type KarbalaMapView = {
  /** Key used to switch views; the city view and the ring around it. */
  id: "city" | "region"
  label: string
  /** The line under the label: how many stops, and how they are made. */
  hint: string
  /** The sites this view draws, in the order the route runs. */
  stops: KarbalaSiteId[]
}

export type EventItem = {
  /** A window, not a fixed date — the copy says so out loud. Arabic uses
   *  spelled-out month names rather than the Latin abbreviations. */
  window: string
  title: string
  category: string
  place: string
  description: string
}

export type Story = {
  kicker: string
  title: string
  dek: string
  /** The opening paragraph. Set off by a rule and shown large in the dialog. */
  excerpt: string
  /** The rest of the piece, one entry per paragraph. */
  body: string[]
  /** One line set large between the lede and the body. */
  pull: string
  /** Byline. */
  author: string
  /** Where it was written. Keeps the journal tied to the map. */
  place: string
  /** Season and year. This site reads in windows, not dates. */
  when: string
  readTime: string
}

export type Dictionary = {
  meta: { title: string; description: string }
  brand: { name: string; alt: string; altLang: Locale; logo: string }
  language: { label: string; english: string; arabic: string }
  a11y: {
    skip: string
    home: string
    primaryNav: string
    heroArt: string
    scrollToDestinations: string
    experiencesList: string
    newsletterForm: string
    footerNav: string
  }
  theme: { label: string }
  header: { destinations: string; story: string; karbala: string; cta: string }
  hero: {
    titleLine1: string
    titleLine2: string
    bodyLine1: string
    bodyLine2: string
    cta: string
    noteLeft: string[]
    noteRight: string[]
  }
  destinations: {
    index: string
    titleLine1: string
    titleLine2: string
    bodyLine1: string
    bodyLine2: string
    collectionNote: string
    places: Destination[]
  }
  story: {
    index: string
    titleLine1: string
    titleLine2: string
    bodyLine1: string
    bodyLine2: string
    cta: string
    /** Copy for the mudhif plate in this section: the alt text for the
     *  engraving and the scroll cue. The held title and the text that replaces
     *  it reuse the hero's lines. */
    expandAlt: string
    expandHint: string
  }
  experiences: {
    index: string
    titleLine1: string
    titleLine2: string
    bodyLine1: string
    bodyLine2: string
    hint: string
    placesLabel: string
    items: Experience[]
  }
  /** Copy for the map popups in the journeys section, keyed by the same
   *  `PlaceId`s those journeys stop at. A stop carries its own name; this
   *  carries what the pin alone cannot say. */
  placeInfo: Record<PlaceId, PlaceInfo>
  journeys: {
    index: string
    titleLine1: string
    titleLine2: string
    bodyLine1: string
    bodyLine2: string
    /** Accessible name for the map on each card. */
    mapLabel: string
    /** Word before the number in a map popup. */
    stopLabel: string
    /** Label above the one thing not to miss, in a map popup. */
    seeLabel: string
    cards: Journey[]
  }
  events: {
    index: string
    titleLine1: string
    titleLine2: string
    bodyLine1: string
    bodyLine2: string
    items: EventItem[]
  }
  journal: {
    index: string
    titleLine1: string
    titleLine2: string
    bodyLine1: string
    bodyLine2: string
    openLabel: string
    items: Story[]
  }
  newsletter: {
    index: string
    title: string
    body: string
    emailLabel: string
    emailPlaceholder: string
    consent: string
    submit: string
    success: string
  }
  /** The Karbala city page at `/karbala`: the city, its sites, and their map. */
  karbala: {
    meta: { title: string; description: string }
    /** Header links, all in-page anchors of this page. */
    nav: { city: string; tourism: string; sites: string; map: string; all: string }
    hero: {
      titleLine1: string
      titleLine2: string
      bodyLine1: string
      bodyLine2: string
      cta: string
      noteLeft: string[]
      noteRight: string[]
    }
    city: {
      index: string
      titleLine1: string
      titleLine2: string
      bodyLine1: string
      bodyLine2: string
      /** Heading over the history prose, beside the fact sheet. */
      historyTitle: string
      /** The history, one entry per paragraph. */
      history: string[]
      /** One line set large between the prose and the fact sheet. */
      pull: string
      factsLabel: string
      facts: { label: string; value: string }[]
    }
    tourism: {
      index: string
      titleLine1: string
      titleLine2: string
      bodyLine1: string
      bodyLine2: string
      items: KarbalaTourismItem[]
    }
    sites: {
      index: string
      titleLine1: string
      titleLine2: string
      bodyLine1: string
      bodyLine2: string
      /** Label beside the "worth seeing" line in a site dialog. */
      seeLabel: string
      /** Accessible name for a site card's button, read before the name. */
      openLabel: string
      collectionNote: string
      items: KarbalaSite[]
    }
    maps: {
      index: string
      titleLine1: string
      titleLine2: string
      bodyLine1: string
      bodyLine2: string
      /** Accessible name for the map region. */
      mapLabel: string
      /** Label over the view switcher. */
      viewLabel: string
      /** Word before the number in a map popup. */
      stopLabel: string
      /** Label above the "worth seeing" line in a map popup. */
      seeLabel: string
      views: KarbalaMapView[]
    }
    /** The shrine plate that sits under the intro: the landing page's
     *  scroll-expand component, moved to the top of this page and standing on
     *  its own — which is why it carries the lines it used to sit beside. */
    plate: {
      /** Accessible name for the band; the plate itself has no printed title. */
      label: string
      /** The line held over the plate before it opens. */
      heldLine: string
      /** The heading that fades in once the plate fills the screen. */
      overlayTitle: string
      /** The line under it. */
      overlayBody: string
      /** Alt text for the plate. */
      expandAlt: string
      /** The scroll cue printed at the foot of the plate. */
      expandHint: string
    }
  }
  footer: { tagline: string; name: string }
}

/** The Arabic wordmark is drawn with kashida (tatweel) so the name stretches
 *  the way it would be set by hand, instead of being faked with letter-spacing. */
const arabicWordmark = "مُضــيـــف"

const en: Dictionary = {
  meta: {
    title: "Mudheef — A land of stories",
    description:
      "Explore Iraq’s timeless places, living culture, and generous spirit. Discover a different side of Iraq with Mudheef.",
  },
  brand: { name: "mudheef", alt: arabicWordmark, altLang: "ar", logo: arabicWordmark },
  language: { label: "Language", english: "English", arabic: "Arabic" },
  theme: { label: "Switch between light and dark" },
  a11y: {
    skip: "Skip to content",
    home: "Mudheef home",
    primaryNav: "Main navigation",
    heroArt:
      "An engraved illustration of a traditional Iraqi reed Mudhif beside palms and still marsh water",
    scrollToDestinations: "Scroll to destinations",
    experiencesList: "Ways to travel",
    newsletterForm: "Newsletter sign-up",
    footerNav: "Also on Mudheef",
  },
  header: {
    destinations: "Destinations",
    story: "Our story",
    karbala: "Karbala",
    cta: "Find your next story",
  },
  hero: {
    titleLine1: "A land of stories.",
    titleLine2: "A place for yours.",
    bodyLine1:
      "Explore Iraq’s timeless places, living culture, and generous people.",
    bodyLine2: "Real stories. Deeper connections. A more human way to travel.",
    cta: "Explore Iraq",
    noteLeft: ["IRAQ,", "AND ALWAYS", "A GOOD STORY."],
    noteRight: ["PLACES.", "PEOPLE.", "A WARM WELCOME."],
  },
  destinations: {
    index: "A FEW PLACES TO BEGIN",
    titleLine1: "Extraordinary places.",
    titleLine2: "Unforgettable stories.",
    bodyLine1:
      "Ancient cities, living traditions, and landscapes like no other.",
    bodyLine2: "Discover a different side of Iraq.",
    collectionNote: "Not just places to see. Places to feel.",
    places: [
      {
        number: "01",
        name: "Ishtar Gate,",
        subtitle: "Gateway of Babylon.",
        location: "BABYLON",
        icon: "landmark",
        art: "babylon",
        artAlt: "Vintage travel illustration of Ishtar Gate",
        exploreLabel: "Explore Ishtar Gate",
        description:
          "A story written in blue. Discover the beauty and wonder of ancient Iraq.",
        detail:
          "Let the blue bricks and golden details of Ishtar Gate be your introduction to Babylon. This illustrated glimpse celebrates a place where architecture, art, and ancient stories meet.",
        note: "For the curious · Art, architecture & ancient stories",
      },
      {
        number: "02",
        name: "The Iraqi Marshes,",
        subtitle: "Life at a slower pace.",
        location: "SOUTHERN IRAQ",
        icon: "waves",
        art: "marshes",
        artAlt: "Vintage travel illustration of the Iraqi Marshes",
        exploreLabel: "Explore the Iraqi Marshes",
        description:
          "Reed houses, quiet waterways, and a welcome that feels like coming home.",
        detail:
          "Follow the water into a landscape of reeds, palms, and traditional mudhifs. Picture a slow journey in a mashoof boat, the sound of water, and time shared over a small glass of tea.",
        note: "For the slow traveler · Water, nature & local life",
      },
      {
        number: "03",
        name: "Baghdad,",
        subtitle: "A city with a soul.",
        location: "BAGHDAD",
        icon: "wind",
        art: "baghdad",
        artAlt: "Vintage travel illustration of Baghdad",
        exploreLabel: "Explore Baghdad",
        description:
          "Wander through old streets, shared stories, and the everyday poetry of a city.",
        detail:
          "Look up at wooden balconies, wander through brick-lined streets, and make room for an unhurried conversation. Our glimpse of Baghdad is about the small details that make a city stay with you.",
        note: "For the wanderer · City walks, culture & conversation",
      },
    ],
  },
  story: {
    index: "THE SPIRIT OF MUDHEEF",
    titleLine1: "Every journey begins",
    titleLine2: "with a welcome.",
    bodyLine1:
      "Inspired by the mudhif — a place to gather, share stories, and welcome guests.",
    bodyLine2:
      "We believe the best way to discover Iraq is to feel at home in it.",
    cta: "Find your place in the story",
    expandAlt:
      "Engraving of a mudhif, the reed guest house of the southern marshes",
    expandHint: "Scroll",
  },
  experiences: {
    index: "WAYS TO TRAVEL",
    titleLine1: "Follow what",
    titleLine2: "pulls you.",
    bodyLine1:
      "Iraq is not one story. It is faith, food, water, music, and craft —",
    bodyLine2: "threads you can pull in any order.",
    hint: "Pick a thread.",
    placesLabel: "WHERE TO FEEL IT",
    items: [
      {
        id: "faith",
        label: "Faith",
        icon: "faith",
        title: "Faith & pilgrimage",
        detail:
          "Iraq holds some of the oldest shrines of the Abrahamic world. Whatever you believe, the scale and the quiet are worth the journey.",
        places: ["Najaf", "Karbala", "Ur", "Al-Nuri Mosque, Mosul"],
      },
      {
        id: "food",
        label: "Food",
        icon: "food",
        title: "Food & the table",
        detail:
          "Masgouf on the riverbank, dolma in a family kitchen, and tea that arrives before you ask for it. In Iraq, eating is hosting.",
        places: [
          "Masgouf on the Tigris",
          "The date markets of Basra",
          "A Kurdish breakfast in Erbil",
        ],
      },
      {
        id: "music",
        label: "Music",
        icon: "music",
        title: "Music & celebration",
        detail:
          "Maqam, oud, and the drum lines of the south. Iraqi music carries a long memory and a very good sense of timing.",
        places: [
          "The maqam houses of Baghdad",
          "Nowruz in the north",
          "Wedding bands in the south",
        ],
      },
      {
        id: "water",
        label: "Water",
        icon: "water",
        title: "Water & the marshes",
        detail:
          "The marshlands between the Tigris and the Euphrates are among the oldest inhabited wetlands in the world, and they keep their own time.",
        places: ["Chibayish", "The Hammar Marshes", "The Hawizeh Marshes"],
      },
      {
        id: "craft",
        label: "Craft",
        icon: "craft",
        title: "Craft & the handmade",
        detail:
          "Reed weaving, copper in the old souks, kilim, and calligraphy. Things made slowly, by people who have made them for generations.",
        places: [
          "The copper souk, Baghdad",
          "Reed weaving in the marshes",
          "Calligraphers on Mutanabbi Street",
        ],
      },
      {
        id: "walk",
        label: "On foot",
        icon: "walk",
        title: "Walking the old cities",
        detail:
          "The best of Iraq is at walking speed: wooden balconies, narrow alleys, and conversations that begin with tea.",
        places: ["Old Baghdad", "Erbil Citadel", "Old Mosul", "Babylon"],
      },
    ],
  },
  placeInfo: {
    baghdad: {
      kind: "Capital city",
      note: "Founded in 762 as the round city of the Abbasids. The Tigris still sets the pace here.",
      see: "The Abbasid palace on the river, and the copper market at dusk.",
    },
    babylon: {
      kind: "Ancient city",
      note: "Capital of the Babylonian empire, with the Ishtar Gate and the rebuilt palace of Nebuchadnezzar II.",
      see: "The Ishtar Gate reconstruction and the processional way at first light.",
    },
    ur: {
      kind: "Ancient city",
      note: "A Sumerian city and the birthplace of Abraham. Its ziggurat still stands above the plain.",
      see: "The ziggurat stairway and the royal tombs — go early, there is no shade.",
    },
    uruk: {
      kind: "Ancient city",
      note: "Uruk gave the world its first writing and its first epic. In legend, Gilgamesh ruled here.",
      see: "The White Temple platform and the first clay tablets.",
    },
    nineveh: {
      kind: "Ancient city",
      note: "Assyrian capital on the edge of Mosul, known for its palaces and the library of Ashurbanipal.",
      see: "The Mashki Gate, and the reliefs in the Mosul Museum nearby.",
    },
    nasiriyah: {
      kind: "Gateway town",
      note: "The usual way into the marshes, halfway between Baghdad and Basra.",
      see: "The Ziggurat of Ur is an hour away — leave before sunrise.",
    },
    chibayish: {
      kind: "Marsh town",
      note: "Reed houses, mashoof boats, and the clearest view of life lived on the water.",
      see: "A mashoof ride through the reeds at sunset, and the fish grilled on the bank.",
    },
    "hammar-marshes": {
      kind: "Wetland",
      note: "The largest of the southern marshes, and the quickest to come back when the water does.",
      see: "The birdlife in the early morning; the marshes sit on the migration route.",
    },
    "hawizeh-marshes": {
      kind: "Wetland",
      note: "The marsh that held its water through the dry years, on the road down to Basra.",
      see: "Buffalo herds, and the reed guest houses still built by hand.",
    },
    "mutanabbi-street": {
      kind: "Booksellers’ street",
      note: "Baghdad’s book street, named for the poet, and busiest on a Friday morning.",
      see: "Friday morning, when the stalls fill the whole street.",
    },
    "old-baghdad": {
      kind: "Historic quarter",
      note: "Wooden balconies, narrow lanes, and the glass of tea that starts most conversations.",
      see: "The wooden shanasheel balconies, best seen from the opposite bank.",
    },
    "tigris-corniche": {
      kind: "Riverside",
      note: "Abu Nuwas and the riverbank, where the city comes out to walk at dusk.",
      see: "Sunset, when the riverbank fills with families.",
    },
    "kadhimiya-market": {
      kind: "Historic market",
      note: "The market around the shrine: copper, sweets, and a crowd that never quite thins.",
      see: "The gold souk and the sweet shops around the shrine.",
    },
  },
  journeys: {
    index: "SUGGESTED JOURNEYS",
    titleLine1: "A shape for",
    titleLine2: "your first week.",
    bodyLine1: "Three routes to borrow, adapt, or ignore.",
    bodyLine2: "Every journey here can begin anywhere.",
    mapLabel: "Map of the suggested route",
    stopLabel: "Stop",
    seeLabel: "Worth seeing",
    cards: [
      {
        number: "01",
        name: "The first cities,",
        subtitle: "Five days in Mesopotamia.",
        duration: "5 days",
        description:
          "The oldest cities in the world, strung north to south along the rivers.",
        stops: [
          { id: "baghdad", name: "Baghdad" },
          { id: "babylon", name: "Babylon" },
          { id: "ur", name: "Ur" },
          { id: "uruk", name: "Uruk" },
          { id: "nineveh", name: "Nineveh" },
        ],
      },
      {
        number: "02",
        name: "The marsh road,",
        subtitle: "Three days on the water.",
        duration: "3 days",
        description:
          "Reed houses, mashoof boats, and nights that stay warm long after dark.",
        stops: [
          { id: "nasiriyah", name: "Nasiriyah" },
          { id: "chibayish", name: "Chibayish" },
          { id: "hammar-marshes", name: "The Hammar Marshes" },
          { id: "hawizeh-marshes", name: "The Hawizeh Marshes" },
        ],
      },
      {
        number: "03",
        name: "Baghdad on foot,",
        subtitle: "Two days, no car.",
        duration: "2 days",
        description:
          "Old streets, booksellers, and evenings that end on the riverbank.",
        stops: [
          { id: "mutanabbi-street", name: "Mutanabbi Street" },
          { id: "old-baghdad", name: "Old Baghdad" },
          { id: "tigris-corniche", name: "The Tigris corniche" },
          { id: "kadhimiya-market", name: "Kadhimiya market" },
        ],
      },
    ],
  },
  events: {
    index: "WHAT'S ON",
    titleLine1: "The year has",
    titleLine2: "a rhythm.",
    bodyLine1:
      "Iraq reads better by season. These are windows, not fixed dates —",
    bodyLine2: "check locally before you book.",
    items: [
      {
        window: "MAR",
        title: "Nowruz in the mountains",
        category: "Culture",
        place: "Erbil & Duhok",
        description:
          "The new year kept with fires, picnics, and new clothes across the Kurdish north.",
      },
      {
        window: "APR–MAY",
        title: "The marshes fill",
        category: "Nature",
        place: "Chibayish & the Hammar",
        description:
          "The water rises, the reeds come back, and the mashoof returns to the channels.",
      },
      {
        window: "SEP–OCT",
        title: "Date harvest",
        category: "Food",
        place: "Basra & the south",
        description:
          "The palms come down, and the whole south smells of sugar for a fortnight.",
      },
      {
        window: "NOV",
        title: "The Baghdad book fair",
        category: "Books",
        place: "Baghdad",
        description:
          "A week of publishers and poets, spilling out along Mutanabbi Street.",
      },
    ],
  },
  journal: {
    index: "THE JOURNAL",
    titleLine1: "Longer stories,",
    titleLine2: "written slowly.",
    bodyLine1:
      "Field notes, recipes, and conversations from the places we send you.",
    bodyLine2: "No listicles.",
    openLabel: "Read the story",
    items: [
      {
        kicker: "FIELD NOTES",
        title: "What a mudhif is actually for",
        dek: "The reed house is not a dwelling. It is a guest room, a council chamber, and a stage.",
        excerpt:
          "A mudhif looks like a building and behaves like an invitation. The arched reed hall is raised by a whole village in a matter of weeks, and it belongs to the guests rather than the host — which is why the sheikh who commissioned it may sleep elsewhere. Sit inside one in the late afternoon and the light comes through the reed lattice in stripes, and the acoustics carry a whisper the length of the room.",
        readTime: "6 min",
        author: "Zahra al-Maliki",
        place: "Chibayish",
        when: "Spring 2026",
        pull: "The house belongs to the guest. The host is the one who sleeps elsewhere.",
        body: [
          "The frame goes up first: arched ribs of reed bound into bundles, bent and pinned. Then the mats are laid over them in overlapping courses, and the whole thing is finished in weeks rather than months. Nothing is nailed, and everything can be taken apart and moved.",
          "What that means in practice is that a mudhif sits closer to infrastructure than to property. Nobody inherits it in the ordinary sense. It belongs to whoever is being hosted, and the village keeps it standing in order to keep hosting.",
        ],
      },
      {
        kicker: "FROM THE WATER",
        title: "Learning to pole a mashoof",
        dek: "Standing up in a narrow boat is the easy part. Steering it is the whole apprenticeship.",
        excerpt:
          "The mashoof is a long, thin, astonishingly light boat, and it has been the transport of the marshes for millennia. You stand rather than sit. You push rather than row. Nothing about the motion is intuitive to a beginner, and the reed beds are unforgiving of hesitation — which is why every household has a child who has been practising since before they could properly swim.",
        readTime: "4 min",
        author: "Haidar al-Saadi",
        place: "The Hammar Marshes",
        when: "Summer 2025",
        pull: "You do not row a mashoof. You push the water away and let the boat catch up.",
        body: [
          "The pole is cut from local reed or a length of bamboo, and it is longer than the boat. You stand near the back, drive it down through the water into the silt, and walk the boat forward along it. The stroke is slow. There is no purchase in it to rush.",
          "What beginners find hardest is not balance but patience. The reed beds close in on both sides, the water is barely deep enough for the pole, and every correction you make with your hips is immediately legible in the wake behind you.",
        ],
      },
      {
        kicker: "IN THE KITCHEN",
        title: "Masgouf, and the argument about how to cook it",
        dek: "Every family has the correct method, and every other family is doing it wrong.",
        excerpt:
          "Masgouf is carp, split, salted, and stood upright around an open fire until the skin blisters and the fat runs. That much everyone agrees on. Everything else — the marinade, the distance from the coals, whether the fish should face the flame or the wind — is a matter on which no two households have ever agreed, and on which no one has ever changed their mind.",
        readTime: "5 min",
        author: "Noor al-Din Abbas",
        place: "Baghdad",
        when: "Autumn 2025",
        pull: "The recipe is four ingredients. The argument is everything else.",
        body: [
          "The fire is the real technique. It is built to one side and fed until the coals are white, and the fish is set around it at a distance that has to be judged rather than measured. Too close and the skin burns before the flesh sets; too far and you have smoked it, which is a different dish that nobody ordered.",
          "It is served with the head still on, over a bed of onions and tomatoes that have cooked in the fat, and it is eaten with bread and with the hands. Whoever sits nearest the bone gets the best of it, and everyone at the table understands this.",
        ],
      },
      {
        kicker: "ON FOOT",
        title: "Mutanabbi Street on a Friday morning",
        dek: "A street of booksellers, rebuilt more than once, that fills up the same way every week.",
        excerpt:
          "Mutanabbi Street runs a few hundred metres between the river and the old bookshops, and on a Friday morning it becomes one continuous stall. Tables are set out end to end: printed Arabic poetry, school textbooks from the sixties, engineering manuals, Spanish novels, a decade of magazines. Nobody is selling anything you were looking for.",
        readTime: "7 min",
        author: "Zahra al-Maliki",
        place: "Baghdad",
        when: "Spring 2026",
        pull: "The street was destroyed in 2007. The books were back on the pavement before the rubble was cleared.",
        body: [
          "The street is named for the tenth-century poet said to have been killed near here, and it has been the booksellers’ address for centuries. It has also been burnt and bombed. The 2007 car bomb killed more than twenty people and wrecked most of the shops along one side. What followed is the detail that stays with you: a street with no shops still had booksellers, working from tables on the pavement, and it filled again.",
          "Friday is the right day because the offices around it are shut, which is the only time the street has room to be itself. Come before ten. Buy something for the price of a coffee and you will be given the history of the edition, the family that printed it, and a firm opinion about which translation you should have bought instead.",
        ],
      },
      {
        kicker: "FROM THE WATER",
        title: "What the marshes lost, and what came back",
        dek: "The water was taken away on purpose, and then let back in. Not everything returned.",
        excerpt:
          "In the early nineties the marshes between the Tigris and the Euphrates were drained. It was not a drought and it was not neglect. Canals were cut, embankments raised, and the water routed away from the reed beds deliberately, and within a decade most of the marshland had gone to salt flat and dust.",
        readTime: "8 min",
        author: "Haidar al-Saadi",
        place: "The Hawizeh Marshes",
        when: "Winter 2026",
        pull: "Reeds come back in a season. A way of life takes longer.",
        body: [
          "After 2003 the embankments were breached and the water allowed back in. The result is the strangest landscape in the country: reeds standing in water again, buffalo back on the banks, and villages rebuilt on the exact footprints of the ones that were emptied. Satellite imagery shows the green returning in stages and then retreating again through the dry years, which is the part that never makes it into the story.",
          "What did not come back as easily is the knowledge. The reed weaving, the boat-building, the seasonal routes through channels that shift every year — these were held by people who spent the nineties somewhere else, or did not survive them. The water is a problem that engineering can address. The rest is being relearned by families who are, in some cases, the first generation back.",
        ],
      },
      {
        kicker: "IN THE GROUND",
        title: "How to read a tell",
        dek: "A hill in southern Iraq is usually not a hill. It is a city, compressed.",
        excerpt:
          "A tell is what you get when people live in the same place for four thousand years. Mud-brick walls collapse, the rain turns them back into mud, and the next generation levels the ground and builds on top. Repeat that a few dozen times and you have a mound forty metres high with a city inside it.",
        readTime: "6 min",
        author: "Yusuf al-Bayati",
        place: "Ur",
        when: "Autumn 2025",
        pull: "Every generation built on the one before it. The mound is the stack.",
        body: [
          "This is why the archaeology of Iraq is vertical. You do not so much dig a site as descend through one: the top layers Islamic, then Sasanian, then Hellenistic, then Assyrian or Babylonian, then Sumerian, each level closer to the water table and further from anything you can date by reading a coin. A pottery sherd from a given layer is often the only clock you have.",
          "It is also why so many of the great sites here look like nothing at all from the road. Babylon, Ur and Uruk are mostly unexcavated mounds with one famous piece at one end. The ziggurat at Ur is the exception that proves the rule: it looks the way you expect because it is the one thing on the site designed to be seen from a distance.",
        ],
      },
    ],
  },
  newsletter: {
    index: "KEEP IN TOUCH",
    title: "One letter a month.",
    body: "New journeys, new stories, and the occasional recipe. No noise.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    consent:
      "I agree to receive the Mudheef letter. I can unsubscribe at any time.",
    submit: "Subscribe",
    success: "Thank you — check your inbox to confirm.",
  },
  footer: { tagline: "Made of stories. Rooted in Iraq.", name: "Mudheef" },
  karbala: {
    meta: {
      title: "Karbala — The city of the two shrines",
      description:
        "The city that grew around the shrines of Imam Husayn and Al-Abbas, and the thirteen historical sites of Karbala governorate, with a map of each.",
    },
    nav: {
      city: "The city",
      tourism: "Tourism types",
      sites: "Historical sites",
      map: "The map",
      all: "All destinations",
    },
    hero: {
      titleLine1: "Karbala.",
      titleLine2: "A city of two shrines.",
      bodyLine1:
        "Holiest ground in the south, and a working city of some 800,000 people.",
      bodyLine2:
        "Two shrines in the middle, an old city around them, and desert on every side.",
      cta: "See the thirteen places",
      noteLeft: ["32.617° N,", "44.033° E.", "IRAQ."],
      noteRight: ["SHRINES.", "OLD CITY.", "DESERT."],
    },
    city: {
      index: "THE CITY",
      titleLine1: "First a battlefield.",
      titleLine2: "Then a city.",
      bodyLine1:
        "In 680 CE Husayn ibn Ali was killed here with his family and companions, at a place called al-Taff.",
      bodyLine2:
        "The town that grew over the grave is now the second city of central Iraq.",
      historyTitle: "From al-Taff to Karbala",
      history: [
        "The battle was fought on 10 Muharram 61 — October 680 — between Husayn ibn Ali, grandson of the Prophet, and an army sent by the Umayyad governor of Kufa. Husayn's party was small and it was destroyed in a morning. The dead were buried where they fell, on a rise of dry ground west of the Euphrates.",
        "A city followed the grave. A shrine was raised and rebuilt across the centuries — the Abbasid caliph al-Mutawakkil had it demolished, and it was raised again. Under the Buyids came the first city wall and its bazaars, in 982; from the Safavid and Qajar centuries onward, Persian pilgrims and scholars settled here in numbers, and the religious seminaries that grew up beside the shrines are still the reason many of Karbala's families are here.",
        "That history explains the shape of the place. Between the two shrines runs the street the city calls Bayn al-Haramayn, and around it sits a closed, walkable centre with no cars inside a 1.5 km ring. Everything else — the bazaars, the husayniyyas, the hotels — is arranged by its distance from those few hundred metres, and for two months of the year, around Muharram and Arbaeen, they hold one of the largest annual gatherings anywhere.",
      ],
      pull: "The grave came first. The city is what followed.",
      factsLabel: "AT A GLANCE",
      facts: [
        { label: "Governorate", value: "Karbala, central Iraq" },
        {
          label: "Settled",
          value: "690 CE — the city grew up after the battle of 680",
        },
        { label: "Population", value: "About 800,000 (2024 census)" },
        { label: "Elevation", value: "28 m above sea level" },
        {
          label: "Distance",
          value: "About 90 km south-west of Baghdad, 80 km north of Najaf",
        },
        {
          label: "Water",
          value: "A few kilometres east of Lake Milh (al-Razzaza)",
        },
        {
          label: "Getting there",
          value:
            "No airport yet — arrive by road, or on the Baghdad–Basra rail line",
        },
        {
          label: "The centre",
          value: "No cars inside a 1.5 km ring around the two shrines",
        },
        {
          label: "Season",
          value: "October to April. July and August run past 45 °C.",
        },
        {
          label: "Busiest",
          value:
            "Arbaeen, forty days after Ashura, when pilgrims walk in from Najaf",
        },
      ],
    },
    tourism: {
      index: "TYPES OF TOURISM",
      titleLine1: "Five facets of",
      titleLine2: "one holy city.",
      bodyLine1:
        "Beyond spiritual pilgrimage, Karbala is a vibrant nexus of antiquity,",
      bodyLine2:
        "world-class healthcare, deep scholarship, and desert nature.",
      items: [
        {
          id: "religious",
          name: "Religious Tourism",
          description:
            "The spiritual heart of Karbala, centered on the holy shrines of Imam Husayn and Al-Abbas, Bayn al-Haramayn, and the sacred Arbaeen journey welcoming millions of pilgrims annually.",
          cta: "Explore holy shrines",
          href: "#sites",
        },
        {
          id: "archaeological",
          name: "Archaeological Tourism",
          description:
            "Echoes of deep antiquity: the monumental Abbasid fortress of Al-Ukhaidir, the fifth-century Al-Aqiser Church, Simeon Palace, and prehistoric Tar Caves.",
          cta: "Discover desert ruins",
          href: "#sites",
        },
        {
          id: "natural",
          name: "Natural Tourism",
          description:
            "Desert waters and serene oases: the vast expanse of Lake Razzaza (Milh), the bubbling sulfur springs of Ayn al-Tamr, and date groves on the desert verge.",
          cta: "See springs & oasis",
          href: "#map",
        },
        {
          id: "educational",
          name: "Educational Tourism",
          description:
            "Centuries of intellectual legacy, from the venerable Hawza religious seminaries and historic archives to Warith Al-Anbiyaa University and modern academic symposiums.",
          cta: "Explore academic life",
          href: "#city",
        },
        {
          id: "medical",
          name: "Medical Tourism",
          description:
            "A premier medical hub in Iraq: advanced specialized medicine, oncology, and surgical centers at Warith International Foundation and Al-Kafeel Super Speciality Hospital.",
          cta: "Learn about care centers",
          href: "#city",
        },
      ],
    },
    sites: {
      index: "HISTORICAL SITES",
      titleLine1: "Thirteen places,",
      titleLine2: "one city.",
      bodyLine1:
        "Two shrines in the middle, and a ring of sites out in the desert —",
      bodyLine2: "Abbasid, Ottoman, Christian, and prehistoric.",
      seeLabel: "Worth seeing",
      openLabel: "Read about",
      collectionNote:
        "Thirteen places. Two of them are the reason for the other eleven.",
      items: [
        {
          id: "imam-husayn-shrine",
          number: "01",
          name: "Imam Husayn Shrine",
          kind: "Holy shrine",
          area: "City centre",
          icon: "shrine",
          description:
            "The grave of Husayn ibn Ali, grandson of the Prophet, and the reason Karbala exists.",
          detail:
            "The shrine stands on the ground where Husayn was killed on 10 Muharram 61 — October 680. A tomb became a shrine, the shrine became a city, and the city became one of the centres of Shia learning: al-Mutawakkil ordered the building demolished in the ninth century and it was raised again. It has been damaged, rebuilt and enlarged several times since.",
          see: "The courtyard before sunrise, when it is nearly empty.",
        },
        {
          id: "bayn-al-haramayn",
          number: "02",
          name: "Bayn al-Haramayn",
          kind: "The old city axis",
          area: "Between the two shrines",
          icon: "axis",
          description:
            "The street between the shrines — the axis the whole old city is arranged around.",
          detail:
            "Bayn al-Haramayn, “between the two sanctuaries”, is the name of both the short street and the quarter that joins the two shrines, and on a pilgrimage day it is among the most crowded few hundred metres in Iraq. Everything else in the old city is described by its distance from here: the bazaars, the husayniyyas, the hotels, the seminaries.",
          see: "The crush at Maghrib, with a gold dome at either end of the street.",
        },
        {
          id: "abbas-shrine",
          number: "03",
          name: "Al-Abbas Shrine",
          kind: "Holy shrine",
          area: "City centre",
          icon: "shrine",
          description:
            "The tomb of Abbas ibn Ali, Husayn's half-brother and standard-bearer, 380 m from the Imam.",
          detail:
            "Abbas carried the flag at Karbala and was killed fetching water for the camp's children, which is why pilgrims treat this shrine as the city's own and come here in particular on Tasu'a, the day before Ashura. Persian and Central Asian architects built the present structure: a pear-shaped dome, two tall minarets, a tomb under silver trelliswork and gold, and carpets rolled out across the floor.",
          see: "The courtyard and the dome seen from the Bayn al-Haramayn side.",
        },
        {
          id: "al-hurr-mosque",
          number: "04",
          name: "Al-Hurr ibn Yazid Mosque",
          kind: "Shrine and mosque",
          area: "North-west, on the Baghdad road",
          icon: "standard",
          description:
            "The grave of the commander who changed sides on the morning of the battle.",
          detail:
            "Al-Hurr ibn Yazid al-Tamimi led the cavalry that stopped Husayn's caravan on the road to Kufa, then left the Umayyad army on the morning of 10 Muharram and died fighting beside him. The shrine marks where he fell, on the north-western edge of the city towards Baghdad, and it is one of the first stops on the pilgrimage roads in.",
          see: "The approach from the Baghdad road at first light.",
        },
        {
          id: "white-bridge",
          number: "05",
          name: "The White Bridge",
          kind: "Ottoman bridge, 1550",
          area: "Al-Husseiniya, east of the city",
          icon: "bridge",
          description:
            "A 1550 bridge over the Husseiniya, on the old eastern approach to the city.",
          detail:
            "The White Bridge was built in 1550 across the Husseiniya, and it has carried pilgrims into Karbala for close to five centuries. It is one of the few dated pieces of Ottoman civil engineering left in the governorate, and the river under it still waters the orchards east of the city.",
          see: "The arches from the low east bank.",
        },
        {
          id: "al-ukhaidir-fortress",
          number: "06",
          name: "Al-Ukhaidir Fortress",
          kind: "Abbasid fortress, 775 CE",
          area: "About 50 km south-west",
          icon: "fortress",
          description:
            "An Abbasid fortress standing alone in the desert, the finest of its kind in Iraq.",
          detail:
            "Built around 775 CE, Al-Ukhaidir is the best surviving example of Abbasid military architecture and has been on Iraq's UNESCO World Heritage tentative list since 2000. Behind the single gate is a whole complex — vaulted halls, a mosque, lodgings, stables — while the long outer walls carry almost no towers, which is one of the puzzles the building still sets.",
          see: "The vaulted hall behind the gate, and the desert from the ramparts.",
        },
        {
          id: "al-aqiser",
          number: "07",
          name: "Al-Aqiser",
          kind: "Ancient church",
          area: "Ayn al-Tamr, about 45 km west",
          icon: "church",
          description:
            "A small ruined church in the western desert, described as the oldest in the East.",
          detail:
            "Al-Aqiser stands at Ayn al-Tamr on the western edge of the governorate: a small church with a nave and an apse, oriented east, dated by most accounts to the fifth century and described as the oldest church of the East. In 2019 a Chaldean congregation said prayers in the ruins again.",
          see: "The apse, and the mud-brick town around it.",
        },
        {
          id: "imam-ali-dropper-shrine",
          number: "08",
          name: "Imam Ali's Dropper Shrine",
          kind: "Spring and mosque",
          area: "About 25 km west",
          icon: "spring",
          description:
            "A desert spring, held to have been brought back to life by Imam Ali, with a mosque beside it.",
          detail:
            "A small spring in the country west of Karbala, with a mosque built beside it, held by tradition to be one of the places where Imam Ali brought water out of the ground. It is a stop on the western pilgrimage routes and one of very few places between the city and the desert with water and shade.",
          see: "The spring itself — it is still running.",
        },
        {
          id: "simeon-palace",
          number: "09",
          name: "Simeon's Palace",
          kind: "Pre-Islamic ruins",
          area: "About 45 km west",
          icon: "palace",
          description:
            "What is left of a palace and its estate from before Islam, out on the western plain.",
          detail:
            "Qasr Shimon is the remnant of a palace and its estate from before Islam, west of Karbala, its walls cut down to stubs. It belongs with Al-Aqiser and Al-Ukhaidir to the same scatter of late-antique and early-Islamic buildings in this desert, and is usually seen on the same day.",
          see: "The plan of the building, still legible from the low walls.",
        },
        {
          id: "mujada-ruins",
          number: "10",
          name: "Ruins of Mujada",
          kind: "Unidentified ruin",
          area: "About 40 km south-west, desert",
          icon: "marker",
          description:
            "A cylindrical ruin in open desert whose origin nobody has settled.",
          detail:
            "Al-Mujada is a cylindrical structure of unknown origin, standing more than 30 m above sea level in open desert about 40 km from the city. There is no inscription, no settled date and no agreed purpose — which is the reason to go, and the reason to take water and a driver who knows the way.",
          see: "The masonry, and the view back towards Karbala.",
        },
        {
          id: "tar-caves",
          number: "11",
          name: "Tar Caves",
          kind: "Cave complex",
          area: "About 50 km south-west",
          icon: "cave",
          description:
            "A cave complex in the desert, inhabited on and off since prehistoric times.",
          detail:
            "Kahf al-Tar is a large cave complex south-west of the city, occupied since prehistoric times and used by later communities as shelter. It is not a monument with a car park: the last stretch of road is rough, and the desert here is genuinely empty.",
          see: "The main chamber, and the silence outside it.",
        },
        {
          id: "khan-al-atshan",
          number: "12",
          name: "Khan al-Atshan",
          kind: "Eighth-century ruin",
          area: "About 30 km south",
          icon: "fortress",
          description:
            "The ruin of a fortified waystation on the road south towards Najaf.",
          detail:
            "Khan al-Atshan — “the thirsty khan” — is the ruin of a fortified waystation dating to the eighth century, south of the city on the road to Najaf. The gate and the stubs of its towers are still legible, and its name remembers the problem that shaped every route across this plain.",
          see: "The gate and the line of the outer wall.",
        },
        {
          id: "al-rubu-caravansarai",
          number: "13",
          name: "Khan al-Rubu'",
          kind: "Ottoman caravansarai",
          area: "16 km south, on the Najaf road",
          icon: "khan",
          description:
            "An Ottoman caravansarai on the pilgrim road between Karbala and Najaf.",
          detail:
            "Also known as Khan al-Nukhaylah, this caravansarai is Ottoman and sits about 16 km south of the city on the road to Najaf. It is one of the best preserved of the governorate's khans, a courtyard ringed by cells, and it has been used for cultural festivals in recent years. It shows exactly how the pilgrim road was provisioned.",
          see: "The courtyard and the rows of cells around it.",
        },
      ],
    },
    maps: {
      index: "ON THE MAP",
      titleLine1: "The old city on foot,",
      titleLine2: "the desert by car.",
      bodyLine1:
        "Both views carry the same thirteen sites. Switch between them, and open a pin",
      bodyLine2: "for what the place is and what not to miss.",
      mapLabel: "Map of the historical sites of Karbala",
      viewLabel: "Which sites to show",
      stopLabel: "Stop",
      seeLabel: "Worth seeing",
      views: [
        {
          id: "city",
          label: "The old city",
          hint: "Three stops, on foot",
          stops: ["imam-husayn-shrine", "bayn-al-haramayn", "abbas-shrine"],
        },
        {
          id: "region",
          label: "Around Karbala",
          hint: "Ten stops, about 160 km by car",
          stops: [
            "al-hurr-mosque",
            "imam-ali-dropper-shrine",
            "al-aqiser",
            "al-ukhaidir-fortress",
            "simeon-palace",
            "mujada-ruins",
            "tar-caves",
            "khan-al-atshan",
            "al-rubu-caravansarai",
            "white-bridge",
          ],
        },
      ],
    },
    plate: {
      label: "The shrine of Imam Husayn",
      heldLine: "And the city grew around it.",
      overlayTitle: "Every street in Karbala is measured from here.",
      overlayBody:
        "Bazaars, seminaries, hotels, and a centre with no cars in it: all of it arranged by how far it sits from this dome.",
      expandAlt:
        "Illustration of the shrine of Imam Husayn in Karbala: a golden dome and two golden minarets above the old city and its palms",
      expandHint: "Scroll",
    },
  },
}

const ar: Dictionary = {
  meta: {
    title: `${arabicWordmark} — أرض الحكايات`,
    description:
      "اكتشف أماكن العراق الخالدة، وثقافته الحيّة، وكرم أهله. تعرّف على وجه آخر للعراق مع مُضيف.",
  },
  brand: { name: arabicWordmark, alt: "mudheef", altLang: "en", logo: arabicWordmark },
  language: { label: "اللغة", english: "الإنجليزية", arabic: "العربية" },
  theme: { label: "التبديل بين الفاتح والداكن" },
  a11y: {
    skip: "تخطَّ إلى المحتوى",
    home: "الصفحة الرئيسية لمُضيف",
    primaryNav: "التنقّل الرئيسي",
    heroArt:
      "رسم محفور لمضيف عراقي تقليدي من القصب بين النخيل وماء الأهوار الساكن",
    scrollToDestinations: "انتقل إلى الوجهات",
    experiencesList: "طرق السفر",
    newsletterForm: "الاشتراك في النشرة البريدية",
    footerNav: "أيضًا على مُضيف",
  },
  header: {
    destinations: "الوجهات",
    story: "قصتنا",
    karbala: "كربلاء",
    cta: "اعثر على قصتك القادمة",
  },
  hero: {
    titleLine1: "أرض الحكايات.",
    titleLine2: "ومكانٌ لحكايتك.",
    bodyLine1: "اكتشف أماكن العراق الخالدة، وثقافته الحيّة، وكرم أهله.",
    bodyLine2: "حكايات حقيقية. صلات أعمق. طريقة أكثر إنسانية للسفر.",
    cta: "اكتشف العراق",
    noteLeft: ["العراق،", "وحكاية", "جميلة دائمًا."],
    noteRight: ["أماكن.", "ناس.", "وترحيب دافئ."],
  },
  destinations: {
    index: "بعض الأماكن للبداية",
    titleLine1: "أماكن استثنائية.",
    titleLine2: "وحكايات لا تُنسى.",
    bodyLine1: "مدن عريقة، وتقاليد حيّة، ومشاهد لا مثيل لها.",
    bodyLine2: "اكتشف وجهًا آخر للعراق.",
    collectionNote: "ليست أماكن تُزار فقط، بل أماكن تُحَسّ.",
    places: [
      {
        number: "01",
        name: "بوابة عشتار،",
        subtitle: "مدخل بابل.",
        location: "بابل",
        icon: "landmark",
        art: "babylon",
        artAlt: "رسم سفر قديم لبوابة عشتار",
        exploreLabel: "استكشف بوابة عشتار",
        description:
          "حكاية مكتوبة باللون الأزرق. اكتشف جمال العراق القديم وعجائبه.",
        detail:
          "دع القرميد الأزرق والتفاصيل الذهبية لبوابة عشتار يكونان بدايتك إلى بابل. لمحة مصوّرة تحتفي بمكان تلتقي فيه العمارة والفن والحكايات القديمة.",
        note: "للمستكشفين · فن وعمارة وحكايات قديمة",
      },
      {
        number: "02",
        name: "أهوار العراق،",
        subtitle: "حياة على إيقاع أهدأ.",
        location: "جنوب العراق",
        icon: "waves",
        art: "marshes",
        artAlt: "رسم سفر قديم لأهوار العراق",
        exploreLabel: "استكشف أهوار العراق",
        description:
          "بيوت القصب، وممرات مائية هادئة، وترحيب يشبه العودة إلى البيت.",
        detail:
          "اتبع الماء إلى مشهد من القصب والنخيل والمضيفات التقليدية. تخيّل رحلة هادئة في قارب مشحوف، وصوت الماء، ووقتًا نتقاسمه على كوب صغير من الشاي.",
        note: "للمسافر الهادئ · ماء وطبيعة وحياة محلية",
      },
      {
        number: "03",
        name: "بغداد،",
        subtitle: "مدينة لها روح.",
        location: "بغداد",
        icon: "wind",
        art: "baghdad",
        artAlt: "رسم سفر قديم لبغداد",
        exploreLabel: "استكشف بغداد",
        description:
          "تجوّل في أزقة قديمة، وحكايات مشتركة، وشِعر يومي تسكبه مدينة.",
        detail:
          "ارفع بصرك إلى الشرفات الخشبية، وتجوّل في أزقة مبطّنة بالطابوق، واترك مساحة لحديث لا يستعجل. لمحتنا إلى بغداد عن التفاصيل الصغيرة التي تجعل المدينة تسكنك.",
        note: "للمتجوّل · مشي في المدينة وثقافة وحديث",
      },
    ],
  },
  story: {
    index: "روح مُضيف",
    titleLine1: "كل رحلة تبدأ",
    titleLine2: "بترحيب.",
    bodyLine1:
      "مستوحاة من المضيف — مكان للاجتماع وتبادل الحكايات واستقبال الضيوف.",
    bodyLine2: "نؤمن أن أفضل طريقة لاكتشاف العراق هي أن تشعر فيه بأنك في بيتك.",
    cta: "اعثر على مكانك في الحكاية",
    expandAlt: "رسم نقش لمضيف، بيت الضيافة من القصب في أهوار الجنوب",
    expandHint: "اسحب",
  },
  experiences: {
    index: "طرق السفر",
    titleLine1: "اتبع ما",
    titleLine2: "يستدعيك.",
    bodyLine1: "العراق ليس حكاية واحدة. هو إيمان وطعام وماء وموسيقى وصنعة —",
    bodyLine2: "خيوط يمكنك أن تسحبها بأي ترتيب.",
    hint: "اختر خيطًا.",
    placesLabel: "أين تجدها",
    items: [
      {
        id: "faith",
        label: "الإيمان",
        icon: "faith",
        title: "الإيمان والزيارة",
        detail:
          "يضمّ العراق بعض أقدم مقامات العالم الإبراهيمي. ومهما كان معتقدك، فالحجم والسكون يستحقان الرحلة.",
        places: ["النجف", "كربلاء", "أور", "جامع النوري في الموصل"],
      },
      {
        id: "food",
        label: "الطعام",
        icon: "food",
        title: "الطعام والسفرة",
        detail:
          "مسكوف على ضفة النهر، ودولمة في مطبخ عائلي، وشاي يصل قبل أن تطلبه. الطعام في العراق ضيافة.",
        places: [
          "المسكوف على دجلة",
          "أسواق التمر في البصرة",
          "فطور كردي في أربيل",
        ],
      },
      {
        id: "music",
        label: "الموسيقى",
        icon: "music",
        title: "الموسيقى والاحتفال",
        detail:
          "المقام والعود وطبول الجنوب. الموسيقى العراقية تحمل ذاكرة طويلة وإحساسًا دقيقًا بالإيقاع.",
        places: [
          "بيوت المقام في بغداد",
          "نوروز في الشمال",
          "فرق الأعراس في الجنوب",
        ],
      },
      {
        id: "water",
        label: "الماء",
        icon: "water",
        title: "الماء والأهوار",
        detail:
          "الأهوار بين دجلة والفرات من أقدم الأراضي الرطبة المأهولة في العالم، ولها إيقاعها الخاص.",
        places: ["الجبايش", "هور الحمّار", "هور الحويزة"],
      },
      {
        id: "craft",
        label: "الصنعة",
        icon: "craft",
        title: "الصنعة اليدوية",
        detail:
          "نسيج القصب، والنحاس في الأسواق القديمة، والكليم، والخط. أشياء تُصنع ببطء، بأيدٍ توارثتها أجيالًا.",
        places: [
          "سوق النحاس في بغداد",
          "نسيج القصب في الأهوار",
          "خطّاطو شارع المتنبي",
        ],
      },
      {
        id: "walk",
        label: "على القدمين",
        icon: "walk",
        title: "المشي في المدن القديمة",
        detail:
          "أجمل ما في العراق يُرى بسرعة المشي: شرفات خشبية، وأزقة ضيقة، وأحاديث تبدأ بكوب شاي.",
        places: ["بغداد القديمة", "قلعة أربيل", "الموصل القديمة", "بابل"],
      },
    ],
  },
  placeInfo: {
    baghdad: {
      kind: "العاصمة",
      note: "أُسست سنة ١٤٥هـ مدينةً مدوّرة للعباسيين، وما زال دجلة يضبط إيقاعها.",
      see: "القصر العباسي على النهر، وسوق النحاس عند المغيب.",
    },
    babylon: {
      kind: "مدينة قديمة",
      note: "عاصمة الدولة البابلية، فيها بوابة عشتار وقصر نبوخذ نصر الثاني المُعاد بناؤه.",
      see: "بوابة عشتار المُعاد بناؤها وطريق المواكب عند أول الضوء.",
    },
    ur: {
      kind: "مدينة قديمة",
      note: "مدينة سومرية وُلد فيها النبي إبراهيم عليه السلام، ولا تزال زقّورتها قائمة فوق السهل.",
      see: "درج الزقّورة والقبور الملكية — اذهب باكرًا، فلا ظل هناك.",
    },
    uruk: {
      kind: "مدينة قديمة",
      note: "من الوركاء خرجت أول كتابة وأول ملحمة في التاريخ، وفيها حكم جلجامش في الأسطورة.",
      see: "مصطبة المعبد الأبيض وأولى الرُقم الطينية.",
    },
    nineveh: {
      kind: "مدينة قديمة",
      note: "عاصمة آشورية على أطراف الموصل، شهيرة بقصورها ومكتبة آشوربانيبال.",
      see: "بوابة مشكي، والنقوش في متحف الموصل القريب.",
    },
    nasiriyah: {
      kind: "بوابة الأهوار",
      note: "المدخل المعتاد إلى الأهوار، في منتصف الطريق بين بغداد والبصرة.",
      see: "زقّورة أور على بعد ساعة — انطلق قبل الشروق.",
    },
    chibayish: {
      kind: "مدينة الأهوار",
      note: "بيوت القصب وقوارب المشحوف، وأوضح صورة لحياةٍ تُعاش على الماء.",
      see: "جولة بالمشحوف بين القصب عند الغروب، والسمك المشوي على الضفة.",
    },
    "hammar-marshes": {
      kind: "أرض رطبة",
      note: "أكبر أهوار الجنوب، وأسرعها عودةً إلى الحياة حين يعود الماء.",
      see: "الطيور في الصباح الباكر؛ فالأهوار على طريق الهجرة.",
    },
    "hawizeh-marshes": {
      kind: "أرض رطبة",
      note: "الهور الذي احتفظ بمائه في سنوات الجفاف، على الطريق نزولًا إلى البصرة.",
      see: "قطعان الجاموس، وبيوت القصب التي لا تزال تُبنى باليد.",
    },
    "mutanabbi-street": {
      kind: "شارع الكتب",
      note: "شارع الكتب في بغداد، يحمل اسم الشاعر، وأكثر ما يزدحم صباح الجمعة.",
      see: "صباح الجمعة، حين تمتلئ البسطات الشارع كله.",
    },
    "old-baghdad": {
      kind: "محلّة قديمة",
      note: "شرفات خشبية وأزقة ضيقة وكوب شاي تبدأ به معظم الأحاديث.",
      see: "شناشيل الخشب، وأجمل ما تُرى من الضفة المقابلة.",
    },
    "tigris-corniche": {
      kind: "ضفة النهر",
      note: "أبو نواس وضفة دجلة، حيث تخرج المدينة لتمشي عند الغروب.",
      see: "الغروب، حين تمتلئ ضفة النهر بالعائلات.",
    },
    "kadhimiya-market": {
      kind: "سوق تاريخية",
      note: "السوق حول المرقد: النحاس والحلويات وزحام لا يهدأ تمامًا.",
      see: "سوق الذهب ومحال الحلويات حول المرقد.",
    },
  },
  journeys: {
    index: "رحلات مقترحة",
    titleLine1: "شكلٌ لأسبوعك",
    titleLine2: "الأول.",
    bodyLine1: "ثلاثة مسارات لتستعيرها أو تعدّلها أو تتجاهلها.",
    bodyLine2: "كل رحلة هنا يمكن أن تبدأ من أي مكان.",
    mapLabel: "خريطة المسار المقترح",
    stopLabel: "المحطة",
    seeLabel: "يستحق المشاهدة",
    cards: [
      {
        number: "01",
        name: "المدن الأولى،",
        subtitle: "خمسة أيام في بلاد الرافدين.",
        duration: "٥ أيام",
        description: "أقدم مدن العالم، على خطٍّ واحد من الشمال إلى الجنوب.",
        stops: [
          { id: "baghdad", name: "بغداد" },
          { id: "babylon", name: "بابل" },
          { id: "ur", name: "أور" },
          { id: "uruk", name: "الوركاء" },
          { id: "nineveh", name: "نينوى" },
        ],
      },
      {
        number: "02",
        name: "طريق الأهوار،",
        subtitle: "ثلاثة أيام على الماء.",
        duration: "٣ أيام",
        description:
          "بيوت القصب، وقوارب المشحوف، وليالٍ تبقى دافئة بعد أن يطول الظلام.",
        stops: [
          { id: "nasiriyah", name: "الناصرية" },
          { id: "chibayish", name: "الجبايش" },
          { id: "hammar-marshes", name: "هور الحمّار" },
          { id: "hawizeh-marshes", name: "هور الحويزة" },
        ],
      },
      {
        number: "03",
        name: "بغداد على القدمين،",
        subtitle: "يومان بلا سيارة.",
        duration: "يومان",
        description: "أزقة قديمة، وباعة كتب، وأمسيات تنتهي على ضفة النهر.",
        stops: [
          { id: "mutanabbi-street", name: "شارع المتنبي" },
          { id: "old-baghdad", name: "بغداد القديمة" },
          { id: "tigris-corniche", name: "كورنيش دجلة" },
          { id: "kadhimiya-market", name: "سوق الكاظمية" },
        ],
      },
    ],
  },
  events: {
    index: "ما يجري",
    titleLine1: "للعام",
    titleLine2: "إيقاع.",
    bodyLine1: "العراق يُقرأ بالفصول. هذه نوافذ زمنية لا تواريخ ثابتة —",
    bodyLine2: "تحقّق محليًا قبل أن تحجز.",
    items: [
      {
        window: "آذار",
        title: "نوروز في الجبال",
        category: "ثقافة",
        place: "أربيل ودهوك",
        description:
          "رأس السنة يُستقبل بالنيران والرحلات والثياب الجديدة في الشمال الكردي.",
      },
      {
        window: "نيسان–أيار",
        title: "الأهوار تمتلئ",
        category: "طبيعة",
        place: "الجبايش وهور الحمّار",
        description: "يرتفع الماء، ويعود القصب، ويرجع المشحوف إلى الممرات.",
      },
      {
        window: "أيلول–تشرين الأول",
        title: "حصاد التمر",
        category: "طعام",
        place: "البصرة والجنوب",
        description: "تنزل النخيل، ويفوح الجنوب كله برائحة السكر أسبوعين.",
      },
      {
        window: "تشرين الثاني",
        title: "معرض بغداد للكتاب",
        category: "كتب",
        place: "بغداد",
        description: "أسبوع من الناشرين والشعراء، يفيض على شارع المتنبي.",
      },
    ],
  },
  journal: {
    index: "المدوّنة",
    titleLine1: "حكايات أطول،",
    titleLine2: "مكتوبة على مهل.",
    bodyLine1: "ملاحظات ميدانية، ووصفات، وأحاديث من الأماكن التي نرسلك إليها.",
    bodyLine2: "بلا قوائم.",
    openLabel: "اقرأ الحكاية",
    items: [
      {
        kicker: "ملاحظات ميدانية",
        title: "ما الغرض من المضيف فعلًا",
        dek: "بيت القصب ليس مسكنًا. إنه غرفة ضيوف، ومجلس، ومسرح.",
        excerpt:
          "المضيف يشبه البناء في شكله، ويشبه الدعوة في سلوكه. تُرفع قاعته المقوّسة من القصب في أسابيع قليلة بمشاركة القرية كلها، وهو ملك للضيوف لا للمضيف — ولهذا قد ينام الشيخ الذي أمر ببنائه في مكان آخر. اجلس في واحد منها بعد العصر، فيدخل الضوء من شبكة القصب خطوطًا، ويحمل الصوت همسة على طول القاعة.",
        readTime: "٦ دقائق",
        author: "زهرة المالكي",
        place: "الجبايش",
        when: "ربيع ٢٠٢٦",
        pull: "البيت للضيف. والمضيف هو من ينام في مكان آخر.",
        body: [
          "يُرفع الهيكل أولًا: أضلاع مقوّسة من القصب تُربط حزمًا وتُثنى وتُثبَّت. ثم تُفرش الحصر فوقها صفوفًا متراكبة، فيكتمل البناء في أسابيع لا شهور. لا مسمار واحد فيه، ويمكن تفكيكه كله ونقله.",
          "وهذا يعني عمليًا أن المضيف أقرب إلى منفعة عامة منه إلى ملكية خاصة. لا أحد يرثه بالمعنى المعتاد؛ إنه لمن يُستضاف فيه، وتُبقيه القرية قائمًا لتُبقي الاستضافة.",
        ],
      },
      {
        kicker: "من الماء",
        title: "كيف تتعلم دفع المشحوف",
        dek: "الوقوف في قارب ضيق هو الجزء السهل. أما توجيهه فهو التعلّم كله.",
        excerpt:
          "المشحوف قارب طويل ونحيل وخفيف إلى حدٍّ مدهش، وهو وسيلة الأهوار منذ آلاف السنين. تقف فيه ولا تجلس. تدفعه ولا تجدّف. ولا شيء في هذه الحركة بديهي للمبتدئ، والقصب لا يرحم التردد — ولهذا في كل بيت طفل يتدرّب عليه منذ ما قبل أن يحسن السباحة.",
        readTime: "٤ دقائق",
        author: "حيدر السعدي",
        place: "هور الحمّار",
        when: "صيف ٢٠٢٥",
        pull: "المشحوف لا يُجدَّف. تدفع الماء عنك، ويأتي القارب من خلفك.",
        body: [
          "يُقطع العمود من قصب محلّي أو من البامبو، وهو أطول من القارب. تقف قريبًا من المؤخرة، وتغرسه في الماء حتى الطين، فتمشي بالقارب على طوله. الضربة بطيئة، ولا شيء فيها يستدعي العجلة.",
          "وأصعب ما يجد فيه المبتدئ ليس التوازن بل الصبر. فالقصب يضيق على الجانبين، والماء بالكاد يغرق العمود، وكل تصحيح بحركة الوركين يظهر أثره فورًا في الأثر الذي تتركه خلفك.",
        ],
      },
      {
        kicker: "في المطبخ",
        title: "المسكوف، والخلاف حول طريقة طهيه",
        dek: "لكل عائلة طريقتها الصحيحة، وكل عائلة أخرى تفعلها خطأً.",
        excerpt:
          "المسكوف شبوط يُشقّ ويُملّح ويُقام منتصبًا حول نار مكشوفة حتى يتقشّر جلده ويسيل دهنه. على هذا يتفق الجميع. أما ما بعده — التتبيلة، والمسافة عن الجمر، وهل تواجه السمكة اللهب أم الريح — فمسألة لم تتفق عليها عائلتان قط، ولم يغيّر أحد رأيه فيها.",
        readTime: "٥ دقائق",
        author: "نور الدين عباس",
        place: "بغداد",
        when: "خريف ٢٠٢٥",
        pull: "المقادير أربعة. والخلاف كله في الباقي.",
        body: [
          "النار هي التقنية الحقيقية. تُبنى على جانب وتُوقَد حتى يبيضّ الجمر، ثم تُقام السمكة حولها على مسافة تُقدَّر ولا تُقاس. قريبًا أكثر يحترق الجلد قبل أن ينضج اللحم، وبعيدًا أكثر تصير السمكة مدخّنة، وهذا طبق آخر لم يطلبه أحد.",
          "تُقدَّم ورأسها مكانه، على فراش من البصل والبندورة اللذين نضجا في الدهن، وتُؤكل بالخبز وبالأيدي. ومن يجلس أقرب إلى العظم يناله أطيبها، وهذا أمر يعرفه كل من على الطاولة.",
        ],
      },
      {
        kicker: "على القدمين",
        title: "شارع المتنبي صباح الجمعة",
        dek: "شارع لباعة الكتب، أُعيد بناؤه أكثر من مرة، ويمتلئ كل أسبوع بالطريقة نفسها.",
        excerpt:
          "يمتد شارع المتنبي بضع مئات من الأمتار بين النهر ودكاكين الكتب القديمة، وفي صباح الجمعة يصير بسطة واحدة متّصلة. تُصفّ الطاولات طرفًا إلى طرف: شعر عربي مطبوع، ومقرّرات مدرسية من الستينيات، وأدلة هندسة، وروايات إسبانية، وعشر سنوات من المجلات. لا أحد يبيع شيئًا كنت تبحث عنه.",
        readTime: "٧ دقائق",
        author: "زهرة المالكي",
        place: "بغداد",
        when: "ربيع ٢٠٢٦",
        pull: "دُمِّر الشارع سنة ٢٠٠٧. وعادت الكتب إلى الرصيف قبل أن تُرفع الأنقاض.",
        body: [
          "الشارع يحمل اسم شاعر القرن الرابع الهجري الذي قيل إنه قُتل قريبًا من هنا، وهو عنوان باعة الكتب منذ قرون. وقد احترق وقُصف أيضًا. السيارة المفخّخة سنة ٢٠٠٧ قتلت أكثر من عشرين وأتلفت معظم الدكاكين في جهة كاملة. والتفصيل الذي يبقى في الذاكرة هو ما جاء بعدها: شارع بلا دكاكين ظلّ فيه باعة كتب يعملون من طاولات على الرصيف، فامتلأ من جديد.",
          "الجمعة هي اليوم الصحيح لأن الدوائر حوله مغلقة، وهو الوقت الوحيد الذي يتّسع فيه الشارع ليكون نفسه. ائتِ قبل العاشرة. اشترِ شيئًا بثمن فنجان قهوة، وسيُروى لك تاريخ الطبعة، والعائلة التي طبعتها، ورأي قاطع في الترجمة التي كان الأجدر بك أن تشتريها.",
        ],
      },
      {
        kicker: "من الماء",
        title: "ما خسرته الأهوار، وما عاد منها",
        dek: "سُحب الماء عمدًا، ثم أُعيد. ولم يعد كل شيء.",
        excerpt:
          "في مطلع التسعينيات جُفّفت الأهوار بين دجلة والفرات. لم يكن جفافًا ولا إهمالًا. حُفرت القنوات وأُقيمت السدود الترابية وحُوّل الماء بعيدًا عن مساراته عن قصد، وفي غضون عقد صار معظم الأرض الرطبة سبخةً وغبارًا.",
        readTime: "٨ دقائق",
        author: "حيدر السعدي",
        place: "هور الحويزة",
        when: "شتاء ٢٠٢٦",
        pull: "القصب يعود في فصل واحد. أما طريقة الحياة فتأخذ أطول.",
        body: [
          "بعد ٢٠٠٣ فُتحت السدود وسُمح للماء بالعودة. والنتيجة أغرب منظر في البلد: قصب واقف في الماء من جديد، وجواميس عائدة إلى الضفاف، وقرى أُعيد بناؤها على أثر الأقدام نفسه لقرى أُفرغت. تُظهر صور الأقمار الصناعية الأخضر يعود على مراحل ثم يتراجع في سنوات الجفاف، وهذه هي الحكاية التي لا تُروى عادة.",
          "أما ما لم يعد بسهولة فهو المعرفة. نسيج القصب، وبناء القوارب، والمسارات الفصلية في ممرات تتغيّر كل عام — كل هذا كان يحمله أناس أمضوا التسعينيات في مكان آخر، أو لم ينجوا منها. الماء مشكلة تُحلّ بالهندسة. أما الباقي فيتعلّمه اليوم عائلات هي، في بعض الحالات، أول جيل يعود.",
        ],
      },
      {
        kicker: "في الأرض",
        title: "كيف تقرأ تلًّا",
        dek: "التل في جنوب العراق ليس تلًّا في الغالب. إنه مدينة مضغوطة.",
        excerpt:
          "التل هو ما ينتج عن سكن الناس في المكان نفسه أربعة آلاف سنة. ينهار جدار الطين، ويحوّله المطر إلى طين، فيسوّي الجيل التالي الأرض ويبني فوقها. كرّر ذلك عشرات المرات فيصير عندك تلٌّ بارتفاع أربعين مترًا وفيه مدينة.",
        readTime: "٦ دقائق",
        author: "يوسف البياتي",
        place: "أور",
        when: "خريف ٢٠٢٥",
        pull: "كل جيل بنى فوق الذي قبله. والتل هو الرصّة.",
        body: [
          "ولهذا فإن آثار العراق رأسية. أنت لا تحفر موقعًا بقدر ما تنزل فيه: الطبقات العليا إسلامية، ثم ساسانية، ثم هلنستية، ثم آشورية أو بابلية، ثم سومرية، وكل طبقة أقرب إلى الماء وأبعد عن أي شيء يمكن تأريخه بقراءة عملة. وكِسرة الفخّار من طبقة معيّنة هي غالبًا الساعة الوحيدة التي تملكها.",
          "ولهذا أيضًا تبدو أعظم المواقع هنا كأنها لا شيء من الطريق. بابل وأور والوركاء تلال لم تُنقَّب في معظمها، وفي طرف كل منها قطعة مشهورة. وزقّورة أور هي الاستثناء الذي يؤكد القاعدة: تبدو كما تتوقع لأنها الشيء الوحيد في الموقع الذي صُمّم ليُرى من بعيد.",
        ],
      },
    ],
  },
  newsletter: {
    index: "ابقَ على تواصل",
    title: "رسالة واحدة كل شهر.",
    body: "رحلات جديدة، وحكايات جديدة، ووصفة من حين لآخر. بلا ضجيج.",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "you@example.com",
    consent: "أوافق على استلام رسالة مُضيف، ويمكنني إلغاء الاشتراك في أي وقت.",
    submit: "اشترك",
    success: "شكرًا لك — تحقّق من بريدك للتأكيد.",
  },
  footer: { tagline: "مصنوع من الحكايات. متجذّر في العراق.", name: "مُضيف" },
  karbala: {
    meta: {
      title: "كربلاء — مدينة المرقدين",
      description:
        "المدينة التي نشأت حول مرقدي الإمام الحسين عليه السلام وأبي الفضل العباس عليه السلام، وثلاثة عشر موضعًا تاريخيًا في محافظة كربلاء، مع خريطة لكل منها.",
    },
    nav: {
      city: "المدينة",
      tourism: "أنواع السياحة",
      sites: "المواقع التاريخية",
      map: "الخريطة",
      all: "كل الوجهات",
    },
    hero: {
      titleLine1: "كربلاء.",
      titleLine2: "مدينة المرقدين.",
      bodyLine1: "أقدس أرض في الجنوب، ومدينة عاملة يسكنها نحو ٨٠٠ ألف نسمة.",
      bodyLine2: "مرقدان في الوسط، ومدينة قديمة حولهما، وصحراء على كل جهة.",
      cta: "شاهد المواضع الثلاثة عشر",
      noteLeft: ["٣٢٫٦١٧° شمالًا،", "٤٤٫٠٣٣° شرقًا.", "العراق."],
      noteRight: ["مرقدان.", "مدينة قديمة.", "صحراء."],
    },
    city: {
      index: "المدينة",
      titleLine1: "أرض معركة أولًا.",
      titleLine2: "ثم مدينة.",
      bodyLine1:
        "في سنة ٦٨٠م قُتل هنا الحسين بن علي عليه السلام مع أهله وأنصاره، في موضع يُسمّى الطفّ.",
      bodyLine2: "والبلدة التي نبتت حول المرقد هي اليوم ثاني مدن وسط العراق.",
      historyTitle: "من الطفّ إلى كربلاء",
      history: [
        "جرت المعركة في العاشر من محرّم سنة ٦١هـ — تشرين الأول ٦٨٠م — بين الحسين بن علي عليه السلام، حفيد النبي عليه السلام، وجيش أرسله والي الكوفة من بني أمية. كان ركب الحسين عليه السلام قليلًا، وانتهى في صبيحة واحدة، ودُفن القتلى حيث سقطوا، على ربوة من أرض يابسة غرب الفرات.",
        "ثم جاءت المدينة بعد المرقد. رُفع المقام وأُعيد بناؤه على مدى القرون — أمر الخليفة العباسي المتوكّل بهدمه فرُفع من جديد. وفي العهد البويهي جاء السور الأول وأسواق المدينة سنة ٣٧٢هـ، ومن القرنين العاشر والحادي عشر الهجريين استوطنها زائرون وعلماء من فارس بأعداد كبيرة، وما زالت الحوزة التي نمت بجانب المرقدين هي سبب وجود كثير من عائلات كربلاء.",
        "وهذا التاريخ يفسّر شكل المكان. بين المرقدين يمتد الشارع الذي تسمّيه المدينة «بين الحرمين»، وحوله مركز مغلق يُمشى فيه ولا سيارات داخل نطاق ١٫٥ كم. وكل ما عداه — الأسواق والحسينيات والفنادق — مرتّب بحسب بُعده عن تلك المئات من الأمتار، ولمدة شهرين في السنة، حول محرّم والأربعين، تحتضن هذه المساحة واحدًا من أكبر التجمعات السنوية في العالم.",
      ],
      pull: "المرقد جاء أولًا. والمدينة هي ما تلا ذلك.",
      factsLabel: "لمحة سريعة",
      facts: [
        { label: "المحافظة", value: "كربلاء، وسط العراق" },
        {
          label: "الاستيطان",
          value: "٦٩٠م — نشأت المدينة بعد معركة ٦٨٠",
        },
        { label: "السكان", value: "نحو ٨٠٠٬٠٠٠ (إحصاء ٢٠٢٤)" },
        { label: "الارتفاع", value: "٢٨ مترًا فوق سطح البحر" },
        {
          label: "المسافة",
          value: "نحو ٩٠ كم جنوب غرب بغداد، و٨٠ كم شمال النجف",
        },
        {
          label: "الماء",
          value: "على كيلومترات قليلة شرق بحيرة الملح (الرزازة)",
        },
        {
          label: "الوصول",
          value: "لا مطار بعد — الوصول برًّا، أو بخط بغداد–البصرة الحديدي",
        },
        { label: "المركز", value: "لا سيارات داخل نطاق ١٫٥ كم حول المرقدين" },
        {
          label: "الموسم",
          value: "تشرين الأول إلى نيسان. أما تموز وآب فيتجاوزان ٤٥ °م.",
        },
        {
          label: "الذروة",
          value:
            "الأربعين، بعد أربعين يومًا من عاشوراء، حين يأتي الزائرون مشيًا من النجف",
        },
      ],
    },
    tourism: {
      index: "أنواع السياحة",
      titleLine1: "خمسة أوجه",
      titleLine2: "لمدينة واحدة.",
      bodyLine1:
        "إلى جانب مكانتها الروحية العظيمة، تمثل كربلاء ملتقىً متكاملًا للآثار التاريخية،",
      bodyLine2:
        "والصروح العلاجية المتقدمة، والحواضر العلمية، والواحات الطبيعية.",
      items: [
        {
          id: "religious",
          name: "السياحة الدينية",
          description:
            "النبض الروحي للمدينة، حيث يقع مرقدا الإمام الحسين وأخيه العباس (عليهما السلام) ومنطقة بين الحرمين الشريفين، وملتقى ملايين الزائرين سنويًا من كل أصقاع الأرض.",
          cta: "استكشف العتبات والمراقد",
          href: "#sites",
        },
        {
          id: "archaeological",
          name: "السياحة الأثرية",
          description:
            "شواهد معمارية ضاربة في عمق التاريخ: حصن الأخيضر العباسي الفريد، كنيسة الأقيصر الأثرية التي تعود للقرن الخامس، قصر شمعون، وكهوف الطار التاريخية.",
          cta: "اكتشف المعالم الأثرية",
          href: "#sites",
        },
        {
          id: "natural",
          name: "السياحة الطبيعية",
          description:
            "طبيعة خلابة وسط الصحراء: مياه بحيرة الرزازة الشاسعة، العيون الكبريتية والينابيع الطبيعية في قضاء عين التمر، وبساتين النخيل الوارفة.",
          cta: "شاهد الواحات والينابيع",
          href: "#map",
        },
        {
          id: "educational",
          name: "السياحة التعليمية",
          description:
            "حاضرة معرفية كبرى تحتضن الحوزات العلمية والمكتبات التراثية النادرة، إلى جانب جامعات حديثة رائدة كجامعة وارث الأنبياء ومؤتمرات فكرية ودولية.",
          cta: "تعرف على الصروح العلمية",
          href: "#city",
        },
        {
          id: "medical",
          name: "السياحة العلاجية والطبية",
          description:
            "وجهة علاجية متطورة على مستوى العراق والمنطقة، تقودها مراكز تخصصية رائدة كمؤسسة وارث الدولية لعلاج الأورام ومستشفى الكفيل التخصصي للرعاية الدقيقة.",
          cta: "اطلع على المراكز الطبية",
          href: "#city",
        },
      ],
    },
    sites: {
      index: "المواقع التاريخية",
      titleLine1: "ثلاثة عشر موضعًا،",
      titleLine2: "ومدينة واحدة.",
      bodyLine1: "مرقدان في الوسط، وحلقة من المواقع في الصحراء —",
      bodyLine2: "عباسية وعثمانية ومسيحية وما قبل التاريخ.",
      seeLabel: "يستحق المشاهدة",
      openLabel: "اقرأ عن",
      collectionNote:
        "ثلاثة عشر موضعًا. اثنان منها هما السبب في الأحد عشر الباقية.",
      items: [
        {
          id: "imam-husayn-shrine",
          number: "01",
          name: "مرقد الإمام الحسين عليه السلام",
          kind: "مرقد مقدّس",
          area: "وسط المدينة",
          icon: "shrine",
          description:
            "مرقد الحسين بن علي عليه السلام، حفيد النبي عليه السلام، والسبب الذي وُجدت كربلاء من أجله.",
          detail:
            "يقف المرقد على الأرض التي قُتل فيها الحسين عليه السلام في العاشر من محرّم سنة ٦١هـ — تشرين الأول ٦٨٠م. صار الضريح مقامًا، وصار المقام مدينة، وصارت المدينة أحد مراكز العلم في التشيّع: أمر المتوكّل بهدم البناء في القرن الثالث الهجري فرُفع من جديد، وتضرّر وأُعيد بناؤه ووُسّع مرات بعد ذلك.",
          see: "الصحن قبل الشروق، حين يكاد يخلو.",
        },
        {
          id: "bayn-al-haramayn",
          number: "02",
          name: "بين الحرمين",
          kind: "محور المدينة القديمة",
          area: "بين المرقدين",
          icon: "axis",
          description:
            "الشارع الذي يصل المرقدين — المحور الذي انتظمت حوله المدينة القديمة كلها.",
          detail:
            "«بين الحرمين» اسم الشارع القصير والحيّ الذي يجمع المرقدين، وهو في يوم زيارة من أكثر بضع مئات من الأمتار ازدحامًا في العراق. وكل ما في المدينة القديمة يُوصف بُعده من هنا: الأسواق والحسينيات والفنادق والحوزة.",
          see: "الزحام عند المغرب، وقبة ذهبية في كل طرف من طرفي الشارع.",
        },
        {
          id: "abbas-shrine",
          number: "03",
          name: "مرقد أبي الفضل العباس عليه السلام",
          kind: "مرقد مقدّس",
          area: "وسط المدينة",
          icon: "shrine",
          description:
            "مرقد العباس بن علي عليه السلام، أخو الحسين عليه السلام وحامل لوائه، على ٣٨٠ مترًا من مرقد الإمام عليه السلام.",
          detail:
            "حمل العباس عليه السلام اللواء في كربلاء وقُتل وهو يحاول جلب الماء لأطفال المخيّم، ولذلك يتعامل الزائرون مع هذا المرقد كأنه مرقد المدينة نفسه، ويقصدونه خاصة في تاسوعاء، اليوم الذي يسبق عاشوراء. بنى البناء الحالي معماريون من فارس وآسيا الوسطى: قبة كمثرية ومنارتان مرتفعتان وقبر تحت شبكة فضية وذهب وفرش على الأرض.",
          see: "الصحن والقبة من جهة بين الحرمين.",
        },
        {
          id: "al-hurr-mosque",
          number: "04",
          name: "جامع الحرّ بن يزيد عليه السلام",
          kind: "مرقد وجامع",
          area: "شمال غرب، على طريق بغداد",
          icon: "standard",
          description: "مرقد القائد الذي غيّر موقفه في صباح المعركة.",
          detail:
            "قاد الحرّ بن يزيد التميمي عليه السلام الخيل التي أوقفت ركب الحسين عليه السلام على طريق الكوفة، ثم ترك جيش بني أمية في صباح العاشر من محرّم وقُتل وهو يقاتل إلى جانب الحسين عليه السلام. يشير المرقد إلى الموضع الذي سقط فيه، على الطرف الشمالي الغربي للمدينة باتجاه بغداد، وهو من أولى المحطات على طرق الزيارة الداخلة إلى كربلاء.",
          see: "المقبل من طريق بغداد عند أول الضوء.",
        },
        {
          id: "white-bridge",
          number: "05",
          name: "الجسر الأبيض",
          kind: "جسر عثماني، ١٥٥٠",
          area: "الحسينية، شرق المدينة",
          icon: "bridge",
          description:
            "جسر من سنة ١٥٥٠ على نهر الحسينية، على المدخل الشرقي القديم للمدينة.",
          detail:
            "بُني الجسر الأبيض سنة ١٥٥٠ على نهر الحسينية، وظلّ يحمل الزائرين إلى كربلاء نحو خمسة قرون. وهو من قليل ما بقي من هندسة مدنية عثمانية مؤرّخة في المحافظة، والنهر تحته لا يزال يسقي بساتين شرق المدينة.",
          see: "العقود من الضفة الشرقية عند انخفاض الماء.",
        },
        {
          id: "al-ukhaidir-fortress",
          number: "06",
          name: "قلعة الأخيضر",
          kind: "قلعة عباسية، ٧٧٥م",
          area: "نحو ٥٠ كم جنوب غرب",
          icon: "fortress",
          description:
            "قلعة عباسية قائمة وحدها في الصحراء، وأجمل ما بقي من نوعها في العراق.",
          detail:
            "بُنيت حول سنة ٧٧٥م، وهي أرقى ما بقي من العمارة العسكرية العباسية، وعلى اللائحة المؤقتة لمواقع التراث العالمي منذ ٢٠٠٠. خلف البوابة الواحدة مجمّع كامل — قاعات معقودة وجامع ومساكن وإصطبلات — أما الجدران الخارجية الطويلة فتكاد تخلو من الأبراج، وهذا واحد من الألغاز التي ما زال البناء يطرحها.",
          see: "القاعة المعقودة خلف البوابة، والصحراء من الأسوار.",
        },
        {
          id: "al-aqiser",
          number: "07",
          name: "الأقيصر",
          kind: "كنيسة قديمة",
          area: "عين التمر، نحو ٤٥ كم غربًا",
          icon: "church",
          description:
            "كنيسة صغيرة مهدمة في الصحراء الغربية، تُوصف بأنها الأقدم في المشرق.",
          detail:
            "تقع الأقيصر في عين التمر على الحافة الغربية للمحافظة: كنيسة صغيرة بصحن وهيكل، متّجهة إلى الشرق، ويؤرّخها معظم الدارسين بالقرن الخامس الميلادي ويصفونها بأقدم كنيسة في المشرق. وفي ٢٠١٩ أُقيمت الصلاة في أطلالها من جديد على يد جماعة كلدانية.",
          see: "الهيكل، والبلدة الطينية حوله.",
        },
        {
          id: "imam-ali-dropper-shrine",
          number: "08",
          name: "مقام قطرة الإمام علي عليه السلام",
          kind: "عين ومقام",
          area: "نحو ٢٥ كم غربًا",
          icon: "spring",
          description:
            "عين في الصحراء، يُروى أن الإمام علي عليه السلام أعادها إلى الحياة، وبجانبها مقام.",
          detail:
            "عين صغيرة في الريف غرب كربلاء، بجانبها مقام، ويُروى في التقليد أنها من المواضع التي أخرج فيها الإمام علي عليه السلام الماء من الأرض. وهي محطة على الطرق الغربية للزيارة، ومن المواضع القليلة جدًا بين المدينة وأطراف الصحراء التي فيها ماء وظل.",
          see: "العين نفسها — ما زالت تجري.",
        },
        {
          id: "simeon-palace",
          number: "09",
          name: "قصر شمعون",
          kind: "أطلال ما قبل الإسلام",
          area: "نحو ٤٥ كم غربًا",
          icon: "palace",
          description:
            "ما بقي من قصر وأملاكه من عصر ما قبل الإسلام، في السهل الغربي.",
          detail:
            "قصر شمعون هو ما تبقّى من قصر وأملاك تعودان إلى ما قبل الإسلام، غرب كربلاء، وقد انخفضت جدرانه إلى جذوع. وهو ينتمي مع الأقيصر والأخيضر إلى المجموعة نفسها من أبنية أواخر العصور القديمة وأول الإسلام في هذه الصحراء، ويُزار عادة في اليوم نفسه.",
          see: "مخطط البناء، ولا يزال مقروءًا من الجدران المنخفضة.",
        },
        {
          id: "mujada-ruins",
          number: "10",
          name: "أطلال المُجادة",
          kind: "أطلال مجهولة",
          area: "نحو ٤٠ كم جنوب غرب، صحراء",
          icon: "marker",
          description: "أطلال أسطوانية في صحراء مفتوحة، لم يُحسم أصلها بعد.",
          detail:
            "المُجادة بناء أسطواني مجهول الأصل، يرتفع أكثر من ٣٠ مترًا عن سطح البحر في صحراء مفتوحة على نحو ٤٠ كم من المدينة. لا نقش ولا تاريخ متّفق عليه ولا وظيفة معروفة — وهذا سبب الذهاب، وسبب أخذ الماء وسائق يعرف الطريق.",
          see: "البناء بالحجر، والمنظر عائدًا نحو كربلاء.",
        },
        {
          id: "tar-caves",
          number: "11",
          name: "كهوف الطار",
          kind: "مجموعة كهوف",
          area: "نحو ٥٠ كم جنوب غرب",
          icon: "cave",
          description:
            "مجموعة كهوف في الصحراء، مسكونة على فترات منذ عصور ما قبل التاريخ.",
          detail:
            "كهف الطار مجموعة كهوف كبيرة جنوب غرب المدينة، سُكنت منذ عصور ما قبل التاريخ واستخدمتها جماعات لاحقة ملجأً. وهو ليس أثرًا له موقف سيارات: آخر امتداد للطريق وعر، والصحراء هنا خالية فعلًا.",
          see: "القاعة الرئيسية، والسكون خارجها.",
        },
        {
          id: "khan-al-atshan",
          number: "12",
          name: "خان العطشان",
          kind: "أطلال من القرن الثاني الهجري",
          area: "نحو ٣٠ كم جنوبًا",
          icon: "fortress",
          description: "أطلال محطة محصّنة على الطريق الجنوبي نحو النجف.",
          detail:
            "خان العطشان هو أطلال محطة محصّنة تعود إلى القرن الثاني الهجري، جنوب المدينة على طريق النجف. بوابته وجذوع أبراجه لا تزال مقروءة، واسمه يتذكّر المشكلة التي شكّلت كل طريق يعبر هذا السهل.",
          see: "البوابة وخط السور الخارجي.",
        },
        {
          id: "al-rubu-caravansarai",
          number: "13",
          name: "خان الربع",
          kind: "خان عثماني",
          area: "١٦ كم جنوبًا، على طريق النجف",
          icon: "khan",
          description: "خان عثماني على طريق الزيارة بين كربلاء والنجف.",
          detail:
            "يُعرف أيضًا بخان النخيلة، وهو خان عثماني يقع على نحو ١٦ كم جنوب المدينة على طريق النجف. وهو من أفضل خانات المحافظة حالًا، بفناء تحيط به الغرف، وقد استُخدم في السنوات الأخيرة في مهرجانات ثقافية. وهو يبيّن بالضبط كيف كانت الطريق تُجهّز للزائرين.",
          see: "الفناء وصفوف الغرف حوله.",
        },
      ],
    },
    maps: {
      index: "على الخريطة",
      titleLine1: "المدينة القديمة على القدمين،",
      titleLine2: "والصحراء بالسيارة.",
      bodyLine1:
        "يعرض المنظران المواضع الثلاثة عشر نفسها. بدّل بينهما، وافتح أي دبّوس",
      bodyLine2: "لتعرف ما المكان وما لا يُفوَّت فيه.",
      mapLabel: "خريطة المواقع التاريخية في كربلاء",
      viewLabel: "أي المواقع تُعرض",
      stopLabel: "المحطة",
      seeLabel: "يستحق المشاهدة",
      views: [
        {
          id: "city",
          label: "المدينة القديمة",
          hint: "ثلاث محطات، على القدمين",
          stops: ["imam-husayn-shrine", "bayn-al-haramayn", "abbas-shrine"],
        },
        {
          id: "region",
          label: "حول كربلاء",
          hint: "عشر محطات، نحو ١٦٠ كم بالسيارة",
          stops: [
            "al-hurr-mosque",
            "imam-ali-dropper-shrine",
            "al-aqiser",
            "al-ukhaidir-fortress",
            "simeon-palace",
            "mujada-ruins",
            "tar-caves",
            "khan-al-atshan",
            "al-rubu-caravansarai",
            "white-bridge",
          ],
        },
      ],
    },
    plate: {
      label: "مرقد الإمام الحسين عليه السلام",
      heldLine: "والمدينة نمت حوله.",
      overlayTitle: "كل شارع في كربلاء يُقاس من هنا.",
      overlayBody:
        "أسواق وحوزة وفنادق ومركز لا سيارات فيه: كلّه مرتّب بحسب بُعده عن هذه القبة.",
      expandAlt:
        "رسم لمرقد الإمام الحسين عليه السلام في كربلاء: قبة ذهبية ومنارتان ذهبيتان فوق المدينة القديمة ونخيلها",
      expandHint: "اسحب",
    },
  },
}

const dictionaries: Record<Locale, Dictionary> = { en, ar }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

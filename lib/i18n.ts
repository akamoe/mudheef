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
  }
  header: { destinations: string; story: string; cta: string }
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
  a11y: {
    skip: "Skip to content",
    home: "Mudheef home",
    primaryNav: "Main navigation",
    heroArt:
      "An engraved illustration of a traditional Iraqi reed Mudhif beside palms and still marsh water",
    scrollToDestinations: "Scroll to destinations",
  },
  header: {
    destinations: "Destinations",
    story: "Our story",
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
  },
  footer: { tagline: "Made of stories. Rooted in Iraq.", name: "Mudheef" },
}

const ar: Dictionary = {
  meta: {
    title: `${arabicWordmark} — أرض الحكايات`,
    description:
      "اكتشف أماكن العراق الخالدة، وثقافته الحيّة، وكرم أهله. تعرّف على وجه آخر للعراق مع مُضيف.",
  },
  brand: { name: arabicWordmark, alt: "mudheef", altLang: "en", logo: arabicWordmark },
  language: { label: "اللغة", english: "الإنجليزية", arabic: "العربية" },
  a11y: {
    skip: "تخطَّ إلى المحتوى",
    home: "الصفحة الرئيسية لمُضيف",
    primaryNav: "التنقّل الرئيسي",
    heroArt:
      "رسم محفور لمضيف عراقي تقليدي من القصب بين النخيل وماء الأهوار الساكن",
    scrollToDestinations: "انتقل إلى الوجهات",
  },
  header: {
    destinations: "الوجهات",
    story: "قصتنا",
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
  },
  footer: { tagline: "مصنوع من الحكايات. متجذّر في العراق.", name: "مُضيف" },
}

const dictionaries: Record<Locale, Dictionary> = { en, ar }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

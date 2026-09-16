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

export type Journey = {
  number: string
  name: string
  subtitle: string
  duration: string
  description: string
  stops: string[]
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
  excerpt: string
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
  journeys: {
    index: string
    titleLine1: string
    titleLine2: string
    bodyLine1: string
    bodyLine2: string
    routeLabel: string
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
    experiencesList: "Ways to travel",
    newsletterForm: "Newsletter sign-up",
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
  journeys: {
    index: "SUGGESTED JOURNEYS",
    titleLine1: "A shape for",
    titleLine2: "your first week.",
    bodyLine1: "Three routes to borrow, adapt, or ignore.",
    bodyLine2: "Every journey here can begin anywhere.",
    routeLabel: "THE ROUTE",
    cards: [
      {
        number: "01",
        name: "The first cities,",
        subtitle: "Five days in Mesopotamia.",
        duration: "5 days",
        description:
          "The oldest cities in the world, strung north to south along the rivers.",
        stops: ["Baghdad", "Babylon", "Ur", "Uruk", "Nineveh"],
      },
      {
        number: "02",
        name: "The marsh road,",
        subtitle: "Three days on the water.",
        duration: "3 days",
        description:
          "Reed houses, mashoof boats, and nights that stay warm long after dark.",
        stops: [
          "Nasiriyah",
          "Chibayish",
          "The Hammar Marshes",
          "The Hawizeh Marshes",
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
          "Mutanabbi Street",
          "Old Baghdad",
          "The Tigris corniche",
          "Kadhimiya market",
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
    openLabel: "Read a preview",
    items: [
      {
        kicker: "FIELD NOTES",
        title: "What a mudhif is actually for",
        dek: "The reed house is not a dwelling. It is a guest room, a council chamber, and a stage.",
        excerpt:
          "A mudhif looks like a building and behaves like an invitation. The arched reed hall is raised by a whole village in a matter of weeks, and it belongs to the guests rather than the host — which is why the sheikh who commissioned it may sleep elsewhere. Sit inside one in the late afternoon and the light comes through the reed lattice in stripes, and the acoustics carry a whisper the length of the room.",
        readTime: "6 min",
      },
      {
        kicker: "FROM THE WATER",
        title: "Learning to pole a mashoof",
        dek: "Standing up in a narrow boat is the easy part. Steering it is the whole apprenticeship.",
        excerpt:
          "The mashoof is a long, thin, astonishingly light boat, and it has been the transport of the marshes for millennia. You stand rather than sit. You push rather than row. Nothing about the motion is intuitive to a beginner, and the reed beds are unforgiving of hesitation — which is why every household has a child who has been practising since before they could properly swim.",
        readTime: "4 min",
      },
      {
        kicker: "IN THE KITCHEN",
        title: "Masgouf, and the argument about how to cook it",
        dek: "Every family has the correct method, and every other family is doing it wrong.",
        excerpt:
          "Masgouf is carp, split, salted, and stood upright around an open fire until the skin blisters and the fat runs. That much everyone agrees on. Everything else — the marinade, the distance from the coals, whether the fish should face the flame or the wind — is a matter on which no two households have ever agreed, and on which no one has ever changed their mind.",
        readTime: "5 min",
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
    experiencesList: "طرق السفر",
    newsletterForm: "الاشتراك في النشرة البريدية",
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
  journeys: {
    index: "رحلات مقترحة",
    titleLine1: "شكلٌ لأسبوعك",
    titleLine2: "الأول.",
    bodyLine1: "ثلاثة مسارات لتستعيرها أو تعدّلها أو تتجاهلها.",
    bodyLine2: "كل رحلة هنا يمكن أن تبدأ من أي مكان.",
    routeLabel: "المسار",
    cards: [
      {
        number: "01",
        name: "المدن الأولى،",
        subtitle: "خمسة أيام في بلاد الرافدين.",
        duration: "٥ أيام",
        description: "أقدم مدن العالم، على خطٍّ واحد من الشمال إلى الجنوب.",
        stops: ["بغداد", "بابل", "أور", "الوركاء", "نينوى"],
      },
      {
        number: "02",
        name: "طريق الأهوار،",
        subtitle: "ثلاثة أيام على الماء.",
        duration: "٣ أيام",
        description:
          "بيوت القصب، وقوارب المشحوف، وليالٍ تبقى دافئة بعد أن يطول الظلام.",
        stops: ["الناصرية", "الجبايش", "هور الحمّار", "هور الحويزة"],
      },
      {
        number: "03",
        name: "بغداد على القدمين،",
        subtitle: "يومان بلا سيارة.",
        duration: "يومان",
        description: "أزقة قديمة، وباعة كتب، وأمسيات تنتهي على ضفة النهر.",
        stops: ["شارع المتنبي", "بغداد القديمة", "كورنيش دجلة", "سوق الكاظمية"],
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
    openLabel: "اقرأ لمحة",
    items: [
      {
        kicker: "ملاحظات ميدانية",
        title: "ما الغرض من المضيف فعلًا",
        dek: "بيت القصب ليس مسكنًا. إنه غرفة ضيوف، ومجلس، ومسرح.",
        excerpt:
          "المضيف يشبه البناء في شكله، ويشبه الدعوة في سلوكه. تُرفع قاعته المقوّسة من القصب في أسابيع قليلة بمشاركة القرية كلها، وهو ملك للضيوف لا للمضيف — ولهذا قد ينام الشيخ الذي أمر ببنائه في مكان آخر. اجلس في واحد منها بعد العصر، فيدخل الضوء من شبكة القصب خطوطًا، ويحمل الصوت همسة على طول القاعة.",
        readTime: "٦ دقائق",
      },
      {
        kicker: "من الماء",
        title: "كيف تتعلم دفع المشحوف",
        dek: "الوقوف في قارب ضيق هو الجزء السهل. أما توجيهه فهو التعلّم كله.",
        excerpt:
          "المشحوف قارب طويل ونحيل وخفيف إلى حدٍّ مدهش، وهو وسيلة الأهوار منذ آلاف السنين. تقف فيه ولا تجلس. تدفعه ولا تجدّف. ولا شيء في هذه الحركة بديهي للمبتدئ، والقصب لا يرحم التردد — ولهذا في كل بيت طفل يتدرّب عليه منذ ما قبل أن يحسن السباحة.",
        readTime: "٤ دقائق",
      },
      {
        kicker: "في المطبخ",
        title: "المسكوف، والخلاف حول طريقة طهيه",
        dek: "لكل عائلة طريقتها الصحيحة، وكل عائلة أخرى تفعلها خطأً.",
        excerpt:
          "المسكوف شبوط يُشقّ ويُملّح ويُقام منتصبًا حول نار مكشوفة حتى يتقشّر جلده ويسيل دهنه. على هذا يتفق الجميع. أما ما بعده — التتبيلة، والمسافة عن الجمر، وهل تواجه السمكة اللهب أم الريح — فمسألة لم تتفق عليها عائلتان قط، ولم يغيّر أحد رأيه فيها.",
        readTime: "٥ دقائق",
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
}

const dictionaries: Record<Locale, Dictionary> = { en, ar }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

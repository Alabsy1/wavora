/**
 * Homepage editorial content — statement, the horizontal day story
 * and the closing conversion. Kept data-driven like the other sections.
 */
export const editorialStatement = {
  eyebrow: "The WAVORA way",
  title: "ONE EASY, ENDLESS WAY TO EXPERIENCE IT.",
  description:
    "Trips, stays, hidden spots and places worth eating at — one shortlist, one local team, one endless way to spend a day on the Red Sea.",
  primaryImage: {
    src: "/images/sea-dive.jpg",
    alt: "Snorkeler diving above a Red Sea coral reef",
  },
  secondaryImage: {
    src: "/images/speedboat/speedboat-moment-1.jpg",
    alt: "Speedboat cutting through turquoise water",
  },
  tertiaryImage: {
    src: "/images/sunset-silhouette.jpg",
    alt: "Silhouette of a person watching a Red Sea sunset",
  },
  cta: { label: "See what's out there", href: "/explore" },
} as const;

export interface DayChapter {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  cta: string;
}

export const dayStory = {
  eyebrow: "A day, in four moves",
  title: "EXPLORE THE DAY",
  hint: "DRAG — OR SCROLL",
  chapters: [
    {
      id: "start-with-the-sea",
      index: "01",
      label: "MORNING",
      title: "START WITH THE SEA.",
      description:
        "Islands, reefs and open water — before the heat sets in and the boat lanes quiet down.",
      image: "/images/sea-dive.jpg",
      alt: "Sunbeams reaching a coral reef under clear water",
      href: "/sea",
      cta: "See sea trips",
    },
    {
      id: "go-where-the-water-leads",
      index: "02",
      label: "MIDDAY",
      title: "GO WHERE THE WATER LEADS.",
      description:
        "Chase the coast. Snorkel a drop-off, drift a current, let the next island decide.",
      image: "/images/speedboat/speedboat-frame-1.jpg",
      alt: "Speedboat leaving a white wake across the Red Sea",
      href: "/explore",
      cta: "Find an experience",
    },
    {
      id: "stay-until-the-sun-goes-down",
      index: "03",
      label: "EVENING",
      title: "STAY UNTIL THE SUN GOES DOWN.",
      description:
        "Watch the sky turn from a sunset spot you didn't plan for. The best ones are never on a map.",
      image: "/images/sunset-silhouette.jpg",
      alt: "Sunset sinking into the Red Sea with a lone figure on the shore",
      href: "/spots",
      cta: "See hidden spots",
    },
    {
      id: "discover-whats-next",
      index: "04",
      label: "NIGHT",
      title: "DISCOVER WHAT'S NEXT.",
      description:
        "Dinner, a hidden café, or already planning tomorrow. The day doesn't end — it hands off.",
      image: "/images/eats-restaurant.jpg",
      alt: "Warm, candlelit dinner table near the sea in Hurghada",
      href: "/eats",
      cta: "See good eats",
    },
  ] satisfies DayChapter[],
} as const;

export const nextDay = {
  eyebrow: "A day, designed around you",
  titleTop: "YOUR NEXT DAY",
  titleBottom: "IS OUT THERE.",
  description:
    "SAIL. DIVE. EXPLORE. Relax. Repeat. Tell us what kind of day you want — we'll build it around you.",
  actions: [
    { label: "Sail", href: "/sea" },
    { label: "Dive", href: "/explore" },
    { label: "Explore", href: "/explore" },
  ],
  primaryCta: { label: "PLAN YOUR DAY", href: "/plan" },
  stats: [
    { value: "24/7", label: "Local support" },
    { value: "Curated", label: "Not scraped" },
    { value: "1 team", label: "On the ground" },
  ],
  backgroundImage: {
    src: "/images/hero-beach.jpg",
    alt: "Aerial view of a Red Sea beach with turquoise shallows",
  },
} as const;
export interface OceanWay {
  number: string;
  label: string;
  slug: string;
  description: string;
  tagline: string;
  image: string;
  alt: string;
  href: string;
}

export interface OceanDestination {
  id: string;
  name: string;
  x: number;
  y: number;
  description: string;
  image: string;
  alt: string;
}

export const oceanHero = {
  eyebrow: "Wavora · The Red Sea",
  title: ["GET ON", "THE WATER."],
  subtitle: "Six ways to experience the Red Sea.",
  cta: { label: "Explore the water", href: "#ways" },
  coordinates: "27.25° N · 33.81° E — Hurghada, Egypt",
  image: "/images/hero-turquoise.jpg",
  alt: "Aerial view of turquoise Red Sea water near Hurghada",
};

export const oceanWays: OceanWay[] = [
  {
    number: "01",
    label: "Sail",
    slug: "sail",
    description: "Your own boat, a slow wake and the horizon doing all the work.",
    tagline: "Glide. Nothing else.",
    image: "/images/sea-boat.jpg",
    alt: "A boat resting on calm open Red Sea water",
    href: "/experience/private-boat-day",
  },
  {
    number: "02",
    label: "Dive",
    slug: "dive",
    description: "Certified or not — the wall drops into blue and you follow.",
    tagline: "Below the surface.",
    image: "/images/sea-dive.jpg",
    alt: "Divers descending through clear blue Red Sea water",
    href: "/experience/open-water-diving",
  },
  {
    number: "03",
    label: "Snorkel",
    slug: "snorkel",
    description: "Float over coral gardens the crowds never reached.",
    tagline: "Face the reef.",
    image: "/images/sea-turtle-dive.jpg",
    alt: "Sea turtle gliding over a coral reef in clear water",
    href: "/experience/snorkeling-safari",
  },
  {
    number: "04",
    label: "Relax",
    slug: "relax",
    description: "White sand, warm shallows and absolutely nowhere to be.",
    tagline: "Nowhere to be.",
    image: "/images/sea-umbrella-beach.jpg",
    alt: "Umbrellas on soft sand beside turquoise water",
    href: "/experience/island-hopping-mahmya",
  },
  {
    number: "05",
    label: "Explore",
    slug: "explore",
    description: "Fast water, open horizons and a day built exactly your way.",
    tagline: "Full throttle.",
    image: "/images/speedboat/speedboat-hero.jpg",
    alt: "Speedboat cutting across the Red Sea with a white wake",
    href: "/experience/speedboat-days",
  },
  {
    number: "06",
    label: "Discover",
    slug: "discover",
    description: "Islands and reefs most visitors never get to see.",
    tagline: "Hidden corners.",
    image: "/images/sunset-silhouette.jpg",
    alt: "Silhouettes against a fiery Red Sea sunset",
    href: "/experience/giftun-island-boat-trip",
  },
];

export const oceanDevice = {
  eyebrow: "The signature experience",
  title: ["ONE SEA.", "SIX WAYS."],
  subtitle: "To experience it.",
};

export const oceanDestinations: OceanDestination[] = [
  {
    id: "giftun",
    name: "GIFTUN",
    x: 53,
    y: 36,
    description: "Sandbanks, reef walls and the island that started it all.",
    image: "/images/hero-beach.jpg",
    alt: "White sand island meeting clear turquoise water",
  },
  {
    id: "orange-bay",
    name: "ORANGE BAY",
    x: 58,
    y: 52,
    description: "A sandbar island with water so clear it looks printed.",
    image: "/images/sea-umbrella-beach.jpg",
    alt: "Umbrellas on a sandbar beside clear water",
  },
  {
    id: "magawish",
    name: "MAGAWISH",
    x: 40,
    y: 62,
    description: "A long shallow lagoon — the coast's slow lane.",
    image: "/images/hero-turquoise.jpg",
    alt: "Turquoise lagoon water with the seafloor visible",
  },
  {
    id: "elphinstone",
    name: "ELPHINSTONE",
    x: 70,
    y: 72,
    description: "An offshore reef that pulls divers from everywhere.",
    image: "/images/sea-dive.jpg",
    alt: "Divers exploring the deep blue wall",
  },
  {
    id: "abu-dabab",
    name: "ABU DABAB",
    x: 56,
    y: 84,
    description: "A sheltered bay where turtles swim right past you.",
    image: "/images/sea-turtle-dive.jpg",
    alt: "Sea turtle gliding through clear water",
  },
];

export const oceanHomePort = {
  name: "HURGHADA",
  x: 44,
  y: 44,
  label: "Home port",
};

export const oceanStory = {
  eyebrow: "A view you don't get from the shore",
  title: ["THE SEA", "LOOKS DIFFERENT", "FROM HERE."],
  image: "/images/dolphin-poster.jpg",
  alt: "Dolphins breaking the surface of the Red Sea",
};

export const oceanBook = {
  title: ["READY", "TO GET", "ON THE WATER?"],
  cta: { label: "Book your experience", href: "/plan" },
  note: "Private trips · Family days · Custom routes",
};

export const oceanFooterNav = [
  { label: "Sail", href: "/experience/private-boat-day" },
  { label: "Dive", href: "/experience/open-water-diving" },
  { label: "Snorkel", href: "/experience/snorkeling-safari" },
  { label: "Explore", href: "/explore" },
  { label: "Destinations", href: "/spots" },
  { label: "Contact", href: "/contact" },
];
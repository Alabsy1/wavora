export interface SeaHeroData {
  eyebrow: string;
  title: string[];
  description: string;
  image: string;
  alt: string;
  marker: string;
  location: string;
}

export interface SeaIntroData {
  number: string;
  label: string;
  title: string[];
  description: string;
  image: string;
  alt: string;
  caption: string;
  facts: { k: string; v: string }[];
  marquee: string[];
}

export interface SeaWay {
  number: string;
  label: string;
  slug: string;
  description: string;
  image: string;
  alt: string;
  position?: string;
}

export interface SeaWaysData {
  number: string;
  label: string;
  title: string[];
  prompt: string;
  hint: string;
  items: SeaWay[];
}

export interface SeaVideoData {
  number: string;
  label: string;
  title: string[];
  description: string;
  caption: string;
  src: string;
  poster: string;
  posterAlt: string;
  position: string;
}

export interface SeaUnderSurfaceData {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  imageLarge: string;
  imageLargeAlt: string;
  imageSmall: string;
  imageSmallAlt: string;
  metadata: { k: string; v: string }[];
}

export interface SeaFinalCtaData {
  number: string;
  label: string;
  title: string[];
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface SeaFinalSceneData {
  title: string[];
  small: string;
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
}

/*
 * Image art direction — every asset below was visually verified.
 * Do not swap by filename: several legacy filenames are misleading.
 */
export const seaHero: SeaHeroData = {
  eyebrow: "Wavora · Sea",
  title: ["THE RED SEA", "IS CALLING."],
  description:
    "Crystal water. Hidden islands. Open sea. Days that write themselves.",
  image: "/images/speedboat/speedboat-moment-1.jpg",
  alt: "A speedboat anchored in a turquoise Red Sea lagoon, desert coastline behind",
  marker: "01 / 06",
  location: "RED SEA · HURGHADA · EGYPT",
};

export const seaIntro: SeaIntroData = {
  number: "02",
  label: "The water",
  title: ["THE WATER IS NOT", "A VIEW HERE."],
  description:
    "It's the main event. From the moment the boat leaves the marina, the Red Sea changes everything — the light gets sharper, the air gets saltier, and the day belongs to the water.",
  image: "/images/hero-turquoise.jpg",
  alt: "Aerial view of turquoise Red Sea surf washing over white sand, reef visible beneath the surface",
  caption: "REEF BENEATH THE SURFACE",
  facts: [
    { k: "The sea", v: "Red Sea" },
    { k: "The coast", v: "Hurghada, Egypt" },
    { k: "The feeling", v: "Endless blue" },
  ],
  marquee: [
    "Red Sea",
    "Open water",
    "Coral",
    "Dolphins",
    "Speed",
    "Sunset",
    "Hurghada",
  ],
};

export const seaWays: SeaWaysData = {
  number: "03",
  label: "Choose your way",
  title: ["SIX WAYS", "TO GET", "ON THE WATER."],
  prompt: "How do you want to meet the sea?",
  hint: "Hover — or tap",
  items: [
    {
      number: "01",
      label: "Speedboat",
      slug: "speedboat-days",
      description: "Fast water, open horizon. Your boat, your route.",
      image: "/images/speedboat/speedboat-frame-1.jpg",
      alt: "Aerial view of a speedboat cutting across crystal turquoise water",
      position: "50% 55%",
    },
    {
      number: "02",
      label: "Snorkel",
      slug: "snorkeling-safari",
      description: "Float over reefs the crowds never reached.",
      image: "/images/hero-turquoise.jpg",
      alt: "Crystal turquoise water with the reef visible beneath the surface",
      position: "50% 60%",
    },
    {
      number: "03",
      label: "Dive",
      slug: "open-water-diving",
      description: "From your first breath to deep blue.",
      image: "/images/sea-turtle-dive.jpg",
      alt: "A diver drifting beside a coral wall dense with yellow-tailed fish",
      position: "18% 50%",
    },
    {
      number: "04",
      label: "Islands",
      slug: "island-hopping-mahmya",
      description: "White sand, warm shallows, zero agenda.",
      image: "/images/hero-beach.jpg",
      alt: "Soft sand and calm turquoise water at golden hour",
      position: "50% 45%",
    },
    {
      number: "05",
      label: "Private boat",
      slug: "private-boat-day",
      description: "Your boat, your captain, your day.",
      image: "/images/speedboat/speedboat-frame-2.jpg",
      alt: "Fresh fruit served on board a boat in a turquoise lagoon",
      position: "50% 40%",
    },
    {
      number: "06",
      label: "Sunset",
      slug: "sunset-sail",
      description: "The sky catches fire. You just watch.",
      image: "/images/sea-sunset.jpg",
      alt: "A small wave catching golden-hour light on the Red Sea",
      position: "50% 55%",
    },
  ],
};

export const seaVideo: SeaVideoData = {
  number: "04",
  label: "Red Sea / In motion",
  title: ["MEET THE", "WILD SIDE."],
  description:
    "They don't ask permission. They just appear — riding the bow wave like they own the place. Which, to be fair, they do.",
  caption: "DOLPHINS · RED SEA · HURGHADA",
  src: "/videos/dolphin-sea.mp4",
  poster: "/images/dolphin-poster.jpg",
  posterAlt:
    "A pod of dolphins swimming in clear turquoise water at dusk, seen from a boat",
  position: "50% 62%",
};

export const seaUnderSurface: SeaUnderSurfaceData = {
  number: "05",
  eyebrow: "Below the waterline",
  title: "UNDER THE SURFACE.",
  description:
    "The Red Sea is not only what you see from the boat. Below the waterline the real cast shows up — turtles, rays and coral gardens older than the hotels on the coast.",
  imageLarge: "/images/sea-turtle-dive.jpg",
  imageLargeAlt:
    "A diver drifting beside a Red Sea coral wall dense with yellow-tailed fish",
  imageSmall: "/images/speedboat/speedboat-frame-3.jpg",
  imageSmallAlt: "A boat floating over shallow reef water so clear you can see the sand",
  metadata: [
    { k: "The stars", v: "Turtles, rays, reefs" },
    { k: "The sound", v: "Bubbles & silence" },
    { k: "The depth", v: "5 to 40 metres" },
  ],
};

export const seaFinalCta: SeaFinalCtaData = {
  number: "06",
  label: "Your sea",
  title: ["YOUR SEA.", "YOUR WAY."],
  description:
    "Tell us what kind of day you want. We'll handle the rest.",
  primaryCta: { label: "Explore sea experiences", href: "/experiences" },
  secondaryCta: { label: "Plan my trip", href: "/plan" },
};

export const seaFinalScene: SeaFinalSceneData = {
  title: ["HOW WILL", "YOU MEET", "THE RED SEA?"],
  small: "WAVORA · RED SEA · EGYPT",
  cta: { label: "Plan your experience", href: "/plan" },
  image: "/images/sea-boat.jpg",
  imageAlt:
    "Aerial view of turquoise waves washing over white Red Sea sand",
};
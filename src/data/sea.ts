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

export interface SeaWaySpec {
  k: string;
  v: string;
}

export interface SeaWayTimelineStep {
  time: string;
  title: string;
  description: string;
}

export interface SeaWay {
  number: string;
  label: string;
  slug: string;
  description: string;
  image: string;
  alt: string;
  position?: string;
  longDescription: string;
  specs: SeaWaySpec[];
  timeline: SeaWayTimelineStep[];
  gallery: { src: string; alt: string }[];
  capacity: string;
  speed: string;
  crew: string;
  recommendedDuration: string;
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
      longDescription: "Pure speed on the open Red Sea. Our twin-engine speedboats launch from Hurghada Marina and hit the crystal water in under 20 minutes. Two snorkel stops, a hidden lagoon, and the kind of turquoise that makes your phone camera jealous. This is the fastest way to feel the sea.",
      capacity: "Up to 12 guests",
      speed: "40+ knots",
      crew: "Captain + deckhand",
      recommendedDuration: "3–4 hours",
      specs: [
        { k: "Vessel", v: "Twin-engine speedboat" },
        { k: "Speed", v: "40+ knots" },
        { k: "Capacity", v: "Up to 12 guests" },
        { k: "Crew", v: "Licensed captain + deckhand" },
        { k: "Safety", v: "Life jackets, first aid, VHF radio" },
        { k: "Duration", v: "3–4 hours recommended" },
      ],
      timeline: [
        { time: "09:00", title: "Departure from Marina", description: "Board at Hurghada Marina. Safety briefing, cold drinks, and we're off." },
        { time: "09:20", title: "Open Water Sprint", description: "20-minute ride across open water. The city fades, the turquoise appears." },
        { time: "09:45", title: "First Snorkel Stop", description: "Drop anchor at a coral garden. Mask on, face in the water, world disappears." },
        { time: "10:45", title: "Lagoon Break", description: "Hidden lagoon with knee-deep turquoise. Float, swim, or just sit in the shallows." },
        { time: "11:30", title: "Second Snorkel Stop", description: "Deeper reef, more fish, different colors. The underwater show continues." },
        { time: "12:30", title: "Return to Marina", description: "Ride back with the wind. Quick, clean, unforgettable." },
      ],
      gallery: [
        { src: "/images/speedboat/speedboat-frame-1.jpg", alt: "Speedboat cutting through turquoise water" },
        { src: "/images/speedboat/speedboat-frame-2.jpg", alt: "Fresh fruit served on board" },
        { src: "/images/speedboat/speedboat-frame-3.jpg", alt: "Boat floating over shallow reef" },
        { src: "/images/speedboat/speedboat-moment-1.jpg", alt: "Anchored in a turquoise lagoon" },
      ],
    },
    {
      number: "02",
      label: "Snorkel",
      slug: "snorkeling-safari",
      description: "Float over reefs the crowds never reached.",
      image: "/images/hero-turquoise.jpg",
      alt: "Crystal turquoise water with the reef visible beneath the surface",
      position: "50% 60%",
      longDescription: "The Red Sea holds some of the world's most vibrant coral reefs — and most visitors never see them. Our snorkeling safari takes you to three reef systems that cruise ships can't reach. A professional guide leads you through gardens of coral, past schools of clownfish, and over walls of living color. No experience needed. Just curiosity.",
      capacity: "Up to 15 guests",
      speed: "20 knots",
      crew: "Captain + snorkel guide",
      recommendedDuration: "5–6 hours",
      specs: [
        { k: "Vessel", v: "Motor boat with sun deck" },
        { k: "Guide", v: "Certified snorkel instructor" },
        { k: "Capacity", v: "Up to 15 guests" },
        { k: "Equipment", v: "Full snorkel gear included" },
        { k: "Reefs", v: "3 stops, different ecosystems" },
        { k: "Duration", v: "5–6 hours recommended" },
      ],
      timeline: [
        { time: "08:30", title: "Board & Briefing", description: "Meet at the marina. Gear fitting, safety talk, reef overview from your guide." },
        { time: "09:00", title: "Reef One: Garden Reef", description: "Shallow coral garden. Clownfish, parrotfish, sea urchins. Perfect for beginners." },
        { time: "10:30", title: "Reef Two: Wall Dive", description: "Vertical coral wall dropping to 20m. Schools of barracuda, Napoleon wrasse." },
        { time: "12:00", title: "Beach Lunch", description: "Stop at a quiet sandbar. Lunch on the beach, feet in the water." },
        { time: "13:00", title: "Reef Three: The Blue Hole", description: "Natural underwater sinkhole. Crystal visibility, deeper fish, dramatic scenery." },
        { time: "14:30", title: "Return", description: "Cruise back to the marina. Sun, salt, and a camera full of color." },
      ],
      gallery: [
        { src: "/images/hero-turquoise.jpg", alt: "Crystal turquoise water with reef beneath" },
        { src: "/images/sea-turtle-dive.jpg", alt: "Underwater coral wall with fish" },
        { src: "/images/hero-beach.jpg", alt: "Sandbar lunch stop" },
        { src: "/images/speedboat/speedboat-frame-3.jpg", alt: "Boat anchored at reef" },
      ],
    },
    {
      number: "03",
      label: "Dive",
      slug: "open-water-diving",
      description: "From your first breath to deep blue.",
      image: "/images/sea-turtle-dive.jpg",
      alt: "A diver drifting beside a coral wall dense with yellow-tailed fish",
      position: "18% 50%",
      longDescription: "Whether you're a certified diver or taking your very first breath underwater, the Red Sea delivers. Our dive trips range from shallow introductory dives for beginners to deep wall dives for experienced divers. Turtles, rays, and coral gardens older than the hotels on the coast. This is the real Red Sea.",
      capacity: "Up to 8 divers",
      speed: "18 knots",
      crew: "Captain + PADI instructor",
      recommendedDuration: "6–7 hours",
      specs: [
        { k: "Vessel", v: "Dive boat with tank racks" },
        { k: "Instructor", v: "PADI-certified dive master" },
        { k: "Capacity", v: "Up to 8 divers" },
        { k: "Equipment", v: "Full SCUBA gear included" },
        { k: "Dive sites", v: "2–3 sites, 5–30m depth" },
        { k: "Duration", v: "6–7 hours recommended" },
      ],
      timeline: [
        { time: "07:30", title: "Briefing & Gear Up", description: "Dive briefing at the marina. Equipment check, dive plan review, buddy assignment." },
        { time: "08:00", title: "Dive One: Coral Garden", description: "Shallow dive (8–12m). Turtles, moray eels, lionfish. Perfect warm-up." },
        { time: "10:00", title: "Surface Interval", description: "Rest on deck. Hot drinks, snacks, dive log discussion." },
        { time: "10:45", title: "Dive Two: The Wall", description: "Deep wall dive (18–30m). Drop-off, pelagic fish, dramatic coral overhangs." },
        { time: "12:30", title: "Lunch on Board", description: "Full lunch served on deck between dives." },
        { time: "13:30", title: "Dive Three (Optional)", description: "Third dive for certified divers. Night reef or shallow探索." },
        { time: "15:00", title: "Return", description: "Surface, de-kit, cruise back. Dive logs complete." },
      ],
      gallery: [
        { src: "/images/sea-turtle-dive.jpg", alt: "Diver at coral wall with yellow fish" },
        { src: "/images/hero-turquoise.jpg", alt: "Crystal water from above" },
        { src: "/images/speedboat/speedboat-frame-3.jpg", alt: "Dive boat at anchor" },
        { src: "/images/dolphin-poster.jpg", alt: "Marine life in the Red Sea" },
      ],
    },
    {
      number: "04",
      label: "Islands",
      slug: "island-hopping-mahmya",
      description: "White sand, warm shallows, zero agenda.",
      image: "/images/hero-beach.jpg",
      alt: "Soft sand and calm turquoise water at golden hour",
      position: "50% 45%",
      longDescription: "Island hopping in the Red Sea is not about checking boxes — it's about losing track of time. White sand beaches, turquoise lagoons so clear they look fake, and reef systems that start ten steps from the shore. We take you to Mahmya, Giftun, and hidden sandbars that most boats never find. Lunch on the beach, snorkel when you want, nap when you don't.",
      capacity: "Up to 20 guests",
      speed: "15 knots",
      crew: "Captain + crew",
      recommendedDuration: "7–8 hours",
      specs: [
        { k: "Vessel", v: "Motor yacht with sun deck" },
        { k: "Islands", v: "2–3 stops including Mahmya" },
        { k: "Capacity", v: "Up to 20 guests" },
        { k: "Lunch", v: "Beach picnic included" },
        { k: "Activities", v: "Snorkeling, swimming, sunbathing" },
        { k: "Duration", v: "7–8 hours recommended" },
      ],
      timeline: [
        { time: "08:00", title: "Departure", description: "Board at Hurghada Marina. Coffee, pastries, and the open sea ahead." },
        { time: "09:30", title: "Mahmya Island", description: "First stop. White sand beach, turquoise shallows, reef right off the shore." },
        { time: "11:30", title: "Snorkel at Giftun", description: "Giftun National Park. Coral gardens, sea turtles, protected waters." },
        { time: "13:00", title: "Beach Lunch", description: "Picnic on the sand. Grilled fish, fresh salads, cold drinks." },
        { time: "14:30", title: "Hidden Sandbar", description: "A sandbar that appears at low tide. Crystal water, zero crowds." },
        { time: "16:00", title: "Return", description: "Cruise back as the sun starts to lower. Relaxed, sun-kissed, complete." },
      ],
      gallery: [
        { src: "/images/hero-beach.jpg", alt: "White sand beach at golden hour" },
        { src: "/images/hero-turquoise.jpg", alt: "Turquoise lagoon from above" },
        { src: "/images/speedboat/speedboat-frame-3.jpg", alt: "Boat at island anchor" },
        { src: "/images/speedboat/speedboat-moment-1.jpg", alt: "Lagoon with speedboat" },
      ],
    },
    {
      number: "05",
      label: "Private boat",
      slug: "private-boat-day",
      description: "Your boat, your captain, your day.",
      image: "/images/speedboat/speedboat-frame-2.jpg",
      alt: "Fresh fruit served on board a boat in a turquoise lagoon",
      position: "50% 40%",
      longDescription: "No schedule. No strangers. No compromises. Your private boat day means you choose the route, the pace, and the stops. Want to spend three hours at one reef? Done. Want to chase dolphins at sunrise and watch the sunset from a private lagoon? Also done. A dedicated captain, a stocked bar, and the entire Red Sea as your playground.",
      capacity: "Up to 10 guests",
      speed: "35 knots",
      crew: "Private captain + steward",
      recommendedDuration: "Full day",
      specs: [
        { k: "Vessel", v: "Private motor yacht" },
        { k: "Captain", v: "Dedicated private captain" },
        { k: "Capacity", v: "Up to 10 guests" },
        { k: "Customization", v: "Fully custom route" },
        { k: "Service", v: "Private steward on board" },
        { k: "Duration", v: "Full day (8–10 hours)" },
      ],
      timeline: [
        { time: "08:00", title: "Your Way", description: "Board your private yacht. Discuss the day's plan with your captain." },
        { time: "09:00", title: "First Stop — Your Choice", description: "Reef, island, or open water. The day is yours to design." },
        { time: "11:00", title: "Second Stop", description: "Change of scenery. New water, new fish, new view." },
        { time: "13:00", title: "Lunch on Board", description: "Private chef prepares lunch on deck. Seafood, salads, cold rosé." },
        { time: "15:00", title: "Afternoon Adventure", description: "Snorkeling, swimming, or just floating in turquoise silence." },
        { time: "17:00", title: "Sunset Return", description: "Cruise back as the sky turns gold. The perfect end to a perfect day." },
      ],
      gallery: [
        { src: "/images/speedboat/speedboat-frame-2.jpg", alt: "Fresh fruit on private yacht" },
        { src: "/images/speedboat/speedboat-frame-1.jpg", alt: "Private yacht in open water" },
        { src: "/images/speedboat/speedboat-moment-1.jpg", alt: "Anchored in private lagoon" },
        { src: "/images/sea-sunset.jpg", alt: "Sunset from the yacht deck" },
      ],
    },
    {
      number: "06",
      label: "Sunset",
      slug: "sunset-sail",
      description: "The sky catches fire. You just watch.",
      image: "/images/sea-sunset.jpg",
      alt: "A small wave catching golden-hour light on the Red Sea",
      position: "50% 55%",
      longDescription: "The golden hour on the Red Sea is not a metaphor — it's a physical event. The sky turns amber, the water turns to liquid gold, and for about 45 minutes the entire world looks like a painting. Our sunset sail is deliberately slow. No snorkel stops, no island rushes. Just the wind, the water, and a sky that catches fire.",
      capacity: "Up to 15 guests",
      speed: "8 knots",
      crew: "Captain + host",
      recommendedDuration: "2–2.5 hours",
      specs: [
        { k: "Vessel", v: "Traditional sailing yacht" },
        { k: "Pace", v: "Relaxed, no rushing" },
        { k: "Capacity", v: "Up to 15 guests" },
        { k: "Drinks", v: "Complimentary cocktails & snacks" },
        { k: "Music", v: "Curated sunset playlist" },
        { k: "Duration", v: "2–2.5 hours" },
      ],
      timeline: [
        { time: "16:30", title: "Board & Settle", description: "Step aboard the sailing yacht. Welcome drink in hand, the golden hour begins." },
        { time: "17:00", title: "Sail Out", description: "Hoist the sails. Leave the marina behind. The water turns amber." },
        { time: "17:30", title: "Golden Hour", description: "The sky changes color every minute. Camera phones everywhere. No one talks." },
        { time: "17:45", title: "The Sunset", description: "The sun hits the horizon. The water turns to liquid gold. Pure magic." },
        { time: "18:00", title: "Twilight Cruise", description: "After sunset, the sky turns purple. Music plays, drinks flow, stars appear." },
        { time: "18:30", title: "Return", description: "Glide back to the marina under the first stars. Quiet, warm, complete." },
      ],
      gallery: [
        { src: "/images/sea-sunset.jpg", alt: "Golden hour on the Red Sea" },
        { src: "/images/speedboat/speedboat-frame-2.jpg", alt: "Sailing yacht at sunset" },
        { src: "/images/speedboat/speedboat-moment-1.jpg", alt: "Twilight on the water" },
        { src: "/images/hero-beach.jpg", alt: "Marina at dusk" },
      ],
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
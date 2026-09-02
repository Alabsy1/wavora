export interface SpeedboatFrame {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Signature Speedboat experience — structured so the section can be driven
 * entirely from this file. Swap order, captions or images without touching JSX.
 */
export const speedboatFrames: SpeedboatFrame[] = [
  {
    src: "/images/speedboat/speedboat-hero.jpg",
    alt: "Speedboat cruising across the turquoise Red Sea near Hurghada",
    caption: "THE DAY BEGINS",
  },
  {
    src: "/images/speedboat/speedboat-moment-1.jpg",
    alt: "Speedboat anchored in the open water of the Red Sea",
    caption: "FAST WATER",
  },
  {
    src: "/images/speedboat/speedboat-moment-2.jpg",
    alt: "Wake of a speedboat cutting through the Red Sea",
    caption: "OPEN HORIZONS",
  },
  {
    src: "/images/speedboat/speedboat-frame-1.jpg",
    alt: "Speedboat ride along the Red Sea coastline near Hurghada",
    caption: "YOUR KIND OF DAY",
  },
  {
    src: "/images/speedboat/speedboat-frame-2.jpg",
    alt: "Speedboat trip on the Red Sea with open water ahead",
    caption: "MAKE IT YOURS",
  },
  {
    src: "/images/speedboat/speedboat-frame-3.jpg",
    alt: "Speedboat gliding across the Red Sea at golden hour",
    caption: "UNTIL SUNSET",
  },
];

export const featuredIndex = 0;
export const momentIndexes = [1, 2] as const;

export const speedboatSection = {
  slug: "speedboat-days",
  eyebrow: "WAVORA / SIGNATURE EXPERIENCE",
  headline: ["THE SEA,", "YOUR WAY."],
  description:
    "Speedboat days made for you. Fast water, open horizons, and the Red Sea exactly how you want to experience it.",
  location: "HURGHADA · RED SEA · EGYPT",
  badge: "SIGNATURE EXPERIENCE",
  title: "SPEEDBOAT",
  supporting: "Your day. Your route. Your sea.",
  experienceHref: "/experience/speedboat-days",
  primaryCta: {
    label: "EXPLORE SPEEDBOAT",
    href: "/experience/speedboat-days",
  },
  secondaryCta: {
    label: "PLAN THIS EXPERIENCE",
    href: "/plan",
  },
  railLabel: "THE DAY, FRAME BY FRAME.",
  railHint: "DRAG · SWIPE",
  marquee: ["RED SEA", "SPEEDBOAT", "OPEN WATER", "HURGHADA", "WAVORA"],
};
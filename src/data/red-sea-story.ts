export interface RedSeaCta {
  label: string;
  href: string;
}

export interface RedSeaChapter {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  cta?: RedSeaCta;
}

export interface RedSeaStoryData {
  eyebrow: string;
  headline: [string, string];
  description: string;
  chapters: RedSeaChapter[];
  ending: {
    eyebrow: string;
    title: string;
    text: string;
    cta: RedSeaCta;
  };
}

export const redSeaStory: RedSeaStoryData = {
  eyebrow: "Wavora / The Red Sea",
  headline: ["One sea.", "Endless ways to experience it."],
  description:
    "From open water to hidden shores, every day can become a different story.",
  chapters: [
    {
      id: "arrive",
      number: "01",
      label: "Arrive",
      title: "Start with the sea.",
      description:
        "Turquoise water opens up the moment you arrive. The Red Sea is the horizon, and the day is unwritten.",
      image: "/images/sea-boat.jpg",
      alt: "Boat crossing open turquoise Red Sea water near Hurghada",
    },
    {
      id: "move",
      number: "02",
      label: "Move",
      title: "Find your speed.",
      description:
        "A boat, open water and wind. Leave the shore behind and let the engine carry the day.",
      image: "/images/speedboat/speedboat-hero.jpg",
      alt: "Speedboat cutting across the Red Sea with a white wake trailing behind",
      cta: { label: "Explore speedboat", href: "/experience/speedboat-days" },
    },
    {
      id: "discover",
      number: "03",
      label: "Discover",
      title: "Go where the water leads.",
      description:
        "Islands, reefs and quiet coves — places you only find by following the current.",
      image: "/images/sea-turtle-dive.jpg",
      alt: "Sea turtle gliding over a coral reef in clear Red Sea water",
    },
    {
      id: "slow-down",
      number: "04",
      label: "Slow down",
      title: "Take your time.",
      description:
        "Some days are for nothing at all. A beach, a book, and water that asks nothing of you.",
      image: "/images/sea-umbrella-beach.jpg",
      alt: "Quiet beach with umbrellas on soft sand beside the Red Sea",
    },
    {
      id: "sunset",
      number: "05",
      label: "Sunset",
      title: "Stay until the sun goes down.",
      description:
        "The water turns gold, the wind drops, and the day ends the way it should.",
      image: "/images/sea-sunset.jpg",
      alt: "Golden sunset over the Red Sea with warm light reflecting on the water",
      cta: { label: "Find your experience", href: "/explore" },
    },
  ],
  ending: {
    eyebrow: "Wavora / The Red Sea",
    title: "Your next day is out there.",
    text: "Where will Wavora take you?",
    cta: { label: "Explore experiences", href: "/explore" },
  },
};

/**
 * Opacity of a chapter's image at a given scroll progress (0 → 1).
 * Chapters fade in/out across their boundaries, so neighbours crossfade.
 */
export function chapterOpacity(progress: number, index: number): number {
  const total = redSeaStory.chapters.length;
  const start = (index / total) * 1;
  const end = ((index + 1) / total) * 1;
  const fade = 0.06;

  const fadeInStart = index === 0 ? 0 : start - fade;
  const fadeInEnd = index === 0 ? 0 : start + fade;
  const fadeOutStart = index === total - 1 ? 1 : end - fade;
  const fadeOutEnd = index === total - 1 ? 1 : end + fade;

  if (index === 0 && progress <= fadeInEnd) return 1;
  if (progress <= fadeInStart) return 0;
  if (progress < fadeInEnd) {
    return (progress - fadeInStart) / (fadeInEnd - fadeInStart);
  }
  if (progress <= fadeOutStart) return 1;
  if (progress < fadeOutEnd) {
    return 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
  }
  return 0;
}
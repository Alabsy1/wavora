import type { Mood } from "@/types";
import { experiences } from "@/data/experiences";
import type { Experience } from "@/types";

/**
 * DEMO RECOMMENDATION ENGINE — statically maps moods to experiences.
 * Architected so it can later be replaced by a real recommendation API.
 */
export const moods: Mood[] = [
  {
    id: "relax",
    label: "Relax",
    experienceSlugs: [
      "family-beach-day",
      "sunset-sail",
      "sunrise-yoga",
      "sunset-desert-experience",
    ],
  },
  {
    id: "adventure",
    label: "Adventure",
    experienceSlugs: [
      "quad-bike-dunes",
      "jeep-expedition",
      "red-sea-desert-safari",
      "mountain-mischief",
    ],
  },
  {
    id: "explore",
    label: "Explore",
    experienceSlugs: [
      "island-hopping-mahmya",
      "mountain-mischief",
      "private-boat-day",
      "open-water-diving",
    ],
  },
  {
    id: "date",
    label: "Date",
    experienceSlugs: [
      "dinner-on-the-water",
      "sunset-sail",
      "desert-stargazing",
      "sunset-photo-session",
    ],
  },
  {
    id: "family",
    label: "Family",
    experienceSlugs: [
      "family-beach-day",
      "island-hopping-mahmya",
      "giftun-island-boat-trip",
      "sunset-desert-experience",
    ],
  },
  {
    id: "friends",
    label: "Friends",
    experienceSlugs: [
      "island-party-boat",
      "quad-bike-dunes",
      "live-music-night",
      "private-boat-day",
    ],
  },
  {
    id: "luxury",
    label: "Luxury",
    experienceSlugs: [
      "private-boat-day",
      "dinner-on-the-water",
      "sunset-photo-session",
      "jeep-expedition",
    ],
  },
  {
    id: "budget",
    label: "Budget-friendly",
    experienceSlugs: [
      "snorkeling-safari",
      "sunset-sail",
      "sunrise-yoga",
      "live-music-night",
    ],
  },
  {
    id: "sunset",
    label: "Sunset",
    experienceSlugs: [
      "sunset-sail",
      "sunset-desert-experience",
      "dinner-on-the-water",
      "red-sea-desert-safari",
    ],
  },
  {
    id: "sea",
    label: "Sea",
    experienceSlugs: [
      "giftun-island-boat-trip",
      "snorkeling-safari",
      "private-boat-day",
      "sunset-sail",
    ],
  },
  {
    id: "desert",
    label: "Desert",
    experienceSlugs: [
      "red-sea-desert-safari",
      "desert-stargazing",
      "quad-bike-dunes",
      "sunset-desert-experience",
    ],
  },
];

export function getRecommendationsForMood(moodId: string): Experience[] {
  const mood = moods.find((m) => m.id === moodId);
  if (!mood) return [];
  return mood.experienceSlugs
    .map((slug) => experiences.find((e) => e.slug === slug))
    .filter((e): e is Experience => Boolean(e));
}
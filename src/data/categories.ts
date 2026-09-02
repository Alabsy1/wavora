import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "sea",
    label: "Sea",
    tagline: "The Red Sea is calling",
    description:
      "Boat trips, islands, snorkeling, diving and open-water days you'll never forget.",
    image: "/images/sea-wave.jpg",
    path: "/sea",
  },
  {
    slug: "adventure",
    label: "Adventure",
    tagline: "Leave the ordinary behind",
    description:
      "Desert safaris, quad biking, mountains and sunsets in the wild.",
    image: "/images/adv-desert-sunset.jpg",
    path: "/adventures",
  },
  {
    slug: "stays",
    label: "Stays",
    tagline: "Stay somewhere worth remembering",
    description:
      "Curated hotels, resorts, chalets and apartments across the Red Sea.",
    image: "/images/stay-hotel-pool.jpg",
    path: "/stays",
  },
  {
    slug: "spots",
    label: "Spots",
    tagline: "The good places",
    description:
      "Beaches, viewpoints and hidden places we'd actually send our friends to.",
    image: "/images/sunset-silhouette.jpg",
    path: "/spots",
  },
  {
    slug: "eats",
    label: "Eats",
    tagline: "Where the city eats",
    description:
      "Restaurants, cafés and beach tables — good food, better coffee, real atmosphere.",
    image: "/images/eats-table.jpg",
    path: "/eats",
  },
  {
    slug: "experiences",
    label: "Experiences",
    tagline: "Your day, your way",
    description:
      "Unique, romantic, social and family experiences made to be remembered.",
    image: "/images/people-friends.jpg",
    path: "/experiences",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
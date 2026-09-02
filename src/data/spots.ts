import type { Spot } from "@/types";

export const spots: Spot[] = [
  {
    id: "spot-001",
    title: "Giftun Island",
    category: "Island",
    location: "10 km offshore",
    description:
      "The classic Red Sea island — sandbars, shallows and water so clear it looks photoshopped.",
    images: ["/images/sea-umbrella-beach.jpg", "/images/hero-beach.jpg"],
    tags: ["Island", "Beach", "Snorkeling"],
  },
  {
    id: "spot-002",
    title: "Mahmya Beach",
    category: "Beach",
    location: "Mahmya Island",
    description:
      "Protected, calm and beautiful. The beach people mean when they say 'the good one'.",
    images: ["/images/hero-beach.jpg", "/images/sea-umbrella-beach.jpg"],
    tags: ["Beach", "Chill", "Family"],
  },
  {
    id: "spot-003",
    title: "Panorama Viewpoint",
    category: "Viewpoint",
    location: "Red Sea Mountains",
    description:
      "A short climb, a big reward — the whole coast laid out in golden light below you.",
    images: ["/images/adv-peak.jpg", "/images/adv-misty-mountain.jpg"],
    tags: ["Viewpoint", "Sunset", "Hike"],
  },
  {
    id: "spot-004",
    title: "Hidden Coral Bay",
    category: "Hidden gem",
    location: "South of Hurghada",
    description:
      "A small, quiet bay where the reef starts right at the sand. Few people know it. You do now.",
    images: ["/images/sea-turtle-dive.jpg", "/images/sea-dive.jpg"],
    tags: ["Hidden gem", "Snorkeling", "Quiet"],
  },
  {
    id: "spot-005",
    title: "Sunset Point",
    category: "Sunset spot",
    location: "Marina promenade",
    description:
      "The best seat in the city as the sky turns. Cold drink not included, but recommended.",
    images: ["/images/sunset-silhouette.jpg", "/images/sea-sunset.jpg"],
    tags: ["Sunset", "City", "Easy"],
  },
  {
    id: "spot-006",
    title: "Old Town Passage",
    category: "Neighborhood",
    location: "Hurghada Old Town",
    description:
      "Cafés, crafts and a side of Hurghada most visitors never see. Wander — it pays off.",
    images: ["/images/eats-interior.jpg", "/images/eats-cafe.jpg"],
    tags: ["Culture", "Cafés", "Walks"],
  },
];

export function getSpot(id: string): Spot | undefined {
  return spots.find((s) => s.id === id);
}
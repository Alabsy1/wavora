import type { Eat } from "@/types";

export const eats: Eat[] = [
  {
    id: "eat-001",
    title: "Marina Grill House",
    type: "Restaurant",
    location: "Hurghada Marina",
    description:
      "Seafood done simply and honestly, with the marina right beside your table.",
    images: ["/images/eats-restaurant.jpg", "/images/eats-table.jpg"],
    tags: ["Seafood", "Dinner", "Marina"],
  },
  {
    id: "eat-002",
    title: "Boho Coffee Corner",
    type: "Café",
    location: "Downtown",
    description:
      "Proper coffee, warm light and a corner you'll want to stay in longer than planned.",
    images: ["/images/eats-cafe.jpg", "/images/eats-coffee.jpg"],
    tags: ["Coffee", "Work-friendly", "Chill"],
  },
  {
    id: "eat-003",
    title: "Breakfast Club",
    type: "Breakfast spot",
    location: "Old Town",
    description:
      "Slow mornings start here — eggs, sea air and no rush until noon.",
    images: ["/images/eats-breakfast.jpg", "/images/eats-table.jpg"],
    tags: ["Breakfast", "Morning", "Local favorite"],
  },
  {
    id: "eat-004",
    title: "The Deck",
    type: "Beach restaurant",
    location: "Public beach",
    description:
      "Barefoot dining, cold drinks and the water a few steps away. Beach energy, done well.",
    images: ["/images/eats-dish.jpg", "/images/eats-bowl.jpg"],
    tags: ["Beach", "Lunch", "Casual"],
  },
  {
    id: "eat-005",
    title: "Rooftop Dinner Spot",
    type: "Dinner spot",
    location: "Marina",
    description:
      "Date-night territory — a table above the city, warm light and a view that does the talking.",
    images: ["/images/eats-romantic.jpg", "/images/eats-interior.jpg"],
    tags: ["Romantic", "Sunset", "Dinner"],
  },
  {
    id: "eat-006",
    title: "Late Night Bites",
    type: "Social spot",
    location: "Old Town",
    description:
      "Open late, full of locals, and exactly where the evening should probably go.",
    images: ["/images/eats-food.jpg", "/images/eats-bowl.jpg"],
    tags: ["Night", "Social", "Local favorite"],
  },
];

export function getEat(id: string): Eat | undefined {
  return eats.find((e) => e.id === id);
}
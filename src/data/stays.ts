import type { Stay } from "@/types";

/**
 * DEMO DATA — structured so it can be swapped for real backend content later.
 * Price fields are placeholders and must be replaced with real data when available.
 */
export const stays: Stay[] = [
  {
    id: "stay-001",
    title: "Azure Bay Resort",
    type: "resort",
    location: "Sahl Hasheesh",
    description:
      "A slow-resort life on the bay — pools that stretch to the sea, lazy breakfasts and evenings that ask nothing of you.",
    images: ["/images/stay-resort.jpg", "/images/stay-deck.jpg"],
    amenities: ["Beach access", "Pool", "Restaurant", "Spa"],
    priceFrom: 120,
    rating: 4.8,
    featured: true,
  },
  {
    id: "stay-002",
    title: "Coral Edge Hotel",
    type: "hotel",
    location: "Hurghada Marina",
    description:
      "Steps from the boats, with a rooftop that owns the sunset. The smart basecamp for sea days.",
    images: ["/images/stay-hotel-pool.jpg", "/images/stay-suite.jpg"],
    amenities: ["Sea view", "Pool", "Breakfast", "Rooftop bar"],
    priceFrom: 85,
    rating: 4.6,
    featured: true,
  },
  {
    id: "stay-003",
    title: "Sea Glass Chalet",
    type: "chalet",
    location: "El Gouna",
    description:
      "A quiet chalet among the lagoons — your own terrace, your own coffee, your own pace.",
    images: ["/images/stay-chalet.jpg", "/images/stay-interior.jpg"],
    amenities: ["Lagoon view", "Terrace", "Kitchen", "Bikes"],
    priceFrom: 95,
    rating: 4.9,
    featured: true,
  },
  {
    id: "stay-004",
    title: "Old Town Designer Apartment",
    type: "apartment",
    location: "Hurghada Old Town",
    description:
      "White walls, warm light and the city at your doorstep. Where locals actually stay in town.",
    images: ["/images/stay-interior.jpg", "/images/stay-room.jpg"],
    amenities: ["City center", "Fully equipped", "Coffee", "24/7 support"],
    priceFrom: 60,
    rating: 4.5,
    featured: false,
  },
  {
    id: "stay-005",
    title: "Rooftop Deck House",
    type: "apartment",
    location: "Sahl Hasheesh",
    description:
      "A private rooftop, open air and the whole bay as your view. Made for slow mornings and long evenings.",
    images: ["/images/stay-deck.jpg", "/images/stay-hotel-pool.jpg"],
    amenities: ["Rooftop", "Sea view", "Pool access", "Chef option"],
    priceFrom: 140,
    rating: 4.7,
    featured: false,
  },
  {
    id: "stay-006",
    title: "Reef Suite Hotel",
    type: "hotel",
    location: "Hurghada Marina",
    description:
      "Designed rooms, reef-side breakfast and an adult kind of quiet. Small, polished, memorable.",
    images: ["/images/stay-suite.jpg", "/images/stay-room.jpg"],
    amenities: ["Reef access", "Breakfast", "Minimal design", "Concierge"],
    priceFrom: 110,
    rating: 4.7,
    featured: true,
  },
];

export function getStay(id: string): Stay | undefined {
  return stays.find((s) => s.id === id);
}

export function getFeaturedStays(): Stay[] {
  return stays.filter((s) => s.featured);
}
export type CategorySlug =
  | "sea"
  | "adventure"
  | "stays"
  | "spots"
  | "eats"
  | "experiences";

export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: Exclude<CategorySlug, "stays" | "spots" | "eats">;
  location: string;
  description: string;
  images: string[];
  duration: string;
  tags: string[];
  /** Demo price in USD — placeholder until real backend data exists. */
  priceFrom?: number;
  priceNote?: string;
  featured: boolean;
  availability?: string;
}

export type StayType = "hotel" | "resort" | "chalet" | "apartment";

export interface Stay {
  id: string;
  title: string;
  type: StayType;
  location: string;
  description: string;
  images: string[];
  amenities: string[];
  /** Demo price in USD per night — placeholder until real backend data exists. */
  priceFrom?: number;
  rating?: number;
  featured: boolean;
}

export interface Spot {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  images: string[];
  tags: string[];
}

export interface Eat {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  images: string[];
  tags: string[];
}

export interface Category {
  slug: CategorySlug;
  label: string;
  tagline: string;
  description: string;
  image: string;
  path: string;
}

export interface Mood {
  id: string;
  label: string;
  /** Experience slugs recommended for this mood. */
  experienceSlugs: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
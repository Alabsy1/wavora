import type { NavItem } from "@/types";

/**
 * Central place for brand-level configuration.
 * Replace placeholder contact details with real WAVORA info when available.
 */
export const siteConfig = {
  name: "WAVORA",
  tagline: "Explore More. Live Better.",
  url: "https://wavora.example.com",
  location: "Hurghada, Red Sea, Egypt",
  whatsapp: {
    /** Display form shown to users. */
    display: "01121224328",
    /** Normalized international form (Egypt +20, without the leading 0). */
    international: "201121224328",
    url: "https://wa.me/201121224328",
  },
  developer: {
    name: "AbsyCode",
    url: "https://absy-3d-portfolio.vercel.app/",
  },
  /** Placeholder — replace with real contact info. */
  email: "hello@wavora.example.com",
  instagram: "https://instagram.com",
  instagramHandle: "@wavora",
} as const;

export const navItems: NavItem[] = [
  { label: "Explore", href: "/explore" },
  { label: "Sea", href: "/sea" },
  { label: "Adventure", href: "/adventures" },
  { label: "Stays", href: "/stays" },
  { label: "Spots", href: "/spots" },
  { label: "Eats", href: "/eats" },
  { label: "Experiences", href: "/experiences" },
];

export function whatsappLink(message?: string): string {
  const base = siteConfig.whatsapp.url;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoLink(subject?: string): string {
  return `mailto:${siteConfig.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
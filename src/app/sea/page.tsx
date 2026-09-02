import type { Metadata } from "next";
import { SeaHero } from "@/components/sea/sea-hero";
import { SeaIntro } from "@/components/sea/sea-intro";
import { SeaWaysIndex } from "@/components/sea/sea-ways-index";
import { SeaWildSide } from "@/components/sea/sea-wild-side";
import { SeaUnderSurface } from "@/components/sea/sea-under-surface";
import { SeaFinalCta } from "@/components/sea/sea-final-cta";
import { SeaFinalScene } from "@/components/sea/sea-final-scene";

export const metadata: Metadata = {
  title: "Sea — The Red Sea | WAVORA",
  alternates: { canonical: "/sea" },
  description:
    "The Red Sea, up close. Boat days, islands, snorkeling, diving and sunset sails in Hurghada — an entire world waiting to be explored.",
};

/**
 * The page as a film — six scenes, each with its own visual identity:
 * 01 ARRIVE → 02 THE WATER → 03 CHOOSE YOUR WAY →
 * 04 THE WILD SIDE → 05 BELOW THE WATERLINE → 06 YOUR SEA
 */
export default function SeaPage() {
  return (
    <>
      <SeaHero />
      <SeaIntro />
      <SeaWaysIndex />
      <SeaWildSide />
      <SeaUnderSurface />
      <SeaFinalCta />
      <SeaFinalScene />
    </>
  );
}
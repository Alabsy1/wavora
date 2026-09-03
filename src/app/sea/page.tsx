import type { Metadata } from "next";
import { SeaHero } from "@/components/sea/sea-hero";
import { SeaIntro } from "@/components/sea/sea-intro";
import { SeaIslands } from "@/components/sea/sea-islands";
import { SeaWildSide } from "@/components/sea/sea-wild-side";
import { SeaUnderSurface } from "@/components/sea/sea-under-surface";
import { SeaFinalCta } from "@/components/sea/sea-final-cta";
import { SeaFinalScene } from "@/components/sea/sea-final-scene";
import { getSeaPackages, getIslandDestinations } from "@/lib/site-data";
import { SeaPageClient } from "./client";

export const metadata: Metadata = {
  title: "Sea — The Red Sea | WAVORA",
  alternates: { canonical: "/sea" },
  description:
    "The Red Sea, up close. Boat days, islands, snorkeling, diving and sunset sails in Hurghada — an entire world waiting to be explored.",
};

export default async function SeaPage() {
  const [packages, destinations] = await Promise.all([
    getSeaPackages(),
    getIslandDestinations(),
  ]);

  return (
    <>
      <SeaHero />
      <SeaIntro />
      <SeaPageClient packages={packages} destinations={destinations} />
      <SeaIslands destinations={destinations} />
      <SeaWildSide />
      <SeaUnderSurface />
      <SeaFinalCta />
      <SeaFinalScene />
    </>
  );
}

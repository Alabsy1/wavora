import type { Metadata } from "next";
import { OceanHero } from "@/components/ocean/ocean-hero";
import { OceanDevice } from "@/components/ocean/ocean-device";
import { OceanWays } from "@/components/ocean/ocean-ways";
import { OceanChoose } from "@/components/ocean/ocean-choose";
import { OceanMap } from "@/components/ocean/ocean-map";
import { OceanStory } from "@/components/ocean/ocean-story";
import { OceanBook } from "@/components/ocean/ocean-book";
import { OceanFooter } from "@/components/ocean/ocean-footer";
import { OceanCursor } from "@/components/ocean/ocean-cursor";

export const metadata: Metadata = {
  title: "Ocean Experience — Six Ways to Get on the Water",
  description:
    "One sea, six ways to experience it. A cinematic look at the Red Sea — sail, dive, snorkel, relax, explore, discover.",
};

export default function OceanExperiencePage() {
  return (
    <>
      <OceanCursor />
      <OceanHero />
      <OceanDevice />
      <OceanWays />
      <OceanChoose />
      <OceanMap />
      <OceanStory />
      <OceanBook />
      <OceanFooter />
    </>
  );
}
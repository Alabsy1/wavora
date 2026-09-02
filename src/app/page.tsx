import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { DiscoverySection } from "@/components/home/discovery-section";
import { EditorialStatement } from "@/components/home/editorial-statement";
import { SpeedboatSection } from "@/components/home/speedboat-section";
import { DayStory } from "@/components/home/day-story";
import { RedSeaStory } from "@/components/home/red-sea-story";
import { SeaSection } from "@/components/home/sea-section";
import { AdventureSection } from "@/components/home/adventure-section";
import { StaysSection } from "@/components/home/stays-section";
import { LocalGuideSection } from "@/components/home/local-guide-section";
import { MoodSection } from "@/components/home/mood-section";
import { NextDay } from "@/components/home/next-day";
import { ContactBar } from "@/components/contact-bar";
import { speedboatSection } from "@/data/speedboat";
import { getSiteFlags, isNavEnabled, isSectionEnabled } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "WAVORA — Explore More. Live Better.",
  alternates: { canonical: "/" },
  description:
    "Sea trips, desert adventures, curated stays, hidden spots and places worth eating at in Hurghada & the Red Sea. Explore more. Live better.",
};

const marqueeItems = [
  "Red Sea",
  "Hurghada",
  "Islands",
  "Coral reefs",
  "Desert",
  "Sunsets",
  "Hidden spots",
  "Good eats",
];

export default async function HomePage() {
  const flags = await getSiteFlags();

  const showHero = isSectionEnabled(flags, "section_hero");
  const showMoodGrid = isSectionEnabled(flags, "section_mood_grid");
  const showFeaturedSea = isSectionEnabled(flags, "section_featured_sea");
  const showAdventure = isSectionEnabled(flags, "section_adventure");
  const showStays = isSectionEnabled(flags, "section_stays");
  const showSpotsEats = isSectionEnabled(flags, "section_spots_eats");
  const showDayPlanner = isSectionEnabled(flags, "section_day_planner");

  const seaEnabled = isNavEnabled(flags, "sea");
  const adventureEnabled = isNavEnabled(flags, "adventure");
  const staysEnabled = isNavEnabled(flags, "stays");
  const spotsEnabled = isNavEnabled(flags, "spots");
  const eatsEnabled = isNavEnabled(flags, "eats");

  return (
    <>
      {showHero && <Hero />}
      <Marquee items={marqueeItems} />
      {(seaEnabled || adventureEnabled || staysEnabled || spotsEnabled || eatsEnabled) && (
        <DiscoverySection flags={flags} />
      )}
      <EditorialStatement />
      {showDayPlanner && (
        <>
          <Marquee items={speedboatSection.marquee} dark reverse className="py-5" />
          <SpeedboatSection />
          <DayStory />
        </>
      )}
      <RedSeaStory />
      {showFeaturedSea && seaEnabled && <SeaSection />}
      <Marquee items={marqueeItems} dark reverse />
      {showAdventure && adventureEnabled && <AdventureSection />}
      {showStays && staysEnabled && <StaysSection />}
      {showSpotsEats && (spotsEnabled || eatsEnabled) && (
        <LocalGuideSection showSpots={spotsEnabled} showEats={eatsEnabled} />
      )}
      {showMoodGrid && <MoodSection flags={flags} />}
      <NextDay />
      <ContactBar />
    </>
  );
}

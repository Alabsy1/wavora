import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ExploreGrid } from "@/components/explore-grid";
import { CtaSection } from "@/components/cta-section";
import { Marquee } from "@/components/marquee";

export const metadata: Metadata = {
  title: "Explore All Experiences",
  alternates: { canonical: "/explore" },
  description:
    "Browse every WAVORA experience — sea trips, desert adventures and one-off experiences across Hurghada & the Red Sea.",
};

export default function ExplorePage() {
  return (
    <>
      <PageHero
        eyebrow="WAVORA · Explore"
        title="EVERYTHING WE DO."
        description="Sea, desert, water, wheels, dates and detours — every experience we'd recommend, in one place."
        image="/images/hero-turquoise.jpg"
        alt="Aerial view of turquoise Red Sea water near Hurghada"
      />
      <Marquee items={["Sea", "Desert", "Islands", "Mountains", "Dates", "Adventure"]} />

      <section className="container-w py-16 sm:py-20">
        <SectionHeading
          eyebrow="Filter by mood"
          title="FIND YOUR NEXT DAY."
          description="Start broad, go deep. Every card is a starting point for a day worth having."
        />
        <div className="mt-12">
          <ExploreGrid />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
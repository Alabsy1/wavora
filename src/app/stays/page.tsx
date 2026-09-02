import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StayCard } from "@/components/stay-card";
import { CtaSection } from "@/components/cta-section";
import { Marquee } from "@/components/marquee";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { stays } from "@/data/stays";

export const metadata: Metadata = {
  title: "Stays — Curated Places to Sleep",
  alternates: { canonical: "/stays" },
  description:
    "Curated hotels, resorts, chalets and apartments across Hurghada, El Gouna and the Red Sea — chosen by WAVORA.",
};

export default function StaysPage() {
  return (
    <>
      <PageHero
        eyebrow="WAVORA · Stays"
        title="STAY SOMEWHERE WORTH REMEMBERING."
        description="Not a booking portal — a shortlist of places we'd actually stay."
        image="/images/stay-hotel-pool.jpg"
        alt="A resort pool overlooking the Red Sea"
      />
      <Marquee items={["Hotels", "Resorts", "Chalets", "Apartments", "Sea views", "Slow mornings"]} />

      <section className="container-w py-16 sm:py-20">
        <SectionHeading
          eyebrow="The shortlist"
          title="PLACES WE'D ACTUALLY STAY."
          description="Chosen for light, calm and character. Every stay is a real recommendation — prices shown are demo placeholders until live data lands."
        />
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {stays.map((stay, i) => (
            <StaggerItem key={stay.id}>
              <StayCard stay={stay} priority={i < 3} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <CtaSection />
    </>
  );
}
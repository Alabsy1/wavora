import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ImageCard } from "@/components/image-card";
import { CtaSection } from "@/components/cta-section";
import { Marquee } from "@/components/marquee";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { eats } from "@/data/eats";

export const metadata: Metadata = {
  title: "Eats — Restaurants & Cafés in Hurghada",
  alternates: { canonical: "/eats" },
  description:
    "Restaurants, cafés, beach tables and late-night spots in Hurghada — where the locals actually eat, recommended by WAVORA.",
};

export default function EatsPage() {
  return (
    <>
      <PageHero
        eyebrow="WAVORA · Eats"
        title="WHERE THE CITY EATS."
        description="Good food. Better coffee. Places we'd actually send our friends."
        image="/images/eats-table.jpg"
        alt="A table spread with food at a Hurghada restaurant"
      />
      <Marquee items={["Restaurants", "Cafés", "Breakfast", "Beach tables", "Dinner", "Late nights"]} />

      <section className="container-w py-16 sm:py-20">
        <SectionHeading
          eyebrow="The shortlist"
          title="NO SPONSORED LISTS."
          description="Just the tables we keep going back to — from first coffee to last drink."
        />
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {eats.map((eat, i) => (
            <StaggerItem key={eat.id}>
              <ImageCard
                href={`/eat/${eat.id}`}
                image={eat.images[0]}
                alt={eat.title}
                tag={eat.type}
                title={eat.title}
                location={eat.location}
                aspect="square"
                priority={i < 3}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <CtaSection />
    </>
  );
}
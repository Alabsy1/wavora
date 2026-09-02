import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ImageCard } from "@/components/image-card";
import { CtaSection } from "@/components/cta-section";
import { Marquee } from "@/components/marquee";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { spots } from "@/data/spots";

export const metadata: Metadata = {
  title: "Spots — The Good Places in Hurghada",
  alternates: { canonical: "/spots" },
  description:
    "Beaches, viewpoints, hidden gems and places worth going out of your way for around Hurghada and the Red Sea.",
};

export default function SpotsPage() {
  return (
    <>
      <PageHero
        eyebrow="WAVORA · Spots"
        title="THE GOOD PLACES."
        description="Beaches, viewpoints and hidden gems — the map we keep for friends."
        image="/images/sunset-silhouette.jpg"
        alt="Silhouette of a person watching a sunset over the Red Sea"
      />
      <Marquee items={["Beaches", "Viewpoints", "Hidden gems", "Sunsets", "Old Town", "Islands"]} reverse />

      <section className="container-w py-16 sm:py-20">
        <SectionHeading
          eyebrow="Worth the detour"
          title="A FEW OF OUR FAVORITES."
          description="Some are famous, some are secrets. All of them are worth your afternoon."
        />
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {spots.map((spot, i) => (
            <StaggerItem key={spot.id}>
              <ImageCard
                href={`/spot/${spot.id}`}
                image={spot.images[0]}
                alt={spot.title}
                tag={spot.category}
                title={spot.title}
                location={spot.location}
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
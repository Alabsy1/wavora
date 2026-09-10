"use client";

import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ImageCard } from "@/components/image-card";
import { CtaSection } from "@/components/cta-section";
import { Marquee } from "@/components/marquee";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { spots } from "@/data/spots";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";

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
              <AdminEditOverlay
                model="Spot"
                id={spot.id}
                fields={EDIT_CONFIGS.Spot.fields}
                values={{
                  title: spot.title,
                  description: spot.description,
                  coverImage: spot.images[0],
                  location: spot.location,
                }}
                label={spot.title}
              >
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
              </AdminEditOverlay>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <CtaSection />
    </>
  );
}
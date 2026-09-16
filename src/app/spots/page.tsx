import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { Marquee } from "@/components/marquee";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";
import { ImageCard } from "@/components/image-card";

export default async function SpotsPage() {
  const spots = await prisma.spot.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });

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
          {spots.map((spot, i) => {
            const images = JSON.parse(spot.gallery || "[]");
            return (
              <StaggerItem key={spot.id}>
                <AdminEditOverlay
                  model={EDIT_CONFIGS.Spot.model}
                  id={spot.id}
                  fields={EDIT_CONFIGS.Spot.fields}
                  values={{
                    title: spot.title,
                    description: spot.description,
                    coverImage: images[0],
                    location: spot.location,
                  }}
                  label={spot.title}
                >
                  <ImageCard
                    href={`/spot/${spot.id}`}
                    image={images[0]}
                    alt={spot.title}
                    tag={spot.category}
                    title={spot.title}
                    location={spot.location}
                    aspect="square"
                    priority={i < 3}
                  />
                </AdminEditOverlay>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      <CtaSection />
    </>
  );
}

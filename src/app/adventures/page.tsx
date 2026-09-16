import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { Marquee } from "@/components/marquee";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";
import { ExperienceCard } from "@/components/experience-card";
import type { Experience } from "@/types";

export default async function AdventuresPage() {
  const trips = await prisma.trip.findMany({
    where: { visible: true, category: "adventure" },
    orderBy: { order: "asc" },
  });

  const experiences: Experience[] = trips.map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    category: "adventure" as const,
    location: t.location,
    description: t.description,
    images: JSON.parse(t.gallery || "[]"),
    duration: t.duration,
    tags: JSON.parse(t.tags || "[]"),
    priceFrom: t.priceFrom,
    priceNote: t.priceNote,
    featured: t.featured,
  }));

  return (
    <>
      <PageHero
        eyebrow="WAVORA · Adventure"
        title="LEAVE THE ORDINARY BEHIND."
        description="Dunes, red-rock mountains and the kind of sunsets that reset you."
        image="/images/adv-desert-sunset.jpg"
        alt="Golden dunes at sunset in the Eastern Desert"
      />
      <Marquee
        items={["Safari", "Quad", "Mountains", "Stargazing", "Sunsets", "Off-road"]}
        reverse
      />

      <section className="container-w py-16 sm:py-20">
        <SectionHeading
          eyebrow="Choose your adventure"
          title="SAND. STONE. STARS."
          description="From adrenaline to absolutely nothing — the desert gives you a choice, and we'll get you there."
        />
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience, i) => (
            <StaggerItem key={experience.id}>
              <AdminEditOverlay
                model={EDIT_CONFIGS.Trip.model}
                id={experience.id}
                fields={EDIT_CONFIGS.Trip.fields}
                values={{
                  title: experience.title,
                  description: experience.description,
                  priceFrom: experience.priceFrom,
                  coverImage: experience.images[0],
                  location: experience.location,
                  duration: experience.duration,
                }}
                label={experience.title}
              >
                <ExperienceCard experience={experience} priority={i < 3} />
              </AdminEditOverlay>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <CtaSection />
    </>
  );
}

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

export default async function ExperiencesPage() {
  const rows = await prisma.experience.findMany({
    where: { visible: true, category: "experiences" },
    orderBy: { order: "asc" },
  });

  const items: Experience[] = rows.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    category: "experiences" as const,
    location: e.location,
    description: e.description,
    images: JSON.parse(e.gallery || "[]"),
    duration: e.duration,
    tags: JSON.parse(e.tags || "[]"),
    priceFrom: e.priceFrom,
    priceNote: e.priceNote,
    featured: e.featured,
  }));

  return (
    <>
      <PageHero
        eyebrow="WAVORA · Experiences"
        title="YOUR DAY. YOUR WAY."
        description="Unique, romantic, social, family — experiences built to be remembered."
        image="/images/people-friends.jpg"
        alt="Friends enjoying time together on a trip"
      />
      <Marquee items={["Dates", "Groups", "Families", "Photos", "Music", "Sunrise"]} />

      <section className="container-w py-16 sm:py-20">
        <SectionHeading
          eyebrow="Beyond the bucket list"
          title="NOT JUST DOING SOMETHING. EXPERIENCING SOMETHING."
          description="If it's not on the list, we'll build it. These are the starting points."
        />
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((experience, i) => (
            <StaggerItem key={experience.id}>
              <AdminEditOverlay
                model={EDIT_CONFIGS.Experience.model}
                id={experience.id}
                fields={EDIT_CONFIGS.Experience.fields}
                values={{
                  title: experience.title,
                  description: experience.description,
                  priceFrom: experience.priceFrom,
                  coverImage: experience.images[0],
                  location: experience.location,
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

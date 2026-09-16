import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/section-heading";
import { HorizontalScroller } from "@/components/horizontal-scroller";
import { ExperienceCard } from "@/components/experience-card";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";
import type { Experience } from "@/types";

export async function SeaSection() {
  const rows = await prisma.experience.findMany({
    where: { visible: true, category: "sea" },
    orderBy: { order: "asc" },
    take: 6,
  });

  const experiences: Experience[] = rows.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    category: "sea" as const,
    location: e.location,
    description: e.description,
    images: JSON.parse(e.gallery || "[]"),
    duration: e.duration,
    tags: JSON.parse(e.tags || "[]"),
    priceFrom: e.priceFrom,
    priceNote: e.priceNote,
    featured: e.featured,
  }));

  if (experiences.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden bg-section py-20 sm:py-28"
      aria-label="Sea experiences"
    >
      <div className="container-w">
        <SectionHeading
          dark
          eyebrow="Sea"
          title="THE RED SEA IS CALLING."
          description="Crystal water. Hidden islands. Open sea. Unforgettable days."
          link={{ label: "See all sea trips", href: "/sea" }}
        />
      </div>
      <div className="mt-12">
        <HorizontalScroller tone="dark" ariaLabel="Red Sea experiences">
          {experiences.map((experience, i) => (
            <div
              key={experience.id}
              data-card
              className="w-[78%] shrink-0 snap-start sm:w-[360px] lg:w-[400px]"
            >
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
                <ExperienceCard
                  experience={experience}
                  priority={i < 2}
                  dark
                />
              </AdminEditOverlay>
            </div>
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}

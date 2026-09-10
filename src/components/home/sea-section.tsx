"use client";

import { getExperiencesByCategory } from "@/data/experiences";
import { SectionHeading } from "@/components/section-heading";
import { HorizontalScroller } from "@/components/horizontal-scroller";
import { ExperienceCard } from "@/components/experience-card";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";

export function SeaSection() {
  const experiences = getExperiencesByCategory("sea");

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

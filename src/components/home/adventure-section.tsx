"use client";

import { getExperiencesByCategory } from "@/data/experiences";
import { SectionHeading } from "@/components/section-heading";
import { EditorialTile } from "@/components/editorial-tile";
import { Reveal } from "@/components/reveal";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";

export function AdventureSection() {
  const experiences = getExperiencesByCategory("adventure");

  return (
    <section
      className="relative overflow-hidden bg-section py-20 text-section-fg sm:py-28"
      aria-label="Adventure experiences"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[#b4632a]/10 blur-3xl"
      />
      <div className="container-w relative z-10">
        <SectionHeading
          dark
          eyebrow="Adventure"
          title="LEAVE THE ORDINARY BEHIND."
          description="Dunes, red-rock mountains and the kind of sunsets that reset you. Swap the itinerary for instinct."
          link={{ label: "See all adventures", href: "/adventures" }}
        />
      </div>

      <div className="container-w relative z-10 mt-12">
        <Reveal>
          <div className="grid auto-rows-[240px] grid-cols-1 gap-5 sm:auto-rows-[300px] sm:grid-cols-2 lg:grid-cols-12">
            <AdminEditOverlay
              model={EDIT_CONFIGS.Experience.model}
              id={experiences[0].id}
              fields={EDIT_CONFIGS.Experience.fields}
              values={{
                title: experiences[0].title,
                description: experiences[0].description,
                priceFrom: experiences[0].priceFrom,
                coverImage: experiences[0].images[0],
                location: experiences[0].location,
              }}
              label={experiences[0].title}
            >
              <EditorialTile
                href={`/experience/${experiences[0].slug}`}
                image={experiences[0].images[0]}
                alt={experiences[0].title}
                tag={experiences[0].tags[0]}
                title={experiences[0].title}
                subtitle={experiences[0].duration}
                className="sm:col-span-2 lg:col-span-7 lg:row-span-2"
                priority
                sizes="(min-width: 1024px) 58vw, (min-width: 640px) 100vw, 100vw"
              />
            </AdminEditOverlay>
            <AdminEditOverlay
              model={EDIT_CONFIGS.Experience.model}
              id={experiences[1].id}
              fields={EDIT_CONFIGS.Experience.fields}
              values={{
                title: experiences[1].title,
                description: experiences[1].description,
                priceFrom: experiences[1].priceFrom,
                coverImage: experiences[1].images[0],
                location: experiences[1].location,
              }}
              label={experiences[1].title}
            >
              <EditorialTile
                href={`/experience/${experiences[1].slug}`}
                image={experiences[1].images[0]}
                alt={experiences[1].title}
                tag={experiences[1].tags[0]}
                title={experiences[1].title}
                subtitle={experiences[1].duration}
                className="lg:col-span-5"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </AdminEditOverlay>
            <AdminEditOverlay
              model={EDIT_CONFIGS.Experience.model}
              id={experiences[2].id}
              fields={EDIT_CONFIGS.Experience.fields}
              values={{
                title: experiences[2].title,
                description: experiences[2].description,
                priceFrom: experiences[2].priceFrom,
                coverImage: experiences[2].images[0],
                location: experiences[2].location,
              }}
              label={experiences[2].title}
            >
              <EditorialTile
                href={`/experience/${experiences[2].slug}`}
                image={experiences[2].images[0]}
                alt={experiences[2].title}
                tag={experiences[2].tags[0]}
                title={experiences[2].title}
                subtitle={experiences[2].duration}
                className="lg:col-span-5"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </AdminEditOverlay>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

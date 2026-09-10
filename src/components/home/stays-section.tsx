"use client";

import { getFeaturedStays } from "@/data/stays";
import { SectionHeading } from "@/components/section-heading";
import { StayCard } from "@/components/stay-card";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";

export function StaysSection() {
  const featured = getFeaturedStays();

  return (
    <section className="container-w py-20 sm:py-28" aria-label="Places to stay">
      <SectionHeading
        eyebrow="Stays"
        title="STAY SOMEWHERE WORTH REMEMBERING."
        description="Not a booking portal — a shortlist of places we'd actually stay, chosen for light, calm and character."
        link={{ label: "Browse all stays", href: "/stays" }}
      />
      <StaggerGroup className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((stay, i) => (
          <StaggerItem key={stay.id}>
            <AdminEditOverlay
              model={EDIT_CONFIGS.Stay.model}
              id={stay.id}
              fields={EDIT_CONFIGS.Stay.fields}
              values={{
                title: stay.title,
                description: stay.description,
                priceFrom: stay.priceFrom,
                coverImage: stay.images[0],
                location: stay.location,
              }}
              label={stay.title}
            >
              <StayCard stay={stay} priority={i < 3} />
            </AdminEditOverlay>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

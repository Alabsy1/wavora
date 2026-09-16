import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/section-heading";
import { StayCard } from "@/components/stay-card";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";
import type { Stay } from "@/types";

export async function StaysSection() {
  const rows = await prisma.stay.findMany({
    where: { visible: true, featured: true },
    orderBy: { order: "asc" },
    take: 3,
  });

  const featured: Stay[] = rows.map((s) => ({
    id: s.id,
    title: s.title,
    type: s.category as Stay["type"],
    location: s.location,
    description: s.description,
    images: JSON.parse(s.gallery || "[]"),
    amenities: JSON.parse(s.amenities || "[]"),
    priceFrom: s.priceFrom,
    featured: s.featured,
  }));

  if (featured.length === 0) return null;

  return (
    <section className="container-w py-20 sm:py-28" aria-label="Places to stay">
      <SectionHeading
        eyebrow="Stays"
        title="STAY SOMEWHERE WORTH REMEMBERING."
        description="Not a booking portal — a shortlist of places we'd actually stay, chosen for light, calm and character."
        link={{ label: "Browse all stays", href: "/stays" }}
      />
      <StaggerGroup className="mt-12 flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:gap-5 max-md:pb-4 md:grid md:grid-cols-2 md:gap-x-7 md:gap-y-10 lg:grid-cols-3">
        {featured.map((stay, i) => (
          <StaggerItem key={stay.id} className="max-md:min-w-[280px] max-md:snap-start">
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

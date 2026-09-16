import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { Marquee } from "@/components/marquee";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";
import { StayCard } from "@/components/stay-card";
import type { Stay } from "@/types";

export default async function StaysPage() {
  const rows = await prisma.stay.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });

  const items: Stay[] = rows.map((s) => ({
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

  return (
    <>
      <PageHero
        eyebrow="WAVORA · Stays"
        title="STAY SOMEWHERE WORTH REMEMBERING."
        description="Not a booking portal — a shortlist of places we'd actually stay."
        image="/images/stay-hotel-pool.jpg"
        alt="A resort pool overlooking the Red Sea"
      />
      <Marquee items={["Hotels", "Resorts", "Chalets", "Apartments", "Sea views", "Slow mornings"]} />

      <section className="container-w py-16 sm:py-20">
        <SectionHeading
          eyebrow="The shortlist"
          title="PLACES WE'D ACTUALLY STAY."
          description="Chosen for light, calm and character. Every stay is a real recommendation — prices shown are demo placeholders until live data lands."
        />
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((stay, i) => (
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

      <CtaSection />
    </>
  );
}

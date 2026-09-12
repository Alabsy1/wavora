import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/section-heading";
import { EditorialTile } from "@/components/editorial-tile";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";

export async function AdventureSection() {
  const trips = await prisma.trip.findMany({
    where: { visible: true, category: "adventure", featured: true },
    orderBy: { order: "asc" },
    take: 3,
  });

  if (trips.length === 0) return null;

  const [first, second, third] = trips;

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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {first && (
            <AdminEditOverlay
              model={EDIT_CONFIGS.Trip.model}
              id={first.id}
              fields={EDIT_CONFIGS.Trip.fields}
              values={{
                title: first.title,
                description: first.description,
                priceFrom: first.priceFrom,
                coverImage: first.coverImage,
                location: first.location,
              }}
              label={first.title}
            >
              <EditorialTile
                href={`/experience/${first.slug}`}
                image={first.coverImage}
                alt={first.title}
                tag={JSON.parse(first.tags || "[]")[0] ?? ""}
                title={first.title}
                subtitle={first.duration}
                className="h-full aspect-[3/4] sm:aspect-[4/5]"
                priority
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </AdminEditOverlay>
          )}
          {second && (
            <AdminEditOverlay
              model={EDIT_CONFIGS.Trip.model}
              id={second.id}
              fields={EDIT_CONFIGS.Trip.fields}
              values={{
                title: second.title,
                description: second.description,
                priceFrom: second.priceFrom,
                coverImage: second.coverImage,
                location: second.location,
              }}
              label={second.title}
            >
              <EditorialTile
                href={`/experience/${second.slug}`}
                image={second.coverImage}
                alt={second.title}
                tag={JSON.parse(second.tags || "[]")[0] ?? ""}
                title={second.title}
                subtitle={second.duration}
                className="h-full aspect-[3/4] sm:aspect-[4/5]"
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </AdminEditOverlay>
          )}
          {third && (
            <AdminEditOverlay
              model={EDIT_CONFIGS.Trip.model}
              id={third.id}
              fields={EDIT_CONFIGS.Trip.fields}
              values={{
                title: third.title,
                description: third.description,
                priceFrom: third.priceFrom,
                coverImage: third.coverImage,
                location: third.location,
              }}
              label={third.title}
            >
              <EditorialTile
                href={`/experience/${third.slug}`}
                image={third.coverImage}
                alt={third.title}
                tag={JSON.parse(third.tags || "[]")[0] ?? ""}
                title={third.title}
                subtitle={third.duration}
                className="h-full aspect-[3/4] sm:aspect-[4/5]"
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </AdminEditOverlay>
          )}
        </div>
      </div>
    </section>
  );
}

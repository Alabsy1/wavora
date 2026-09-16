import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/section-heading";
import { ImageCard } from "@/components/image-card";
import { Reveal } from "@/components/reveal";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";

interface LocalGuideSectionProps {
  showSpots: boolean;
  showEats: boolean;
}

export async function LocalGuideSection({ showSpots, showEats }: LocalGuideSectionProps) {
  const spotRows = showSpots
    ? await prisma.spot.findMany({ where: { visible: true }, orderBy: { order: "asc" }, take: 3 })
    : [];
  const eatRows = showEats
    ? await prisma.spot.findMany({ where: { visible: true, category: "eats" }, orderBy: { order: "asc" }, take: 2 })
    : [];

  const spotItems = spotRows.map((s) => ({ ...s, images: JSON.parse(s.gallery || "[]") as string[] }));
  const eatItems = eatRows.map((s) => ({ ...s, images: JSON.parse(s.gallery || "[]") as string[] }));

  const favorites = [
    showEats && "Cafés",
    showSpots && "Beaches",
    showSpots && "Hidden spots",
    showSpots && "Sunset spots",
    showEats && "Nightlife",
  ].filter(Boolean) as string[];

  return (
    <section
      className="bg-section py-20 text-section-fg sm:py-28"
      aria-label="Local guide"
    >
      <div className="container-w grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div>
            <SectionHeading
              dark
              eyebrow="Local guide"
              title="WE KNOW THE GOOD PLACES."
              description="Good food. Better coffee. Secret spots. Places we'd actually send our friends."
            />
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-section-fg/60">
              WAVORA lives here. So the list isn&apos;t sponsored or scraped —
              it&apos;s where we go when we&apos;re off the clock.
            </p>
            {favorites.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {favorites.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-section-fg/20 px-4 py-2 text-[0.8125rem] font-semibold text-section-fg/75 transition-colors duration-300 hover:border-section-fg/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-10 flex flex-wrap gap-4">
              {showEats && (
                <a href="/eats" className="link-underline text-[0.9375rem] font-bold text-section-fg">
                  Places to eat
                </a>
              )}
              {showSpots && (
                <a href="/spots" className="link-underline text-[0.9375rem] font-bold text-section-fg">
                  Places to see
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="grid grid-cols-2 gap-5 lg:gap-6">
            <div className="flex flex-col gap-5 lg:gap-6 lg:translate-y-8">
              {showEats && eatItems[0] && (
                <AdminEditOverlay
                  model={EDIT_CONFIGS.Spot.model}
                  id={eatItems[0].id}
                  fields={EDIT_CONFIGS.Spot.fields}
                  values={{
                    title: eatItems[0].title,
                    description: eatItems[0].description,
                    coverImage: eatItems[0].images[0],
                    location: eatItems[0].location,
                  }}
                  label={eatItems[0].title}
                >
                  <ImageCard
                    href="/eats"
                    image={eatItems[0].images[0]}
                    alt={eatItems[0].title}
                    tag={eatItems[0].tags ? JSON.parse(eatItems[0].tags)[0] ?? "" : ""}
                    title={eatItems[0].title}
                    location={eatItems[0].location}
                    aspect="portrait"
                    dark
                    priority
                  />
                </AdminEditOverlay>
              )}
              {showSpots && spotItems[0] && (
                <AdminEditOverlay
                  model={EDIT_CONFIGS.Spot.model}
                  id={spotItems[0].id}
                  fields={EDIT_CONFIGS.Spot.fields}
                  values={{
                    title: spotItems[0].title,
                    description: spotItems[0].description,
                    coverImage: spotItems[0].images[0],
                    location: spotItems[0].location,
                  }}
                  label={spotItems[0].title}
                >
                  <ImageCard
                    href="/spots"
                    image={spotItems[0].images[0]}
                    alt={spotItems[0].title}
                    tag={spotItems[0].tags ? JSON.parse(spotItems[0].tags)[0] ?? "" : ""}
                    title={spotItems[0].title}
                    location={spotItems[0].location}
                    aspect="portrait"
                    dark
                  />
                </AdminEditOverlay>
              )}
            </div>
            <div className="flex flex-col gap-5 lg:gap-6">
              {showSpots && spotItems[1] && (
                <AdminEditOverlay
                  model={EDIT_CONFIGS.Spot.model}
                  id={spotItems[1].id}
                  fields={EDIT_CONFIGS.Spot.fields}
                  values={{
                    title: spotItems[1].title,
                    description: spotItems[1].description,
                    coverImage: spotItems[1].images[0],
                    location: spotItems[1].location,
                  }}
                  label={spotItems[1].title}
                >
                  <ImageCard
                    href="/spots"
                    image={spotItems[1].images[0]}
                    alt={spotItems[1].title}
                    tag={spotItems[1].tags ? JSON.parse(spotItems[1].tags)[0] ?? "" : ""}
                    title={spotItems[1].title}
                    location={spotItems[1].location}
                    aspect="portrait"
                    dark
                  />
                </AdminEditOverlay>
              )}
              {showEats && eatItems[1] && (
                <AdminEditOverlay
                  model={EDIT_CONFIGS.Spot.model}
                  id={eatItems[1].id}
                  fields={EDIT_CONFIGS.Spot.fields}
                  values={{
                    title: eatItems[1].title,
                    description: eatItems[1].description,
                    coverImage: eatItems[1].images[0],
                    location: eatItems[1].location,
                  }}
                  label={eatItems[1].title}
                >
                  <ImageCard
                    href="/eats"
                    image={eatItems[1].images[0]}
                    alt={eatItems[1].title}
                    tag={eatItems[1].tags ? JSON.parse(eatItems[1].tags)[0] ?? "" : ""}
                    title={eatItems[1].title}
                    location={eatItems[1].location}
                    aspect="portrait"
                    dark
                  />
                </AdminEditOverlay>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

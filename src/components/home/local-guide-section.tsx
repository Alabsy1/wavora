"use client";

import { SectionHeading } from "@/components/section-heading";
import { ImageCard } from "@/components/image-card";
import { Reveal } from "@/components/reveal";
import { AdminEditOverlay } from "@/components/admin/admin-edit-overlay";
import { EDIT_CONFIGS } from "@/lib/edit-configs";

interface LocalGuideSectionProps {
  showSpots: boolean;
  showEats: boolean;
}

export function LocalGuideSection({ showSpots, showEats }: LocalGuideSectionProps) {
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
              {showEats && (
                <AdminEditOverlay
                  model={EDIT_CONFIGS.Spot.model}
                  id="boho-coffee-corner"
                  fields={EDIT_CONFIGS.Spot.fields}
                  values={{
                    title: "Boho Coffee Corner",
                    description: "A warm café interior in Hurghada",
                    coverImage: "/images/eats-cafe.jpg",
                    location: "Downtown",
                  }}
                  label="Boho Coffee Corner"
                >
                  <ImageCard
                    href="/eats"
                    image="/images/eats-cafe.jpg"
                    alt="A warm café interior in Hurghada"
                    tag="Café"
                    title="Boho Coffee Corner"
                    location="Downtown"
                    aspect="portrait"
                    dark
                    priority
                  />
                </AdminEditOverlay>
              )}
              {showSpots && (
                <AdminEditOverlay
                  model={EDIT_CONFIGS.Spot.model}
                  id="sunset-point"
                  fields={EDIT_CONFIGS.Spot.fields}
                  values={{
                    title: "Sunset Point",
                    description: "Silhouette of a person watching a sunset",
                    coverImage: "/images/sunset-silhouette.jpg",
                    location: "Marina promenade",
                  }}
                  label="Sunset Point"
                >
                  <ImageCard
                    href="/spots"
                    image="/images/sunset-silhouette.jpg"
                    alt="Silhouette of a person watching a sunset"
                    tag="Sunset"
                    title="Sunset Point"
                    location="Marina promenade"
                    aspect="portrait"
                    dark
                  />
                </AdminEditOverlay>
              )}
            </div>
            <div className="flex flex-col gap-5 lg:gap-6">
              {showSpots && (
                <AdminEditOverlay
                  model={EDIT_CONFIGS.Spot.model}
                  id="hidden-coral-bay"
                  fields={EDIT_CONFIGS.Spot.fields}
                  values={{
                    title: "Hidden Coral Bay",
                    description: "Sea turtle swimming above a coral reef",
                    coverImage: "/images/sea-turtle-dive.jpg",
                    location: "South of Hurghada",
                  }}
                  label="Hidden Coral Bay"
                >
                  <ImageCard
                    href="/spots"
                    image="/images/sea-turtle-dive.jpg"
                    alt="Sea turtle swimming above a coral reef"
                    tag="Hidden gem"
                    title="Hidden Coral Bay"
                    location="South of Hurghada"
                    aspect="portrait"
                    dark
                  />
                </AdminEditOverlay>
              )}
              {showEats && (
                <AdminEditOverlay
                  model={EDIT_CONFIGS.Spot.model}
                  id="rooftop-dinner-spot"
                  fields={EDIT_CONFIGS.Spot.fields}
                  values={{
                    title: "Rooftop Dinner Spot",
                    description: "Romantic rooftop dinner table by the sea",
                    coverImage: "/images/eats-romantic.jpg",
                    location: "Marina",
                  }}
                  label="Rooftop Dinner Spot"
                >
                  <ImageCard
                    href="/eats"
                    image="/images/eats-romantic.jpg"
                    alt="Romantic rooftop dinner table by the sea"
                    tag="Dinner"
                    title="Rooftop Dinner Spot"
                    location="Marina"
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

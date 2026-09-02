import { SectionHeading } from "@/components/section-heading";
import { ImageCard } from "@/components/image-card";
import { Reveal } from "@/components/reveal";

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
              )}
              {showSpots && (
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
              )}
            </div>
            <div className="flex flex-col gap-5 lg:gap-6">
              {showSpots && (
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
              )}
              {showEats && (
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
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

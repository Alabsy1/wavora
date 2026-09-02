import { getExperiencesByCategory } from "@/data/experiences";
import { SectionHeading } from "@/components/section-heading";
import { EditorialTile } from "@/components/editorial-tile";
import { Reveal } from "@/components/reveal";

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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
import { getExperiencesByCategory } from "@/data/experiences";
import { SectionHeading } from "@/components/section-heading";
import { HorizontalScroller } from "@/components/horizontal-scroller";
import { ExperienceCard } from "@/components/experience-card";

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
              <ExperienceCard
                experience={experience}
                priority={i < 2}
                dark
              />
            </div>
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}
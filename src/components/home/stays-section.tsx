import { getFeaturedStays } from "@/data/stays";
import { SectionHeading } from "@/components/section-heading";
import { StayCard } from "@/components/stay-card";
import { StaggerGroup, StaggerItem } from "@/components/reveal";

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
            <StayCard stay={stay} priority={i < 3} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
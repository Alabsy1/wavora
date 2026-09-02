import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceCard } from "@/components/experience-card";
import { CtaSection } from "@/components/cta-section";
import { Marquee } from "@/components/marquee";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { getExperiencesByCategory } from "@/data/experiences";

export const metadata: Metadata = {
  title: "Adventures & Desert Safaris",
  alternates: { canonical: "/adventures" },
  description:
    "Desert safaris, quad biking, mountain treks and stargazing nights around Hurghada — curated by WAVORA.",
};

export default function AdventuresPage() {
  const items = getExperiencesByCategory("adventure");

  return (
    <>
      <PageHero
        eyebrow="WAVORA · Adventure"
        title="LEAVE THE ORDINARY BEHIND."
        description="Dunes, red-rock mountains and the kind of sunsets that reset you."
        image="/images/adv-desert-sunset.jpg"
        alt="Golden dunes at sunset in the Eastern Desert"
      />
      <Marquee
        items={["Safari", "Quad", "Mountains", "Stargazing", "Sunsets", "Off-road"]}
        reverse
      />

      <section className="container-w py-16 sm:py-20">
        <SectionHeading
          eyebrow="Choose your adventure"
          title="SAND. STONE. STARS."
          description="From adrenaline to absolutely nothing — the desert gives you a choice, and we'll get you there."
        />
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((experience, i) => (
            <StaggerItem key={experience.id}>
              <ExperienceCard experience={experience} priority={i < 3} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <CtaSection />
    </>
  );
}
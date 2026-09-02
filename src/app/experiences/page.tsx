import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceCard } from "@/components/experience-card";
import { CtaSection } from "@/components/cta-section";
import { Marquee } from "@/components/marquee";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { getExperiencesByCategory } from "@/data/experiences";

export const metadata: Metadata = {
  title: "Experiences — Made to Be Remembered",
  alternates: { canonical: "/experiences" },
  description:
    "Unique, romantic, social and family experiences around Hurghada & the Red Sea — curated by WAVORA.",
};

export default function ExperiencesPage() {
  const items = getExperiencesByCategory("experiences");

  return (
    <>
      <PageHero
        eyebrow="WAVORA · Experiences"
        title="YOUR DAY. YOUR WAY."
        description="Unique, romantic, social, family — experiences built to be remembered."
        image="/images/people-friends.jpg"
        alt="Friends enjoying time together on a trip"
      />
      <Marquee items={["Dates", "Groups", "Families", "Photos", "Music", "Sunrise"]} reverse />

      <section className="container-w py-16 sm:py-20">
        <SectionHeading
          eyebrow="Beyond the bucket list"
          title="NOT JUST DOING SOMETHING. EXPERIENCING SOMETHING."
          description="If it's not on the list, we'll build it. These are the starting points."
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
import { SectionHeading } from "@/components/section-heading";
import { RecommendationSelector } from "@/components/recommendation-selector";
import { Reveal } from "@/components/reveal";
import type { SiteFlags } from "@/lib/site-data";

interface MoodSectionProps {
  flags: SiteFlags;
}

export function MoodSection({ flags }: MoodSectionProps) {
  return (
    <section className="container-w py-20 sm:py-28" aria-label="Personalized recommendations">
      <SectionHeading
        eyebrow="Personalized"
        align="center"
        title="WHAT KIND OF DAY DO YOU WANT?"
        description="Pick a mood and we'll show you a day built around it. Hand-picked, not algorithm-dredged."
      />
      <Reveal delay={0.15} className="mt-12">
        <RecommendationSelector flags={flags} />
      </Reveal>
    </section>
  );
}

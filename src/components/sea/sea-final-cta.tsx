import { seaFinalCta } from "@/data/sea";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";

/**
 * Scene 06 / beat A — YOUR SEA. YOUR WAY.
 * The conclusion: quiet, typographic, confident.
 */
export function SeaFinalCta() {
  return (
    <section
      aria-label="Your sea, your way"
      className="bg-section py-24 text-section-fg sm:py-32"
    >
      <div className="container-w flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <p className="flex items-center gap-4 text-[0.625rem] font-bold uppercase tracking-[0.35em] text-section-fg/50">
            <span className="text-2xl font-extrabold tracking-tight text-section-fg">
              {seaFinalCta.number}
            </span>
            <span className="h-px w-10 bg-section-fg/25" aria-hidden="true" />
            {seaFinalCta.label}
          </p>
          <h2 className="display-xl mt-8 text-balance text-section-fg">
            {seaFinalCta.title[0]}
            <br />
            <span className="bg-gradient-to-r from-section-fg via-section-fg to-section-fg/40 bg-clip-text text-transparent">
              {seaFinalCta.title[1]}
            </span>
          </h2>
          <p className="mt-7 max-w-md text-pretty text-base leading-relaxed text-section-fg/65 sm:text-lg">
            {seaFinalCta.description}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              href={seaFinalCta.primaryCta.href}
              variant="light"
              size="lg"
              arrow
            >
              {seaFinalCta.primaryCta.label}
            </Button>
            <Button
              href={seaFinalCta.secondaryCta.href}
              variant="outline-light"
              size="lg"
            >
              {seaFinalCta.secondaryCta.label}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-16 flex items-center gap-4 text-[0.625rem] font-bold uppercase tracking-[0.3em] text-section-fg/35">
            <span className="h-px w-8 bg-section-fg/20" aria-hidden="true" />
            Wavora · Red Sea · Egypt
            <span className="h-px w-8 bg-section-fg/20" aria-hidden="true" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
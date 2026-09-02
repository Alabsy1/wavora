import Image from "next/image";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { nextDay } from "@/data/home-editorial";

export function NextDay() {
  return (
    <section
      className="relative overflow-hidden bg-section py-24 text-section-fg sm:py-32"
      aria-label="Your next day is out there"
    >
      <Image
        src={nextDay.backgroundImage.src}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-section/70 via-section/85 to-section"
      />

      <div className="container-w relative z-10 flex flex-col items-center py-16 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <p className="eyebrow justify-center text-section-fg/60">
            {nextDay.eyebrow}
          </p>
          <h2 className="display-xl text-balance text-section-fg">
            {nextDay.titleTop}
            <br />
            <span className="bg-gradient-to-r from-turquoise to-section-fg bg-clip-text text-transparent">
              {nextDay.titleBottom}
            </span>
          </h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-section-fg/70 sm:text-lg">
            {nextDay.description}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-9">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {nextDay.actions.map((action) => (
              <Button
                key={action.label}
                href={action.href}
                variant="outline-light"
                size="sm"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <Button
            href={nextDay.primaryCta.href}
            variant="light"
            size="lg"
            arrow
            className="mt-7"
          >
            {nextDay.primaryCta.label}
          </Button>
        </Reveal>

        <Reveal delay={0.24}>
          <dl className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-section-fg/15 pt-8">
            {nextDay.stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-turquoise">
                  {stat.value}
                </dd>
                <dd className="text-[0.8125rem] font-semibold text-section-fg/60">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
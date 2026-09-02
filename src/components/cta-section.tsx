import Image from "next/image";
import { PlanForm } from "@/components/plan-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function CtaSection() {
  return (
    <section className="container-w py-20 sm:py-28" aria-label="Plan your trip">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-section text-section-fg">
          <Image
            src="/images/adv-desert-night.jpg"
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-section/60 via-section/85 to-section" />

          <div className="relative z-10 grid gap-12 p-6 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <div className="flex flex-col justify-center">
              <SectionHeading
                dark
                eyebrow="Plan with us"
                title={
                  <>
                    DON&apos;T KNOW
                    <br />
                    WHERE TO START?
                  </>
                }
                description="Tell us what you're looking for. We'll help you build the right day — no agenda, no pressure, just the good stuff."
                className="[&_h2]:display-lg"
              />
              <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
                {["No booking fees", "Local team", "Real advice"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-section-fg/20 px-4 py-2 text-[0.8125rem] font-semibold text-section-fg/80"
                  >
                    {item}
                  </span>
                ))}
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-section-fg/10 bg-pill/[0.06] p-6 backdrop-blur-sm sm:p-8">
                <p className="eyebrow mb-6 text-section-fg/60">
                  Tell us what you&apos;re looking for
                </p>
                <PlanForm dark />
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
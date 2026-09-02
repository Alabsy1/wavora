import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PlanForm } from "@/components/plan-form";
import { Reveal } from "@/components/reveal";
import { MessageCircle, MapPin, CalendarDays, Users } from "lucide-react";
import { whatsappLink, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Plan a Trip",
  alternates: { canonical: "/plan" },
  description:
    "Tell WAVORA what kind of day you want in Hurghada and we'll build it — trips, stays, spots and everything in between.",
};

const steps = [
  {
    icon: CalendarDays,
    title: "Tell us your dates",
    text: "When are you coming and how many of you?",
  },
  {
    icon: Users,
    title: "Describe the vibe",
    text: "Relaxed, adventurous, romantic — or completely undecided.",
  },
  {
    icon: MapPin,
    title: "We build the day",
    text: "A local recommends a plan that actually fits — not a brochure.",
  },
];

export default function PlanPage() {
  return (
    <>
      <PageHero
        eyebrow="WAVORA · Plan"
        title="DON'T KNOW WHERE TO START?"
        description="Good — that's exactly what we're for. Tell us what you're looking for and we'll help you build the right day."
        image="/images/adv-mountain-lake.jpg"
        alt="A mountain valley in golden light"
        compact
      />

      <section className="container-w py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-fg/50">How it works</p>
              <h2 className="display-md mt-4 text-fg">
                THREE STEPS TO A BETTER DAY.
              </h2>
              <div className="mt-10 flex flex-col gap-8">
                {steps.map((step, i) => (
                  <div key={step.title} className="flex gap-5">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-fg/10 bg-white text-fg">
                      <step.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-fg/40">
                        Step {i + 1}
                      </p>
                      <h3 className="mt-1 text-lg font-bold tracking-tight text-fg">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-fg/60">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <a
                href={whatsappLink("Hi WAVORA! I'd like to plan a day in Hurghada.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-bold text-fg link-underline"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Prefer to just chat? Message us directly
              </a>
              <p className="mt-3 text-sm text-fg/50">
                {siteConfig.whatsapp.display} · {siteConfig.instagramHandle}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="rounded-[2rem] border border-fg/10 bg-page-dim p-6 sm:p-10">
              <p className="eyebrow mb-8 text-fg/50">Plan my experience</p>
              <PlanForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
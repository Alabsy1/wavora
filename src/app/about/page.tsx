import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { Marquee } from "@/components/marquee";
import { WaveMark as LogoMark } from "@/components/logo-mark";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description:
    "WAVORA is a travel & lifestyle brand based in Hurghada, Egypt — the local friend who knows where to go, what to do and where to eat.",
};

const values = [
  {
    title: "Local first",
    text: "Everything on this site is somewhere we'd actually send a friend. No paid lists, no filler.",
  },
  {
    title: "Honest advice",
    text: "If a trip isn't worth your afternoon, we'll say so — and point you to one that is.",
  },
  {
    title: "Made to be remembered",
    text: "We don't sell checkboxes. We build days that turn into stories you tell later.",
  },
  {
    title: "Easily expandable",
    text: "From sea to safari to supper — one brand, one promise: explore more, live better.",
  },
];

const stats = [
  { value: "Red Sea", label: "Our home" },
  { value: "6", label: "Ways to explore" },
  { value: "24/7", label: "We're a WhatsApp away" },
  { value: "0", label: "Clichés" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="WAVORA · About"
        title="THE COOLEST LOCAL FRIEND IN HURGHADA."
        description="WAVORA is a travel & lifestyle brand based on the Red Sea — built around one idea: the right experience, chosen for you."
        image="/images/sea-canoe-lake.jpg"
        alt="A calm boat on turquoise water"
      />
      <Marquee items={["Local", "Honest", "Adventurous", "Premium", "Human", "Free"]} />

      <section className="container-w py-16 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="The idea"
              title="EXPLORE MORE. LIVE BETTER."
              description="Most travel sites sell you an itinerary. We'd rather know what you're actually in the mood for — then send you somewhere that fits."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <p className="text-pretty text-base leading-relaxed text-fg/70 sm:text-lg">
                WAVORA started in Hurghada with a simple observation: the best
                days here are never on the front page. The best boat, the
                quietest beach, the coffee spot everyone agrees on, the sunset
                that makes people go quiet.
              </p>
              <p className="text-pretty text-base leading-relaxed text-fg/70 sm:text-lg">
                So we built WAVORA — a discovery platform, a local guide and a
                trip planner in one. Tell us what kind of day you want, and
                we&apos;ll help you find it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-w pb-16 sm:pb-20">
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-fg/10 bg-fg/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-page p-8">
                <p className="display-md text-fg">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold text-fg/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-w pb-16 sm:pb-20">
        <SectionHeading
          eyebrow="What we stand for"
          title="HOW WE DO IT."
          description="Four promises that keep WAVORA feeling like a friend, not a funnel."
        />
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.06}>
              <div className="flex flex-col gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-fg text-page">
                  <LogoMark className="h-5 w-auto" />
                </span>
                <h3 className="text-lg font-bold tracking-tight text-fg">
                  {value.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-fg/60">
                  {value.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
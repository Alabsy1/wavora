import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, MapPin, Tag, CalendarDays } from "lucide-react";
import { experiences } from "@/data/experiences";
import { getCategory } from "@/data/categories";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { ExperienceCard } from "@/components/experience-card";
import { whatsappLink } from "@/data/site";

export function generateStaticParams() {
  return experiences.map((experience) => ({ slug: experience.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((e) => e.slug === slug);
  if (!experience) return { title: "Not Found" };
  return {
    title: experience.title,
    alternates: { canonical: `/experience/${experience.slug}` },
    description: experience.description,
    openGraph: {
      title: `${experience.title} — WAVORA`,
      description: experience.description,
      images: [{ url: experience.images[0], alt: experience.title }],
    },
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const experience = experiences.find((e) => e.slug === slug);
  if (!experience) notFound();

  const category = getCategory(experience.category);
  const related = experiences
    .filter((e) => e.category === experience.category && e.id !== experience.id)
    .slice(0, 3);

  const details = [
    { icon: Clock, label: "Duration", value: experience.duration },
    { icon: MapPin, label: "Location", value: experience.location },
    ...(experience.availability
      ? [{ icon: CalendarDays, label: "Availability", value: experience.availability }]
      : []),
  ];

  const message = `Hi WAVORA! I'm interested in "${experience.title}" (${experience.duration}). Can you tell me more?`;

  return (
    <>
      <PageHero
        eyebrow={`WAVORA · ${category?.label ?? "Experience"}`}
        title={experience.title}
        description={experience.description}
        image={experience.images[0]}
        alt={experience.title}
      />

      <section className="container-w py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <Reveal>
            <div className="space-y-10">
              <p className="text-pretty text-lg leading-relaxed text-fg/75 sm:text-xl">
                {experience.description}
              </p>

              {experience.images[1] && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                  <Image
                    src={experience.images[1]}
                    alt={`${experience.title} — another view`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <SectionHeading eyebrow="The details" title="GOOD TO KNOW." />
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-fg/15 px-4 py-2 text-sm font-semibold text-fg/70"
                    >
                      <Tag className="size-3.5" aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-fg/10 bg-page-dim p-7">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-fg/50">
                      {experience.priceNote ?? "Price"}
                    </p>
                    <p className="display-sm mt-1 text-fg">
                      {experience.priceFrom !== undefined
                        ? `$${experience.priceFrom}`
                        : "On request"}
                    </p>
                  </div>
                  <span className="rounded-full bg-fg px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-page">
                    {category?.label}
                  </span>
                </div>

                <dl className="mt-7 flex flex-col gap-5 border-t border-fg/10 pt-7">
                  {details.map((detail) => (
                    <div key={detail.label} className="flex items-center gap-4">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-fg/10 bg-white text-fg">
                        <detail.icon className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-fg/45">
                          {detail.label}
                        </dt>
                        <dd className="text-[0.9375rem] font-semibold text-fg">
                          {detail.value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-col gap-3">
                  <Button
                    href={whatsappLink(message)}
                    size="lg"
                    className="w-full"
                    external
                  >
                    Book with WAVORA
                  </Button>
                  <Button
                    href="/plan"
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Ask about it
                  </Button>
                </div>
                <p className="mt-4 text-center text-xs text-fg/45">
                  Demo pricing shown. Final quote on request.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-w pb-16 sm:pb-24">
          <SectionHeading
            eyebrow="Keep exploring"
            title="MORE FROM THE RED SEA."
            link={{ label: "See all", href: `/${experience.category}` }}
          />
          <div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedExperience, i) => (
              <Reveal key={relatedExperience.id} delay={i * 0.06}>
                <ExperienceCard experience={relatedExperience} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: experience.title,
            description: experience.description,
            touristType: experience.tags,
            location: {
              "@type": "Place",
              name: experience.location,
              address: "Hurghada, Red Sea, Egypt",
            },
            ...(experience.priceFrom !== undefined
              ? {
                  offers: {
                    "@type": "Offer",
                    price: experience.priceFrom,
                    priceCurrency: "USD",
                  },
                }
              : {}),
          }),
        }}
      />

      <CtaSection />
    </>
  );
}
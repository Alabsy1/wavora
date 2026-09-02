import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Star, Check } from "lucide-react";
import { stays } from "@/data/stays";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { StayCard } from "@/components/stay-card";
import { whatsappLink } from "@/data/site";

export function generateStaticParams() {
  return stays.map((stay) => ({ id: stay.id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const stay = stays.find((s) => s.id === id);
  if (!stay) return { title: "Not Found" };
  return {
    title: stay.title,
    alternates: { canonical: `/stay/${stay.id}` },
    description: stay.description,
    openGraph: {
      title: `${stay.title} — WAVORA`,
      description: stay.description,
      images: [{ url: stay.images[0], alt: stay.title }],
    },
  };
}

export default async function StayPage({ params }: PageProps) {
  const { id } = await params;
  const stay = stays.find((s) => s.id === id);
  if (!stay) notFound();

  const related = stays.filter((s) => s.id !== stay.id).slice(0, 3);
  const message = `Hi WAVORA! I'm interested in staying at "${stay.title}" in ${stay.location}. Can you help?`;

  return (
    <>
      <PageHero
        eyebrow={`WAVORA · ${stay.type}`}
        title={stay.title}
        description={stay.description}
        image={stay.images[0]}
        alt={stay.title}
        compact
      />

      <section className="container-w py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <Reveal>
            <div className="space-y-10">
              <p className="text-pretty text-lg leading-relaxed text-fg/75 sm:text-xl">
                {stay.description}
              </p>

              {stay.images[1] && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                  <Image
                    src={stay.images[1]}
                    alt={`${stay.title} — another view`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <SectionHeading eyebrow="Amenities" title="WHAT YOU GET." />
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {stay.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center gap-3 rounded-2xl border border-fg/10 bg-page-dim px-5 py-3.5 text-[0.9375rem] font-semibold text-fg/80"
                    >
                      <span className="inline-flex size-6 items-center justify-center rounded-full bg-fg text-page">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-fg/10 bg-page-dim p-7">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-fg/50">
                      Per night
                    </p>
                    <p className="display-sm mt-1 text-fg">
                      {stay.priceFrom !== undefined
                        ? `$${stay.priceFrom}`
                        : "On request"}
                    </p>
                  </div>
                  {stay.rating && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-fg px-3 py-1 text-[0.8125rem] font-bold text-page">
                      <Star className="size-3.5 fill-current" aria-hidden="true" />
                      {stay.rating.toFixed(1)}
                    </span>
                  )}
                </div>

                <dl className="mt-7 border-t border-fg/10 pt-7">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-fg/10 bg-white text-fg">
                      <MapPin className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-fg/45">
                        Location
                      </dt>
                      <dd className="text-[0.9375rem] font-semibold text-fg">
                        {stay.location}
                      </dd>
                    </div>
                  </div>
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
                  <Button href="/plan" variant="outline" size="lg" className="w-full">
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

      <section className="container-w pb-16 sm:pb-24">
        <SectionHeading
          eyebrow="Keep exploring"
          title="MORE PLACES TO STAY."
          link={{ label: "See all stays", href: "/stays" }}
        />
        <div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((relatedStay, i) => (
            <Reveal key={relatedStay.id} delay={i * 0.06}>
              <StayCard stay={relatedStay} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
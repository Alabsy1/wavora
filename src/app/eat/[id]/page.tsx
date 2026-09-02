import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Tag } from "lucide-react";
import { eats } from "@/data/eats";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { ImageCard } from "@/components/image-card";
import { whatsappLink } from "@/data/site";

export function generateStaticParams() {
  return eats.map((eat) => ({ id: eat.id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const eat = eats.find((e) => e.id === id);
  if (!eat) return { title: "Not Found" };
  return {
    title: eat.title,
    alternates: { canonical: `/eat/${eat.id}` },
    description: eat.description,
    openGraph: {
      title: `${eat.title} — WAVORA`,
      description: eat.description,
      images: [{ url: eat.images[0], alt: eat.title }],
    },
  };
}

export default async function EatPage({ params }: PageProps) {
  const { id } = await params;
  const eat = eats.find((e) => e.id === id);
  if (!eat) notFound();

  const related = eats.filter((e) => e.id !== eat.id).slice(0, 3);
  const message = `Hi WAVORA! Tell me more about "${eat.title}" in ${eat.location}.`;

  return (
    <>
      <PageHero
        eyebrow={`WAVORA · ${eat.type}`}
        title={eat.title}
        description={eat.description}
        image={eat.images[0]}
        alt={eat.title}
        compact
      />

      <section className="container-w py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <Reveal>
            <div className="space-y-10">
              <p className="text-pretty text-lg leading-relaxed text-fg/75 sm:text-xl">
                {eat.description}
              </p>

              {eat.images[1] && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                  <Image
                    src={eat.images[1]}
                    alt={`${eat.title} — more atmosphere`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <SectionHeading eyebrow="The vibe" title="TAGS." />
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {eat.tags.map((tag) => (
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
                <div className="flex items-center gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-fg/10 bg-white text-fg">
                    <MapPin className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-fg/45">
                      Location
                    </p>
                    <p className="text-[0.9375rem] font-semibold text-fg">
                      {eat.location}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Button
                    href={whatsappLink(message)}
                    size="lg"
                    className="w-full"
                    external
                  >
                    Ask WAVORA for the address
                  </Button>
                  <Button href="/plan" variant="outline" size="lg" className="w-full">
                    Plan a night around it
                  </Button>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="container-w pb-16 sm:pb-24">
        <SectionHeading
          eyebrow="Keep exploring"
          title="MORE PLACES TO EAT."
          link={{ label: "See all eats", href: "/eats" }}
        />
        <div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((relatedEat, i) => (
            <Reveal key={relatedEat.id} delay={i * 0.06}>
              <ImageCard
                href={`/eat/${relatedEat.id}`}
                image={relatedEat.images[0]}
                alt={relatedEat.title}
                tag={relatedEat.type}
                title={relatedEat.title}
                location={relatedEat.location}
                priority={i < 2}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
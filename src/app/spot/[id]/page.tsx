import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Tag } from "lucide-react";
import { spots } from "@/data/spots";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { ImageCard } from "@/components/image-card";
import { whatsappLink } from "@/data/site";

export function generateStaticParams() {
  return spots.map((spot) => ({ id: spot.id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const spot = spots.find((s) => s.id === id);
  if (!spot) return { title: "Not Found" };
  return {
    title: spot.title,
    alternates: { canonical: `/spot/${spot.id}` },
    description: spot.description,
    openGraph: {
      title: `${spot.title} — WAVORA`,
      description: spot.description,
      images: [{ url: spot.images[0], alt: spot.title }],
    },
  };
}

export default async function SpotPage({ params }: PageProps) {
  const { id } = await params;
  const spot = spots.find((s) => s.id === id);
  if (!spot) notFound();

  const related = spots.filter((s) => s.id !== spot.id).slice(0, 3);
  const message = `Hi WAVORA! Tell me more about "${spot.title}" — how do we get there?`;

  return (
    <>
      <PageHero
        eyebrow={`WAVORA · ${spot.category}`}
        title={spot.title}
        description={spot.description}
        image={spot.images[0]}
        alt={spot.title}
        compact
      />

      <section className="container-w py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <Reveal>
            <div className="space-y-10">
              <p className="text-pretty text-lg leading-relaxed text-fg/75 sm:text-xl">
                {spot.description}
              </p>

              {spot.images[1] && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                  <Image
                    src={spot.images[1]}
                    alt={`${spot.title} — another view`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <SectionHeading eyebrow="Good to know" title="TAGS." />
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {spot.tags.map((tag) => (
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
                      {spot.location}
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
                    Ask WAVORA how to get there
                  </Button>
                  <Button href="/plan" variant="outline" size="lg" className="w-full">
                    Build a day around it
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
          title="MORE GOOD PLACES."
          link={{ label: "See all spots", href: "/spots" }}
        />
        <div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((relatedSpot, i) => (
            <Reveal key={relatedSpot.id} delay={i * 0.06}>
              <ImageCard
                href={`/spot/${relatedSpot.id}`}
                image={relatedSpot.images[0]}
                alt={relatedSpot.title}
                tag={relatedSpot.category}
                title={relatedSpot.title}
                location={relatedSpot.location}
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
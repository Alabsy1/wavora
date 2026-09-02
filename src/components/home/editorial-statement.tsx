import Image from "next/image";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { editorialStatement } from "@/data/home-editorial";

export function EditorialStatement() {
  return (
    <section
      className="bg-page py-20 text-fg sm:py-28"
      aria-label="One easy, endless way to experience it"
    >
      <div className="container-w">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* large portrait */}
          <Reveal className="lg:col-span-5">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] lg:translate-y-10">
              <Image
                src={editorialStatement.primaryImage.src}
                alt={editorialStatement.primaryImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-pill px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-pill-fg backdrop-blur-md">
                Dive in
              </figcaption>
            </figure>
          </Reveal>

          {/* statement + two supporting images */}
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <p className="eyebrow text-fg/50">{editorialStatement.eyebrow}</p>
              <h2 className="display-xl mt-5 text-balance text-fg">
                ONE EASY, <span className="text-fg/40">ENDLESS</span> WAY TO
                EXPERIENCE IT.
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-12 grid grid-cols-2 gap-6 lg:mt-16 lg:gap-8">
                <figure className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] lg:translate-y-12">
                  <Image
                    src={editorialStatement.secondaryImage.src}
                    alt={editorialStatement.secondaryImage.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, 45vw"
                    className="object-cover"
                  />
                </figure>
                <div className="flex flex-col justify-between gap-8">
                  <figure className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem]">
                    <Image
                      src={editorialStatement.tertiaryImage.src}
                      alt={editorialStatement.tertiaryImage.alt}
                      fill
                      sizes="(min-width: 1024px) 24vw, 45vw"
                      className="object-cover"
                    />
                  </figure>
                  <div>
                    <p className="max-w-md text-pretty text-base leading-relaxed text-fg/65">
                      {editorialStatement.description}
                    </p>
                    <Button
                      href={editorialStatement.cta.href}
                      variant="outline"
                      size="md"
                      arrow
                      className="mt-6"
                    >
                      {editorialStatement.cta.label}
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
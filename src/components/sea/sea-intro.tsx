import Image from "next/image";
import { seaIntro } from "@/data/sea";
import { SeaMarquee } from "@/components/sea/sea-marquee";

/**
 * Scene 02 — THE WATER.
 * A rounded "surface sheet" that slides over the hero: air → water.
 */
export function SeaIntro() {
  return (
    <section
      id="the-water"
      aria-label="The water"
      className="relative z-10 -mt-12 overflow-x-clip rounded-t-[2.5rem] bg-page text-fg sm:-mt-16"
    >
      <div className="container-w grid gap-14 pb-20 pt-20 sm:pt-24 lg:grid-cols-12 lg:gap-x-10 lg:pb-28">
        {/* statement */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <p className="flex items-center gap-4 text-[0.625rem] font-bold uppercase tracking-[0.35em] text-fg/45">
              <span className="text-2xl font-extrabold tracking-tight text-fg">
                {seaIntro.number}
              </span>
              <span className="h-px w-10 bg-fg/20" aria-hidden="true" />
              {seaIntro.label}
            </p>
            <h2 className="display-xl mt-8 text-balance text-fg">
              {seaIntro.title[0]}
              <br />
              <span className="text-fg/35">{seaIntro.title[1]}</span>
            </h2>
            <p className="mt-8 max-w-lg text-pretty text-base leading-relaxed text-fg/65 sm:text-lg">
              {seaIntro.description}
            </p>
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-x-8 sm:grid-cols-3">
            {seaIntro.facts.map((fact) => (
              <div
                key={fact.k}
                className="border-t border-fg/10 py-4 sm:pr-6"
              >
                <dt className="text-[0.625rem] font-bold uppercase tracking-[0.28em] text-fg/45">
                  {fact.k}
                </dt>
                <dd className="mt-1.5 text-sm font-bold tracking-tight text-fg">
                  {fact.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* tall editorial image — partially outside the container */}
        <figure className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] bg-section lg:translate-y-6 lg:[width:112%]">
            <Image
              src={seaIntro.image}
              alt={seaIntro.alt}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-pill px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.25em] text-pill-fg backdrop-blur-md">
              {seaIntro.caption}
            </figcaption>
          </div>
        </figure>
      </div>

      <SeaMarquee items={seaIntro.marquee} tone="light" />
    </section>
  );
}
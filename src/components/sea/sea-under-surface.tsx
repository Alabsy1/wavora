"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { seaUnderSurface } from "@/data/sea";
import { Reveal } from "@/components/reveal";

const IMAGE_OVERLAY =
  "linear-gradient(to top, rgba(4,12,18,0.66) 0%, rgba(4,12,18,0.18) 34%, rgba(4,12,18,0) 58%)";

/**
 * Scene 05 — BELOW THE WATERLINE.
 * The underwater frame is the anchor; typography overlaps its edge.
 */
export function SeaUnderSurface() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yLarge = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [56, -48]);

  return (
    <section
      ref={ref}
      aria-label="Under the surface"
      className="overflow-x-clip bg-page py-20 text-fg sm:py-28"
    >
      <div className="container-w grid gap-14 lg:grid-cols-12 lg:gap-x-10">
        {/* large underwater anchor */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-section sm:aspect-[16/11] lg:aspect-[16/12]">
              <motion.div
                className="absolute inset-0 will-change-transform"
                style={
                  reduceMotion
                    ? undefined
                    : { y: yLarge, scale: 1.12, top: "-6%", bottom: "-6%" }
                }
              >
                <Image
                  src={seaUnderSurface.imageLarge}
                  alt={seaUnderSurface.imageLargeAlt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 45%" }}
                />
              </motion.div>
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: IMAGE_OVERLAY }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                <h2 className="display-lg text-balance text-white">
                  {seaUnderSurface.title}
                </h2>
              </div>
            </div>
          </Reveal>
        </div>

        {/* editorial column */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <Reveal>
            <p className="flex items-center gap-4 text-[0.625rem] font-bold uppercase tracking-[0.35em] text-fg/45">
              <span className="text-2xl font-extrabold tracking-tight text-fg">
                {seaUnderSurface.number}
              </span>
              <span className="h-px w-10 bg-fg/20" aria-hidden="true" />
              {seaUnderSurface.eyebrow}
            </p>
            <p className="mt-7 max-w-md text-pretty text-base leading-relaxed text-fg/65 sm:text-lg">
              {seaUnderSurface.description}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[1.75rem] rounded-tl-[2.5rem] bg-section sm:aspect-[16/9] lg:mt-0 lg:[width:108%]">
              <motion.div
                className="absolute inset-0 will-change-transform"
                style={reduceMotion ? undefined : { y: ySmall, scale: 1.1 }}
              >
                <Image
                  src={seaUnderSurface.imageSmall}
                  alt={seaUnderSurface.imageSmallAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10">
              {seaUnderSurface.metadata.map((item) => (
                <div
                  key={item.k}
                  className="flex items-baseline justify-between gap-6 border-t border-fg/10 py-4"
                >
                  <dt className="text-[0.625rem] font-bold uppercase tracking-[0.28em] text-fg/45">
                    {item.k}
                  </dt>
                  <dd className="text-sm font-bold tracking-tight text-fg">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
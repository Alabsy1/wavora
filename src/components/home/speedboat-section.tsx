"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  speedboatFrames,
  speedboatSection,
  featuredIndex,
  momentIndexes,
} from "@/data/speedboat";
import { HorizontalScroller } from "@/components/horizontal-scroller";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";

const featured = speedboatFrames[featuredIndex];
const moments = momentIndexes.map((i) => speedboatFrames[i]);
const railFrames = speedboatFrames.slice(featuredIndex + 1);

export function SpeedboatSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yFeatured = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const yMomentA = useTransform(scrollYProgress, [0, 1], [56, -48]);
  const yMomentB = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section
      id="speedboat"
      ref={ref}
      aria-label="Speedboat experiences"
      className="relative overflow-hidden bg-section py-20 text-section-fg sm:py-28"
    >
      <div className="container-w">
        <Reveal className="flex flex-col gap-5">
          <p className="eyebrow text-section-fg/70">{speedboatSection.eyebrow}</p>
          <h2 className="display-xl text-balance text-section-fg">
            {speedboatSection.headline[0]}
            <br />
            {speedboatSection.headline[1]}
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-xl text-pretty text-base leading-relaxed text-section-fg/65 sm:text-lg">
            {speedboatSection.description}
          </p>
          <p className="eyebrow shrink-0 text-section-fg/45">
            {speedboatSection.location}
          </p>
        </Reveal>
      </div>

      <div className="container-w mt-14 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-x-7">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-section sm:rounded-[2.5rem]">
              <motion.div
                style={reduceMotion ? { scale: 1.14 } : { y: yFeatured, scale: 1.14 }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={featured.src}
                  alt={featured.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-section/85 via-section/10 to-section/20" />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-7">
                <div className="glass-dark rounded-2xl p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-pill px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-pill-fg">
                      {speedboatSection.badge}
                    </span>
                    <span className="text-[0.625rem] font-bold uppercase tracking-[0.22em] text-section-fg/60">
                      {speedboatSection.location}
                    </span>
                  </div>
                  <div className="mt-5">
                    <h3 className="display-sm text-section-fg">
                      {speedboatSection.title}
                    </h3>
                    <p className="mt-1 text-sm text-section-fg/70">
                      {speedboatSection.supporting}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                      href={speedboatSection.primaryCta.href}
                      variant="light"
                      size="md"
                      arrow
                    >
                      {speedboatSection.primaryCta.label}
                    </Button>
                    <Button
                      href={speedboatSection.secondaryCta.href}
                      variant="outline-light"
                      size="md"
                    >
                      {speedboatSection.secondaryCta.label}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="hidden flex-col gap-10 lg:col-span-5 lg:flex">
          {moments.map((moment, i) => (
            <Reveal
              key={moment.src}
              delay={0.15 + i * 0.12}
              className={cn(i === 1 && "lg:pl-16")}
            >
              <Link
                href={speedboatSection.experienceHref}
                className="group block"
                aria-label={`${moment.caption} — view the speedboat experience`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-section">
                  <motion.div
                    style={
                      reduceMotion
                        ? { scale: 1.15 }
                        : { y: i === 0 ? yMomentA : yMomentB, scale: 1.15 }
                    }
                    className="absolute inset-0 will-change-transform"
                  >
                    <Image
                      src={moment.src}
                      alt={moment.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 32vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-section/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute right-4 top-4 inline-flex size-10 translate-y-1 items-center justify-center rounded-full bg-pill text-pill-fg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 flex items-center justify-between text-[0.625rem] font-bold uppercase tracking-[0.3em] text-section-fg/50">
                  <span>{moment.caption}</span>
                  <span>0{i + 2}</span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <Reveal className="container-w mb-10 flex items-end justify-between gap-6">
          <h3 className="display-sm text-section-fg">{speedboatSection.railLabel}</h3>
          <p className="hidden text-[0.625rem] font-bold uppercase tracking-[0.3em] text-section-fg/45 sm:block">
            {speedboatSection.railHint}
          </p>
        </Reveal>

        <HorizontalScroller
          tone="dark"
          ariaLabel="Speedboat day, frame by frame"
        >
          {railFrames.map((frame, i) => (
            <div
              key={frame.src}
              data-card
              className={cn(
                "w-[78%] shrink-0 snap-start sm:w-[340px] lg:w-[380px]",
                i < moments.length && "lg:hidden",
              )}
            >
              <Link
                href={speedboatSection.experienceHref}
                className="group block"
                aria-label={`${frame.caption} — view the speedboat experience`}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-section">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 24vw, 78vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-section/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-2 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-section-fg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    VIEW EXPERIENCE
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 flex items-center justify-between text-[0.625rem] font-bold uppercase tracking-[0.3em] text-section-fg/50">
                  <span>{frame.caption}</span>
                  <span>0{i + 2}</span>
                </p>
              </Link>
            </div>
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { seaHero } from "@/data/sea";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Photo-anchored overlay — independent from the theme system on purpose:
 * the hero reads as a cinematic frame in Light, Night and Dark.
 */
const OVERLAY =
  "linear-gradient(to top, rgba(4,12,18,0.78) 0%, rgba(4,12,18,0.38) 20%, rgba(4,12,18,0.12) 40%, rgba(4,12,18,0) 64%), linear-gradient(to right, rgba(4,12,18,0.42) 0%, rgba(4,12,18,0.10) 34%, rgba(4,12,18,0) 58%), linear-gradient(to bottom, rgba(4,12,18,0.32) 0%, rgba(4,12,18,0) 22%)";

export function SeaHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const markerOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-end overflow-hidden bg-section"
      aria-label="The Red Sea"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={
          reduceMotion ? { scale: 1.08 } : { scale: imageScale, y: imageY }
        }
        initial={false}
      >
        <Image
          src={seaHero.image}
          alt={seaHero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 55%" }}
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: OVERLAY }}
      />

      <motion.div
        className="container-w relative z-10 flex w-full flex-col pb-28 pt-40 sm:pb-32 lg:pb-36"
        style={
          reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
      >
        <motion.p
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="eyebrow text-white/70"
        >
          {seaHero.eyebrow}
        </motion.p>

        <h1 className="mt-6 text-white">
          <span className="block overflow-hidden">
            <motion.span
              className="block display-hero"
              initial={reduceMotion ? { opacity: 0 } : { y: "110%" }}
              animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
              transition={{
                duration: reduceMotion ? 0.4 : 1,
                delay: reduceMotion ? 0 : 0.38,
                ease: EASE,
              }}
            >
              {seaHero.title[0]}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block display-hero bg-gradient-to-r from-white via-white to-white/30 bg-clip-text text-transparent"
              initial={reduceMotion ? { opacity: 0 } : { y: "110%" }}
              animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
              transition={{
                duration: reduceMotion ? 0.4 : 1,
                delay: reduceMotion ? 0 : 0.52,
                ease: EASE,
              }}
            >
              {seaHero.title[1]}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.4 : 0.9,
            delay: reduceMotion ? 0 : 0.75,
            ease: EASE,
          }}
          className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg"
        >
          {seaHero.description}
        </motion.p>
      </motion.div>

      {/* chapter marker — fades on exit */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { opacity: markerOpacity }}
        className="absolute bottom-9 left-8 z-10 hidden flex-col gap-2.5 md:flex lg:left-12"
      >
        <span className="text-[0.625rem] font-bold tracking-[0.35em] text-white/45">
          {seaHero.marker}
        </span>
        <span className="flex items-center gap-3 text-[0.625rem] font-bold tracking-[0.35em] text-white/45">
          <span className="h-px w-8 bg-white/35" aria-hidden="true" />
          {seaHero.location}
        </span>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#the-water"
        aria-label="Scroll to the water"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduceMotion ? 0 : 1.6, ease: EASE }}
        className="absolute bottom-9 right-8 z-10 hidden flex-col items-center gap-3 text-white/65 transition-colors hover:text-white md:flex lg:right-12"
      >
        <span className="text-[0.625rem] font-bold uppercase tracking-[0.35em]">
          Dive in
        </span>
        <span className="relative h-14 w-px overflow-hidden bg-white/25">
          <span className="absolute left-0 top-0 h-4 w-px animate-[scroll-dot_2.2s_ease-in-out_infinite] bg-white" />
        </span>
      </motion.a>
    </section>
  );
}
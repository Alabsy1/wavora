"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { oceanHero } from "@/data/ocean-experience";

const EASE = [0.22, 1, 0.36, 1] as const;

const OVERLAY =
  "linear-gradient(to top, rgba(7,21,39,0.92) 0%, rgba(7,21,39,0.55) 26%, rgba(7,21,39,0.25) 48%, rgba(7,21,39,0.08) 72%, rgba(7,21,39,0) 100%), linear-gradient(to right, rgba(7,21,39,0.72) 0%, rgba(7,21,39,0.25) 34%, rgba(7,21,39,0) 60%)";

export function OceanHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={ref}
      aria-label="Get on the water"
      className="relative flex min-h-svh items-end overflow-hidden bg-ocean-deep text-paper"
    >
      {/* ocean backdrop */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: imageY }}
        initial={false}
      >
        <div className="h-full w-full animate-kenburns">
          <Image
            src={oceanHero.image}
            alt={oceanHero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: OVERLAY }}
      />

      {/* ambient light drift */}
      <div
        aria-hidden="true"
        className="absolute -right-32 top-[-10%] h-[55vh] w-[55vh] animate-drift rounded-full bg-turquoise/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 bottom-[-10%] h-[40vh] w-[40vh] animate-drift rounded-full bg-ocean-soft/60 blur-[110px]"
        style={{ animationDelay: "-12s" }}
      />

      {/* content */}
      <div className="container-w relative z-10 flex w-full flex-col pb-24 pt-40 sm:pb-28 lg:pb-32">
        <motion.p
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="eyebrow text-paper/65"
        >
          {oceanHero.eyebrow}
        </motion.p>

        <h1 className="mt-6 text-paper">
          {oceanHero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className={
                  i === 1
                    ? "block display-hero bg-gradient-to-r from-turquoise via-turquoise to-paper/70 bg-clip-text text-transparent"
                    : "block display-hero"
                }
                initial={reduceMotion ? { opacity: 0 } : { y: "112%" }}
                animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
                transition={{
                  duration: reduceMotion ? 0.4 : 0.9,
                  delay: reduceMotion ? 0 : 0.2 + i * 0.12,
                  ease: EASE,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-8 flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-sm text-pretty text-base leading-relaxed text-paper/70 sm:text-lg">
            {oceanHero.subtitle}
          </p>

          <Link
            href={oceanHero.cta.href}
            data-cursor="EXPLORE"
            className="group inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            {oceanHero.cta.label}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>

      {/* editorial coordinates */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduceMotion ? 0 : 1.1, ease: EASE }}
        aria-hidden="true"
        className="absolute bottom-8 left-8 z-10 hidden text-[0.625rem] font-bold tracking-[0.32em] text-paper/45 md:block lg:left-12"
      >
        {oceanHero.coordinates}
      </motion.p>

      {/* scroll cue */}
      <motion.a
        href="#signature"
        aria-label="Scroll to the signature experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduceMotion ? 0 : 1.2, ease: EASE }}
        className="absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-3 text-paper/60 transition-colors hover:text-paper md:flex lg:right-12"
      >
        <span className="text-[0.625rem] font-bold tracking-[0.32em] uppercase">
          Scroll
        </span>
        <span className="relative h-14 w-px overflow-hidden bg-paper/20">
          <span className="absolute left-0 top-0 h-4 w-px animate-[scroll-dot_2.2s_ease-in-out_infinite] bg-paper" />
        </span>
      </motion.a>
    </section>
  );
}
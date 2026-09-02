"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { seaFinalScene } from "@/data/sea";

const OVERLAY =
  "linear-gradient(to top, rgba(4,12,18,0.82) 0%, rgba(4,12,18,0.42) 30%, rgba(4,12,18,0.14) 58%, rgba(4,12,18,0.28) 100%)";

/**
 * Scene 06 / beat B — the final shot of the film.
 */
export function SeaFinalScene() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.2]);

  return (
    <section
      ref={ref}
      aria-label="How will you meet the Red Sea?"
      className="relative flex min-h-[85vh] items-end overflow-hidden bg-section py-24 text-white sm:py-28"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 will-change-transform"
        style={reduceMotion ? undefined : { y, scale }}
        initial={false}
      >
        <Image
          src={seaFinalScene.image}
          alt={seaFinalScene.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 35%" }}
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: OVERLAY }} />

      <div className="container-w relative z-10 flex w-full flex-col pb-6 sm:pb-10">
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.35em] text-white/55">
          {seaFinalScene.small}
        </p>
        <h2 className="display-xl mt-6 text-balance text-white">
          {seaFinalScene.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <Link
          href={seaFinalScene.cta.href}
          className="group mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-pill px-7 py-4 text-[0.8125rem] font-bold uppercase tracking-[0.22em] text-pill-fg transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
        >
          {seaFinalScene.cta.label}
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
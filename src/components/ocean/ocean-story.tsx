"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { oceanStory } from "@/data/ocean-experience";

const EASE = [0.22, 1, 0.36, 1] as const;

export function OceanStory() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      aria-label="The sea looks different from here"
      className="relative flex min-h-[120svh] items-center overflow-hidden bg-abyss text-paper"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-[-6%] inset-y-[-10%]"
        style={reduceMotion ? undefined : { y: imageY }}
        initial={false}
      >
        <div className="h-full w-full animate-kenburns">
          <Image
            src={oceanStory.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/45 to-abyss/70"
      />

      <div className="container-w relative z-10 py-32 sm:py-44">
        <motion.p
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow text-paper/60"
        >
          {oceanStory.eyebrow}
        </motion.p>

        <h2 className="mt-7 text-paper">
          {oceanStory.title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className={cnStory(i)}
                initial={reduceMotion ? { opacity: 0 } : { y: "112%" }}
                whileInView={reduceMotion ? { opacity: 1 } : { y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: reduceMotion ? 0.4 : 1,
                  delay: reduceMotion ? 0 : 0.15 + i * 0.14,
                  ease: EASE,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

function cnStory(i: number) {
  return i === 2
    ? "block display-hero bg-gradient-to-r from-turquoise via-turquoise to-paper/60 bg-clip-text text-transparent"
    : "block display-hero";
}
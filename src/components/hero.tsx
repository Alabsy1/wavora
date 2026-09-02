"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/button";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Multi-stop editorial overlay — darkest only directly behind the lower text,
 * fading naturally so the Red Sea stays rich and visible.
 */
const OVERLAY =
  "linear-gradient(to top, rgba(11,12,13,0.68) 0%, rgba(11,12,13,0.34) 16%, rgba(11,12,13,0.16) 30%, rgba(11,12,13,0.05) 48%, rgba(11,12,13,0) 68%), linear-gradient(to right, rgba(11,12,13,0.42) 0%, rgba(11,12,13,0.16) 30%, rgba(11,12,13,0) 56%), linear-gradient(to bottom, rgba(11,12,13,0.3) 0%, rgba(11,12,13,0) 20%)";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 45, damping: 22, mass: 0.5 });

  const px = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const py = useTransform(sy, [-0.5, 0.5], [12, -12]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.22]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  function onMouseMove(e: React.MouseEvent) {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-svh items-end overflow-hidden bg-section"
      aria-label="WAVORA — Explore more. Live better."
    >
      {/* image — outer layer handles scroll drift, inner layer handles mouse parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: reduceMotion ? 1.1 : imageScale,
          ...(reduceMotion ? {} : { y: imageY }),
        }}
        initial={false}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            scale: 1.04,
            ...(reduceMotion ? {} : { x: px, y: py }),
          }}
          initial={false}
        >
          <Image
            src="/images/hero-turquoise.jpg"
            alt="Aerial view of turquoise Red Sea water with a boat near Hurghada, Egypt"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%] sm:object-center"
          />
        </motion.div>
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0" style={{ background: OVERLAY }} />

      <motion.div
        className="container-w relative z-10 flex w-full flex-col pb-24 pt-36 sm:pb-28 lg:pb-32"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.4 : 0.8,
            delay: reduceMotion ? 0 : 0.28,
            ease: EASE,
          }}
          className="eyebrow text-section-fg/70"
        >
          Hurghada · Red Sea · Egypt
        </motion.p>

        <h1 className="mt-6 text-section-fg">
          <span className="block overflow-hidden">
            <motion.span
              className="block display-hero"
              initial={reduceMotion ? { opacity: 0 } : { y: "110%" }}
              animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
              transition={{
                duration: reduceMotion ? 0.4 : 1.05,
                delay: reduceMotion ? 0 : 0.42,
                ease: EASE,
              }}
            >
              EXPLORE MORE.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block display-hero bg-gradient-to-r from-section-fg via-section-fg to-section-fg/30 bg-clip-text text-transparent"
              initial={reduceMotion ? { opacity: 0 } : { y: "110%" }}
              animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
              transition={{
                duration: reduceMotion ? 0.4 : 1.05,
                delay: reduceMotion ? 0 : 0.54,
                ease: EASE,
              }}
            >
              LIVE BETTER.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.4 : 0.9,
            delay: reduceMotion ? 0 : 0.8,
            ease: EASE,
          }}
          className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-section-fg/75 sm:text-lg"
        >
          Trips, stays, hidden spots and unforgettable experiences — curated
          around you.
        </motion.p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0.4 : 0.8,
              delay: reduceMotion ? 0 : 0.95,
              ease: EASE,
            }}
          >
            <Button href="/explore" variant="light" size="md" arrow>
              Explore Experiences
            </Button>
          </motion.div>
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0.4 : 0.8,
              delay: reduceMotion ? 0 : 1.1,
              ease: EASE,
            }}
          >
            <Button href="/plan" variant="outline-light" size="md">
              Plan My Trip
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* editorial chapter marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduceMotion ? 0 : 1.5, ease: EASE }}
        aria-hidden="true"
        className="absolute bottom-7 left-8 z-10 hidden flex-col gap-2.5 md:flex"
      >
        <span className="text-[0.625rem] font-bold tracking-[0.35em] text-section-fg/40">
          01 / 09
        </span>
        <span className="flex items-center gap-3 text-[0.625rem] font-bold tracking-[0.35em] text-section-fg/40">
          <span className="h-px w-8 bg-section-fg/30" aria-hidden="true" />
          RED SEA
        </span>
      </motion.div>

      {/* bottom editorial meta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduceMotion ? 0 : 1.9, ease: EASE }}
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-4 text-[0.625rem] font-bold uppercase tracking-[0.3em] text-section-fg/50 md:flex"
      >
        <span>Curated by locals</span>
        <span className="size-1 rounded-full bg-section-fg/40" />
        <span>24/7 WhatsApp</span>
        <span className="size-1 rounded-full bg-section-fg/40" />
        <span>Sail · Dive · Explore</span>
      </motion.div>

      {/* refined scroll indicator */}
      <motion.a
        href="#discover"
        aria-label="Scroll to discover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduceMotion ? 0 : 1.7, ease: EASE }}
        className="absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-3 text-section-fg/60 transition-colors hover:text-section-fg md:flex"
      >
        <span className="text-[0.625rem] font-bold tracking-[0.35em] uppercase">
          Scroll
        </span>
        <span className="relative h-14 w-px overflow-hidden bg-section-fg/20">
          <span className="absolute left-0 top-0 h-4 w-px animate-[scroll-dot_2.2s_ease-in-out_infinite] bg-section-fg" />
        </span>
      </motion.a>
    </section>
  );
}
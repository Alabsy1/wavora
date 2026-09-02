"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { seaVideo } from "@/data/sea";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scene 04 — THE WILD SIDE.
 * The dolphin video is the signature moment: large vertical frame,
 * clip-path reveal, plays naturally (never scrubbed), pauses off-screen.
 */
export function SeaWildSide() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [24, -24]);

  // play only while visible — never download or decode off-screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section
      id="dolphins"
      ref={sectionRef}
      aria-label="Meet the wild side — dolphins of the Red Sea"
      className="overflow-hidden bg-section py-24 text-section-fg sm:py-32"
    >
      <div className="container-w grid items-center gap-14 lg:grid-cols-12 lg:gap-x-8">
        {/* text — overlaps the frame on desktop */}
        <motion.div
          className="relative z-10 lg:col-span-5"
          style={reduceMotion ? undefined : { y: yText }}
        >
          <p className="flex items-center gap-4 text-[0.625rem] font-bold uppercase tracking-[0.35em] text-section-fg/50">
            <span className="text-2xl font-extrabold tracking-tight text-section-fg">
              {seaVideo.number}
            </span>
            <span
              className="h-px w-10 bg-section-fg/25"
              aria-hidden="true"
            />
            {seaVideo.label}
          </p>
          <h2 className="display-xl mt-8 text-balance text-section-fg">
            {seaVideo.title[0]}
            <br />
            <span className="bg-gradient-to-r from-turquoise via-turquoise to-section-fg bg-clip-text text-transparent">
              {seaVideo.title[1]}
            </span>
          </h2>
          <p className="mt-8 max-w-md text-pretty text-base leading-relaxed text-section-fg/65 sm:text-lg">
            {seaVideo.description}
          </p>
          <p className="mt-10 flex items-center gap-3 text-[0.625rem] font-bold uppercase tracking-[0.3em] text-section-fg/45">
            <span className="size-1 rounded-full bg-turquoise" aria-hidden="true" />
            {seaVideo.caption}
          </p>
        </motion.div>

        {/* cinematic frame */}
        <div className="relative lg:col-span-7">
          <motion.figure
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, clipPath: "inset(10% 8% round 32px)", scale: 1.04 }
            }
            whileInView={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, clipPath: "inset(0% 0% round 32px)", scale: 1 }
            }
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative mx-auto aspect-[9/16] max-h-[82vh] w-full max-w-[430px] overflow-hidden rounded-[2rem] bg-section-soft lg:-ml-16 lg:mx-0"
          >
            {reduceMotion ? (
              <Image
                src={seaVideo.poster}
                alt={seaVideo.posterAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                style={{ objectPosition: seaVideo.position }}
              />
            ) : (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: seaVideo.position }}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={seaVideo.poster}
                aria-label={seaVideo.posterAlt}
              >
                <source src={seaVideo.src} type="video/mp4" />
              </video>
            )}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(4,12,18,0.45)] via-transparent to-[rgba(4,12,18,0.12)]"
            />

            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
              <span className="text-[0.625rem] font-bold uppercase tracking-[0.28em] text-white/75">
                {seaVideo.caption}
              </span>
              <span
                aria-hidden="true"
                className="flex items-center gap-1.5"
              >
                <span className="size-1.5 animate-pulse rounded-full bg-turquoise" />
                <span className="text-[0.625rem] font-bold uppercase tracking-[0.28em] text-white/60">
                  Live
                </span>
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
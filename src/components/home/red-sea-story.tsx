"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { redSeaStory } from "@/data/red-sea-story";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { StoryImageStack } from "@/components/home/story-image-stack";
import { StoryProgress } from "@/components/home/story-progress";
import { StoryText } from "@/components/home/story-text";

export function RedSeaStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const { scrollYProgress: progress } = useScroll({
    target: pinnedRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.max(0, Math.min(4, Math.floor((v - 0.06) / 0.2)));
    setActive(next);
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const parallax = isDesktop && !reduceMotion;

  function jumpTo(index: number) {
    const el = pinnedRef.current;
    if (!el) return;
    const v = 0.1 + 0.2 * index;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    const y = top + distance * v;
    window.scrollTo({
      top: Math.max(0, y),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  const chapter = redSeaStory.chapters[active];

  return (
    <section
      id="red-sea-story"
      ref={sectionRef}
      aria-label="The Red Sea story"
      className="relative bg-section text-section-fg"
    >
      {/* intro */}
      <div className="container-w flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <p className="eyebrow justify-center text-section-fg/60">
            {redSeaStory.eyebrow}
          </p>
          <h2 className="display-xl text-balance text-section-fg">
            {redSeaStory.headline[0]}
            <br />
            {redSeaStory.headline[1]}
          </h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-section-fg/60 sm:text-lg">
            {redSeaStory.description}
          </p>
        </Reveal>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 hidden flex-col items-center gap-3 md:flex"
        >
          <span className="text-[0.625rem] font-bold tracking-[0.35em] uppercase text-section-fg/50">
            Scroll
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-section-fg/20">
            <span className="absolute left-0 top-0 h-4 w-px animate-[scroll-dot_2.2s_ease-in-out_infinite] bg-section-fg" />
          </span>
        </motion.div>
      </div>

      {/* pinned story */}
      <div ref={pinnedRef} className="relative h-[340vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <StoryImageStack
            progress={progress}
            active={active}
            parallax={parallax}
          />

          {/* readability overlays — photography stays rich */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-section/70 via-section/10 to-section/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-section/35 via-section/5 to-transparent"
          />

          <StoryProgress
            active={active}
            total={redSeaStory.chapters.length}
            progress={progress}
            chapters={redSeaStory.chapters}
            onJump={jumpTo}
          />

          <StoryText chapter={chapter} reduceMotion={reduceMotion} />
        </div>
      </div>

      {/* ending */}
      <div className="container-w flex min-h-[55vh] flex-col items-center justify-center py-28 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <p className="eyebrow justify-center text-section-fg/60">
            {redSeaStory.ending.eyebrow}
          </p>
          <h2 className="display-lg text-balance text-section-fg">
            {redSeaStory.ending.title}
          </h2>
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.32em] text-section-fg/50">
            {redSeaStory.ending.text}
          </p>
          <Button
            href={redSeaStory.ending.cta.href}
            variant="light"
            size="md"
            arrow
            className="mt-2"
          >
            {redSeaStory.ending.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
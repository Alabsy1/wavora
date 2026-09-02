"use client";

import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/button";
import type { RedSeaChapter } from "@/data/red-sea-story";

const EASE = [0.22, 1, 0.36, 1] as const;

interface StoryTextProps {
  chapter: RedSeaChapter;
  reduceMotion: boolean | null;
}

export function StoryText({ chapter, reduceMotion }: StoryTextProps) {
  return (
    <div className="container-w absolute inset-x-0 bottom-0 z-10 pb-16 sm:pb-20 lg:pb-24">
      <div className="grid max-w-xl">
        <AnimatePresence initial={false}>
          <motion.div
            key={chapter.id}
            className="col-start-1 row-start-1"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="eyebrow text-section-fg/70">
              {chapter.number} / {chapter.label}
            </p>
            <h3 className="display-lg mt-5 text-balance text-section-fg">
              {chapter.title}
            </h3>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-section-fg/80 sm:text-lg">
              {chapter.description}
            </p>
            {chapter.cta && (
              <div className="mt-8">
                <Button href={chapter.cta.href} variant="light" size="md" arrow>
                  {chapter.cta.label}
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
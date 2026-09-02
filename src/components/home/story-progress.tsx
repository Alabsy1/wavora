"use client";

import { motion, type MotionValue } from "motion/react";
import { cn } from "@/lib/cn";
import type { RedSeaChapter } from "@/data/red-sea-story";

const EASE = [0.22, 1, 0.36, 1] as const;

interface StoryProgressProps {
  active: number;
  total: number;
  progress: MotionValue<number>;
  chapters: RedSeaChapter[];
  onJump: (index: number) => void;
}

export function StoryProgress({
  active,
  total,
  progress,
  chapters,
  onJump,
}: StoryProgressProps) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      {/* editorial chapter counter — always visible */}
      <div
        aria-hidden="true"
        className="absolute left-6 top-24 z-20 sm:left-8 lg:left-12 lg:top-28"
      >
        <div className="relative flex h-5 items-center overflow-hidden">
          <motion.span
            key={active}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 text-[0.625rem] font-bold tracking-[0.35em] text-section-fg/45"
          >
            {pad(active + 1)}
            <span className="text-section-fg/25">/</span>
            {pad(total)}
          </motion.span>
        </div>
      </div>

      {/* right chapter rail — desktop only */}
      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex sm:right-8 lg:right-12">
        <div className="relative h-40 w-px overflow-hidden bg-section-fg/15">
          <motion.div
            className="absolute inset-x-0 top-0 h-full bg-reef"
            style={{ scaleY: progress, transformOrigin: "top" }}
          />
        </div>
        <ol className="flex flex-col items-center gap-3.5">
          {chapters.map((chapter, i) => {
            const isActive = i === active;
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => onJump(i)}
                  aria-label={`Go to chapter ${pad(i + 1)}, ${chapter.label}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-center gap-3 transition-colors duration-300",
                    isActive
                      ? "text-section-fg"
                      : "text-section-fg/35 hover:text-section-fg/75",
                  )}
                >
                  <span className="text-[0.625rem] font-bold tracking-[0.3em]">
                    {pad(i + 1)}
                  </span>
                  <span
                    className={cn(
                      "text-[0.625rem] font-bold uppercase tracking-[0.3em] transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-75",
                    )}
                  >
                    {chapter.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
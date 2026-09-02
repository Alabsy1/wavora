"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { moods, getRecommendationsForMood } from "@/data/recommendations";
import { ExperienceCard } from "@/components/experience-card";
import { cn } from "@/lib/cn";
import type { SiteFlags } from "@/lib/site-data";
import { isNavEnabled } from "@/lib/site-data";

interface RecommendationSelectorProps {
  flags: SiteFlags;
}

export function RecommendationSelector({ flags }: RecommendationSelectorProps) {
  const [selected, setSelected] = useState<string>("relax");

  const allRecommendations = getRecommendationsForMood(selected);
  const recommendations = allRecommendations.filter((exp) => isNavEnabled(flags, exp.category));

  return (
    <div>
      <div
        role="group"
        aria-label="Choose a mood for your day"
        className="flex flex-wrap justify-center gap-2.5"
      >
        {moods.map((mood) => {
          const active = mood.id === selected;
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => setSelected(mood.id)}
              aria-pressed={active}
              className={cn(
                "inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold tracking-tight transition-all duration-300 ease-out",
                active
                  ? "border-fg bg-fg text-page"
                  : "border-fg/15 bg-transparent text-fg/70 hover:border-fg/40 hover:text-fg",
              )}
            >
              {mood.label}
            </button>
          );
        })}
      </div>

      <div className="mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {recommendations.length > 0 ? (
              recommendations.map((experience, i) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  priority={i < 2}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-neutral-500 dark:text-neutral-400 py-8">
                No experiences available for this mood right now.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

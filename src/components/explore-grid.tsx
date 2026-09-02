"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { experiences } from "@/data/experiences";
import { ExperienceCard } from "@/components/experience-card";
import { cn } from "@/lib/cn";

const filters = [
  { id: "all", label: "All" },
  { id: "sea", label: "Sea" },
  { id: "adventure", label: "Adventure" },
  { id: "experiences", label: "Experiences" },
] as const;

export function ExploreGrid() {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");

  const items =
    active === "all"
      ? experiences
      : experiences.filter((e) => e.category === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter experiences"
        className="flex flex-wrap items-center gap-2.5"
      >
        {filters.map((filter) => {
          const isActive = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActive(filter.id)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex h-10 items-center rounded-full border px-5 text-sm font-semibold tracking-tight transition-all duration-300",
                isActive
                  ? "border-fg bg-fg text-page"
                  : "border-fg/15 text-fg/60 hover:border-fg/40 hover:text-fg",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10">
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((experience, i) => (
              <motion.div
                key={experience.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ExperienceCard
                  experience={experience}
                  priority={i < 3}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
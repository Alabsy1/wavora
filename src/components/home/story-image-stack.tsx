"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { chapterOpacity, redSeaStory } from "@/data/red-sea-story";

interface StoryImageStackProps {
  progress: MotionValue<number>;
  active: number;
  parallax: boolean;
}

/**
 * Pinned full-screen scene. Chapters crossfade as scroll progress moves
 * across the pinned container; the whole stack drifts subtly for depth.
 * Only the active chapter and its two neighbours are mounted at a time.
 */
export function StoryImageStack({
  progress,
  active,
  parallax,
}: StoryImageStackProps) {
  const opacity0 = useTransform(progress, (v) => chapterOpacity(v, 0));
  const opacity1 = useTransform(progress, (v) => chapterOpacity(v, 1));
  const opacity2 = useTransform(progress, (v) => chapterOpacity(v, 2));
  const opacity3 = useTransform(progress, (v) => chapterOpacity(v, 3));
  const opacity4 = useTransform(progress, (v) => chapterOpacity(v, 4));
  const opacities = [opacity0, opacity1, opacity2, opacity3, opacity4];

  const scale = useTransform(progress, [0, 1], [1.05, 1.14]);
  const y = useTransform(progress, [0, 1], [0, -48]);

  const from = Math.max(0, active - 1);
  const to = Math.min(redSeaStory.chapters.length - 1, active + 2);

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0"
      style={
        parallax
          ? { scale, y }
          : { scale: 1.05, y: 0 }
      }
      initial={false}
    >
      {redSeaStory.chapters.slice(from, to + 1).map((chapter, i) => {
        const index = from + i;
        return (
          <motion.div
            key={chapter.id}
            className="absolute inset-0 will-change-transform"
            style={{ opacity: opacities[index] }}
            initial={false}
          >
            <Image
              src={chapter.image}
              alt={chapter.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              sizes="100vw"
              quality={85}
              className="object-cover"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
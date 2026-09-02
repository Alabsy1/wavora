"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  image: string;
  alt: string;
  className?: string;
  compact?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  alt,
  className,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden bg-section",
        compact ? "min-h-[52vh]" : "min-h-[68vh]",
        className,
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-section via-section/45 to-section/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-section/50 via-transparent to-transparent" />

      <div className="container-w relative z-10 flex w-full flex-col pb-12 pt-40 sm:pb-16">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="eyebrow text-section-fg/70"
          >
            {eyebrow}
          </motion.p>
        )}

        <h1 className="mt-5 text-section-fg">
          <span className="block overflow-hidden">
            <motion.span
              className="block display-lg"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            >
              {title}
            </motion.span>
          </span>
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-section-fg/75 sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
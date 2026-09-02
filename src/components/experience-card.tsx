import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Experience } from "@/types";
import { getCategory } from "@/data/categories";

interface ExperienceCardProps {
  experience: Experience;
  priority?: boolean;
  className?: string;
  aspect?: "tall" | "wide";
  dark?: boolean;
}

export function ExperienceCard({
  experience,
  priority,
  className,
  aspect = "tall",
  dark = false,
}: ExperienceCardProps) {
  const category = getCategory(experience.category);

  return (
    <Link
      href={`/experience/${experience.slug}`}
      className={cn("group block focus-visible:outline-offset-4", className)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-3xl bg-section",
          aspect === "tall" ? "aspect-[4/5]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={experience.images[0]}
          alt={experience.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-section/55 via-transparent to-section/10 transition-opacity duration-500 group-hover:from-section/65" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-pill/15 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-section-fg backdrop-blur-md">
            {category?.label}
          </span>
          <span className="inline-flex size-9 translate-y-1 items-center justify-center rounded-full bg-pill text-pill-fg opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3
            className={cn(
              "text-lg font-bold tracking-tight transition-colors duration-300",
              dark
                ? "text-section-fg group-hover:text-section-fg/70"
                : "text-fg group-hover:text-fg/70",
            )}
          >
            {experience.title}
          </h3>
          <p
            className={cn(
              "mt-1.5 flex items-center gap-3 text-[0.8125rem]",
              dark ? "text-section-fg/55" : "text-fg/55",
            )}
          >
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden="true" />
              {experience.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" />
              {experience.duration}
            </span>
          </p>
        </div>
        {experience.priceFrom !== undefined && (
          <p className="shrink-0 text-right">
            <span
              className={cn(
                "block text-lg font-extrabold tracking-tight",
                dark ? "text-section-fg" : "text-fg",
              )}
            >
              ${experience.priceFrom}
            </span>
            <span
              className={cn(
                "block text-[0.6875rem]",
                dark ? "text-section-fg/50" : "text-fg/50",
              )}
            >
              {experience.priceNote}
            </span>
          </p>
        )}
      </div>
    </Link>
  );
}
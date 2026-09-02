import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  index: number;
  className?: string;
  priority?: boolean;
}

export function CategoryCard({
  category,
  index,
  className,
  priority,
}: CategoryCardProps) {
  return (
    <Link
      href={category.path}
      className={cn(
        "group relative block overflow-hidden rounded-3xl bg-section focus-visible:outline-offset-4",
        className,
      )}
      aria-label={`${category.label} — ${category.tagline}`}
    >
      <Image
        src={category.image}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] grayscale-[0.35] group-hover:scale-[1.06] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-section/80 via-section/15 to-section/5 transition-opacity duration-500 group-hover:from-section/85" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-turquoise/10 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-pill/15 px-3 py-1 text-[0.625rem] font-bold tracking-[0.25em] text-section-fg backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-pill/0 text-section-fg opacity-0 transition-all duration-500 ease-out group-hover:bg-pill group-hover:text-pill-fg group-hover:opacity-100">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>

        <div>
          <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-section-fg/60">
            {category.tagline}
          </p>
          <h3 className="text-3xl font-extrabold tracking-tight text-section-fg sm:text-4xl">
            {category.label}
          </h3>
        </div>
      </div>
    </Link>
  );
}
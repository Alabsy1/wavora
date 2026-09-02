import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Stay } from "@/types";

const typeLabels: Record<Stay["type"], string> = {
  hotel: "Hotel",
  resort: "Resort",
  chalet: "Chalet",
  apartment: "Apartment",
};

interface StayCardProps {
  stay: Stay;
  priority?: boolean;
  className?: string;
}

export function StayCard({ stay, priority, className }: StayCardProps) {
  return (
    <Link
      href={`/stay/${stay.id}`}
      className={cn("group block focus-visible:outline-offset-4", className)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-section">
        <Image
          src={stay.images[0]}
          alt={stay.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-section/55 via-transparent to-transparent transition-opacity duration-500 group-hover:from-section/65" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-pill/15 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-section-fg backdrop-blur-md">
            {typeLabels[stay.type]}
          </span>
          {stay.rating && (
            <span className="inline-flex items-center gap-1 rounded-full bg-pill/15 px-2.5 py-1 text-[0.6875rem] font-bold text-section-fg backdrop-blur-md">
              <Star className="size-3 fill-current" aria-hidden="true" />
              {stay.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-fg transition-colors duration-300 group-hover:text-fg/70">
            {stay.title}
          </h3>
          <p className="mt-1.5 flex items-center gap-1 text-[0.8125rem] text-fg/55">
            <MapPin className="size-3.5" aria-hidden="true" />
            {stay.location}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-right">
            {stay.priceFrom !== undefined && (
              <>
                <span className="block text-lg font-extrabold tracking-tight text-fg">
                  ${stay.priceFrom}
                </span>
                <span className="block text-[0.6875rem] text-fg/50">
                  per night
                </span>
              </>
            )}
          </span>
          <ArrowUpRight
            className="size-5 text-fg/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
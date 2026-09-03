"use client";

import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import type { IslandDestination } from "@prisma/client";

interface SeaIslandsProps {
  destinations: IslandDestination[];
}

export function SeaIslands({ destinations }: SeaIslandsProps) {
  if (!destinations.length) return null;

  const popular = destinations.filter((d) => d.isPopular);
  const others = destinations.filter((d) => !d.isPopular);

  return (
    <section
      aria-label="Island destinations"
      className="bg-page py-20 text-fg sm:py-28"
    >
      <div className="container-w">
        <p className="flex items-center gap-4 text-[0.625rem] font-bold uppercase tracking-[0.35em] text-fg/45">
          <span className="text-2xl font-extrabold tracking-tight text-fg">06</span>
          <span className="h-px w-10 bg-fg/20" aria-hidden="true" />
          ISLAND DESTINATIONS
        </p>
        <h2 className="display-lg mt-8 text-balance text-fg">
          WHERE <span className="text-fg/35">WILL YOU LAND?</span>
        </h2>
        <p className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-fg/65 sm:text-lg">
          White sand, turquoise shallows, and reefs that start ten steps from the beach. Each island has its own character.
        </p>

        {/* Popular destinations — large cards */}
        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((dest) => (
            <article
              key={dest.id}
              className="group relative overflow-hidden rounded-[1.5rem] bg-section"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={dest.image || "/images/hero-beach.jpg"}
                  alt={dest.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2">
                    <Star className="size-3.5 fill-turquoise text-turquoise" aria-hidden="true" />
                    <span className="text-[0.5625rem] font-bold uppercase tracking-[0.25em] text-turquoise">
                      Popular
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-extrabold uppercase tracking-tight text-white">
                    {dest.name}
                  </h3>
                  <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-white/75">
                    {dest.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Other destinations — compact row */}
        {others.length > 0 && (
          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-3">
            {others.map((dest) => (
              <article
                key={dest.id}
                className="group flex items-center gap-4 rounded-2xl border border-fg/10 p-4 transition-all duration-300 hover:border-fg/25 hover:bg-section/50"
              >
                <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-section">
                  <Image
                    src={dest.image || "/images/speedboat/speedboat-frame-1.jpg"}
                    alt={dest.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-fg">{dest.name}</h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-fg/50 line-clamp-2">
                    {dest.description}
                  </p>
                </div>
                <MapPin className="size-4 shrink-0 text-fg/25" aria-hidden="true" />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

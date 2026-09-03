"use client";

import Image from "next/image";
import { Clock, Users, Check, ArrowUpRight, Eye } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SeaPackage } from "@prisma/client";

interface SeaPackagesProps {
  packages: SeaPackage[];
  onSelect?: (pkg: SeaPackage) => void;
  onViewProgram?: (pkg: SeaPackage) => void;
}

export function SeaPackages({ packages, onSelect, onViewProgram }: SeaPackagesProps) {
  if (!packages.length) return null;

  return (
    <section
      aria-label="Sea packages"
      className="bg-sand py-20 text-fg sm:py-28"
    >
      <div className="container-w">
        <p className="flex items-center gap-4 text-[0.625rem] font-bold uppercase tracking-[0.35em] text-fg/45">
          <span className="text-2xl font-extrabold tracking-tight text-fg">04</span>
          <span className="h-px w-10 bg-fg/20" aria-hidden="true" />
          CHOOSE YOUR WAY
        </p>
        <h2 className="display-lg mt-8 text-balance text-fg">
          THE SEA, <span className="text-fg/35">YOUR WAY.</span>
        </h2>
        <p className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-fg/65 sm:text-lg">
          Six ways to get on the water. From speed runs to sunset sails — pick the one that fits your day.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => {
            const inclusions: string[] = (() => {
              try { return JSON.parse(pkg.inclusions); } catch { return []; }
            })();

            return (
              <article
                key={pkg.id}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-page transition-shadow duration-500",
                  "shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.14)]",
                )}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={pkg.coverImage || "/images/speedboat/speedboat-frame-1.jpg"}
                    alt={pkg.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-[0.625rem] font-bold uppercase tracking-[0.3em] text-white/70">
                        {pkg.boatType}
                      </p>
                      <h3 className="mt-1 text-xl font-extrabold uppercase tracking-tight text-white">
                        {pkg.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-pill px-3 py-1 text-[0.6875rem] font-bold text-pill-fg">
                      FROM ${pkg.priceFrom}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm leading-relaxed text-fg/65">{pkg.description}</p>

                  <div className="mt-4 flex items-center gap-4 text-[0.6875rem] font-bold text-fg/50">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {pkg.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="size-3.5" aria-hidden="true" />
                      Up to {pkg.maxGuests}
                    </span>
                  </div>

                  {inclusions.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {inclusions.slice(0, 4).map((item) => (
                        <li
                          key={item}
                          className="inline-flex items-center gap-1 rounded-full bg-fg/5 px-2.5 py-1 text-[0.625rem] font-bold text-fg/60"
                        >
                          <Check className="size-3 text-reef" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                      {inclusions.length > 4 && (
                        <li className="inline-flex items-center rounded-full bg-fg/5 px-2.5 py-1 text-[0.625rem] font-bold text-fg/45">
                          +{inclusions.length - 4} more
                        </li>
                      )}
                    </ul>
                  )}

                  <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => onViewProgram?.(pkg)}
                      className="group/view flex flex-1 items-center justify-center gap-2 rounded-xl border border-fg/15 py-3 text-sm font-bold tracking-tight text-fg transition-all duration-300 hover:border-fg/30 hover:bg-fg/5"
                    >
                      <Eye className="size-4" />
                      View Program
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelect?.(pkg)}
                      className="group/btn flex flex-1 items-center justify-center gap-2 rounded-xl bg-fg py-3 text-sm font-bold tracking-tight text-page transition-all duration-300 hover:bg-fg/85"
                    >
                      Book this
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

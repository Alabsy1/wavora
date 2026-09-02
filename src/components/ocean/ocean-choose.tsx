"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { oceanWays } from "@/data/ocean-experience";
import { Reveal } from "@/components/reveal";

export function OceanChoose() {
  const [active, setActive] = useState(0);
  const way = oceanWays[active];

  return (
    <section
      aria-label="Choose your experience"
      className="relative overflow-hidden bg-ocean-deep py-24 text-paper sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute right-[-12%] top-[10%] h-[42vh] w-[42vh] animate-drift rounded-full bg-turquoise/8 blur-[130px]"
      />

      <div className="container-w relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          {/* copy + selectors */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-paper/55">Choose your experience</p>
              <h2 className="display-xl mt-6 text-balance text-paper">
                CRYSTAL WATER.
                <br />
                <span className="bg-gradient-to-r from-turquoise to-paper/60 bg-clip-text text-transparent">
                  ENDLESS POSSIBILITIES.
                </span>
              </h2>
              <p className="mt-6 max-w-sm text-pretty text-base leading-relaxed text-paper/60">
                One sea, six moods. Pick one and we&apos;ll build the day around
                it.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 flex flex-col lg:mt-14">
              {oceanWays.map((w, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={w.slug}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "group flex items-baseline gap-5 border-t border-paper/10 py-4 text-left outline-offset-4 transition-colors duration-300 lg:py-5",
                      isActive ? "text-paper" : "text-paper/35 hover:text-paper/70",
                    )}
                  >
                    <span
                      className={cn(
                        "text-[0.625rem] font-bold tracking-[0.3em] transition-colors duration-300",
                        isActive ? "text-turquoise" : "text-paper/40",
                      )}
                    >
                      {w.number}
                    </span>
                    <span className="display-sm uppercase tracking-tight sm:text-2xl">
                      {w.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className={cn(
                        "ml-auto size-4 self-center transition-all duration-300",
                        isActive
                          ? "translate-x-0 translate-y-0 text-turquoise opacity-100"
                          : "-translate-x-1 translate-y-1 opacity-0",
                      )}
                    />
                  </button>
                );
              })}
              <div className="border-t border-paper/10" />
            </Reveal>
          </div>

          {/* image */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-24">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ocean sm:aspect-[4/4.4]">
                  {oceanWays.map((w, i) => (
                    <div
                      key={w.slug}
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 transition-opacity duration-500 ease-out",
                        active === i ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <Image
                        src={w.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ocean-deep/85 via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-8">
                    <div>
                      <p className="text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-paper/50">
                        {way.number} / 06 — {way.label}
                      </p>
                      <p className="mt-2 max-w-xs text-pretty text-paper/80">
                        {way.description}
                      </p>
                    </div>
                    <Link
                      href={way.href}
                      data-cursor="VIEW"
                      className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-paper/25 px-5 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-paper transition-all duration-300 hover:bg-paper hover:text-ink"
                    >
                      View
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
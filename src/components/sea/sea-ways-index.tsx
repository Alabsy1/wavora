"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { seaWays } from "@/data/sea";
import { SeaWayDetailModal } from "./sea-way-detail-modal";

interface SeaWaysIndexProps {
  onBookThisStyle?: (wayLabel: string) => void;
}

export function SeaWaysIndex({ onBookThisStyle }: SeaWaysIndexProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedWay, setSelectedWay] = useState<number | null>(null);

  const way = seaWays.items[active];

  function handleBlur(e: React.FocusEvent) {
    const next = e.relatedTarget as Node | null;
    if (next && listRef.current?.contains(next)) return;
    setActive(0);
  }

  function openDetail(idx: number) {
    setSelectedWay(idx);
    setDetailOpen(true);
  }

  function handleBookThisStyle(wayLabel: string) {
    onBookThisStyle?.(wayLabel);
  }

  return (
    <>
      <section
        id="choose-your-way"
        aria-label="Six ways to get on the water"
        className="bg-sand py-20 text-fg sm:py-28"
      >
        <div className="container-w grid gap-14 lg:grid-cols-12 lg:gap-x-12">
          {/* index */}
          <div className="order-2 min-w-0 lg:order-1 lg:col-span-6">
            <p className="flex items-center gap-4 text-[0.625rem] font-bold uppercase tracking-[0.35em] text-fg/45">
              <span className="text-2xl font-extrabold tracking-tight text-fg">
                {seaWays.number}
              </span>
              <span className="h-px w-10 bg-fg/20" aria-hidden="true" />
              {seaWays.label}
            </p>
            <h2 className="display-lg mt-8 text-balance text-fg">
              {seaWays.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-7 flex flex-wrap items-baseline gap-x-4 text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-fg/50">
              <span className="text-fg">{seaWays.prompt}</span>
              <span className="hidden sm:inline">{seaWays.hint}</span>
            </p>

            <div
              ref={listRef}
              onMouseLeave={() => !touched && setActive(0)}
              className="mt-8 flex flex-col lg:mt-10"
            >
              {seaWays.items.map((item, i) => {
                const isActive = i === active;
                const quiet = !isActive;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => {
                      setTouched(true);
                      setActive(i);
                      openDetail(i);
                    }}
                    onBlur={handleBlur}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative flex min-w-0 items-center gap-3 border-t border-fg/10 py-3.5 text-left outline-offset-4 transition-all duration-500 ease-out sm:gap-5 lg:gap-7 lg:py-5",
                      quiet ? "opacity-35 hover:opacity-70" : "opacity-100",
                    )}
                  >
                    <span
                      className={cn(
                        "text-[0.625rem] font-bold tracking-[0.3em] transition-colors duration-300",
                        isActive ? "text-reef" : "text-fg/40",
                      )}
                    >
                      {item.number}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 text-2xl font-extrabold uppercase leading-none tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-3xl lg:text-5xl",
                        isActive
                          ? "translate-x-2 text-fg"
                          : "translate-x-0 text-fg",
                      )}
                    >
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "ml-auto hidden shrink-0 items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-fg transition-all duration-400 lg:inline-flex",
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "translate-x-2 opacity-0",
                      )}
                    >
                      View
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </button>
                );
              })}
              <div className="border-t border-fg/10" />
            </div>

            {/* water progress system */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-[0.625rem] font-bold tracking-[0.3em] text-fg/50">
                {way.number}
              </span>
              <span className="relative h-px flex-1 overflow-hidden bg-fg/10">
                <span
                  className="absolute inset-y-0 left-0 bg-reef transition-all duration-500 ease-out"
                  style={{ width: `${((active + 1) / seaWays.items.length) * 100}%` }}
                />
              </span>
              <span className="text-[0.625rem] font-bold tracking-[0.3em] text-fg/50">
                {seaWays.items[seaWays.items.length - 1].number}
              </span>
            </div>
          </div>

          {/* dominant visual */}
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-6">
            <div className="lg:sticky lg:top-24">
              <div
                aria-live="polite"
                className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-section sm:aspect-[3/3.2] lg:aspect-[4/4.7] lg:max-h-[78vh]"
              >
                {seaWays.items.map((item, i) => (
                  <div
                    key={item.slug}
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700 ease-out",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className={cn(
                        "object-cover transition-transform duration-[1400ms] ease-out",
                        active === i ? "scale-100" : "scale-[1.06]",
                      )}
                      style={{ objectPosition: item.position ?? "50% 50%" }}
                      loading="lazy"
                    />
                  </div>
                ))}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(4,12,18,0.72)] via-transparent to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-7">
                  <div>
                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.3em] text-white/65">
                      {way.number} / {way.label}
                    </p>
                    <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
                      {way.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openDetail(active)}
                    className="group inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-pill text-pill-fg transition-transform duration-300 hover:scale-105"
                    aria-label={`View details for ${way.label}`}
                  >
                    <ArrowUpRight
                      className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail modal */}
      <SeaWayDetailModal
        way={selectedWay !== null ? seaWays.items[selectedWay] : null}
        open={detailOpen}
        onClose={() => { setDetailOpen(false); setSelectedWay(null); }}
        onBookThisStyle={handleBookThisStyle}
      />
    </>
  );
}

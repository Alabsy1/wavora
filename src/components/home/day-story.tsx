"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { dayStory } from "@/data/home-editorial";

const pad = (n: number) => String(n).padStart(2, "0");

export function DayStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  function measureStep() {
    const track = trackRef.current;
    const cards = track?.querySelectorAll<HTMLElement>("[data-chapter]");
    if (!track || !cards || cards.length < 2) return 0;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const step = measureStep();
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? Math.min(1, track.scrollLeft / max) : 0);
    if (step > 0) {
      const next = Math.round(track.scrollLeft / step);
      setActive(Math.max(0, Math.min(dayStory.chapters.length - 1, next)));
    }
  }

  function scrollBy(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const step = measureStep();
    if (step <= 0) return;
    const target = Math.max(
      0,
      Math.min(track.scrollWidth - track.clientWidth, track.scrollLeft + dir * step),
    );
    track.scrollTo({ left: target, behavior: "smooth" });
  }

  const activeChapter = dayStory.chapters[active];

  return (
    <section
      className="overflow-hidden bg-section py-20 text-section-fg sm:py-28"
      aria-label="Explore the day — four moves from sea to night"
    >
      <div className="container-w flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-section-fg/50">{dayStory.eyebrow}</p>
          <h2 className="display-xl mt-5 flex flex-wrap items-baseline gap-x-6 text-balance text-section-fg">
            {dayStory.title}
            <span
              aria-hidden="true"
              className="inline-block text-section-fg/30"
            >
              →
            </span>
          </h2>
        </div>
        <p className="hidden shrink-0 text-[0.625rem] font-bold uppercase tracking-[0.3em] text-section-fg/45 md:block">
          {dayStory.hint} — {pad(active + 1)} / {pad(dayStory.chapters.length)}
        </p>
      </div>

      <div className="relative mt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-px z-10 w-8 bg-gradient-to-r from-section sm:w-16"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -right-px z-10 w-8 bg-gradient-to-l from-section sm:w-16"
        />

        <div
          ref={trackRef}
          onScroll={onScroll}
          role="region"
          aria-label={dayStory.title}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 sm:-mx-8 sm:gap-7 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12"
        >
          {dayStory.chapters.map((chapter) => (
            <div
              key={chapter.id}
              data-chapter
              className="group relative aspect-[4/5] w-[82%] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-section-soft sm:w-[400px] lg:w-[440px]"
            >
              <Image
                src={chapter.image}
                alt={chapter.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 36vw, (min-width: 640px) 45vw, 82vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-section/85 via-section/15 to-section/20 transition-opacity duration-500"
              />

              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-pill/15 px-3 py-1 text-[0.625rem] font-bold tracking-[0.25em] text-section-fg backdrop-blur-md">
                {chapter.index}
                <span className="opacity-60">/</span>
                {chapter.label}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <h3 className="display-sm text-section-fg">{chapter.title}</h3>
                <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-section-fg/70">
                  {chapter.description}
                </p>
                <Link
                  href={chapter.href}
                  className="group/link mt-5 inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-section-fg link-underline"
                >
                  {chapter.cta}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-w mt-8 flex items-center gap-5">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll to previous chapter"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-section-fg/25 text-section-fg transition-all duration-300 hover:border-section-fg hover:bg-pill hover:text-pill-fg"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll to next chapter"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-section-fg/25 text-section-fg transition-all duration-300 hover:border-section-fg hover:bg-pill hover:text-pill-fg"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>

        <div className="h-px flex-1 overflow-hidden bg-section-fg/15">
          <div
            className="h-full bg-turquoise transition-[width] duration-200 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <p
          aria-live="polite"
          className="hidden shrink-0 text-[0.625rem] font-bold tracking-[0.3em] text-section-fg/50 sm:block"
        >
          {activeChapter.index} — {activeChapter.label}
        </p>
      </div>
    </section>
  );
}
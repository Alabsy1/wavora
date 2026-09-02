"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface HorizontalScrollerProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  tone?: "light" | "dark";
}

export function HorizontalScroller({
  children,
  className,
  ariaLabel = "Scrollable row",
  tone = "light",
}: HorizontalScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : 360;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  const fade = tone === "light" ? "from-page" : "from-section";
  const edgeBtn =
    tone === "light"
      ? "border-fg/15 text-fg hover:border-fg hover:bg-fg hover:text-page"
      : "border-section-fg/25 text-section-fg hover:border-section-fg hover:bg-pill hover:text-pill-fg";

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 -left-px z-10 w-8 bg-gradient-to-r sm:w-16",
          fade,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 -right-px z-10 w-8 bg-gradient-to-l sm:w-16",
          fade,
        )}
      />

      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 sm:-mx-8 sm:gap-7 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12"
      >
        {children}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-full border transition-all duration-300",
            edgeBtn,
          )}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-full border transition-all duration-300",
            edgeBtn,
          )}
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
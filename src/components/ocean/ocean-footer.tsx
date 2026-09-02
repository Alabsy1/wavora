"use client";

import Link from "next/link";
import { oceanFooterNav } from "@/data/ocean-experience";
import { Reveal } from "@/components/reveal";

export function OceanFooter() {
  return (
    <footer
      aria-label="Wavora"
      className="relative overflow-hidden bg-ocean-deep pb-10 pt-24 text-paper sm:pt-32"
    >
      {/* waves */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute left-0 top-0 h-16 w-[120%] animate-drift opacity-40"
      >
        <path
          d="M0 60 C 240 20, 480 90, 720 60 S 1200 20, 1440 60"
          fill="none"
          stroke="rgba(27,163,160,0.35)"
          strokeWidth="1.5"
        />
        <path
          d="M0 78 C 300 44, 560 100, 840 76 S 1260 46, 1440 78"
          fill="none"
          stroke="rgba(250,249,246,0.15)"
          strokeWidth="1"
        />
      </svg>

      <div
        aria-hidden="true"
        className="absolute bottom-[-15%] left-1/2 h-[50vh] w-[50vh] -translate-x-1/2 animate-drift rounded-full bg-turquoise/10 blur-[140px]"
      />

      <div className="container-w relative z-10">
        {/* oversized wordmark */}
        <div className="relative select-none text-center">
          <Reveal>
            <p
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 display-hero uppercase text-transparent opacity-25 transition-all duration-500 ease-out animate-drift"
              style={{
                WebkitTextStroke: "1px rgba(27,163,160,0.5)",
              }}
            >
              WAVORA
            </p>
            <p className="display-hero uppercase text-paper">WAVORA</p>
          </Reveal>
        </div>

        {/* nav */}
        <Reveal delay={0.1}>
          <nav
            aria-label="Footer"
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-paper/10 pt-10"
          >
            {oceanFooterNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-bold uppercase tracking-[0.22em] text-paper/60 transition-colors duration-300 hover:text-turquoise"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 text-[0.625rem] font-bold uppercase tracking-[0.28em] text-paper/35 sm:flex-row">
          <p>© {new Date().getFullYear()} Wavora</p>
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block h-1 w-1 rounded-full bg-turquoise" />
            The Red Sea · Hurghada
          </p>
          <p>
            Get on the water <span className="text-turquoise">→</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
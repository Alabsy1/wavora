"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { oceanBook } from "@/data/ocean-experience";
import { Reveal } from "@/components/reveal";

export function OceanBook() {
  return (
    <section
      aria-label="Book your experience"
      className="relative overflow-hidden bg-sand py-24 text-ink sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 animate-drift rounded-full bg-turquoise/10 blur-[120px]"
      />

      <div className="container-w relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow justify-center text-ink/55">Ready when you are</p>
        </Reveal>

        <h2 className="mt-7 text-ink">
          {oceanBook.title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <Reveal delay={i * 0.1}>
                <span className="block display-hero">
                  {i === oceanBook.title.length - 1
                    ? line.replace("?", "")
                    : line}
                  {i === oceanBook.title.length - 1 && (
                    <span className="text-coral" aria-hidden="true">
                      ?
                    </span>
                  )}
                </span>
              </Reveal>
            </span>
          ))}
        </h2>

        <Reveal delay={0.35} className="mt-10">
          <Link
            href={oceanBook.cta.href}
            data-cursor="BOOK"
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-sm font-bold uppercase tracking-[0.18em] text-paper transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            {oceanBook.cta.label}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="mt-6 text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-ink/45">
            {oceanBook.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
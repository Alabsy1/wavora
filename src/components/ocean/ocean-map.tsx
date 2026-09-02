"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  oceanDestinations,
  oceanHomePort,
} from "@/data/ocean-experience";
import { Reveal } from "@/components/reveal";

const DESTINATION_HREF: Record<string, string> = {
  giftun: "/experience/giftun-island-boat-trip",
  "orange-bay": "/experience/snorkeling-safari",
  magawish: "/experience/island-hopping-mahmya",
  elphinstone: "/experience/open-water-diving",
  "abu-dabab": "/experience/snorkeling-safari",
};

const ROUTES: [number, number][] = [
  [530, 223],
  [580, 322],
  [400, 384],
  [700, 446],
  [560, 521],
];

export function OceanMap() {
  const [active, setActive] = useState(0);
  const dest = oceanDestinations[active];

  return (
    <section
      aria-label="Red Sea destinations"
      className="bg-paper py-24 text-ink sm:py-32"
    >
      <div className="container-w">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-ink/55">Red Sea destinations</p>
            <h2 className="display-lg mt-5 text-balance text-ink">
              FIND YOUR SPOT ON THE MAP.
            </h2>
          </div>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-ink/55 sm:text-base">
            Hurghada is home port. From there the whole sea opens up.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-12 lg:gap-x-8">
          {/* map */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ocean-deep sm:aspect-[16/10]">
              {/* decorative sea */}
              <svg
                aria-hidden="true"
                viewBox="0 0 1000 620"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 h-full w-full"
              >
                <path
                  d="M120 60 C 260 10, 760 -10, 900 90 C 1020 180, 990 360, 900 480 C 800 610, 300 640, 180 540 C 60 440, 20 180, 120 60 Z"
                  fill="rgba(27,163,160,0.08)"
                />
                <path
                  d="M180 120 C 310 70, 700 50, 840 140 C 950 225, 930 380, 850 480 C 770 590, 340 600, 240 520 C 140 440, 90 210, 180 120 Z"
                  fill="none"
                  stroke="rgba(250,249,246,0.07)"
                  strokeWidth="1.5"
                />
                <path
                  d="M250 200 C 360 150, 640 130, 760 210 C 870 290, 870 420, 790 500 C 710 580, 380 580, 300 500 C 220 420, 180 260, 250 200 Z"
                  fill="none"
                  stroke="rgba(250,249,246,0.05)"
                  strokeWidth="1.5"
                />
                <path
                  d="M330 280 C 420 240, 580 230, 680 300 C 770 370, 770 460, 700 520 C 640 580, 430 580, 370 510 C 310 440, 270 340, 330 280 Z"
                  fill="none"
                  stroke="rgba(27,163,160,0.14)"
                  strokeWidth="1.5"
                />

                {/* grid dots */}
                {Array.from({ length: 9 }, (_, r) =>
                  Array.from({ length: 13 }, (_, c) => (
                    <circle
                      key={`${r}-${c}`}
                      cx={70 + c * 75}
                      cy={70 + r * 62}
                      r="1.1"
                      fill="rgba(250,249,246,0.08)"
                    />
                  )),
                )}

                {/* routes from home port */}
                {ROUTES.map(([x, y], i) => (
                  <path
                    key={i}
                    d={`M 440 273 Q ${(440 + x) / 2 + (i % 2 ? 40 : -40)} ${
                      (273 + y) / 2
                    } ${x} ${y}`}
                    fill="none"
                    stroke="rgba(27,163,160,0.35)"
                    strokeWidth="1"
                    strokeDasharray="3 9"
                  />
                ))}
              </svg>

              {/* home port */}
              <span
                style={{
                  left: `${oceanHomePort.x}%`,
                  top: `${oceanHomePort.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              >
                <span className="relative block">
                  <span className="block size-3 rotate-45 border border-turquoise bg-turquoise/30" />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-paper/10 px-2.5 py-0.5 text-[0.55rem] font-bold tracking-[0.2em] text-paper/80 backdrop-blur">
                    HURGHADA — HOME PORT
                  </span>
                </span>
              </span>

              {/* destination points */}
              {oceanDestinations.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-label={d.name}
                  aria-pressed={active === i}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 outline-offset-4"
                >
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-300 ease-out",
                      active === i
                        ? "h-8 w-8 border border-turquoise/70 bg-turquoise/20"
                        : "h-5 w-5 border border-paper/40 bg-ocean-deep group-hover:h-7 group-hover:w-7 group-hover:border-turquoise/70 group-hover:bg-turquoise/15",
                    )}
                  >
                    <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-turquoise shadow-[0_0_10px_rgba(27,163,160,0.9)] transition-transform duration-300 group-hover:scale-125" />
                  </span>
                  <span
                    className={cn(
                      "absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-paper px-3 py-1 text-[0.55rem] font-bold tracking-[0.22em] text-ink transition-all duration-300",
                      active === i
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100",
                    )}
                  >
                    {d.name}
                  </span>
                </button>
              ))}

              {/* compass */}
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-5 text-[0.55rem] font-bold tracking-[0.3em] text-paper/50"
              >
                N ↑
              </span>
            </div>
          </Reveal>

          {/* detail card */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[1.5rem] bg-ocean-deep text-paper">
                <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[16/8] lg:aspect-[16/9]">
                  {oceanDestinations.map((d, i) => (
                    <div
                      key={d.id}
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 transition-opacity duration-500 ease-out",
                        active === i ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <Image
                        src={d.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 38vw, 100vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-transparent to-transparent" />
                  <p className="absolute left-6 top-5 text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-paper/60">
                    Destination · {String(active + 1).padStart(2, "0")} /{" "}
                    {String(oceanDestinations.length).padStart(2, "0")}
                  </p>
                </div>

                <div className="p-6 sm:p-8">
                  <p className="eyebrow text-turquoise">Red Sea · {oceanHomePort.name}</p>
                  <h3 className="display-sm mt-3 tracking-tight">{dest.name}</h3>
                  <p className="mt-4 text-pretty leading-relaxed text-paper/65">
                    {dest.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-paper/10 pt-6">
                    <Link
                      href={DESTINATION_HREF[dest.id]}
                      data-cursor="EXPLORE"
                      className="group inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-paper transition-colors duration-300 hover:text-turquoise"
                    >
                      View experience
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                    <span className="text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-paper/40">
                      {String(active + 1).padStart(2, "0")} / 05
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
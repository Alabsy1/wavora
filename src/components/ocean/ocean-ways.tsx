"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { oceanWays } from "@/data/ocean-experience";
import { Reveal } from "@/components/reveal";

export function OceanWays() {
  return (
    <section
      id="ways"
      aria-label="Six ways to get on the water"
      className="bg-sand py-24 text-ink sm:py-32"
    >
      <div className="container-w">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-ink/55">Six ways to get on the water</p>
            <h2 className="display-lg mt-5 text-balance text-ink">
              PICK YOUR SPEED.
            </h2>
          </div>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-ink/55 sm:text-base">
            Six ways to experience the Red Sea. Hover a word and watch it fill
            with the sea.
          </p>
        </Reveal>

        <div className="mt-12 sm:mt-16">
          {oceanWays.map((way, i) => (
            <Reveal key={way.slug} delay={Math.min(i * 0.05, 0.2)} className="relative">
              <Link
                href={way.href}
                data-cursor="EXPLORE"
                className="group relative block py-7 outline-offset-8 sm:py-9"
              >
                {/* growing line */}
                <span className="absolute inset-x-0 top-0 h-px bg-ink/10" />
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

                <div className="flex items-center gap-3 sm:gap-8">
                  <span className="shrink-0 text-[0.65rem] font-bold tracking-[0.3em] text-ink/40 transition-colors duration-300 group-hover:text-turquoise">
                    {way.number}
                  </span>

                  {/* word with image-fill hover */}
                  <div className="relative origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]">
                    <h3 className="text-[2.5rem] font-extrabold uppercase leading-none tracking-tight text-ink sm:text-5xl lg:text-7xl xl:text-[7rem]">
                      {way.label}
                    </h3>
                    <h3
                      aria-hidden="true"
                      className="text-[2.5rem] absolute inset-0 font-extrabold uppercase leading-none tracking-tight bg-clip-text text-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 sm:text-5xl lg:text-7xl xl:text-[7rem]"
                      style={{
                        backgroundImage: `url(${way.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center 30%",
                      }}
                    >
                      {way.label}
                    </h3>
                  </div>

                  <div className="ml-auto flex shrink-0 items-center gap-4 sm:gap-6">
                    <p className="hidden max-w-[220px] text-pretty text-sm leading-snug text-ink/55 opacity-0 transition-all duration-400 ease-out group-hover:translate-x-0 group-hover:opacity-100 md:block -translate-x-3">
                      {way.description}
                    </p>
                    <ArrowUpRight
                      className="hidden size-5 text-ink transition-all duration-400 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-turquoise sm:size-6 sm:block"
                      aria-hidden="true"
                    />
                  </div>

                  {/* mobile thumbnail */}
                  <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full bg-ink sm:hidden">
                    <Image
                      src={way.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal className="relative">
            <span className="absolute inset-x-0 top-0 h-px bg-ink/10" />
            <span className="h-px" aria-hidden="true" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";
import { oceanDevice, oceanWays } from "@/data/ocean-experience";

function ScreenImages({
  active,
  reflection = false,
}: {
  active: number;
  reflection?: boolean;
}) {
  return (
    <div className="ocean-screen-stack absolute inset-0" aria-hidden="true">
      {oceanWays.map((way, i) => (
        <div
          key={way.slug}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out",
            active === i ? "opacity-100" : "opacity-0",
            reflection && "opacity-[0.22]",
          )}
        >
          <Image
            src={way.image}
            alt=""
            fill
            sizes="(min-width: 768px) 600px, 90vw"
            className="object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>
  );
}

export function OceanDevice() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const way = oceanWays[active];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const deviceY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [7, 1]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % oceanWays.length),
      3600,
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      id="signature"
      ref={ref}
      aria-label="One sea, six ways to experience it"
      className="relative overflow-hidden bg-ocean py-24 text-paper sm:py-32"
    >
      {/* environment */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-ocean to-ocean-deep"
      />
      <div
        aria-hidden="true"
        className="absolute left-[-10%] top-[16%] h-[46vh] w-[46vh] animate-drift rounded-full bg-turquoise/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[8%] right-[-8%] h-[38vh] w-[38vh] animate-drift rounded-full bg-ocean-soft/70 blur-[120px]"
        style={{ animationDelay: "-10s" }}
      />

      {/* bubbles */}
      {[
        ["12%", "62%", "0s"],
        ["22%", "50%", "-2.5s"],
        ["78%", "58%", "-4s"],
        ["86%", "44%", "-1.5s"],
        ["64%", "70%", "-5.5s"],
      ].map(([left, bottom, delay]) => (
        <span
          key={left}
          aria-hidden="true"
          className="absolute hidden size-1.5 animate-rise rounded-full bg-turquoise/25 sm:block"
          style={{ left, bottom, animationDelay: delay }}
        />
      ))}

      {/* wave lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-28 w-[120%] animate-drift opacity-50"
      >
        <path
          d="M0 90 C 240 40, 480 130, 720 80 S 1200 40, 1440 90"
          fill="none"
          stroke="rgba(250,249,246,0.12)"
          strokeWidth="1"
        />
        <path
          d="M0 120 C 300 80, 560 150, 840 110 S 1260 80, 1440 120"
          fill="none"
          stroke="rgba(27,163,160,0.2)"
          strokeWidth="1"
        />
      </svg>

      <div className="container-w relative z-10">
        {/* headline */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow justify-center text-paper/55"
          >
            {oceanDevice.eyebrow}
          </motion.p>
          <h2 className="mt-6">
            <span className="block overflow-hidden">
              <motion.span
                className="block display-hero"
                initial={{ y: "112%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {oceanDevice.title[0]}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block display-hero text-outline"
                initial={{ y: "112%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {oceanDevice.title[1]}
              </motion.span>
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-sm font-bold uppercase tracking-[0.32em] text-turquoise"
          >
            {oceanDevice.subtitle}
          </motion.p>
        </div>

        {/* the device */}
        <div className="relative mx-auto mt-14 w-full max-w-[540px] sm:mt-20">
          <motion.div
            style={reduceMotion ? undefined : { y: deviceY, rotateX, transformPerspective: 1200 }}
            initial={false}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="animate-float">
                {/* screen */}
                <div className="relative rounded-[1.25rem] border border-paper/15 bg-ocean-deep p-2 shadow-[0_40px_80px_-24px_rgba(4,13,24,0.8)] sm:rounded-[1.6rem]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[0.85rem] bg-ocean-deep">
                    <ScreenImages active={active} />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[0.85rem] bg-gradient-to-tr from-ocean-deep/45 via-transparent to-paper/20"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper/50 to-transparent"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-2.5 h-1 w-1 -translate-x-1/2 rounded-full bg-paper/25"
                  />
                </div>

                {/* base */}
                <div className="mx-auto h-2.5 w-[92%] rounded-b-2xl bg-gradient-to-b from-paper/20 to-paper/[0.04] sm:h-3" />

                {/* water reflection */}
                <div className="relative mt-8 h-24 overflow-hidden opacity-40 [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]">
                  <div className="absolute left-0 top-0 w-full scale-y-[-1] opacity-50 blur-[1.5px]">
                    <div className="aspect-[16/10] w-full rounded-[0.85rem] bg-ocean-deep">
                      <ScreenImages active={active} reflection />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-turquoise/50 to-transparent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* sequence label + pager */}
        <div className="relative z-10 mt-10 flex flex-col items-center gap-5 text-center">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-paper/40">
              Scene {way.number} / 06
            </p>
            <p className="mt-2 display-lg text-paper">
              {way.label.toUpperCase()}
              <span className="text-paper/30"> — {way.tagline}</span>
            </p>
          </motion.div>

          <div className="flex items-center gap-2.5" role="tablist" aria-label="Experiences">
            {oceanWays.map((w, i) => (
              <button
                key={w.slug}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Show ${w.label}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-400 ease-out",
                  active === i ? "w-8 bg-turquoise" : "w-1.5 bg-paper/25 hover:bg-paper/50",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
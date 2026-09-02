"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

const emptySubscribe = () => () => {};

export function OceanCursor() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const reduceMotion = useReducedMotion();

  const [hovered, setHovered] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 42, mass: 0.55 });
  const sy = useSpring(y, { stiffness: 500, damping: 42, mass: 0.55 });

  const active =
    mounted &&
    !reduceMotion &&
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  useEffect(() => {
    if (!active) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest?.("[data-cursor]") as HTMLElement | null;
      setHovered(labelled ? labelled.getAttribute("data-cursor") : null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [active, x, y]);

  if (!active) return null;

  const showLabel = !!hovered;
  const label = hovered || "VIEW";

  return (
    <motion.div
      aria-hidden="true"
      className="ocean-cursor pointer-events-none fixed left-0 top-0 z-[80] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{
          width: showLabel ? 88 : 32,
          height: showLabel ? 88 : 32,
          opacity: 1,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/90 bg-white/10"
      >
        <motion.span
          animate={{ opacity: showLabel ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[0.625rem] font-bold uppercase tracking-[0.22em] text-white"
        >
          {label}
          <span aria-hidden="true"> →</span>
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
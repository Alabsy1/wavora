"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

export function ContactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink("Hi WAVORA! I found you through the site — can you help me plan something?")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with WAVORA on WhatsApp"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-6 right-6 z-40 inline-flex h-14 items-center gap-3 rounded-full bg-section pr-6 pl-5 text-section-fg shadow-[0_12px_32px_-8px_rgba(11,12,13,0.5)] transition-colors duration-300 hover:bg-section-soft"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-reef opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-reef" />
          </span>
          <MessageCircle className="size-5" aria-hidden="true" />
          <span className="text-sm font-bold tracking-tight">
            Chat with us
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
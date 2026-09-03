"use client";

import Image from "next/image";
import { useState } from "react";
import { X, Clock, Users, Check, Minus, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { SeaPackage } from "@prisma/client";

interface PackageDetailModalProps {
  pkg: SeaPackage | null;
  open: boolean;
  onClose: () => void;
  onBook: (pkg: SeaPackage) => void;
}

function parseJsonArray(val: string): string[] {
  try { return JSON.parse(val); } catch { return []; }
}

function parseTimeline(val: string): { time: string; title: string; description: string }[] {
  try { return JSON.parse(val); } catch { return []; }
}

function parseSpecs(val: string): Record<string, string> {
  try { return JSON.parse(val); } catch { return {}; }
}

function parseAddOns(val: string): { name: string; price: number; description: string }[] {
  try { return JSON.parse(val); } catch { return []; }
}

function parseGallery(val: string): { src: string; alt: string }[] {
  try { return JSON.parse(val); } catch { return []; }
}

export function PackageDetailModal({ pkg, open, onClose, onBook }: PackageDetailModalProps) {
  const [galleryIdx, setGalleryIdx] = useState(0);

  if (!pkg) return null;

  const inclusions = parseJsonArray(pkg.inclusions);
  const exclusions = parseJsonArray(pkg.exclusions);
  const timeline = parseTimeline(pkg.timeline);
  const specs = parseSpecs(pkg.specs);
  const addOns = parseAddOns(pkg.addOns);
  const gallery = parseGallery(pkg.gallery);

  function prevImage() { setGalleryIdx((i) => (i === 0 ? gallery.length - 1 : i - 1)); }
  function nextImage() { setGalleryIdx((i) => (i === gallery.length - 1 ? 0 : i + 1)); }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto sm:items-start sm:p-4 sm:pt-[5vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative w-full max-h-[95vh] overflow-y-auto rounded-t-3xl bg-page shadow-2xl sm:max-w-3xl sm:rounded-3xl"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex size-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 sm:right-4 sm:top-4"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="relative aspect-[16/9] overflow-hidden sm:rounded-t-3xl">
                {gallery.map((img, i) => (
                  <div
                    key={img.src}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === galleryIdx ? "opacity-100" : "opacity-0"}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between sm:bottom-4 sm:left-4 sm:right-4">
                  <div>
                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.3em] text-white/60">
                      {pkg.boatType}
                    </p>
                    <h2 className="mt-1 text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl sm:text-3xl">
                      {pkg.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={prevImage} className="flex size-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30" aria-label="Previous image">
                      <ChevronLeft className="size-4" />
                    </button>
                    <span className="text-[0.625rem] font-bold text-white/70">{galleryIdx + 1}/{gallery.length}</span>
                    <button onClick={nextImage} className="flex size-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30" aria-label="Next image">
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="p-5 sm:p-6 sm:p-8">
              {/* Quick info */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-fg/5 px-3 py-1.5 text-[0.6875rem] font-bold text-fg/70">
                  <Clock className="size-3.5 text-reef" />
                  {pkg.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-fg/5 px-3 py-1.5 text-[0.6875rem] font-bold text-fg/70">
                  <Users className="size-3.5 text-reef" />
                  Up to {pkg.maxGuests} guests
                </span>
                <span className="rounded-full bg-turquoise/10 px-3 py-1.5 text-[0.6875rem] font-bold text-turquoise">
                  From ${pkg.priceFrom}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-fg/65 sm:mt-5 sm:text-base sm:text-lg">{pkg.description}</p>

              {/* Vessel specs */}
              {Object.keys(specs).length > 0 && (
                <div className="mt-5 sm:mt-6">
                  <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-fg">Vessel Details</h3>
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-6 sm:grid-cols-3">
                    {Object.entries(specs).map(([k, v]) => (
                      <div key={k} className="border-t border-fg/10 pt-3">
                        <dt className="text-[0.5625rem] font-bold uppercase tracking-[0.28em] text-fg/40">{k}</dt>
                        <dd className="mt-1 text-sm font-bold text-fg">{v}</dd>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              {timeline.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-fg">Full Day Timeline</h3>
                  <div className="mt-4 relative">
                    <div className="absolute left-[18px] top-2 bottom-2 w-px bg-fg/10" />
                    <div className="space-y-3 sm:space-y-4">
                      {timeline.map((step) => (
                        <div key={step.time} className="relative flex gap-3 sm:gap-4">
                          <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-fg/5 text-[0.5625rem] font-extrabold text-fg/60">
                            {step.time}
                          </div>
                          <div className="min-w-0 pt-1">
                            <h4 className="text-sm font-bold text-fg">{step.title}</h4>
                            <p className="mt-0.5 text-xs leading-relaxed text-fg/55">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 sm:grid-cols-2">
                {inclusions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-fg">What&apos;s Included</h3>
                    <ul className="mt-3 space-y-2">
                      {inclusions.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-fg/70">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                            <Check className="size-3 text-green-600 dark:text-green-400" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {exclusions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-fg">Not Included</h3>
                    <ul className="mt-3 space-y-2">
                      {exclusions.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-fg/50">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-fg/5">
                            <Minus className="size-3 text-fg/30" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Add-ons */}
              {addOns.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-fg">Available Add-ons</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {addOns.map((addon) => (
                      <div key={addon.name} className="flex items-center justify-between rounded-xl border border-fg/10 p-3 sm:p-4">
                        <div>
                          <h4 className="text-sm font-bold text-fg">{addon.name}</h4>
                          <p className="mt-0.5 text-xs text-fg/50">{addon.description}</p>
                        </div>
                        <span className="shrink-0 pl-3 text-sm font-bold text-turquoise">+${addon.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking CTA */}
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <button
                  type="button"
                  onClick={() => { onBook(pkg); onClose(); }}
                  className="group flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-turquoise to-turquoise/80 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-turquoise/20 transition-all duration-300 hover:shadow-xl hover:shadow-turquoise/30 min-h-[48px]"
                >
                  <Send className="size-4" />
                  Book This Package
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-xl border border-fg/15 px-6 py-3.5 text-sm font-bold text-fg transition-all duration-300 hover:border-fg/30 hover:bg-fg/5 min-h-[48px]"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

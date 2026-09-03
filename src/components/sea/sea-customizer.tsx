"use client";

import { useState, useMemo } from "react";
import { Clock, MapPin, Users, Send, Check, X, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SeaPackage, IslandDestination } from "@prisma/client";

interface SeaCustomizerProps {
  packages: SeaPackage[];
  destinations: IslandDestination[];
  onBook: (config: CustomizerConfig) => void;
}

export interface CustomizerConfig {
  packageId: string;
  packageTitle: string;
  duration: string;
  price: number;
  selectedIslands: string[];
  guests: number;
  addOns: string[];
}

interface AddOn {
  name: string;
  price: number;
  description: string;
}

const DURATIONS = [
  { label: "Half Day", hours: 3, multiplier: 1, maxIslands: 1 },
  { label: "Full Day", hours: 8, multiplier: 1.6, maxIslands: 3 },
  { label: "Sunset", hours: 2.5, multiplier: 0.9, maxIslands: 0 },
];

const AVAILABLE_ADDONS: AddOn[] = [
  { name: "GoPro Underwater Camera", price: 25, description: "4K underwater footage of your trip" },
  { name: "VIP Seafood Lunch", price: 40, description: "Fresh seafood feast on the island" },
  { name: "Private English Guide", price: 30, description: "Dedicated English-speaking guide" },
  { name: "Professional Photographer", price: 50, description: "Drone + underwater photos" },
  { name: "Snorkeling Gear Upgrade", price: 10, description: "Premium mask, fins & wetsuit" },
  { name: "Fruit & Juice Package", price: 15, description: "Tropical fruits & fresh juices" },
];

export function SeaCustomizer({ packages, destinations, onBook }: SeaCustomizerProps) {
  const [selectedPkg, setSelectedPkg] = useState<string>(packages[0]?.id ?? "");
  const [durationIdx, setDurationIdx] = useState(0);
  const [selectedIslands, setSelectedIslands] = useState<string[]>([]);
  const [guests, setGuests] = useState(2);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const pkg = useMemo(() => packages.find((p) => p.id === selectedPkg), [packages, selectedPkg]);
  const duration = DURATIONS[durationIdx];
  const maxIslands = duration.maxIslands;

  const price = useMemo(() => {
    if (!pkg) return 0;
    const base = pkg.priceFrom * duration.multiplier;
    const guestSurcharge = guests > 2 ? (guests - 2) * 15 : 0;
    const addOnTotal = AVAILABLE_ADDONS
      .filter((a) => selectedAddOns.includes(a.name))
      .reduce((sum, a) => sum + a.price, 0);
    return Math.round(base + guestSurcharge + addOnTotal);
  }, [pkg, duration, guests, selectedAddOns]);

  function toggleIsland(slug: string) {
    setSelectedIslands((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= maxIslands) return prev;
      return [...prev, slug];
    });
  }

  function toggleAddOn(name: string) {
    setSelectedAddOns((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  function handleBook() {
    if (!pkg) return;
    onBook({
      packageId: pkg.id,
      packageTitle: pkg.title,
      duration: duration.label,
      price,
      selectedIslands,
      guests,
      addOns: selectedAddOns,
    });
  }

  if (!packages.length) return null;

  return (
    <section
      aria-label="Customize your sea day"
      className="relative overflow-hidden bg-section py-24 text-section-fg sm:py-32"
    >
      <div className="container-w">
        <p className="flex items-center gap-4 text-[0.625rem] font-bold uppercase tracking-[0.35em] text-section-fg/50">
          <span className="text-2xl font-extrabold tracking-tight text-section-fg">05</span>
          <span className="h-px w-10 bg-section-fg/25" aria-hidden="true" />
          CUSTOMIZE YOUR DAY
        </p>
        <h2 className="display-lg mt-8 text-balance text-section-fg">
          BUILD YOUR <span className="bg-gradient-to-r from-turquoise via-turquoise to-section-fg bg-clip-text text-transparent">PERFECT DAY.</span>
        </h2>
        <p className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-section-fg/65 sm:text-lg">
          Pick a package, choose your duration, select your islands. We handle the rest.
        </p>

        {/* Step indicators */}
        <div className="mt-8 grid grid-cols-4 gap-2 sm:mt-12 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          {([1, 2, 3, 4] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(s)}
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-[0.625rem] font-bold uppercase tracking-[0.15em] transition-all duration-300 sm:justify-start sm:px-4 sm:py-2 sm:text-[0.6875rem] sm:tracking-[0.2em]",
                step === s
                  ? "bg-pill text-pill-fg"
                  : "bg-section-soft text-section-fg/40 hover:text-section-fg/70",
              )}
            >
              <span className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full text-[0.5625rem] font-extrabold",
                step === s ? "bg-turquoise text-white" : "bg-section-fg/10 text-section-fg/50",
              )}>
                {s}
              </span>
              <span className="hidden sm:inline">{s === 1 ? "Package" : s === 2 ? "Duration" : s === 3 ? "Islands" : "Extras"}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: configuration */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            {/* Step 1: Package selection */}
            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {packages.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => { setSelectedPkg(p.id); setStep(2); }}
                    className={cn(
                      "group flex flex-col items-start rounded-2xl border p-5 text-left transition-all duration-300",
                      selectedPkg === p.id
                        ? "border-turquoise bg-turquoise/10"
                        : "border-section-fg/10 hover:border-section-fg/25",
                    )}
                  >
                    <div className="flex w-full items-start justify-between">
                      <div>
                        <p className="text-[0.625rem] font-bold uppercase tracking-[0.3em] text-section-fg/45">
                          {p.boatType}
                        </p>
                        <h3 className="mt-1 text-lg font-extrabold uppercase tracking-tight text-section-fg">
                          {p.title}
                        </h3>
                      </div>
                      {selectedPkg === p.id && (
                        <span className="flex size-6 items-center justify-center rounded-full bg-turquoise text-white">
                          <Check className="size-3.5" />
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-section-fg/60">{p.description}</p>
                    <div className="mt-3 flex items-center gap-3 text-[0.625rem] font-bold text-section-fg/50">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" aria-hidden="true" />
                        {p.duration}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="size-3" aria-hidden="true" />
                        Up to {p.maxGuests}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-bold text-turquoise">
                      From ${p.priceFrom}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Duration */}
            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-3">
                {DURATIONS.map((d, i) => (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => { setDurationIdx(i); setSelectedIslands([]); setStep(3); }}
                    className={cn(
                      "group flex flex-col items-center rounded-2xl border p-6 text-center transition-all duration-300",
                      durationIdx === i
                        ? "border-turquoise bg-turquoise/10"
                        : "border-section-fg/10 hover:border-section-fg/25",
                    )}
                  >
                    <Clock className={cn(
                      "size-8 transition-colors",
                      durationIdx === i ? "text-turquoise" : "text-section-fg/30",
                    )} />
                    <h3 className="mt-3 text-lg font-extrabold uppercase tracking-tight text-section-fg">
                      {d.label}
                    </h3>
                    <p className="mt-1 text-sm text-section-fg/55">{d.hours} hours</p>
                    <p className="mt-2 text-sm font-bold text-turquoise">
                      {d.multiplier === 1 ? "Base price" : d.multiplier < 1 ? "10% less" : "60% more"}
                    </p>
                    <p className="mt-1 text-[0.5625rem] text-section-fg/40">
                      {d.maxIslands === 0 ? "No island stops" : `Up to ${d.maxIslands} island${d.maxIslands > 1 ? "s" : ""}`}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Islands */}
            {step === 3 && (
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-section-fg/60">
                    {maxIslands === 0
                      ? "Sunset sail — no island stops included"
                      : `Select up to ${maxIslands} island${maxIslands > 1 ? "s" : ""} (${selectedIslands.length}/${maxIslands})`}
                  </p>
                  <button type="button" onClick={() => setStep(4)} className="text-sm font-bold text-turquoise">
                    {maxIslands === 0 ? "Skip to extras" : "Next"}
                  </button>
                </div>

                {maxIslands > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {destinations.map((dest) => {
                      const selected = selectedIslands.includes(dest.slug);
                      const atLimit = !selected && selectedIslands.length >= maxIslands;
                      return (
                        <button
                          key={dest.id}
                          type="button"
                          onClick={() => toggleIsland(dest.slug)}
                          disabled={atLimit}
                          className={cn(
                            "group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                            selected
                              ? "border-turquoise bg-turquoise/10"
                              : atLimit
                                ? "border-section-fg/5 opacity-30 cursor-not-allowed"
                                : "border-section-fg/10 hover:border-section-fg/25",
                          )}
                        >
                          <span className={cn(
                            "flex size-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                            selected
                              ? "border-turquoise bg-turquoise text-white"
                              : "border-section-fg/20",
                          )}>
                            {selected && <Check className="size-3.5" />}
                          </span>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-section-fg">{dest.name}</h4>
                            <p className="mt-0.5 text-xs leading-relaxed text-section-fg/50 line-clamp-1">
                              {dest.description}
                            </p>
                          </div>
                          {dest.isPopular && (
                            <span className="ml-auto shrink-0 rounded-full bg-turquoise/15 px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-turquoise">
                              Popular
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Guest count */}
                <div className="mt-8 flex items-center gap-6">
                  <label className="text-sm font-bold text-section-fg">Guests</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="flex size-9 items-center justify-center rounded-full border border-section-fg/15 text-section-fg transition-colors hover:border-section-fg hover:bg-section-fg hover:text-section"
                    >
                      <X className="size-4" />
                    </button>
                    <span className="w-8 text-center text-lg font-extrabold text-section-fg">{guests}</span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(pkg?.maxGuests ?? 20, g + 1))}
                      className="flex size-9 items-center justify-center rounded-full border border-section-fg/15 text-section-fg transition-colors hover:border-section-fg hover:bg-section-fg hover:text-section"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>

                {maxIslands > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-section-fg/15 py-3 text-sm font-bold text-section-fg transition-all duration-300 hover:border-section-fg/30 hover:bg-section-fg/5"
                  >
                    Continue to extras
                  </button>
                )}
              </div>
            )}

            {/* Step 4: Add-ons */}
            {step === 4 && (
              <div>
                <p className="text-sm text-section-fg/60">Enhance your experience with optional extras.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {AVAILABLE_ADDONS.map((addon) => {
                    const selected = selectedAddOns.includes(addon.name);
                    return (
                      <button
                        key={addon.name}
                        type="button"
                        onClick={() => toggleAddOn(addon.name)}
                        className={cn(
                          "group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                          selected
                            ? "border-turquoise bg-turquoise/10"
                            : "border-section-fg/10 hover:border-section-fg/25",
                        )}
                      >
                        <span className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          selected
                            ? "border-turquoise bg-turquoise text-white"
                            : "border-section-fg/20",
                        )}>
                          {selected && <Check className="size-3.5" />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-section-fg">{addon.name}</h4>
                          <p className="mt-0.5 text-xs text-section-fg/50">{addon.description}</p>
                        </div>
                        <span className="shrink-0 text-sm font-bold text-turquoise">+${addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: live summary */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="sticky top-24 rounded-[1.5rem] bg-page p-5 shadow-[0_4px_30px_-8px_rgba(0,0,0,0.1)] sm:p-6 sm:p-8">
              <h3 className="text-lg font-extrabold uppercase tracking-tight text-fg">
                Your Sea Day
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex items-baseline justify-between border-t border-fg/10 pt-4">
                  <span className="text-sm text-fg/55">Package</span>
                  <span className="text-sm font-bold text-fg">{pkg?.title ?? "—"}</span>
                </div>
                <div className="flex items-baseline justify-between border-t border-fg/10 pt-4">
                  <span className="text-sm text-fg/55">Duration</span>
                  <span className="text-sm font-bold text-fg">{duration.label} ({duration.hours}h)</span>
                </div>
                <div className="flex items-baseline justify-between border-t border-fg/10 pt-4">
                  <span className="text-sm text-fg/55">Guests</span>
                  <span className="text-sm font-bold text-fg">{guests}</span>
                </div>
                {selectedIslands.length > 0 && (
                  <div className="border-t border-fg/10 pt-4">
                    <span className="text-sm text-fg/55">Islands</span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {selectedIslands.map((slug) => {
                        const dest = destinations.find((d) => d.slug === slug);
                        return (
                          <span
                            key={slug}
                            className="inline-flex items-center gap-1 rounded-full bg-turquoise/10 px-2.5 py-1 text-[0.625rem] font-bold text-turquoise"
                          >
                            <MapPin className="size-3" />
                            {dest?.name ?? slug}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedAddOns.length > 0 && (
                  <div className="border-t border-fg/10 pt-4">
                    <span className="text-sm text-fg/55">Add-ons</span>
                    <div className="mt-2 space-y-1.5">
                      {selectedAddOns.map((name) => {
                        const addon = AVAILABLE_ADDONS.find((a) => a.name === name);
                        return (
                          <div key={name} className="flex items-center justify-between text-[0.6875rem]">
                            <span className="text-fg/70">{name}</span>
                            <span className="font-bold text-turquoise">+${addon?.price ?? 0}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-fg/10 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-fg/55">Estimated total</span>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold tracking-tight text-fg">${price}</span>
                    <span className="ml-1 text-xs text-fg/45">/group</span>
                  </div>
                </div>
                <p className="mt-1 text-[0.625rem] text-fg/40">
                  Final price confirmed on WhatsApp
                </p>
              </div>

              <button
                type="button"
                onClick={handleBook}
                disabled={!pkg}
                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-turquoise to-turquoise/80 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-turquoise/20 transition-all duration-300 hover:from-turquoise hover:to-turquoise hover:shadow-xl hover:shadow-turquoise/30 disabled:opacity-50 min-h-[48px]"
              >
                <Send className="size-4" />
                Book via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

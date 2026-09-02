"use client";

import { useState } from "react";
import { ChevronDown, Send, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import { whatsappLink, mailtoLink } from "@/data/site";

interface PlanFormProps {
  dark?: boolean;
  className?: string;
}

const inputBase = cn(
  "w-full rounded-2xl border px-4 py-3.5 text-[0.9375rem] font-medium outline-none transition-colors duration-300",
);

function toneClasses(dark: boolean) {
  return dark
    ? {
        field: cn(inputBase, "border-section-fg/15 bg-pill/[0.06] text-section-fg placeholder:text-section-fg/40 focus:border-section-fg/50"),
        label: "text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-section-fg/60",
        select: "appearance-none",
      }
    : {
        field: cn(inputBase, "border-fg/15 bg-white text-fg placeholder:text-fg/40 focus:border-fg/50"),
        label: "text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-fg/55",
        select: "appearance-none",
      };
}

export function PlanForm({ dark = false, className }: PlanFormProps) {
  const t = toneClasses(dark);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");
  const [requests, setRequests] = useState("");
  const [sent, setSent] = useState(false);

  const selectWrap = cn("relative", dark && "text-section-fg", !dark && "text-fg");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      "Hi WAVORA! I'd like to plan a day in Hurghada.",
      date && `• When: ${date}`,
      people && `• People: ${people}`,
      type && `• Looking for: ${type}`,
      budget && `• Budget: ${budget}`,
      preferences && `• Vibe: ${preferences}`,
      requests && `• Notes: ${requests}`,
    ].filter(Boolean);
    const message = lines.join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("grid gap-5 sm:grid-cols-2", className)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="plan-date" className={t.label}>
          When are you coming?
        </label>
        <input
          id="plan-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={t.field}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="plan-people" className={t.label}>
          How many people?
        </label>
        <div className={selectWrap}>
          <select
            id="plan-people"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className={cn(t.field, t.select)}
          >
            <option value="">Select…</option>
            <option value="Just me">Just me</option>
            <option value="2 people">2 people</option>
            <option value="3–4 people">3–4 people</option>
            <option value="5–8 people">5–8 people</option>
            <option value="8+ people">8+ people</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 opacity-60"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="plan-type" className={t.label}>
          What are you in the mood for?
        </label>
        <div className={selectWrap}>
          <select
            id="plan-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={cn(t.field, t.select)}
          >
            <option value="">Select…</option>
            <option value="Sea & boat trips">Sea &amp; boat trips</option>
            <option value="Desert adventure">Desert adventure</option>
            <option value="A place to stay">A place to stay</option>
            <option value="Hidden spots">Hidden spots</option>
            <option value="Food & cafés">Food &amp; cafés</option>
            <option value="Something special">Something special</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 opacity-60"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="plan-budget" className={t.label}>
          Budget
        </label>
        <div className={selectWrap}>
          <select
            id="plan-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={cn(t.field, t.select)}
          >
            <option value="">Flexible</option>
            <option value="Budget-friendly">Budget-friendly</option>
            <option value="Moderate">Moderate</option>
            <option value="Premium">Premium</option>
            <option value="Let WAVORA decide">Let WAVORA decide</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 opacity-60"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="plan-preferences" className={t.label}>
          Your vibe (optional)
        </label>
        <input
          id="plan-preferences"
          type="text"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="Relaxed, adventurous, romantic, family-friendly…"
          className={t.field}
        />
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="plan-requests" className={t.label}>
          Anything else we should know?
        </label>
        <textarea
          id="plan-requests"
          rows={3}
          value={requests}
          onChange={(e) => setRequests(e.target.value)}
          placeholder="Allergies, kids, a special occasion, a secret wish…"
          className={cn(t.field, "resize-none")}
        />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className={cn(
            "group inline-flex h-13 items-center justify-center gap-2.5 rounded-full px-8 text-[0.9375rem] font-bold tracking-tight transition-all duration-300 ease-out active:scale-[0.98]",
            dark
              ? "bg-pill text-pill-fg hover:bg-white"
              : "bg-fg text-page hover:bg-fg/85",
          )}
        >
          Plan My Experience
          <Send
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>

        <p
          className={cn(
            "text-sm",
            dark ? "text-section-fg/50" : "text-fg/50",
          )}
        >
          {sent
            ? "Opening WhatsApp — talk soon."
            : "We reply fast, usually within the hour."}
        </p>
      </div>

      <div className="sm:col-span-2">
        <a
          href={mailtoLink("Planning a trip to Hurghada")}
          className={cn(
            "inline-flex items-center gap-2 text-sm font-semibold link-underline",
            dark ? "text-section-fg/70" : "text-fg/60",
          )}
        >
          <Mail className="size-4" aria-hidden="true" />
          Prefer email? Write to us instead
        </a>
      </div>
    </form>
  );
}
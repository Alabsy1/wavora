"use client";

import { useEffect, useState } from "react";
import { Save, Check, Globe, Layout } from "lucide-react";

const MODULES = [
  { key: "sea", label: "Sea", description: "Sea trips, snorkeling, and water activities" },
  { key: "adventure", label: "Adventure", description: "Desert safaris, ATV rides, and excursions" },
  { key: "stays", label: "Stays", description: "Hotels, resorts, chalets, and apartments" },
  { key: "spots", label: "Spots", description: "Hidden gems, viewpoints, and neighborhoods" },
  { key: "eats", label: "Eats", description: "Restaurants, cafes, and local food spots" },
  { key: "experiences", label: "Experiences", description: "Curated experiences and activities" },
];

const SECTIONS = [
  { key: "section_hero", label: "Hero Section", description: "Main hero banner at the top of the homepage" },
  { key: "section_mood_grid", label: "Mood Grid", description: "\"What kind of day do you want?\" recommendation selector" },
  { key: "section_featured_sea", label: "Featured Sea", description: "Sea experiences horizontal scroller section" },
  { key: "section_adventure", label: "Adventure Section", description: "Adventure experiences editorial grid" },
  { key: "section_stays", label: "Stays Section", description: "Featured places to stay cards" },
  { key: "section_spots_eats", label: "Spots & Eats", description: "Local guide section with spots and eats" },
  { key: "section_day_planner", label: "Day Planner", description: "Day story chapter carousel" },
];

export default function SettingsPage() {
  const [flags, setFlags] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (!cancelled) setFlags(data);
      } catch {
        if (!cancelled) {
          const defaults: Record<string, string> = {};
          [...MODULES, ...SECTIONS].forEach((m) => { defaults[m.key] = "true"; });
          setFlags(defaults);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flags),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setSaving(false);
    }
  }

  function toggle(key: string) {
    setFlags((prev) => ({ ...prev, [key]: prev[key] === "true" ? "false" : "true" }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-4 border-neutral-200 border-t-teal-500 dark:border-neutral-700 dark:border-t-teal-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Global Settings
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Control module visibility and homepage section display.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-teal-700 disabled:opacity-50"
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" />
              Saved
            </>
          ) : saving ? (
            <span className="inline-flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving...
            </span>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Navigation Modules */}
      <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-500/10">
              <Globe className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
                Navigation Modules
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Control which sections appear in the public navbar
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {MODULES.map((mod) => (
            <div
              key={mod.key}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
            >
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {mod.label}
                </h3>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  {mod.description}
                </p>
              </div>
              <button
                onClick={() => toggle(mod.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                  flags[mod.key] === "true"
                    ? "bg-teal-500"
                    : "bg-neutral-300 dark:bg-neutral-600"
                }`}
                role="switch"
                aria-checked={flags[mod.key] === "true"}
              >
                <span
                  className={`inline-block size-4 translate-x-1 rounded-full bg-white shadow-sm transition-transform ${
                    flags[mod.key] === "true" ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Homepage Sections */}
      <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-500/10">
              <Layout className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
                Homepage Sections
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Toggle individual sections on or off on the homepage
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {SECTIONS.map((section) => (
            <div
              key={section.key}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
            >
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {section.label}
                </h3>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  {section.description}
                </p>
              </div>
              <button
                onClick={() => toggle(section.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                  flags[section.key] === "true"
                    ? "bg-teal-500"
                    : "bg-neutral-300 dark:bg-neutral-600"
                }`}
                role="switch"
                aria-checked={flags[section.key] === "true"}
              >
                <span
                  className={`inline-block size-4 translate-x-1 rounded-full bg-white shadow-sm transition-transform ${
                    flags[section.key] === "true" ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

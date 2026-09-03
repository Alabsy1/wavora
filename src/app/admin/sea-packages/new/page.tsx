"use client";

import { useState } from "react";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewSeaPackagePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", description: "", duration: "", boatType: "", maxGuests: 15,
    priceFrom: 0, inclusions: [] as string[], exclusions: [] as string[],
    coverImage: "", featured: false, visible: true, order: 0,
  });
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title") next.slug = generateSlug(value as string);
      return next;
    });
  }

  function addInclusion() { if (newInclusion.trim()) { updateField("inclusions", [...form.inclusions, newInclusion.trim()]); setNewInclusion(""); } }
  function removeInclusion(i: string) { updateField("inclusions", form.inclusions.filter((x) => x !== i)); }
  function addExclusion() { if (newExclusion.trim()) { updateField("exclusions", [...form.exclusions, newExclusion.trim()]); setNewExclusion(""); } }
  function removeExclusion(i: string) { updateField("exclusions", form.exclusions.filter((x) => x !== i)); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSaving(true);
    try {
      const res = await fetch("/api/admin/sea-packages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok) { setError(result.error ?? "Failed to save"); return; }
      router.push("/admin/sea-packages"); router.refresh();
    } catch { setError("Something went wrong"); }
    finally { setSaving(false); }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/sea-packages" className="inline-flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"><ArrowLeft className="h-4 w-4" /></Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">New Sea Package</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Fill in the details below</p>
        </div>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">Basic Information</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Title *</label>
              <input type="text" required value={form.title} onChange={(e) => updateField("title", e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Boat Type</label>
              <input type="text" value={form.boatType} onChange={(e) => updateField("boatType", e.target.value)} placeholder="Speedboat" className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Duration</label>
              <input type="text" value={form.duration} onChange={(e) => updateField("duration", e.target.value)} placeholder="3 hours" className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Max Guests</label>
              <input type="number" min={1} value={form.maxGuests} onChange={(e) => updateField("maxGuests", parseInt(e.target.value) || 15)} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Price From (USD)</label>
              <input type="number" min={0} step={0.01} value={form.priceFrom} onChange={(e) => updateField("priceFrom", parseFloat(e.target.value) || 0)} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)} className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Cover Image URL</label>
              <input type="url" value={form.coverImage} onChange={(e) => updateField("coverImage", e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">Inclusions & Exclusions</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Inclusions</label>
              <div className="flex gap-2">
                <input type="text" value={newInclusion} onChange={(e) => setNewInclusion(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addInclusion(); } }} placeholder="Add item" className="flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
                <button type="button" onClick={addInclusion} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"><Plus className="h-4 w-4" /></button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {form.inclusions.map((inc) => (
                  <span key={inc} className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">{inc}<button type="button" onClick={() => removeInclusion(inc)}><X className="h-3 w-3" /></button></span>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Exclusions</label>
              <div className="flex gap-2">
                <input type="text" value={newExclusion} onChange={(e) => setNewExclusion(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addExclusion(); } }} placeholder="Add item" className="flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
                <button type="button" onClick={addExclusion} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"><Plus className="h-4 w-4" /></button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {form.exclusions.map((exc) => (
                  <span key={exc} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">{exc}<button type="button" onClick={() => removeExclusion(exc)}><X className="h-3 w-3" /></button></span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">Options</h2>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3">
              <button type="button" onClick={() => updateField("featured", !form.featured)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${form.featured ? "bg-teal-500" : "bg-neutral-300 dark:bg-neutral-600"}`} role="switch" aria-checked={form.featured}>
                <span className={`inline-block size-4 translate-x-1 rounded-full bg-white shadow-sm transition-transform ${form.featured ? "translate-x-5" : "translate-x-1"}`} />
              </button>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Featured</span>
            </label>
            <label className="flex items-center gap-3">
              <button type="button" onClick={() => updateField("visible", !form.visible)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${form.visible ? "bg-teal-500" : "bg-neutral-300 dark:bg-neutral-600"}`} role="switch" aria-checked={form.visible}>
                <span className={`inline-block size-4 translate-x-1 rounded-full bg-white shadow-sm transition-transform ${form.visible ? "translate-x-5" : "translate-x-1"}`} />
              </button>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Visible</span>
            </label>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Order</label>
              <input type="number" min={0} value={form.order} onChange={(e) => updateField("order", parseInt(e.target.value) || 0)} className="w-20 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/sea-packages" className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300">Cancel</Link>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 hover:from-teal-600 hover:to-teal-700 disabled:opacity-50">
            {saving ? <span className="inline-flex items-center gap-2"><span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Saving...</span> : <><Save className="h-4 w-4" /> Create Package</>}
          </button>
        </div>
      </form>
    </div>
  );
}

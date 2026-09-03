"use client";

import { useState } from "react";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewSpotPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", description: "", location: "", category: "spot",
    coverImage: "", tags: [] as string[], featured: false, visible: true, order: 0,
  });
  const [newTag, setNewTag] = useState("");

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => { const next = { ...prev, [key]: value }; if (key === "title") next.slug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); return next; });
  }

  function addTag() { if (newTag.trim()) { updateField("tags", [...form.tags, newTag.trim()]); setNewTag(""); } }
  function removeTag(i: string) { updateField("tags", form.tags.filter((x) => x !== i)); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(""); setSaving(true);
    try {
      const res = await fetch("/api/admin/spots", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) { setError("Failed to save"); return; }
      router.push("/admin/spots-eats"); router.refresh();
    } catch { setError("Something went wrong"); }
    finally { setSaving(false); }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/spots-eats" className="inline-flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"><ArrowLeft className="h-4 w-4" /></Link>
        <div><h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">New Spot / Eat</h1></div>
      </div>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">Basic Information</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2"><label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Title *</label><input type="text" required value={form.title} onChange={(e) => updateField("title", e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" /></div>
            <div><label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Category</label><select value={form.category} onChange={(e) => updateField("category", e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"><option value="spot">Spot</option><option value="eat">Eat</option></select></div>
            <div><label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Location</label><input type="text" value={form.location} onChange={(e) => updateField("location", e.target.value)} placeholder="El Gouna" className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" /></div>
            <div className="sm:col-span-2"><label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Description</label><textarea rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)} className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" /></div>
            <div className="sm:col-span-2"><label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Cover Image URL</label><input type="url" value={form.coverImage} onChange={(e) => updateField("coverImage", e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" /></div>
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">Tags</h2>
          <div className="flex gap-2"><input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Add tag" className="flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" /><button type="button" onClick={addTag} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"><Plus className="h-4 w-4" /></button></div>
          <div className="mt-2 flex flex-wrap gap-1.5">{form.tags.map((t) => (<span key={t} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">{t}<button type="button" onClick={() => removeTag(t)}><X className="h-3 w-3" /></button></span>))}</div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3"><button type="button" onClick={() => updateField("featured", !form.featured)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${form.featured ? "bg-teal-500" : "bg-neutral-300 dark:bg-neutral-600"}`} role="switch" aria-checked={form.featured}><span className={`inline-block size-4 translate-x-1 rounded-full bg-white shadow-sm transition-transform ${form.featured ? "translate-x-5" : "translate-x-1"}`} /></button><span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Featured</span></label>
            <label className="flex items-center gap-3"><button type="button" onClick={() => updateField("visible", !form.visible)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${form.visible ? "bg-teal-500" : "bg-neutral-300 dark:bg-neutral-600"}`} role="switch" aria-checked={form.visible}><span className={`inline-block size-4 translate-x-1 rounded-full bg-white shadow-sm transition-transform ${form.visible ? "translate-x-5" : "translate-x-1"}`} /></button><span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Visible</span></label>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/spots-eats" className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300">Cancel</Link>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 hover:from-teal-600 hover:to-teal-700 disabled:opacity-50">{saving ? "Saving..." : <><Save className="h-4 w-4" /> Create Spot</>}</button>
        </div>
      </form>
    </div>
  );
}

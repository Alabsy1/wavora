"use client";

import { useState } from "react";
import { ArrowLeft, Save, Plus, X, Image as ImageIcon, Film, ListPlus, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface ContentFormData {
  id?: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  category: string;
  tripType: string;
  coverImage: string;
  heroVideo: string;
  gallery: string[];
  duration: string;
  schedule: string;
  priceFrom: number;
  priceNote: string;
  tags: string[];
  inclusions: string[];
  itinerary: ItineraryStep[];
  featured: boolean;
  visible: boolean;
  order: number;
}

export interface ItineraryStep {
  stepNumber: number;
  title: string;
  description: string;
}

interface ContentFormProps {
  type: "trip" | "experience";
  data?: ContentFormData;
  isNew?: boolean;
}

const TRIP_CATEGORIES = ["sea", "adventure", "experiences"];
const EXPERIENCE_CATEGORIES = ["sea", "adventure", "experiences"];
const TRIP_TYPES = [
  { value: "SPEEDBOAT", label: "Speedboat" },
  { value: "DAILY_CRUISE", label: "Daily Cruise" },
  { value: "PRIVATE_CHARTER", label: "Private Charter" },
  { value: "DIVING", label: "Diving" },
  { value: "SNORKELING", label: "Snorkeling" },
  { value: "DESERT_SAFARI", label: "Desert Safari" },
  { value: "ATV_RIDE", label: "ATV Ride" },
  { value: "SUBMARINE", label: "Submarine" },
  { value: "OTHER", label: "Other" },
];

export function ContentForm({ type, data, isNew = true }: ContentFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ContentFormData>(
    data ?? {
      title: "",
      slug: "",
      description: "",
      location: "",
      category: type === "trip" ? "sea" : "experiences",
      tripType: "DAILY_CRUISE",
      coverImage: "",
      heroVideo: "",
      gallery: [],
      duration: "",
      schedule: "",
      priceFrom: 0,
      priceNote: "",
      tags: [],
      inclusions: [],
      itinerary: [],
      featured: false,
      visible: true,
      order: 0,
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [newInclusion, setNewInclusion] = useState("");
  const [newStepTitle, setNewStepTitle] = useState("");
  const [newStepDesc, setNewStepDesc] = useState("");

  const categories = type === "trip" ? TRIP_CATEGORIES : EXPERIENCE_CATEGORIES;

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function updateField<K extends keyof ContentFormData>(key: K, value: ContentFormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && isNew) next.slug = generateSlug(value as string);
      return next;
    });
  }

  function addTag() {
    const tag = newTag.trim();
    if (tag && !form.tags.includes(tag)) {
      updateField("tags", [...form.tags, tag]);
      setNewTag("");
    }
  }

  function removeTag(tag: string) {
    updateField("tags", form.tags.filter((t) => t !== tag));
  }

  function addGalleryUrl() {
    const url = newGalleryUrl.trim();
    if (url && !form.gallery.includes(url)) {
      updateField("gallery", [...form.gallery, url]);
      setNewGalleryUrl("");
    }
  }

  function removeGalleryUrl(url: string) {
    updateField("gallery", form.gallery.filter((u) => u !== url));
  }

  function addInclusion() {
    const inc = newInclusion.trim();
    if (inc && !form.inclusions.includes(inc)) {
      updateField("inclusions", [...form.inclusions, inc]);
      setNewInclusion("");
    }
  }

  function removeInclusion(inc: string) {
    updateField("inclusions", form.inclusions.filter((i) => i !== inc));
  }

  function addItineraryStep() {
    const title = newStepTitle.trim();
    const description = newStepDesc.trim();
    if (title) {
      const newStep: ItineraryStep = {
        stepNumber: form.itinerary.length + 1,
        title,
        description,
      };
      updateField("itinerary", [...form.itinerary, newStep]);
      setNewStepTitle("");
      setNewStepDesc("");
    }
  }

  function removeItineraryStep(index: number) {
    const updated = form.itinerary
      .filter((_, i) => i !== index)
      .map((step, i) => ({ ...step, stepNumber: i + 1 }));
    updateField("itinerary", updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const apiUrl = isNew
        ? `/api/admin/${type === "trip" ? "trips" : "experiences"}`
        : `/api/admin/${type === "trip" ? "trips" : "experiences"}/${form.id}`;

      const res = await fetch(apiUrl, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error ?? "Failed to save");
        return;
      }

      router.push(type === "trip" ? "/admin/trips" : "/admin/experiences");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href={type === "trip" ? "/admin/trips" : "/admin/experiences"}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-700 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {isNew ? `New ${type === "trip" ? "Trip" : "Experience"}` : `Edit ${type === "trip" ? "Trip" : "Experience"}`}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Fill in the details below</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">Basic Information</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Title *</label>
              <input type="text" required value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="e.g. Sunset Dolphin Cruise" className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Slug *</label>
              <input type="text" required value={form.slug} onChange={(e) => updateField("slug", e.target.value)} placeholder="sunset-dolphin-cruise" className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-mono text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Category</label>
              <select value={form.category} onChange={(e) => updateField("category", e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
                {categories.map((cat) => (<option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>))}
              </select>
            </div>
            {type === "trip" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Trip Type</label>
                <select value={form.tripType} onChange={(e) => updateField("tripType", e.target.value)} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
                  {TRIP_TYPES.map((t) => (<option key={t.value} value={t.value}>{t.label}</option>))}
                </select>
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Location</label>
              <input type="text" value={form.location} onChange={(e) => updateField("location", e.target.value)} placeholder="e.g. Hurghada Marina" className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Duration</label>
              <input type="text" value={form.duration} onChange={(e) => updateField("duration", e.target.value)} placeholder="e.g. 4 Hours" className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
            </div>
            {type === "trip" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Schedule</label>
                <input type="text" value={form.schedule} onChange={(e) => updateField("schedule", e.target.value)} placeholder="e.g. Daily at 9:00 AM" className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Price From (USD)</label>
              <input type="number" min={0} step={0.01} value={form.priceFrom} onChange={(e) => updateField("priceFrom", parseFloat(e.target.value) || 0)} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Price Note</label>
              <input type="text" value={form.priceNote} onChange={(e) => updateField("priceNote", e.target.value)} placeholder="e.g. Per person, minimum 2 people" className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Description</label>
              <textarea rows={4} value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Describe this item..." className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
            </div>
          </div>
        </div>

        {/* Inclusions (Trip only) */}
        {type === "trip" && (
          <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-neutral-900 dark:text-white">
              <ListPlus className="h-5 w-5" />
              Inclusions
            </h2>
            <div className="flex gap-2">
              <input type="text" value={newInclusion} onChange={(e) => setNewInclusion(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addInclusion(); } }} placeholder="e.g. Snorkeling Gear, Fresh Fruit & Drinks" className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
              <button type="button" onClick={addInclusion} className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
            {form.inclusions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.inclusions.map((inc) => (
                  <span key={inc} className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                    {inc}
                    <button type="button" onClick={() => removeInclusion(inc)} className="text-neutral-400 hover:text-red-500"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Itinerary (Trip only) */}
        {type === "trip" && (
          <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-neutral-900 dark:text-white">
              <MapPin className="h-5 w-5" />
              Day Itinerary
            </h2>
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input type="text" value={newStepTitle} onChange={(e) => setNewStepTitle(e.target.value)} placeholder="Step title (e.g. Boarding at Marina)" className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
                <input type="text" value={newStepDesc} onChange={(e) => setNewStepDesc(e.target.value)} placeholder="Brief description (optional)" className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
              </div>
              <button type="button" onClick={addItineraryStep} className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
                <Plus className="h-4 w-4" /> Add Step
              </button>
            </div>
            {form.itinerary.length > 0 && (
              <div className="mt-4 space-y-2">
                {form.itinerary.map((step, i) => (
                  <div key={i} className="group flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-500 text-[0.65rem] font-bold text-white dark:bg-teal-600">{step.stepNumber}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">{step.title}</p>
                      {step.description && <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{step.description}</p>}
                    </div>
                    <button type="button" onClick={() => removeItineraryStep(i)} className="text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"><X className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Media */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">Media</h2>
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <ImageIcon className="h-4 w-4" /> Cover Image URL
              </label>
              <input type="url" value={form.coverImage} onChange={(e) => updateField("coverImage", e.target.value)} placeholder="https://example.com/image.jpg" className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
              {form.coverImage && (
                <div className="mt-3 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.coverImage} alt="Cover preview" className="h-40 w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <Film className="h-4 w-4" /> Hero Video URL
              </label>
              <input type="url" value={form.heroVideo} onChange={(e) => updateField("heroVideo", e.target.value)} placeholder="https://example.com/video.mp4" className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Gallery Images</label>
              <div className="flex gap-2">
                <input type="url" value={newGalleryUrl} onChange={(e) => setNewGalleryUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addGalleryUrl(); } }} placeholder="Add image URL and press Enter" className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
                <button type="button" onClick={addGalleryUrl} className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>
              {form.gallery.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {form.gallery.map((url, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Gallery ${i + 1}`} className="aspect-square w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23999' font-size='12'%3EError%3C/text%3E%3C/svg%3E"; }} />
                      <button type="button" onClick={() => removeGalleryUrl(url)} className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"><X className="h-3.5 w-3.5" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">Tags</h2>
          <div className="flex gap-2">
            <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Add tag and press Enter" className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
            <button type="button" onClick={addTag} className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          {form.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {form.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-neutral-400 hover:text-red-500"><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">Options</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Display Order</label>
              <input type="number" min={0} value={form.order} onChange={(e) => updateField("order", parseInt(e.target.value) || 0)} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
            </div>
            <div className="flex items-end gap-6">
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
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link href={type === "trip" ? "/admin/trips" : "/admin/experiences"} className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">Cancel</Link>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-teal-700 disabled:opacity-50">
            {saving ? (
              <span className="inline-flex items-center gap-2"><span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Saving...</span>
            ) : (<><Save className="h-4 w-4" /> {isNew ? "Create" : "Update"}</>)}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Save, Check, Plus, X } from "lucide-react";

interface PageContentItem {
  id?: string;
  page: string;
  section: string;
  key: string;
  value: string;
  type: string;
}

const PAGES = [
  { key: "sea", label: "Sea Page" },
  { key: "adventure", label: "Adventure Page" },
  { key: "stays", label: "Stays Page" },
  { key: "spots", label: "Spots Page" },
  { key: "eats", label: "Eats Page" },
  { key: "home", label: "Homepage" },
];

const SECTIONS: Record<string, { key: string; label: string; fields: { key: string; label: string; type: string }[] }[]> = {
  sea: [
    { key: "hero", label: "Hero", fields: [
      { key: "title_line_1", label: "Title Line 1", type: "text" },
      { key: "title_line_2", label: "Title Line 2", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "background_image", label: "Background Image URL", type: "image" },
      { key: "eyebrow", label: "Eyebrow Text", type: "text" },
    ]},
    { key: "intro", label: "Intro Section", fields: [
      { key: "title_line_1", label: "Title Line 1", type: "text" },
      { key: "title_line_2", label: "Title Line 2", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ]},
  ],
  adventure: [
    { key: "hero", label: "Hero", fields: [
      { key: "title_line_1", label: "Title Line 1", type: "text" },
      { key: "title_line_2", label: "Title Line 2", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "background_image", label: "Background Image URL", type: "image" },
    ]},
  ],
  stays: [
    { key: "hero", label: "Hero", fields: [
      { key: "title_line_1", label: "Title Line 1", type: "text" },
      { key: "title_line_2", label: "Title Line 2", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "background_image", label: "Background Image URL", type: "image" },
    ]},
  ],
  spots: [
    { key: "hero", label: "Hero", fields: [
      { key: "title_line_1", label: "Title Line 1", type: "text" },
      { key: "title_line_2", label: "Title Line 2", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
    ]},
  ],
  eats: [
    { key: "hero", label: "Hero", fields: [
      { key: "title_line_1", label: "Title Line 1", type: "text" },
      { key: "title_line_2", label: "Title Line 2", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
    ]},
  ],
  home: [
    { key: "hero", label: "Hero", fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
    ]},
  ],
};

export default function PageContentPage() {
  const [activePage, setActivePage] = useState("sea");
  const [content, setContent] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newField, setNewField] = useState({ section: "", key: "", value: "" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/page-content?page=${activePage}`);
        const data = await res.json();
        if (cancelled) return;
        const map: Record<string, string> = {};
        for (const item of data) {
          map[`${item.section}.${item.key}`] = item.value;
        }
        setContent(map);
      } catch {
        console.error("Failed to load content");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [activePage]);

  function updateValue(section: string, key: string, value: string) {
    setContent((prev) => ({ ...prev, [`${section}.${key}`]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const items = Object.entries(content).map(([dotKey, value]) => {
        const [section, key] = dotKey.split(".");
        return { page: activePage, section, key, value, type: "text" };
      });
      await fetch("/api/admin/page-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      console.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  function addCustomField() {
    if (newField.section && newField.key) {
      updateValue(newField.section, newField.key, newField.value);
      setNewField({ section: "", key: "", value: "" });
    }
  }

  const sections = SECTIONS[activePage] ?? [];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Page Content</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Edit page texts, titles, and images without touching code.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-teal-700 disabled:opacity-50"
        >
          {saved ? <><Check className="h-4 w-4" /> Saved</> : saving ? <span className="inline-flex items-center gap-2"><span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Saving...</span> : <><Save className="h-4 w-4" /> Save Changes</>}
        </button>
      </div>

      {/* Page tabs */}
      <div className="flex flex-wrap gap-2">
        {PAGES.map((p) => (
          <button
            key={p.key}
            onClick={() => setActivePage(p.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activePage === p.key ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400" : "text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="size-8 animate-spin rounded-full border-4 border-neutral-200 border-t-teal-500 dark:border-neutral-700 dark:border-t-teal-400" />
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.key} className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">{section.label}</h2>
              <div className="space-y-4">
                {section.fields.map((field) => {
                  const dotKey = `${section.key}.${field.key}`;
                  const val = content[dotKey] ?? "";
                  return (
                    <div key={field.key}>
                      <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          rows={3}
                          value={val}
                          onChange={(e) => updateValue(section.key, field.key, e.target.value)}
                          className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                        />
                      ) : field.type === "image" ? (
                        <div className="space-y-2">
                          <input
                            type="url"
                            value={val}
                            onChange={(e) => updateValue(section.key, field.key, e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                          />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {val && (
                            <img src={val} alt="Preview" className="h-24 w-40 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          )}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => updateValue(section.key, field.key, e.target.value)}
                          className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Custom fields */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">Custom Fields</h2>
            <div className="flex flex-wrap gap-3">
              <input type="text" value={newField.section} onChange={(e) => setNewField((p) => ({ ...p, section: e.target.value }))} placeholder="Section name" className="w-32 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
              <input type="text" value={newField.key} onChange={(e) => setNewField((p) => ({ ...p, key: e.target.value }))} placeholder="Field key" className="w-40 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
              <input type="text" value={newField.value} onChange={(e) => setNewField((p) => ({ ...p, value: e.target.value }))} placeholder="Value" className="flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
              <button type="button" onClick={addCustomField} className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff, Star } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  coverImage: string;
  priceFrom: number;
  featured: boolean;
  visible: boolean;
  order: number;
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/experiences");
        const data = await res.json();
        if (!cancelled) setExperiences(Array.isArray(data) ? data : []);
      } catch {
        console.error("Failed to load experiences");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/experiences/${id}`, { method: "DELETE" });
      setExperiences((prev) => prev.filter((e) => e.id !== id));
    } catch {
      console.error("Failed to delete experience");
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-4 border-neutral-200 border-t-teal-500 dark:border-neutral-700 dark:border-t-teal-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Experiences</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Manage your curated experiences
          </p>
        </div>
        <Link
          href="/admin/experiences/new"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-teal-700"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </Link>
      </div>

      {experiences.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 bg-white py-16 text-center dark:border-neutral-700 dark:bg-neutral-900">
          <p className="text-neutral-500 dark:text-neutral-400">No experiences yet.</p>
          <Link
            href="/admin/experiences/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-100 dark:bg-teal-500/10 dark:text-teal-400"
          >
            <Plus className="h-4 w-4" />
            Create your first experience
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Price</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {experiences.map((exp) => (
                  <tr key={exp.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-sm text-neutral-400">
                        <GripVertical className="h-3.5 w-3.5" />
                        {exp.order}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {exp.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={exp.coverImage} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
                        ) : (
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                            <span className="text-xs font-bold text-neutral-400">{exp.title.charAt(0)}</span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">{exp.title}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">/{exp.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                        {exp.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">{exp.location || "—"}</td>
                    <td className="px-4 py-3 text-sm font-medium text-neutral-900 dark:text-white">
                      {exp.priceFrom > 0 ? `$${exp.priceFrom}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {exp.featured && <Star className="h-3.5 w-3.5 text-amber-500" />}
                        {exp.visible ? (
                          <Eye className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5 text-neutral-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/experiences/${exp.id}`}
                          className="inline-flex size-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(exp.id)}
                          disabled={deleting === exp.id}
                          className="inline-flex size-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-neutral-400 dark:hover:bg-red-950/50 dark:hover:text-red-400 disabled:opacity-50"
                        >
                          {deleting === exp.id ? (
                            <span className="size-4 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

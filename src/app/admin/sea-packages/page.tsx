"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";

interface SeaPackage {
  id: string; title: string; slug: string; boatType: string; duration: string;
  priceFrom: number; maxGuests: number; featured: boolean; visible: boolean; order: number;
}

export default function SeaPackagesPage() {
  const [items, setItems] = useState<SeaPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/sea-packages");
        const data = await res.json();
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch { console.error("Failed to load"); }
      finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this package?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/sea-packages/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((t) => t.id !== id));
    } catch { console.error("Failed to delete"); }
    finally { setDeleting(null); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Sea Packages</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Manage speedboat packages, itineraries, and add-ons.</p>
        </div>
        <Link href="/admin/sea-packages/new" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-teal-700">
          <Plus className="h-4 w-4" /> Add Package
        </Link>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        {loading ? (
          <div className="flex items-center justify-center py-20"><div className="size-8 animate-spin rounded-full border-4 border-neutral-200 border-t-teal-500 dark:border-neutral-700 dark:border-t-teal-400" /></div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center"><p className="text-sm text-neutral-500 dark:text-neutral-400">No packages yet. Create your first one.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">#</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Title</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Type</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Duration</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Guests</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Price</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Status</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {items.map((item, i) => (
                  <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="px-4 py-3 text-neutral-500">{item.order || i + 1}</td>
                    <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white">{item.title}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{item.boatType}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{item.duration}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{item.maxGuests}</td>
                    <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white">${item.priceFrom}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {item.featured && <Star className="size-3.5 fill-amber-400 text-amber-400" />}
                        {item.visible ? <Eye className="size-3.5 text-green-500" /> : <EyeOff className="size-3.5 text-neutral-400" />}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/admin/sea-packages/${item.id}`} className="inline-flex size-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"><Pencil className="h-4 w-4" /></Link>
                        <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id} className="inline-flex size-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

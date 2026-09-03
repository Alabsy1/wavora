"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface AddOn {
  id: string; name: string; slug: string; description: string;
  price: number; category: string; visible: boolean; order: number;
}

export default function AddOnsPage() {
  const [items, setItems] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AddOn | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "", price: 0, category: "sea", visible: true, order: 0 });
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try { const res = await fetch("/api/admin/addons"); const data = await res.json(); setItems(Array.isArray(data) ? data : []); }
    catch { console.error("Failed"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openNew() { setEditing(null); setForm({ name: "", slug: "", description: "", price: 0, category: "sea", visible: true, order: 0 }); setShowForm(true); }
  function openEdit(item: AddOn) { setEditing(item); setForm({ name: item.name, slug: item.slug, description: item.description, price: item.price, category: item.category, visible: item.visible, order: item.order }); setShowForm(true); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    try {
      const url = editing ? `/api/admin/addons/${editing.id}` : "/api/admin/addons";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setShowForm(false); load(); }
    } catch { console.error("Failed"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    try { await fetch(`/api/admin/addons/${id}`, { method: "DELETE" }); load(); }
    catch { console.error("Failed"); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Add-ons</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Manage global add-ons with editable pricing.</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 hover:from-teal-600 hover:to-teal-700">
          <Plus className="h-4 w-4" /> Add Add-on
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-5 text-base font-semibold text-neutral-900 dark:text-white">{editing ? "Edit" : "New"} Add-on</h2>
          <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Name *</label><input type="text" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value, slug: p.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") }))} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" /></div>
            <div><label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Price (USD) *</label><input type="number" min={0} step={0.01} required value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: parseFloat(e.target.value) || 0 }))} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Description</label><input type="text" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" /></div>
            <div><label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Category</label><select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"><option value="sea">Sea</option><option value="adventure">Adventure</option><option value="general">General</option></select></div>
            <div><label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Order</label><input type="number" min={0} value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))} className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" /></div>
            <div className="sm:col-span-2 flex items-center gap-4">
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-600 disabled:opacity-50">{saving ? "Saving..." : editing ? "Update" : "Create"}</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        {loading ? (
          <div className="flex items-center justify-center py-20"><div className="size-8 animate-spin rounded-full border-4 border-neutral-200 border-t-teal-500 dark:border-neutral-700 dark:border-t-teal-400" /></div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center"><p className="text-sm text-neutral-500">No add-ons yet.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">#</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Name</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Category</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Price</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Status</th>
                <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {items.map((item, i) => (
                  <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="px-4 py-3 text-neutral-500">{item.order || i + 1}</td>
                    <td className="px-4 py-3"><p className="font-medium text-neutral-900 dark:text-white">{item.name}</p>{item.description && <p className="text-xs text-neutral-500">{item.description}</p>}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700 dark:bg-teal-900/20 dark:text-teal-400">{item.category}</span></td>
                    <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white">${item.price}</td>
                    <td className="px-4 py-3">{item.visible ? <Eye className="size-3.5 text-green-500" /> : <EyeOff className="size-3.5 text-neutral-400" />}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1.5"><button onClick={() => openEdit(item)} className="inline-flex size-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"><Pencil className="h-4 w-4" /></button><button onClick={() => handleDelete(item.id)} className="inline-flex size-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"><Trash2 className="h-4 w-4" /></button></div></td>
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

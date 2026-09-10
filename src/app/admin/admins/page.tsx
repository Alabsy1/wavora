"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Trash2, X } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadAdmins() {
    try {
      const res = await fetch("/api/admin/admins");
      const data = await res.json();
      setAdmins(Array.isArray(data) ? data : []);
    } catch {
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAdmins(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create admin");
        return;
      }
      setAdmins((prev) => [...prev, data]);
      setForm({ email: "", name: "", password: "" });
      setShowModal(false);
    } catch {
      setError("Failed to create admin");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this admin account?")) return;
    try {
      const res = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete");
        return;
      }
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch {
      alert("Failed to delete admin");
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
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Admin Users
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Manage admin accounts that can access the dashboard.
          </p>
        </div>
        <button
          onClick={() => { setShowModal(true); setError(""); }}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-teal-700"
        >
          <Plus className="h-4 w-4" />
          Add Admin
        </button>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-500/10">
              <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
                All Admins ({admins.length})
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Accounts with full dashboard access
              </p>
            </div>
          </div>
        </div>

        {admins.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
            No admin accounts found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="px-6 py-3 font-medium text-neutral-500 dark:text-neutral-400">Name</th>
                  <th className="px-6 py-3 font-medium text-neutral-500 dark:text-neutral-400">Email</th>
                  <th className="px-6 py-3 font-medium text-neutral-500 dark:text-neutral-400">Created</th>
                  <th className="px-6 py-3 text-right font-medium text-neutral-500 dark:text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {admins.map((admin) => (
                  <tr key={admin.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-neutral-900 dark:text-white">{admin.name}</span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{admin.email}</td>
                    <td className="px-6 py-4 text-neutral-500 dark:text-neutral-400">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="inline-flex size-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                        title="Delete admin"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-700 dark:bg-neutral-900">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Add New Admin</h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Create a new admin account with dashboard access.
            </p>
            <form onSubmit={handleCreate} className="mt-6 space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                  placeholder="Min. 6 characters"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-teal-700 disabled:opacity-50"
                >
                  {saving ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating...
                    </span>
                  ) : (
                    "Create Admin"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

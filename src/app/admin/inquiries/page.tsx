"use client";

import { useEffect, useState } from "react";
import { MessageSquare, ExternalLink, Trash2, RefreshCw } from "lucide-react";

interface Inquiry {
  id: string;
  fullName: string;
  whatsapp: string;
  date: string;
  adults: number;
  kids: number;
  notes: string;
  tripType: string;
  tripId: string;
  tripTitle: string;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setInquiries((prev) => prev.map((inq) => inq.id === id ? { ...inq, status } : inq));
    } catch {
      console.error("Failed to update status");
    } finally {
      setUpdating(null);
    }
  }

  async function deleteInquiry(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    } catch {
      console.error("Failed to delete");
    }
  }

  function openWhatsApp(inquiry: Inquiry) {
    const number = inquiry.whatsapp.replace(/[^0-9]/g, "");
    const tripInfo = inquiry.tripTitle ? `\n*Trip:* ${inquiry.tripTitle}` : inquiry.tripType ? `\n*Type:* ${inquiry.tripType}` : "";
    const message = `Hi ${inquiry.fullName}! Thank you for your inquiry.\n\n*Trip:* ${inquiry.tripTitle || inquiry.tripType || "TBD"}\n*Date:* ${inquiry.date}\n*Guests:* ${inquiry.adults} adults${inquiry.kids ? `, ${inquiry.kids} kids` : ""}${inquiry.notes ? `\n*Notes:* ${inquiry.notes}` : ""}\n\nWe'd love to help you plan your perfect day!\n\n(Inquiry: ${inquiry.id})`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
  }

  const counts = {
    total: inquiries.length,
    pending: inquiries.filter((i) => i.status === "pending").length,
    confirmed: inquiries.filter((i) => i.status === "confirmed").length,
    completed: inquiries.filter((i) => i.status === "completed").length,
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Inquiries & Bookings</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Manage all customer requests and track booking status.</p>
        </div>
        <button onClick={load} className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: counts.total, color: "from-neutral-500 to-neutral-600" },
          { label: "Pending", value: counts.pending, color: "from-yellow-500 to-yellow-600" },
          { label: "Confirmed", value: counts.confirmed, color: "from-blue-500 to-blue-600" },
          { label: "Completed", value: counts.completed, color: "from-green-500 to-green-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{stat.label}</span>
              <div className={`flex size-8 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color}`}>
                <MessageSquare className="size-4 text-white" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="size-8 animate-spin rounded-full border-4 border-neutral-200 border-t-teal-500 dark:border-neutral-700 dark:border-t-teal-400" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="py-20 text-center">
            <MessageSquare className="mx-auto size-10 text-neutral-300 dark:text-neutral-600" />
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">No inquiries yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Customer</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">WhatsApp</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Date</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Package</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Guests</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Status</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Created</th>
                  <th className="px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-neutral-900 dark:text-white">{inq.fullName}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{inq.whatsapp}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{inq.date}</td>
                    <td className="px-4 py-3">
                      <span className="text-neutral-700 dark:text-neutral-300">{inq.tripTitle || inq.tripType || "—"}</span>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{inq.adults}A{inq.kids ? `/${inq.kids}K` : ""}</td>
                    <td className="px-4 py-3">
                      <select
                        value={inq.status}
                        onChange={(e) => updateStatus(inq.id, e.target.value)}
                        disabled={updating === inq.id}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[inq.status] ?? STATUS_COLORS.pending} border-0 bg-transparent focus:ring-0 disabled:opacity-50`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-500 dark:text-neutral-400">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openWhatsApp(inq)}
                          className="inline-flex size-8 items-center justify-center rounded-lg text-green-600 transition-colors hover:bg-green-50 dark:hover:bg-green-950/30"
                          title="Open WhatsApp"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="inline-flex size-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
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

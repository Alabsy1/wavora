"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Anchor, Mountain, Building2, UtensilsCrossed,
  MessageSquare, Map, Compass, ExternalLink,
  RefreshCw, Clock, Users, Activity, Zap, Puzzle, Pencil,
} from "lucide-react";
import { useEditMode } from "@/components/admin/admin-edit-provider";

interface Stats {
  seaPackages: number;
  adventures: number;
  stays: number;
  spots: number;
  trips: number;
  experiences: number;
  addons: number;
  inquiries: number;
  pendingInquiries: number;
  admins: number;
}

interface InquiryRow {
  id: string;
  fullName: string;
  whatsapp: string;
  tripTitle: string;
  tripType: string;
  status: string;
  date: string;
  adults: number;
  kids: number;
  createdAt: string;
}

interface ActivityItem {
  id: string;
  action: string;
  model: string;
  itemId: string;
  itemName: string;
  adminEmail: string;
  details: string;
  createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  contacted: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  completed: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
  cancelled: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

const ACTION_ICONS: Record<string, typeof Activity> = {
  edit: RefreshCw,
  revalidate: Zap,
  create: Activity,
  delete: Activity,
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AdminDashboardPage() {
  const { editMode, toggleEditMode } = useEditMode();
  const [stats, setStats] = useState<Stats>({
    seaPackages: 0, adventures: 0, stays: 0, spots: 0,
    trips: 0, experiences: 0, addons: 0, inquiries: 0,
    pendingInquiries: 0, admins: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<InquiryRow[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [revalidating, setRevalidating] = useState(false);
  const [revalidated, setRevalidated] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);

  const loadAll = useCallback(async () => {
    try {
      const [statsRes, inqRes, actRes] = await Promise.all([
        fetch("/api/admin/stats").then((r) => r.json()).catch(() => null),
        fetch("/api/inquiries").then((r) => r.json()).catch(() => []),
        fetch("/api/admin/activity").then((r) => r.json()).catch(() => []),
      ]);

      if (statsRes && !statsRes.error) setStats(statsRes);
      setRecentInquiries(Array.isArray(inqRes) ? inqRes : []);
      setActivity(Array.isArray(actRes) ? actRes : []);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  async function handleRevalidate() {
    setRevalidating(true);
    setRevalidated(false);
    try {
      await fetch("/api/admin/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paths: ["/", "/adventures", "/stays", "/spots", "/eats", "/experiences"] }),
      });
      setRevalidated(true);
      setTimeout(() => setRevalidated(false), 3000);
      loadAll();
    } finally {
      setRevalidating(false);
    }
  }

  const cards = [
    { label: "Sea Packages", value: stats.seaPackages, icon: Anchor, color: "from-teal-500 to-teal-600", href: "/admin/sea-packages" },
    { label: "Adventures", value: stats.adventures, icon: Mountain, color: "from-orange-500 to-orange-600", href: "/admin/adventures" },
    { label: "Stays", value: stats.stays, icon: Building2, color: "from-violet-500 to-violet-600", href: "/admin/stays" },
    { label: "Spots & Eats", value: stats.spots, icon: UtensilsCrossed, color: "from-rose-500 to-rose-600", href: "/admin/spots-eats" },
    { label: "Trips", value: stats.trips, icon: Map, color: "from-emerald-500 to-emerald-600", href: "/admin/trips" },
    { label: "Experiences", value: stats.experiences, icon: Compass, color: "from-sky-500 to-sky-600", href: "/admin/experiences" },
    { label: "Inquiries", value: stats.inquiries, icon: MessageSquare, color: "from-amber-500 to-amber-600", href: "/admin/inquiries", badge: stats.pendingInquiries > 0 ? `${stats.pendingInquiries} pending` : undefined },
    { label: "Add-ons", value: stats.addons, icon: Puzzle, color: "from-pink-500 to-pink-600", href: "/admin/addons" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Welcome back. Here&apos;s your platform overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleEditMode}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
              editMode
                ? "border-teal-300 bg-teal-50 text-teal-700 dark:border-teal-600 dark:bg-teal-950/30 dark:text-teal-400"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-teal-600 dark:hover:bg-teal-950/30 dark:hover:text-teal-400"
            }`}
          >
            <Pencil className="h-4 w-4" />
            Edit Mode
            <span
              className={`relative inline-flex size-5 shrink-0 items-center rounded-full transition-colors duration-200 ${
                editMode ? "bg-teal-600 dark:bg-teal-500" : "bg-neutral-300 dark:bg-neutral-600"
              }`}
            >
              <span
                className={`inline-block size-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  editMode ? "translate-x-2" : "translate-x-0.5"
                }`}
              />
            </span>
          </button>
          <div className="hidden items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 sm:flex">
            <Users className="h-3.5 w-3.5" />
            {stats.admins} admin{stats.admins !== 1 ? "s" : ""}
          </div>
          <button
            onClick={handleRevalidate}
            disabled={revalidating}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-teal-600 dark:hover:bg-teal-950/30 dark:hover:text-teal-400"
          >
            <RefreshCw className={`h-4 w-4 ${revalidating ? "animate-spin" : ""}`} />
            {revalidated ? "Done!" : "Revalidate"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{card.label}</span>
                <div className={`flex size-9 items-center justify-center rounded-lg bg-gradient-to-br ${card.color} shadow-md`}>
                  <Icon className="size-4 text-white" />
                </div>
              </div>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {loadingStats ? (
                    <span className="inline-block h-8 w-12 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                  ) : (
                    card.value
                  )}
                </p>
                {card.badge && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[0.625rem] font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    {card.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Inquiries */}
      <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-500/10">
              <MessageSquare className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Recent Inquiries</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Latest customer booking requests</p>
            </div>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
          >
            View all
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
            No inquiries yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Client</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Package</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Guests</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Date</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="px-6 py-3">
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-white">{inq.fullName}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{inq.whatsapp}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-neutral-700 dark:text-neutral-300">
                      {inq.tripTitle || inq.tripType || "—"}
                    </td>
                    <td className="px-6 py-3 text-neutral-600 dark:text-neutral-400">
                      {inq.adults} adults{inq.kids ? `, ${inq.kids} kids` : ""}
                    </td>
                    <td className="px-6 py-3 text-neutral-500 dark:text-neutral-400">{inq.date}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[inq.status] ?? STATUS_STYLES.pending}`}>
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Activity Log + Quick Links side by side */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Log */}
        <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-500/10">
                <Activity className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Recent Activity</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Latest admin actions and edits</p>
              </div>
            </div>
            <button
              onClick={loadAll}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <RefreshCw className="h-3 w-3" />
              Refresh
            </button>
          </div>

          {activity.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
              <Clock className="mx-auto mb-2 h-8 w-8 text-neutral-300 dark:text-neutral-600" />
              No activity recorded yet. Start editing content to see changes here.
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {activity.slice(0, 10).map((item) => {
                const IconComp = ACTION_ICONS[item.action] ?? Activity;
                return (
                  <div key={item.id} className="flex items-start gap-3 px-6 py-3.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                      <IconComp className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        <span className="font-medium text-neutral-900 dark:text-white">{item.adminEmail}</span>
                        {" "}
                        {item.action === "edit" ? "edited" : item.action === "revalidate" ? "revalidated" : item.action}
                        {" "}
                        {item.model}
                        {item.itemName && (
                          <span className="font-medium text-neutral-900 dark:text-white"> — {item.itemName}</span>
                        )}
                      </p>
                      {item.details && (
                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{item.details}</p>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">
                      {timeAgo(item.createdAt)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Links + System Controls */}
        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
            <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-500/10">
                  <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Quick Links</h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Jump to any section</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {[
                { label: "Sea Packages", href: "/admin/sea-packages" },
                { label: "Adventures", href: "/admin/adventures" },
                { label: "Stays", href: "/admin/stays" },
                { label: "Spots & Eats", href: "/admin/spots-eats" },
                { label: "Inquiries", href: "/admin/inquiries" },
                { label: "Page Content", href: "/admin/page-content" },
                { label: "Add-ons", href: "/admin/addons" },
                { label: "Admin Users", href: "/admin/admins" },
                { label: "Settings", href: "/admin/settings" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-teal-700 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-teal-400"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
                </Link>
              ))}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-teal-700 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-teal-400"
              >
                View Website
                <ExternalLink className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
              </a>
            </div>
          </div>

          {/* System Controls */}
          <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
            <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                  <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-neutral-900 dark:text-white">System</h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Cache &amp; route controls</p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <button
                onClick={handleRevalidate}
                disabled={revalidating}
                className="flex w-full items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-left text-sm font-medium text-neutral-700 transition-all hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-teal-600 dark:hover:bg-teal-950/30 dark:hover:text-teal-400"
              >
                <RefreshCw className={`h-4 w-4 shrink-0 ${revalidating ? "animate-spin" : ""}`} />
                <div>
                  <p>{revalidated ? "Routes revalidated!" : "Revalidate All Routes"}</p>
                  <p className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                    Clear ISR cache for homepage &amp; listing pages
                  </p>
                </div>
              </button>
              <Link
                href="/api/admin/stats"
                target="_blank"
                className="flex w-full items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-left text-sm font-medium text-neutral-700 transition-all hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-teal-600 dark:hover:bg-teal-950/30 dark:hover:text-teal-400"
              >
                <Activity className="h-4 w-4 shrink-0" />
                <div>
                  <p>View Raw Stats</p>
                  <p className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                    Open stats API endpoint
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

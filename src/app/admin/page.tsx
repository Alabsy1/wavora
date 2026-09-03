"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Anchor, Mountain, Building2, UtensilsCrossed,
  MessageSquare, Map, Compass, ExternalLink,
} from "lucide-react";

interface Stats {
  seaPackages: number;
  adventures: number;
  stays: number;
  spots: number;
  trips: number;
  experiences: number;
  inquiries: number;
  pendingInquiries: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    seaPackages: 0, adventures: 0, stays: 0, spots: 0,
    trips: 0, experiences: 0, inquiries: 0, pendingInquiries: 0,
  });

  useEffect(() => {
    async function load() {
      const [sp, adv, stays, spots, trips, exps, inqs] = await Promise.all([
        fetch("/api/admin/sea-packages").then((r) => r.json()).catch(() => []),
        fetch("/api/admin/trips").then((r) => r.json()).catch(() => []),
        fetch("/api/admin/stays").then((r) => r.json()).catch(() => []),
        fetch("/api/admin/spots").then((r) => r.json()).catch(() => []),
        fetch("/api/admin/trips").then((r) => r.json()).catch(() => []),
        fetch("/api/admin/experiences").then((r) => r.json()).catch(() => []),
        fetch("/api/inquiries").then((r) => r.json()).catch(() => []),
      ]);
      const inqArr = Array.isArray(inqs) ? inqs : [];
      setStats({
        seaPackages: Array.isArray(sp) ? sp.length : 0,
        adventures: Array.isArray(adv) ? adv.filter((t: { category?: string }) => t.category === "adventure").length : 0,
        stays: Array.isArray(stays) ? stays.length : 0,
        spots: Array.isArray(spots) ? spots.length : 0,
        trips: Array.isArray(trips) ? trips.length : 0,
        experiences: Array.isArray(exps) ? exps.length : 0,
        inquiries: inqArr.length,
        pendingInquiries: inqArr.filter((i: { status: string }) => i.status === "pending").length,
      });
    }
    load();
  }, []);

  const cards = [
    { label: "Sea Packages", value: stats.seaPackages, icon: Anchor, color: "from-teal-500 to-teal-600", href: "/admin/sea-packages" },
    { label: "Adventures", value: stats.adventures, icon: Mountain, color: "from-orange-500 to-orange-600", href: "/admin/adventures" },
    { label: "Stays", value: stats.stays, icon: Building2, color: "from-violet-500 to-violet-600", href: "/admin/stays" },
    { label: "Spots & Eats", value: stats.spots, icon: UtensilsCrossed, color: "from-rose-500 to-rose-600", href: "/admin/spots-eats" },
    { label: "Trips", value: stats.trips, icon: Map, color: "from-emerald-500 to-emerald-600", href: "/admin/trips" },
    { label: "Experiences", value: stats.experiences, icon: Compass, color: "from-sky-500 to-sky-600", href: "/admin/experiences" },
    { label: "Inquiries", value: stats.inquiries, icon: MessageSquare, color: "from-amber-500 to-amber-600", href: "/admin/inquiries", badge: stats.pendingInquiries > 0 ? `${stats.pendingInquiries} pending` : undefined },
  ];

  const quickLinks = [
    { label: "Sea Packages", href: "/admin/sea-packages" },
    { label: "Adventures", href: "/admin/adventures" },
    { label: "Stays", href: "/admin/stays" },
    { label: "Spots & Eats", href: "/admin/spots-eats" },
    { label: "Inquiries", href: "/admin/inquiries" },
    { label: "Page Content", href: "/admin/page-content" },
    { label: "Add-ons", href: "/admin/addons" },
    { label: "Settings", href: "/admin/settings" },
    { label: "View Website", href: "/", external: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Welcome back. Here&apos;s an overview of your platform.</p>
      </div>

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
                <p className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">{card.value}</p>
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

      <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Quick Links</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-teal-700 dark:hover:bg-teal-950/30 dark:hover:text-teal-400"
            >
              {link.label}
              {link.external && <ExternalLink className="size-3.5" />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

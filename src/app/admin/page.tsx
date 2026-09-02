"use client";

import { useEffect, useState } from "react";
import { Map, Compass } from "lucide-react";

interface Stats {
  trips: number;
  experiences: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ trips: 0, experiences: 0 });

  useEffect(() => {
    async function load() {
      const [tripsRes, expsRes] = await Promise.all([
        fetch("/api/admin/trips"),
        fetch("/api/admin/experiences"),
      ]);
      const trips = await tripsRes.json();
      const experiences = await expsRes.json();
      setStats({
        trips: Array.isArray(trips) ? trips.length : 0,
        experiences: Array.isArray(experiences) ? experiences.length : 0,
      });
    }
    load();
  }, []);

  const cards = [
    {
      label: "Trips",
      value: stats.trips,
      icon: Map,
      color: "from-teal-500 to-teal-600",
      shadow: "shadow-teal-500/20",
    },
    {
      label: "Experiences",
      value: stats.experiences,
      icon: Compass,
      color: "from-violet-500 to-violet-600",
      shadow: "shadow-violet-500/20",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Welcome back. Here&apos;s an overview of your content.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {card.label}
                </span>
                <div className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${card.color} shadow-md ${card.shadow}`}>
                  <Icon className="size-5 text-white" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Quick Links</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Manage Settings", href: "/admin/settings" },
            { label: "Manage Trips", href: "/admin/trips" },
            { label: "Manage Experiences", href: "/admin/experiences" },
            { label: "View Website", href: "/", external: true },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="rounded-lg border border-neutral-200 px-4 py-3 text-center text-sm font-medium text-neutral-700 transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-teal-700 dark:hover:bg-teal-950/30 dark:hover:text-teal-400"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

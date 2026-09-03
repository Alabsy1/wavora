"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  LayoutDashboard,
  Settings,
  Map,
  Compass,
  ChevronLeft,
  ChevronRight,
  Waves,
  Anchor,
  Mountain,
  Building2,
  UtensilsCrossed,
  MessageSquare,
  FileText,
  Puzzle,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Content Modules",
    items: [
      { label: "Sea Packages", href: "/admin/sea-packages", icon: Anchor },
      { label: "Adventures", href: "/admin/adventures", icon: Mountain },
      { label: "Stays & Resorts", href: "/admin/stays", icon: Building2 },
      { label: "Spots & Eats", href: "/admin/spots-eats", icon: UtensilsCrossed },
      { label: "Trips", href: "/admin/trips", icon: Map },
      { label: "Experiences", href: "/admin/experiences", icon: Compass },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    ],
  },
  {
    title: "Configuration",
    items: [
      { label: "Page Content", href: "/admin/page-content", icon: FileText },
      { label: "Add-ons", href: "/admin/addons", icon: Puzzle },
      { label: "Global Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function AdminSidebar({ mobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [mobileOpen]);

  useEffect(() => {
    onMobileClose();
  }, [pathname, onMobileClose]);

  const sidebarContent = (
    <>
      <div className={cn("flex h-14 items-center border-b border-neutral-200 dark:border-neutral-800", collapsed && !mobileOpen ? "justify-center px-2" : "gap-3 px-5")}>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600">
          <Waves className="size-4 text-white" />
        </div>
        {(!collapsed || mobileOpen) && (
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wide text-neutral-900 dark:text-white">WAVORA</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Admin</span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            {(!collapsed || mobileOpen) && (
              <p className="mb-2 px-3 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onMobileClose}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      collapsed && !mobileOpen && "justify-center px-2",
                      isActive
                        ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
                    )}
                    title={collapsed && !mobileOpen ? item.label : undefined}
                  >
                    <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-teal-600 dark:text-teal-400" : "text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300")} />
                    {(!collapsed || mobileOpen) && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden lg:flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-full flex-col border-r border-neutral-200 bg-white transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950 lg:flex",
          collapsed ? "w-[68px]" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
            <button
              onClick={onMobileClose}
              className="absolute right-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

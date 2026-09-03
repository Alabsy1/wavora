"use client";

import { AdminThemeProvider } from "@/components/admin/admin-theme-provider";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileClose = useCallback(() => setMobileOpen(false), []);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AdminThemeProvider>
      <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <AdminSidebar mobileOpen={mobileOpen} onMobileClose={handleMobileClose} />
        <div className="flex flex-1 flex-col transition-all duration-300 lg:pl-64 max-lg:pl-0">
          <AdminHeader onMenuToggle={() => setMobileOpen((v) => !v)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminThemeProvider>
  );
}

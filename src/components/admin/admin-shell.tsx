"use client";

import { AdminThemeProvider } from "@/components/admin/admin-theme-provider";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { usePathname } from "next/navigation";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AdminThemeProvider>
      <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <AdminSidebar />
        <div className="flex flex-1 flex-col pl-64 transition-all duration-300 max-[820px]:pl-[68px]">
          <AdminHeader />
          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminThemeProvider>
  );
}

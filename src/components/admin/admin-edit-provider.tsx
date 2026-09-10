"use client";

import { createContext, useContext } from "react";
import { useAdminAuth } from "@/hooks/use-admin-auth";

interface AdminEditContextValue {
  isAdmin: boolean;
  loading: boolean;
}

const AdminEditContext = createContext<AdminEditContextValue>({
  isAdmin: false,
  loading: true,
});

export function useIsAdmin() {
  return useContext(AdminEditContext);
}

export function AdminEditProvider({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAdminAuth();
  return (
    <AdminEditContext.Provider value={{ isAdmin, loading }}>
      {children}
    </AdminEditContext.Provider>
  );
}

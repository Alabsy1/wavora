"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/use-admin-auth";

interface AdminEditContextValue {
  isAdmin: boolean;
  loading: boolean;
  editMode: boolean;
  toggleEditMode: () => void;
}

const AdminEditContext = createContext<AdminEditContextValue>({
  isAdmin: false,
  loading: true,
  editMode: false,
  toggleEditMode: () => {},
});

export function useIsAdmin() {
  const { isAdmin, loading } = useContext(AdminEditContext);
  return { isAdmin, loading };
}

export function useEditMode() {
  const { editMode, toggleEditMode, isAdmin } = useContext(AdminEditContext);
  return { editMode: isAdmin && editMode, toggleEditMode, isAdmin };
}

export function AdminEditProvider({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAdminAuth();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      setEditMode(false);
      return;
    }
    try {
      const stored = localStorage.getItem("wavora-admin-edit-mode");
      if (stored === "true") setEditMode(true);
    } catch {}
  }, [isAdmin]);

  const toggleEditMode = useCallback(() => {
    setEditMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("wavora-admin-edit-mode", String(next));
      } catch {}
      return next;
    });
  }, []);

  return (
    <AdminEditContext.Provider value={{ isAdmin, loading, editMode, toggleEditMode }}>
      {children}
    </AdminEditContext.Provider>
  );
}

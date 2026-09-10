"use client";

import { useEffect, useState, useCallback } from "react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export function useAdminAuth() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.admin) {
          setAdmin(data.user);
        }
      } catch {
        // not logged in
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    check();
    return () => { cancelled = true; };
  }, []);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (!res.ok) { setAdmin(null); return; }
      const data = await res.json();
      if (data.admin) setAdmin(data.user);
    } catch {
      setAdmin(null);
    }
  }, []);

  return { admin, isAdmin: !!admin, loading, refresh };
}

"use client";

import { useEffect, useState } from "react";

const DEFAULT_FLAGS: Record<string, boolean> = {
  sea: true,
  adventure: true,
  stays: true,
  spots: true,
  eats: true,
  experiences: true,
};

export function useSiteFlags() {
  const [flags, setFlags] = useState<Record<string, boolean>>(DEFAULT_FLAGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchFlags() {
      try {
        const res = await fetch("/api/site-flags", { next: { revalidate: 60 } } as RequestInit);
        const data = await res.json();
        setFlags({ ...DEFAULT_FLAGS, ...data });
      } catch {
        // Use defaults on error
      } finally {
        setLoaded(true);
      }
    }
    fetchFlags();
  }, []);

  return { flags, loaded };
}

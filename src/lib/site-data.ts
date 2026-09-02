import { prisma } from "@/lib/prisma";

export type SiteFlags = Record<string, string>;

let cachedFlags: SiteFlags | null = null;
let cacheTime = 0;

export async function getSiteFlags(): Promise<SiteFlags> {
  const now = Date.now();
  if (cachedFlags && now - cacheTime < 30_000) return cachedFlags;

  try {
    const configs = await prisma.siteConfig.findMany();
    const flags: SiteFlags = {};
    for (const c of configs) {
      flags[c.key] = c.value;
    }
    cachedFlags = flags;
    cacheTime = now;
    return flags;
  } catch {
    return {};
  }
}

export function isNavEnabled(flags: SiteFlags, module: string): boolean {
  return flags[`nav-${module}`] !== "false";
}

export function isSectionEnabled(flags: SiteFlags, section: string): boolean {
  return flags[section] !== "false";
}

export async function getVisibleTrips() {
  try {
    return await prisma.trip.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getFeaturedTrips(limit = 6) {
  try {
    return await prisma.trip.findMany({
      where: { visible: true, featured: true },
      orderBy: { order: "asc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

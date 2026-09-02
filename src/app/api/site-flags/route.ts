import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const configs = await prisma.siteConfig.findMany();
    const flags: Record<string, string> = {};
    for (const c of configs) {
      flags[c.key] = c.value;
    }
    return NextResponse.json(flags);
  } catch {
    return NextResponse.json({});
  }
}

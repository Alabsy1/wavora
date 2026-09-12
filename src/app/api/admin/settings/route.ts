import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const configs = await prisma.siteConfig.findMany();
    const flags: Record<string, string> = {};
    for (const c of configs) {
      flags[c.key] = c.value;
    }
    return NextResponse.json(flags);
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const updates: Record<string, string> = body;

    for (const [key, value] of Object.entries(updates)) {
      await prisma.siteConfig.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

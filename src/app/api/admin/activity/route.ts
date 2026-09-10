import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const activities = await prisma.activityLog.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(activities);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

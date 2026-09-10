import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const [
      seaPackages,
      adventures,
      stays,
      spots,
      trips,
      experiences,
      addons,
      inquiries,
      pendingInquiries,
      admins,
    ] = await Promise.all([
      prisma.seaPackage.count(),
      prisma.trip.count({ where: { category: "adventure" } }),
      prisma.stay.count(),
      prisma.spot.count(),
      prisma.trip.count(),
      prisma.experience.count(),
      prisma.addOn.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "pending" } }),
      prisma.admin.count(),
    ]);

    return NextResponse.json({
      seaPackages,
      adventures,
      stays,
      spots,
      trips,
      experiences,
      addons,
      inquiries,
      pendingInquiries,
      admins,
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

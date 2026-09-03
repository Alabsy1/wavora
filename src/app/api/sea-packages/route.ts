import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const packages = await prisma.seaPackage.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(packages);
  } catch {
    return NextResponse.json([]);
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const destinations = await prisma.islandDestination.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(destinations);
  } catch {
    return NextResponse.json([]);
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const trips = await prisma.trip.findMany({
      where: {
        visible: true,
        category: "adventure",
      },
      orderBy: { order: "asc" },
    });

    const adventures = trips.map((t) => ({
      id: t.id,
      slug: t.slug,
      title: t.title,
      location: t.location,
      description: t.description,
      images: t.coverImage ? [t.coverImage, ...JSON.parse(t.gallery || "[]")] : JSON.parse(t.gallery || "[]"),
      duration: t.duration,
      tags: JSON.parse(t.tags || "[]"),
      priceFrom: t.priceFrom,
      priceNote: t.priceNote,
      featured: t.featured,
      availability: t.schedule,
    }));

    return NextResponse.json(adventures);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

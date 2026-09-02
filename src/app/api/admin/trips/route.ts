import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const trips = await prisma.trip.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(trips);
  } catch (error) {
    console.error("Trips GET error:", error);
    return NextResponse.json({ error: "Failed to load trips" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, location, category, tripType, coverImage, heroVideo, gallery, duration, schedule, priceFrom, priceNote, tags, inclusions, itinerary, featured, visible, order } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const existing = await prisma.trip.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "A trip with this slug already exists" }, { status: 409 });
    }

    const trip = await prisma.trip.create({
      data: {
        title,
        slug,
        description: description ?? "",
        location: location ?? "",
        category: category ?? "sea",
        tripType: tripType ?? "DAILY_CRUISE",
        coverImage: coverImage ?? "",
        heroVideo: heroVideo ?? "",
        gallery: JSON.stringify(gallery ?? []),
        duration: duration ?? "",
        schedule: schedule ?? "",
        priceFrom: priceFrom ?? 0,
        priceNote: priceNote ?? "",
        tags: JSON.stringify(tags ?? []),
        inclusions: JSON.stringify(inclusions ?? []),
        itinerary: JSON.stringify(itinerary ?? []),
        featured: featured ?? false,
        visible: visible ?? true,
        order: order ?? 0,
      },
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    console.error("Trips POST error:", error);
    return NextResponse.json({ error: "Failed to create trip" }, { status: 500 });
  }
}

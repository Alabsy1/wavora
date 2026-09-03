import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const stays = await prisma.stay.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(stays);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, location, category, coverImage, gallery, priceFrom, priceNote, amenities, tags, featured, visible, order } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const stay = await prisma.stay.create({
      data: {
        title,
        slug,
        description: description ?? "",
        location: location ?? "",
        category: category ?? "hotel",
        coverImage: coverImage ?? "",
        gallery: JSON.stringify(gallery ?? []),
        priceFrom: parseFloat(priceFrom) || 0,
        priceNote: priceNote ?? "",
        amenities: JSON.stringify(amenities ?? []),
        tags: JSON.stringify(tags ?? []),
        featured: featured ?? false,
        visible: visible ?? true,
        order: order ?? 0,
      },
    });

    return NextResponse.json(stay, { status: 201 });
  } catch (error) {
    console.error("Stay POST error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

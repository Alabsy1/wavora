import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const spots = await prisma.spot.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(spots);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, location, category, coverImage, gallery, tags, featured, visible, order } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const spot = await prisma.spot.create({
      data: {
        title,
        slug,
        description: description ?? "",
        location: location ?? "",
        category: category ?? "spot",
        coverImage: coverImage ?? "",
        gallery: JSON.stringify(gallery ?? []),
        tags: JSON.stringify(tags ?? []),
        featured: featured ?? false,
        visible: visible ?? true,
        order: order ?? 0,
      },
    });

    return NextResponse.json(spot, { status: 201 });
  } catch (error) {
    console.error("Spot POST error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

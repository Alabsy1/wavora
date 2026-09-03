import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const destinations = await prisma.islandDestination.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(destinations);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, image, isPopular, order } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const destination = await prisma.islandDestination.create({
      data: {
        name,
        slug,
        description: description ?? "",
        image: image ?? "",
        isPopular: isPopular ?? true,
        order: order ?? 0,
      },
    });

    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    console.error("IslandDestination POST error:", error);
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 });
  }
}

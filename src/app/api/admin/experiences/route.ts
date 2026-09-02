import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Experiences GET error:", error);
    return NextResponse.json({ error: "Failed to load experiences" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, location, category, coverImage, heroVideo, gallery, duration, priceFrom, priceNote, tags, featured, visible, order } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const existing = await prisma.experience.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "An experience with this slug already exists" }, { status: 409 });
    }

    const experience = await prisma.experience.create({
      data: {
        title,
        slug,
        description: description ?? "",
        location: location ?? "",
        category: category ?? "experiences",
        coverImage: coverImage ?? "",
        heroVideo: heroVideo ?? "",
        gallery: JSON.stringify(gallery ?? []),
        duration: duration ?? "",
        priceFrom: priceFrom ?? 0,
        priceNote: priceNote ?? "",
        tags: JSON.stringify(tags ?? []),
        featured: featured ?? false,
        visible: visible ?? true,
        order: order ?? 0,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("Experiences POST error:", error);
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}

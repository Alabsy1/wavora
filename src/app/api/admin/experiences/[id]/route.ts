import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const experience = await prisma.experience.findUnique({ where: { id } });
    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }
    return NextResponse.json(experience);
  } catch (error) {
    console.error("Experience GET error:", error);
    return NextResponse.json({ error: "Failed to load experience" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.experience.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    if (body.slug && body.slug !== existing.slug) {
      const slugTaken = await prisma.experience.findUnique({ where: { slug: body.slug } });
      if (slugTaken) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
      }
    }

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.coverImage !== undefined && { coverImage: body.coverImage }),
        ...(body.heroVideo !== undefined && { heroVideo: body.heroVideo }),
        ...(body.gallery !== undefined && { gallery: JSON.stringify(body.gallery) }),
        ...(body.duration !== undefined && { duration: body.duration }),
        ...(body.priceFrom !== undefined && { priceFrom: body.priceFrom }),
        ...(body.priceNote !== undefined && { priceNote: body.priceNote }),
        ...(body.tags !== undefined && { tags: JSON.stringify(body.tags) }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.visible !== undefined && { visible: body.visible }),
        ...(body.order !== undefined && { order: body.order }),
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Experience PUT error:", error);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Experience DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}

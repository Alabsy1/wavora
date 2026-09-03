import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const stay = await prisma.stay.findUnique({ where: { id } });
    if (!stay) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(stay);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, description, location, category, coverImage, gallery, priceFrom, priceNote, amenities, tags, featured, visible, order } = body;

    const stay = await prisma.stay.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(location !== undefined && { location }),
        ...(category !== undefined && { category }),
        ...(coverImage !== undefined && { coverImage }),
        ...(gallery !== undefined && { gallery: JSON.stringify(gallery) }),
        ...(priceFrom !== undefined && { priceFrom: parseFloat(priceFrom) }),
        ...(priceNote !== undefined && { priceNote }),
        ...(amenities !== undefined && { amenities: JSON.stringify(amenities) }),
        ...(tags !== undefined && { tags: JSON.stringify(tags) }),
        ...(featured !== undefined && { featured }),
        ...(visible !== undefined && { visible }),
        ...(order !== undefined && { order: parseInt(order) }),
      },
    });

    return NextResponse.json(stay);
  } catch (error) {
    console.error("Stay PUT error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.stay.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

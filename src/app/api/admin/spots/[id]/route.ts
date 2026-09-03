import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const spot = await prisma.spot.findUnique({ where: { id } });
    if (!spot) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(spot);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, description, location, category, coverImage, gallery, tags, featured, visible, order } = body;

    const spot = await prisma.spot.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(location !== undefined && { location }),
        ...(category !== undefined && { category }),
        ...(coverImage !== undefined && { coverImage }),
        ...(gallery !== undefined && { gallery: JSON.stringify(gallery) }),
        ...(tags !== undefined && { tags: JSON.stringify(tags) }),
        ...(featured !== undefined && { featured }),
        ...(visible !== undefined && { visible }),
        ...(order !== undefined && { order: parseInt(order) }),
      },
    });

    return NextResponse.json(spot);
  } catch (error) {
    console.error("Spot PUT error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.spot.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

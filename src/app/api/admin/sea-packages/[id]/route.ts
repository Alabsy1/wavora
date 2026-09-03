import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const pkg = await prisma.seaPackage.findUnique({ where: { id } });
    if (!pkg) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(pkg);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title, slug, description, duration, boatType, maxGuests, priceFrom,
      inclusions, exclusions, timeline, specs, addOns, gallery,
      coverImage, featured, visible, order,
    } = body;

    const pkg = await prisma.seaPackage.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(duration !== undefined && { duration }),
        ...(boatType !== undefined && { boatType }),
        ...(maxGuests !== undefined && { maxGuests: parseInt(maxGuests) }),
        ...(priceFrom !== undefined && { priceFrom: parseFloat(priceFrom) }),
        ...(inclusions !== undefined && { inclusions: JSON.stringify(inclusions) }),
        ...(exclusions !== undefined && { exclusions: JSON.stringify(exclusions) }),
        ...(timeline !== undefined && { timeline: JSON.stringify(timeline) }),
        ...(specs !== undefined && { specs: JSON.stringify(specs) }),
        ...(addOns !== undefined && { addOns: JSON.stringify(addOns) }),
        ...(gallery !== undefined && { gallery: JSON.stringify(gallery) }),
        ...(coverImage !== undefined && { coverImage }),
        ...(featured !== undefined && { featured }),
        ...(visible !== undefined && { visible }),
        ...(order !== undefined && { order: parseInt(order) }),
      },
    });

    return NextResponse.json(pkg);
  } catch (error) {
    console.error("SeaPackage PUT error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.seaPackage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const trip = await prisma.trip.findUnique({ where: { id } });
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }
    return NextResponse.json(trip);
  } catch (error) {
    console.error("Trip GET error:", error);
    return NextResponse.json({ error: "Failed to load trip" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.trip.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    if (body.slug && body.slug !== existing.slug) {
      const slugTaken = await prisma.trip.findUnique({ where: { slug: body.slug } });
      if (slugTaken) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
      }
    }

    const trip = await prisma.trip.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.tripType !== undefined && { tripType: body.tripType }),
        ...(body.coverImage !== undefined && { coverImage: body.coverImage }),
        ...(body.heroVideo !== undefined && { heroVideo: body.heroVideo }),
        ...(body.gallery !== undefined && { gallery: JSON.stringify(body.gallery) }),
        ...(body.duration !== undefined && { duration: body.duration }),
        ...(body.schedule !== undefined && { schedule: body.schedule }),
        ...(body.priceFrom !== undefined && { priceFrom: body.priceFrom }),
        ...(body.priceNote !== undefined && { priceNote: body.priceNote }),
        ...(body.tags !== undefined && { tags: JSON.stringify(body.tags) }),
        ...(body.inclusions !== undefined && { inclusions: JSON.stringify(body.inclusions) }),
        ...(body.itinerary !== undefined && { itinerary: JSON.stringify(body.itinerary) }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.visible !== undefined && { visible: body.visible }),
        ...(body.order !== undefined && { order: body.order }),
      },
    });

    return NextResponse.json(trip);
  } catch (error) {
    console.error("Trip PUT error:", error);
    return NextResponse.json({ error: "Failed to update trip" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.trip.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Trip DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete trip" }, { status: 500 });
  }
}

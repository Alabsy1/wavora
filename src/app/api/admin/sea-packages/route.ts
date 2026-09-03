import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const packages = await prisma.seaPackage.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(packages);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title, slug, description, duration, boatType, maxGuests, priceFrom,
      inclusions, exclusions, timeline, specs, addOns, gallery,
      coverImage, featured, visible, order,
    } = body;

    if (!title || !slug || !duration || !boatType || priceFrom === undefined) {
      return NextResponse.json(
        { error: "Title, slug, duration, boatType, and priceFrom are required" },
        { status: 400 }
      );
    }

    const pkg = await prisma.seaPackage.create({
      data: {
        title,
        slug,
        description: description ?? "",
        duration,
        boatType,
        maxGuests: maxGuests ?? 15,
        priceFrom: parseFloat(priceFrom),
        inclusions: JSON.stringify(inclusions ?? []),
        exclusions: JSON.stringify(exclusions ?? []),
        timeline: JSON.stringify(timeline ?? []),
        specs: JSON.stringify(specs ?? {}),
        addOns: JSON.stringify(addOns ?? []),
        gallery: JSON.stringify(gallery ?? []),
        coverImage: coverImage ?? "",
        featured: featured ?? false,
        visible: visible ?? true,
        order: order ?? 0,
      },
    });

    return NextResponse.json(pkg, { status: 201 });
  } catch (error) {
    console.error("SeaPackage POST error:", error);
    return NextResponse.json({ error: "Failed to create sea package" }, { status: 500 });
  }
}

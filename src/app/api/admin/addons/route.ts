import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const addons = await prisma.addOn.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(addons);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { name, slug, description, price, category, visible, order } = body;

    if (!name || !slug || price === undefined) {
      return NextResponse.json({ error: "Name, slug, and price are required" }, { status: 400 });
    }

    const addon = await prisma.addOn.create({
      data: {
        name,
        slug,
        description: description ?? "",
        price: parseFloat(price),
        category: category ?? "sea",
        visible: visible ?? true,
        order: order ?? 0,
      },
    });

    return NextResponse.json(addon, { status: 201 });
  } catch (error) {
    console.error("AddOn POST error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

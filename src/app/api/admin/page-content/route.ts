import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    const where = page ? { page } : {};
    const contents = await prisma.pageContent.findMany({ where, orderBy: [{ page: "asc" }, { section: "asc" }, { key: "asc" }] });
    return NextResponse.json(contents);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body as { items: { page: string; section: string; key: string; value: string; type?: string }[] };

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Items array required" }, { status: 400 });
    }

    for (const item of items) {
      await prisma.pageContent.upsert({
        where: { page_section_key: { page: item.page, section: item.section, key: item.key } },
        update: { value: item.value, type: item.type ?? "text" },
        create: { page: item.page, section: item.section, key: item.key, value: item.value, type: item.type ?? "text" },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PageContent PUT error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

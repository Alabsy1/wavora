import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await requireAdmin();
    const recentInquiries = await prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        whatsapp: true,
        tripTitle: true,
        tripType: true,
        status: true,
        date: true,
        adults: true,
        kids: true,
        createdAt: true,
      },
    });
    return NextResponse.json(recentInquiries);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json().catch(() => ({}));
    const paths: string[] = body.paths ?? ["/"];

    for (const p of paths) {
      revalidatePath(p);
    }

    await prisma.activityLog.create({
      data: {
        action: "revalidate",
        model: "System",
        itemName: `Revalidated: ${paths.join(", ")}`,
      },
    });

    return NextResponse.json({ success: true, revalidated: paths });
  } catch (error) {
    console.error("Revalidate error:", error);
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
  }
}

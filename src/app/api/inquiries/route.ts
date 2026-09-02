import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/data/site";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, whatsapp, date, adults, kids, notes, tripType, tripId, tripTitle } = body;

    if (!fullName || !whatsapp || !date) {
      return NextResponse.json(
        { error: "Full name, WhatsApp number, and date are required" },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        fullName,
        whatsapp,
        date,
        adults: adults ?? 1,
        kids: kids ?? 0,
        notes: notes ?? "",
        tripType: tripType ?? "",
        tripId: tripId ?? "",
        tripTitle: tripTitle ?? "",
      },
    });

    const whatsappNumber = siteConfig.whatsapp.international;
    const tripInfo = tripTitle ? `\n*Trip:* ${tripTitle}` : tripType ? `\n*Type:* ${tripType}` : "";
    const message = `Hi WAVORA! I'd like to plan a trip.

*Name:* ${fullName}
*WhatsApp:* ${whatsapp}${tripInfo}
*Date:* ${date}
*Guests:* ${adults} adults${kids ? `, ${kids} kids` : ""}${notes ? `\n*Notes:* ${notes}` : ""}

(Inquiry ID: ${inquiry.id})`;

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return NextResponse.json({ success: true, inquiryId: inquiry.id, whatsappUrl: waUrl });
  } catch (error) {
    console.error("Inquiry POST error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Inquiries GET error:", error);
    return NextResponse.json({ error: "Failed to load inquiries" }, { status: 500 });
  }
}

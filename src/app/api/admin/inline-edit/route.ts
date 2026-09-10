import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const JSON_FIELDS: Record<string, string[]> = {
  SeaPackage: ["inclusions", "exclusions", "timeline", "specs", "addOns", "gallery"],
  Trip: ["gallery", "tags", "inclusions", "itinerary"],
  Experience: ["gallery", "tags"],
  Stay: ["gallery", "amenities", "tags"],
  Spot: ["gallery", "tags"],
  AddOn: [],
  IslandDestination: [],
};

const FLOAT_FIELDS: Record<string, string[]> = {
  SeaPackage: ["priceFrom", "maxGuests"],
  Trip: ["priceFrom"],
  Experience: ["priceFrom"],
  Stay: ["priceFrom"],
  Spot: [],
  AddOn: ["price"],
  IslandDestination: [],
};

const INT_FIELDS: Record<string, string[]> = {
  SeaPackage: ["order"],
  Trip: ["order"],
  Experience: ["order"],
  Stay: ["order"],
  Spot: ["order"],
  AddOn: ["order"],
  IslandDestination: ["order"],
};

const BOOL_FIELDS: Record<string, string[]> = {
  SeaPackage: ["featured", "visible"],
  Trip: ["featured", "visible"],
  Experience: ["featured", "visible"],
  Stay: ["featured", "visible"],
  Spot: ["featured", "visible"],
  AddOn: ["visible"],
  IslandDestination: ["isPopular"],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaModel = { update: (args: any) => Promise<any>; findUnique: (args: any) => Promise<any> };

function getModel(modelName: string): PrismaModel | null {
  const map: Record<string, PrismaModel> = {
    SeaPackage: prisma.seaPackage,
    Trip: prisma.trip,
    Experience: prisma.experience,
    Stay: prisma.stay,
    Spot: prisma.spot,
    AddOn: prisma.addOn,
    IslandDestination: prisma.islandDestination,
  };
  return map[modelName] ?? null;
}

export async function PATCH(request: NextRequest) {
  try {
    const { model, id, data } = await request.json();

    if (!model || !id || !data || typeof data !== "object") {
      return NextResponse.json(
        { error: "model, id, and data are required" },
        { status: 400 }
      );
    }

    const modelClient = getModel(model);
    if (!modelClient) {
      return NextResponse.json(
        { error: `Unknown model: ${model}` },
        { status: 400 }
      );
    }

    const existing = await modelClient.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const jsonFields = JSON_FIELDS[model] ?? [];
    const floatFields = FLOAT_FIELDS[model] ?? [];
    const intFields = INT_FIELDS[model] ?? [];
    const boolFields = BOOL_FIELDS[model] ?? [];

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (jsonFields.includes(key)) {
        updateData[key] = typeof value === "string" ? value : JSON.stringify(value);
      } else if (floatFields.includes(key)) {
        updateData[key] = parseFloat(String(value)) || 0;
      } else if (intFields.includes(key)) {
        updateData[key] = parseInt(String(value), 10) || 0;
      } else if (boolFields.includes(key)) {
        updateData[key] = Boolean(value);
      } else {
        updateData[key] = value;
      }
    }

    const updated = await modelClient.update({
      where: { id },
      data: updateData,
    });

    const session = await getSession().catch(() => null);
    const fieldNames = Object.keys(data).join(", ");
    const itemName = existing.title ?? existing.name ?? existing.id ?? id;

    prisma.activityLog.create({
      data: {
        action: "edit",
        model,
        itemId: id,
        itemName: String(itemName),
        adminEmail: session?.email ?? "unknown",
        details: `Updated ${fieldNames} on ${model}`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true, record: updated });
  } catch (error) {
    console.error("Inline edit error:", error);
    return NextResponse.json(
      { error: "Failed to update record" },
      { status: 500 }
    );
  }
}

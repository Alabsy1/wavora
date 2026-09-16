import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const MODEL_PATHS: Record<string, string[]> = {
  SeaPackage: ["/sea", "/"],
  Trip: ["/adventures", "/"],
  Experience: ["/experiences", "/"],
  Stay: ["/stays", "/"],
  Spot: ["/spots", "/eats", "/"],
  AddOn: [],
  IslandDestination: ["/sea", "/"],
};

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
  SeaPackage: ["priceFrom"],
  Trip: ["priceFrom"],
  Experience: ["priceFrom"],
  Stay: ["priceFrom"],
  Spot: [],
  AddOn: ["price"],
  IslandDestination: [],
};

const INT_FIELDS: Record<string, string[]> = {
  SeaPackage: ["order", "maxGuests"],
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
type PrismaDelegate = {
  findUnique: (args: { where: { id: string } }) => Promise<Record<string, unknown> | null>;
  update: (args: { where: { id: string }; data: Record<string, unknown> }) => Promise<Record<string, unknown>>;
};

function getDelegate(model: string): PrismaDelegate | null {
  switch (model) {
    case "SeaPackage": return prisma.seaPackage;
    case "Trip": return prisma.trip;
    case "Experience": return prisma.experience;
    case "Stay": return prisma.stay;
    case "Spot": return prisma.spot;
    case "AddOn": return prisma.addOn;
    case "IslandDestination": return prisma.islandDestination;
    default: return null;
  }
}

function coerceValue(
  key: string,
  value: unknown,
  jsonFields: string[],
  floatFields: string[],
  intFields: string[],
  boolFields: string[],
): unknown {
  if (value === undefined || value === null) return undefined;

  if (jsonFields.includes(key)) {
    return typeof value === "string" ? value : JSON.stringify(value);
  }
  if (floatFields.includes(key)) {
    const n = parseFloat(String(value));
    return isNaN(n) ? 0 : n;
  }
  if (intFields.includes(key)) {
    const n = parseInt(String(value), 10);
    return isNaN(n) ? 0 : n;
  }
  if (boolFields.includes(key)) {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value.toLowerCase() === "true" || value === "1";
    return Boolean(value);
  }
  return value;
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAdmin();
    const { model, id, data } = await request.json();

    console.log("[inline-edit] Received:", { model, id, dataKeys: Object.keys(data ?? {}) });

    if (!model || !id || !data || typeof data !== "object") {
      return NextResponse.json(
        { error: "model, id, and data are required" },
        { status: 400 }
      );
    }

    const delegate = getDelegate(model);
    if (!delegate) {
      return NextResponse.json(
        { error: `Unknown model: ${model}` },
        { status: 400 }
      );
    }

    const existing = await delegate.findUnique({ where: { id } });
    if (!existing) {
      console.log("[inline-edit] Record not found:", { model, id });
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const jsonFields = JSON_FIELDS[model] ?? [];
    const floatFields = FLOAT_FIELDS[model] ?? [];
    const intFields = INT_FIELDS[model] ?? [];
    const boolFields = BOOL_FIELDS[model] ?? [];

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      const coerced = coerceValue(key, value, jsonFields, floatFields, intFields, boolFields);
      if (coerced !== undefined) {
        updateData[key] = coerced;
      }
    }

    console.log("[inline-edit] updateData:", updateData);

    if (Object.keys(updateData).length === 0) {
      console.log("[inline-edit] No fields to update");
      return NextResponse.json({ success: true, record: existing, message: "No changes" });
    }

    const updated = await delegate.update({
      where: { id },
      data: updateData,
    });

    console.log("[inline-edit] Update result:", { id, updatedId: updated?.id });

    const fieldNames = Object.keys(data).join(", ");
    const itemName = existing.title ?? existing.name ?? existing.id ?? id;

    prisma.activityLog.create({
      data: {
        action: "edit",
        model,
        itemId: id,
        itemName: String(itemName),
        adminEmail: session.email,
        details: `Updated ${fieldNames} on ${model}`,
      },
    }).catch((logErr) => console.error("[inline-edit] Activity log error:", logErr));

    const paths = MODEL_PATHS[model] ?? [];
    for (const p of paths) {
      revalidatePath(p);
    }
    console.log("[inline-edit] Revalidated paths:", paths);

    return NextResponse.json({ success: true, record: updated });
  } catch (error) {
    console.error("[inline-edit] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update record" },
      { status: 500 }
    );
  }
}

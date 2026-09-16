import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.admin.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const updateData: Record<string, string> = {};

    if (body.name && typeof body.name === "string") {
      updateData.name = body.name.trim();
    }

    if (body.email && typeof body.email === "string") {
      const email = body.email.trim().toLowerCase();
      if (email !== existing.email) {
        const taken = await prisma.admin.findUnique({ where: { email } });
        if (taken) {
          return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }
      }
      updateData.email = email;
    }

    if (body.password && typeof body.password === "string") {
      if (body.password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      }
      updateData.password = await bcrypt.hash(body.password, 12);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const admin = await prisma.admin.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return NextResponse.json(admin);
  } catch (error) {
    console.error("Admin PUT error:", error);
    return NextResponse.json({ error: "Failed to update admin" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    const { id } = await params;

    if (session.id === id) {
      const count = await prisma.admin.count();
      if (count <= 1) {
        return NextResponse.json(
          { error: "Cannot delete the last admin account" },
          { status: 400 }
        );
      }
    }

    await prisma.admin.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 });
  }
}

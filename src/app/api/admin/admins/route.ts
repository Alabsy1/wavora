import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await requireAdmin();
    const admins = await prisma.admin.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(admins);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Email, name, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An admin with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await prisma.admin.create({
      data: { email, name, password: passwordHash },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return NextResponse.json(admin, { status: 201 });
  } catch (error) {
    console.error("Admin POST error:", error);
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}

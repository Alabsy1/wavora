import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

const VALID_EMAIL = process.env.ADMIN_EMAIL ?? "alabsyabdelrhman@gmail.com";
const VALID_PASSWORD = process.env.ADMIN_PASSWORD ?? "abdo.elwa@yahoo.com";
const VALID_NAME = process.env.ADMIN_NAME ?? "Absy Abdelrhman";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const emailMatch = email.toLowerCase() === VALID_EMAIL.toLowerCase();
    const passwordMatch = password === VALID_PASSWORD;

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(VALID_PASSWORD, 12);

    const admin = await prisma.admin.upsert({
      where: { email: VALID_EMAIL },
      update: { password: hashedPassword, name: VALID_NAME },
      create: { email: VALID_EMAIL, password: hashedPassword, name: VALID_NAME },
    });

    const token = await signToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: admin.id, email: admin.email, name: admin.name },
    });

    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

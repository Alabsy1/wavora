import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signCustomerToken } from "@/lib/customer-auth";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, customer.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signCustomerToken({
      id: customer.id,
      email: customer.email,
      name: customer.name,
      avatar: customer.avatar,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: customer.id, email: customer.email, name: customer.name, avatar: customer.avatar },
    });

    response.cookies.set("customer-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: unknown) {
    console.error("Customer login error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to log in";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

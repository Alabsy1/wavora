import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { signCustomerToken } from "@/lib/customer-auth";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = "alabsyabdelrhman@gmail.com";

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

    if (email === ADMIN_EMAIL) {
      const admin = await prisma.admin.findUnique({ where: { email } });
      if (!admin) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      const token = await signToken({
        id: admin.id,
        email: admin.email,
        name: admin.name,
      });

      const response = NextResponse.json({
        success: true,
        role: "admin",
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
      role: "customer",
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
    console.error("Login error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to log in";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

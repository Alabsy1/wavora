import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const PUBLIC_ADMIN_ROUTES = ["/admin/login"];
const PUBLIC_ADMIN_API_ROUTES = ["/api/admin/auth/login", "/api/admin/auth/check", "/api/site-flags"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (PUBLIC_ADMIN_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin-token");
      return response;
    }

    return NextResponse.next();
  }

  for (const route of PUBLIC_ADMIN_API_ROUTES) {
    if (pathname === route || pathname.startsWith(route + "/")) {
      return NextResponse.next();
    }
  }

  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

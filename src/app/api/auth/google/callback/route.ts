import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signCustomerToken } from "@/lib/customer-auth";

function getGoogleClientId() {
  return process.env.GOOGLE_CLIENT_ID ?? "";
}

function getGoogleClientSecret() {
  return process.env.GOOGLE_CLIENT_SECRET ?? "";
}

function getGoogleRedirectUri(origin: string) {
  return `${origin}/api/auth/google/callback`;
}

async function exchangeCode(code: string, origin: string) {
  const clientId = getGoogleClientId();
  const clientSecret = getGoogleClientSecret();
  const redirectUri = getGoogleRedirectUri(origin);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google token exchange failed: ${body}`);
  }

  return res.json() as Promise<{ access_token: string }>;
}

async function fetchGoogleUserInfo(accessToken: string) {
  const res = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Google user info");
  }

  return res.json() as Promise<{
    id: string;
    email: string;
    name: string;
    picture: string;
  }>;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams, origin } = request.nextUrl;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        new URL(`/?auth_error=${encodeURIComponent(error)}`, origin)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/?auth_error=no_code", origin)
      );
    }

    const clientId = getGoogleClientId();
    const clientSecret = getGoogleClientSecret();
    if (!clientId || !clientSecret) {
      return NextResponse.redirect(
        new URL("/?auth_error=not_configured", origin)
      );
    }

    const { access_token } = await exchangeCode(code, origin);
    const googleUser = await fetchGoogleUserInfo(access_token);

    const email = googleUser.email?.toLowerCase();
    if (!email) {
      return NextResponse.redirect(
        new URL("/?auth_error=no_email", origin)
      );
    }

    let customer = await prisma.customer.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        password: true,
      },
    });

    if (customer) {
      const updateData: Record<string, string> = {};
      if (!customer.name && googleUser.name) updateData.name = googleUser.name;
      if (!customer.avatar && googleUser.picture)
        updateData.avatar = googleUser.picture;

      if (Object.keys(updateData).length > 0) {
        customer = await prisma.customer.update({
          where: { email },
          data: updateData,
          select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
            password: true,
          },
        });
      }
    } else {
      const randomPassword = await (
        await import("bcryptjs")).default.hash(
        `google_${googleUser.id}_${Date.now()}`,
        12
      );

      customer = await prisma.customer.create({
        data: {
          email,
          name: googleUser.name || email.split("@")[0],
          avatar: googleUser.picture || "",
          password: randomPassword,
        },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          password: true,
        },
      });
    }

    const token = await signCustomerToken({
      id: customer.id,
      email: customer.email,
      name: customer.name,
      avatar: customer.avatar,
    });

    const response = NextResponse.redirect(new URL("/", origin));
    response.cookies.set("customer-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: unknown) {
    console.error("Google OAuth callback error:", error);
    const message =
      error instanceof Error ? error.message : "unknown_error";
    return NextResponse.redirect(
      new URL(`/?auth_error=${encodeURIComponent(message)}`, request.nextUrl.origin)
    );
  }
}

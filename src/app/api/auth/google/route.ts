import { NextRequest, NextResponse } from "next/server";

function getGoogleClientId() {
  return process.env.GOOGLE_CLIENT_ID ?? "";
}

function getGoogleRedirectUri(origin: string) {
  return `${origin}/api/auth/google/callback`;
}

export async function GET(request: NextRequest) {
  const clientId = getGoogleClientId();
  if (!clientId) {
    return NextResponse.json(
      { error: "Google OAuth is not configured" },
      { status: 501 }
    );
  }

  const { origin } = request.nextUrl;
  const redirectUri = getGoogleRedirectUri(origin);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}

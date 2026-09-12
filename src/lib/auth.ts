import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret) {
  throw new Error("JWT_SECRET environment variable is required but was not set.");
}
const secret = new TextEncoder().encode(rawSecret);

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
}

export async function signToken(payload: AdminPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAdmin(): Promise<AdminPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

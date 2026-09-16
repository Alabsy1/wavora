import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret) {
  throw new Error("JWT_SECRET environment variable is required but was not set.");
}
const secret = new TextEncoder().encode(rawSecret);

export interface CustomerPayload {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export async function signCustomerToken(payload: CustomerPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyCustomerToken(token: string): Promise<CustomerPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as CustomerPayload;
  } catch {
    return null;
  }
}

export async function getCustomerSession(): Promise<CustomerPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("customer-token")?.value;
  if (!token) return null;
  return verifyCustomerToken(token);
}

export async function requireCustomer(): Promise<CustomerPayload> {
  const session = await getCustomerSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

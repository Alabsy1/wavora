import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCustomerSession } from "@/lib/customer-auth";

export async function GET() {
  const adminSession = await getSession();
  if (adminSession) {
    return NextResponse.json({ authenticated: true, role: "admin", user: adminSession });
  }

  const customerSession = await getCustomerSession();
  if (customerSession) {
    return NextResponse.json({ authenticated: true, role: "customer", user: customerSession });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

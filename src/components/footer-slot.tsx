"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";

export function FooterSlot() {
  const pathname = usePathname();

  if (pathname === "/ocean-experience") {
    return null;
  }

  return <Footer />;
}
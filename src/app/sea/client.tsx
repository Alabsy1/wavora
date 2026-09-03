"use client";

import { useState } from "react";
import { SeaWaysIndex } from "@/components/sea/sea-ways-index";
import { SeaPackages } from "@/components/sea/sea-packages";
import { SeaCustomizer } from "@/components/sea/sea-customizer";
import { PackageDetailModal } from "@/components/sea/package-detail-modal";
import { InquiryModal } from "@/components/inquiry-modal";
import type { SeaPackage, IslandDestination } from "@prisma/client";

interface SeaPageClientProps {
  packages: SeaPackage[];
  destinations: IslandDestination[];
}

export function SeaPageClient({ packages, destinations }: SeaPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<{
    title: string;
    summary: string;
  } | null>(null);

  const [detailPkg, setDetailPkg] = useState<SeaPackage | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  function openModal(title: string, summary: string) {
    setSelectedTrip({ title, summary });
    setModalOpen(true);
  }

  function handleBookThisStyle(wayLabel: string) {
    openModal(
      `${wayLabel} Experience`,
      `Style: ${wayLabel} | Looking for a ${wayLabel.toLowerCase()} day on the Red Sea. Please suggest available packages.`,
    );
  }

  function handlePackageSelect(pkg: SeaPackage) {
    const inclusions: string[] = (() => {
      try { return JSON.parse(pkg.inclusions); } catch { return []; }
    })();
    openModal(
      pkg.title,
      `${pkg.duration} | ${pkg.boatType} | Up to ${pkg.maxGuests} guests | From $${pkg.priceFrom}${inclusions.length ? ` | Includes: ${inclusions.join(", ")}` : ""}`,
    );
  }

  function handleViewProgram(pkg: SeaPackage) {
    setDetailPkg(pkg);
    setDetailOpen(true);
  }

  function handleBookFromDetail(pkg: SeaPackage) {
    const inclusions: string[] = (() => {
      try { return JSON.parse(pkg.inclusions); } catch { return []; }
    })();
    openModal(
      pkg.title,
      `${pkg.duration} | ${pkg.boatType} | Up to ${pkg.maxGuests} guests | From $${pkg.priceFrom}${inclusions.length ? ` | Includes: ${inclusions.join(", ")}` : ""}`,
    );
  }

  function handleCustomizerBook(config: {
    packageTitle: string;
    duration: string;
    price: number;
    selectedIslands: string[];
    guests: number;
    addOns: string[];
  }) {
    const parts: string[] = [];
    parts.push(`Package: ${config.packageTitle}`);
    parts.push(`Duration: ${config.duration}`);
    parts.push(`Guests: ${config.guests}`);
    if (config.selectedIslands.length > 0) {
      parts.push(`Islands: ${config.selectedIslands.join(", ")}`);
    }
    if (config.addOns.length > 0) {
      parts.push(`Add-ons: ${config.addOns.join(", ")}`);
    }
    parts.push(`Est. Price: $${config.price}`);

    openModal(config.packageTitle, parts.join(" | "));
  }

  return (
    <>
      <SeaWaysIndex onBookThisStyle={handleBookThisStyle} />
      <SeaPackages
        packages={packages}
        onSelect={handlePackageSelect}
        onViewProgram={handleViewProgram}
      />
      <SeaCustomizer
        packages={packages}
        destinations={destinations}
        onBook={handleCustomizerBook}
      />

      <PackageDetailModal
        pkg={detailPkg}
        open={detailOpen}
        onClose={() => { setDetailOpen(false); setDetailPkg(null); }}
        onBook={handleBookFromDetail}
      />

      <InquiryModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedTrip(null); }}
        tripType="sea_package"
        tripTitle={selectedTrip?.title}
        summary={selectedTrip?.summary}
      />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ContentForm, type ContentFormData } from "@/components/admin/content-form";

export default function EditTripPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<ContentFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/trips/${id}`);
        if (!res.ok) throw new Error("Not found");
        const trip = await res.json();
        setData({
          id: trip.id,
          title: trip.title,
          slug: trip.slug,
          description: trip.description,
          location: trip.location,
          category: trip.category,
          tripType: trip.tripType ?? "DAILY_CRUISE",
          coverImage: trip.coverImage,
          heroVideo: trip.heroVideo,
          gallery: JSON.parse(trip.gallery || "[]"),
          duration: trip.duration,
          schedule: trip.schedule ?? "",
          priceFrom: trip.priceFrom,
          priceNote: trip.priceNote,
          tags: JSON.parse(trip.tags || "[]"),
          inclusions: JSON.parse(trip.inclusions || "[]"),
          itinerary: JSON.parse(trip.itinerary || "[]"),
          featured: trip.featured,
          visible: trip.visible,
          order: trip.order,
        });
      } catch {
        setError("Failed to load trip");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (<div className="flex items-center justify-center py-20"><div className="size-8 animate-spin rounded-full border-4 border-neutral-200 border-t-teal-500 dark:border-neutral-700 dark:border-t-teal-400" /></div>);
  }

  if (error || !data) {
    return (<div className="py-20 text-center"><p className="text-red-500">{error || "Trip not found"}</p></div>);
  }

  return <ContentForm type="trip" data={data} isNew={false} />;
}

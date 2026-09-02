"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ContentForm, type ContentFormData } from "@/components/admin/content-form";

export default function EditExperiencePage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<ContentFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/experiences/${id}`);
        if (!res.ok) throw new Error("Not found");
        const exp = await res.json();
        setData({
          id: exp.id,
          title: exp.title,
          slug: exp.slug,
          description: exp.description,
          location: exp.location,
          category: exp.category,
          tripType: "OTHER",
          coverImage: exp.coverImage,
          heroVideo: exp.heroVideo,
          gallery: JSON.parse(exp.gallery || "[]"),
          duration: exp.duration,
          schedule: "",
          priceFrom: exp.priceFrom,
          priceNote: exp.priceNote,
          tags: JSON.parse(exp.tags || "[]"),
          inclusions: [],
          itinerary: [],
          featured: exp.featured,
          visible: exp.visible,
          order: exp.order,
        });
      } catch {
        setError("Failed to load experience");
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
    return (<div className="py-20 text-center"><p className="text-red-500">{error || "Experience not found"}</p></div>);
  }

  return <ContentForm type="experience" data={data} isNew={false} />;
}

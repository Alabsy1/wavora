import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { experiences } from "@/data/experiences";
import { stays } from "@/data/stays";
import { spots } from "@/data/spots";
import { eats } from "@/data/eats";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = [
    "",
    "/explore",
    "/sea",
    "/adventures",
    "/stays",
    "/spots",
    "/eats",
    "/experiences",
    "/plan",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const experienceRoutes = experiences.map((experience) => ({
    url: `${base}/experience/${experience.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const stayRoutes = stays.map((stay) => ({
    url: `${base}/stay/${stay.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const spotRoutes = spots.map((spot) => ({
    url: `${base}/spot/${spot.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const eatRoutes = eats.map((eat) => ({
    url: `${base}/eat/${eat.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...experienceRoutes,
    ...stayRoutes,
    ...spotRoutes,
    ...eatRoutes,
  ];
}
import type { MetadataRoute } from "next";
import { getSiteSettingsForMetadata } from "@/sanity/lib/data";
import { publicRoutes } from "@/sanity/lib/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettingsForMetadata();
  const base = (settings.publicSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  return publicRoutes.map((route) => ({ url: `${base}${route === "/" ? "" : route}`, changeFrequency: "monthly", priority: route === "/" ? 1 : 0.7 }));
}

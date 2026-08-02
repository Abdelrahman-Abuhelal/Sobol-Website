import type { MetadataRoute } from "next";
import { getSiteSettingsForMetadata } from "@/sanity/lib/data";
import { publicRoutes } from "@/sanity/lib/types";
import { getArticleSitemapEntries } from "@/sanity/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, articles] = await Promise.all([getSiteSettingsForMetadata(), getArticleSitemapEntries()]);
  const base = (settings.publicSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  return [
    ...publicRoutes.map((route) => ({ url: `${base}${route === "/" ? "" : route}`, changeFrequency: "monthly" as const, priority: route === "/" ? 1 : 0.7 })),
    ...articles.map((article) => ({
      url: `${base}/blog/${article.slug}`,
      lastModified: article.updatedAt || article.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}

import type { MetadataRoute } from "next";
import { getPublicPageSitemapEntries, getSiteSettingsForMetadata } from "@/sanity/lib/data";
import { publicRoutes } from "@/sanity/lib/types";
import { getArticleSitemapEntries, getSolutionSitemapEntries } from "@/sanity/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, articles, solutions, publicPages] = await Promise.all([
    getSiteSettingsForMetadata(),
    getArticleSitemapEntries(),
    getSolutionSitemapEntries(),
    getPublicPageSitemapEntries(),
  ]);
  const base = (settings.publicSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const publicPageUpdates = new Map(publicPages.map((page) => [page.route, page.updatedAt]));
  return [
    ...publicRoutes.map((route) => ({
      url: `${base}${route === "/" ? "" : route}`,
      lastModified: publicPageUpdates.get(route),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
    })),
    ...solutions.map((page) => ({
      url: `${base}/services/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: "monthly" as const,
      priority: page.slug === "business-diagnosis" ? 0.9 : 0.8,
    })),
    ...articles.map((article) => ({
      url: `${base}/blog/${article.slug}`,
      lastModified: article.updatedAt || article.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}

import type { MetadataRoute } from "next";
import { getSiteSettingsForMetadata } from "@/sanity/lib/data";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettingsForMetadata();
  const base = (settings.publicSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  return {
    rules: [
      { userAgent: ["OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot"], allow: "/" },
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

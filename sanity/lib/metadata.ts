import type { Metadata } from "next";
import type { Seo, SiteSettings } from "@/sanity/lib/types";
import { editorialImageUrl } from "@/sanity/lib/image";

export function buildPageMetadata(path: string, seo: Seo | undefined, settings: SiteSettings): Metadata {
  const base = new URL(settings.publicSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  const title = seo?.metaTitle || settings.defaultSeoTitle;
  const description = seo?.metaDescription || settings.defaultSeoDescription;
  const openGraphTitle = seo?.openGraphTitle || title;
  const openGraphDescription = seo?.openGraphDescription || description;
  const image = seo?.openGraphImage || settings.defaultOpenGraphImage;
  const imageUrl = editorialImageUrl(image, 1200);
  const canonical = new URL(path, base).toString();

  return {
    metadataBase: base,
    title,
    description,
    alternates: { canonical },
    robots: seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website", locale: "ar_PS", url: canonical, siteName: settings.organizationName,
      title: openGraphTitle, description: openGraphDescription,
      images: imageUrl ? [{ url: imageUrl, alt: image?.alt || settings.organizationName }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary", title: openGraphTitle,
      description: openGraphDescription, images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

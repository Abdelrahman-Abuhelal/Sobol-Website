export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-20";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const studioUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:3000/studio"
  : `${siteUrl}/studio`;

export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
);

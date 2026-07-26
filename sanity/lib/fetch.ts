import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { isSanityConfigured } from "@/sanity/env";
import { previewClient, sanityClient } from "@/sanity/lib/client";

type FetchOptions = {
  query: string;
  params?: QueryParams;
  tag: string;
  stega?: boolean;
};

export async function sanityFetch<T>({ query, params = {}, tag, stega = true }: FetchOptions): Promise<T | null> {
  if (!isSanityConfigured) return null;

  const isDraft = (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  try {
    return await client.fetch<T>(query, params, {
      perspective: isDraft ? "drafts" : "published",
      useCdn: !isDraft,
      stega: isDraft && stega,
      ...(isDraft ? { cache: "no-store" } : { next: { tags: [tag] } }),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[sanity] Failed to fetch ${tag}; using fallback content.`, error);
    }
    return null;
  }
}

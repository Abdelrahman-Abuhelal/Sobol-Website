import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { isSanityConfigured } from "@/sanity/env";
import { previewClient, sanityClient } from "@/sanity/lib/client";

type FetchOptions = {
  query: string;
  params?: QueryParams;
  tag: string;
  stega?: boolean;
  requestless?: boolean;
};

export async function sanityFetch<T>({ query, params = {}, tag, stega = true, requestless = false }: FetchOptions): Promise<T | null> {
  if (!isSanityConfigured) return null;

  const isDraft = requestless ? false : (await draftMode()).isEnabled;
  const client = isDraft ? previewClient : sanityClient;

  try {
    return await client.fetch<T>(query, params, {
      perspective: isDraft ? "drafts" : "published",
      useCdn: !isDraft,
      stega: isDraft && stega,
      ...(isDraft ? { cache: "no-store" } : { next: { revalidate: 60, tags: [tag] } }),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[sanity] Failed to fetch ${tag}; using fallback content.`, error);
    }
    return null;
  }
}

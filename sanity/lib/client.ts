import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { studioUrl },
});

export const previewClient = sanityClient.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
  perspective: "drafts",
});

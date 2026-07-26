import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "@/sanity/lib/client";
import type { EditorialImage } from "@/sanity/lib/types";

const builder = createImageUrlBuilder(sanityClient);

export function editorialImageUrl(value?: EditorialImage, width = 896) {
  if (value?.image?.asset?._ref || value?.image?.asset?._id) {
    return builder.image(value.image).width(width).auto("format").url();
  }
  return value?.image?.asset?.url || value?.fallbackSrc;
}

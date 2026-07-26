import { NextResponse } from "next/server";
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { isSanityConfigured } from "@/sanity/env";
import { previewClient } from "@/sanity/lib/client";

const draftModeHandler = defineEnableDraftMode({ client: previewClient });

export async function GET(request: Request) {
  if (!isSanityConfigured || !process.env.SANITY_API_READ_TOKEN) {
    return NextResponse.json({ error: "Draft preview is not configured." }, { status: 503 });
  }
  return draftModeHandler.GET(request);
}

import {
  homepageLinkHeader,
  isPublicContentPath,
} from "@/lib/agent-discovery";
import { getSanityMarkdown } from "@/lib/sanity-agent-content";

export async function GET(request: Request) {
  const path =
    request.headers.get("x-agent-markdown-path") ??
    new URL(request.url).searchParams.get("path") ??
    "";
  if (!isPublicContentPath(path)) {
    return new Response("Not found", { status: 404 });
  }

  const markdown = await getSanityMarkdown(path);
  if (!markdown) return new Response("Not found", { status: 404 });

  const estimatedTokens = Math.ceil(
    new TextEncoder().encode(markdown).length / 4,
  );
  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Language": "ar",
    "Cache-Control": "public, max-age=0, must-revalidate",
    Vary: "Accept",
    "x-markdown-tokens": String(estimatedTokens),
  });
  if (path === "/") headers.set("Link", homepageLinkHeader());

  return new Response(markdown, { status: 200, headers });
}

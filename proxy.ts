import { NextRequest, NextResponse } from "next/server";
import {
  homepageLinkHeader,
  isPublicContentPath,
} from "@/lib/agent-discovery";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptsMarkdown = request.headers
    .get("accept")
    ?.toLowerCase()
    .split(",")
    .some((value) => value.trim().startsWith("text/markdown"));

  if (request.method === "GET" && acceptsMarkdown && isPublicContentPath(pathname)) {
    const markdownUrl = request.nextUrl.clone();
    markdownUrl.pathname = "/agent-markdown";
    markdownUrl.search = "";
    markdownUrl.searchParams.set("path", pathname);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-agent-markdown-path", pathname);
    return NextResponse.rewrite(markdownUrl, {
      request: { headers: requestHeaders },
    });
  }

  const response = NextResponse.next();
  if (isPublicContentPath(pathname)) {
    response.headers.append("Vary", "Accept");
    // Next's RSC renderer can replace Vary on the final HTML response. Avoid
    // cross-format browser/CDN cache reuse even when that happens.
    response.headers.set("Cache-Control", "private, no-store");
  }
  if (pathname === "/") {
    response.headers.set("Link", homepageLinkHeader());
  }
  return response;
}

export const config = { matcher: ["/", "/about", "/services/:path*", "/portfolio", "/blog/:path*", "/contact"] };

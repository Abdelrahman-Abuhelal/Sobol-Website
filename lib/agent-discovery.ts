export const SITE_NAME = "Sobol Business Development";
export const SITE_NAME_AR = "سُبُل لتطوير الأعمال";
export const MCP_PROTOCOL_VERSION = "2025-11-25";

export function requestOrigin(request: Request): string {
  const forwardedHost =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (forwardedHost && !/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(forwardedHost)) {
    const forwardedProtocol =
      request.headers.get("x-forwarded-proto") ??
      (new URL(request.url).protocol === "http:" ? "http" : "https");
    return `${forwardedProtocol}://${forwardedHost}`.replace(/\/$/, "");
  }
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  return new URL(request.url).origin;
}

export const publicPages = [
  { path: "/", title: "Home", titleAr: "الرئيسية" },
  { path: "/about", title: "About", titleAr: "من نحن" },
  { path: "/services", title: "Services", titleAr: "خدماتنا" },
  { path: "/portfolio", title: "Portfolio", titleAr: "أعمالنا" },
  { path: "/blog", title: "Blog", titleAr: "المدونة" },
  { path: "/contact", title: "Contact", titleAr: "تواصل معنا" },
] as const;

export const publicPagePaths = new Set<string>(
  publicPages.map((page) => page.path),
);

export function isPublicContentPath(path: string): boolean {
  if (publicPagePaths.has(path) || /^\/blog\/[^/]+$/.test(path)) return true;
  return /^\/services\/[^/]+$/.test(path);
}

export function homepageLinkHeader(): string {
  return [
    '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
    '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
    '</docs/api>; rel="service-doc"; type="text/markdown"',
    '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
    '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  ].join(", ");
}

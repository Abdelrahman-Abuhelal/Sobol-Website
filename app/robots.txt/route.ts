const CANONICAL_ORIGIN = "https://www.sobol.ps";

export function GET() {
  const lines = [
    "# Sobol permits search indexing and AI content retrieval.",
    "",
    "User-agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes, use=reference",
    "Allow: /",
    "Disallow: /studio",
    "Disallow: /api/",
    "",
    `Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`,
    "Host: www.sobol.ps",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

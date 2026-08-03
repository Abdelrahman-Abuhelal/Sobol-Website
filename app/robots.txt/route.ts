const CANONICAL_ORIGIN = "https://www.sobol.ps";

const searchAndAgentCrawlers = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

const trainingCrawlers = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "CCBot",
  "Bytespider",
  "Applebot-Extended",
];

export function GET() {
  const lines = [
    "# Sobol permits search indexing and user-directed AI retrieval, but not model training.",
    "",
    "User-agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference",
    "Allow: /",
    "Disallow: /studio",
    "Disallow: /api/",
    "",
    ...searchAndAgentCrawlers.flatMap((crawler) => [
      `User-agent: ${crawler}`,
      "Allow: /",
      "",
    ]),
    ...trainingCrawlers.flatMap((crawler) => [
      `User-agent: ${crawler}`,
      "Disallow: /",
      "",
    ]),
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

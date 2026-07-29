import { requestOrigin } from "@/lib/agent-discovery";

export function GET(request: Request) {
  const origin = requestOrigin(request);
  return Response.json(
    {
      linkset: [
        {
          anchor: `${origin}/api/contact`,
          "service-desc": [
            {
              href: `${origin}/openapi.json`,
              type: "application/openapi+json",
              title: "Sobol public API description",
            },
          ],
          "service-doc": [
            {
              href: `${origin}/docs/api`,
              type: "text/markdown",
              title: "Sobol public API documentation",
            },
          ],
          status: [
            {
              href: `${origin}/api/status`,
              type: "application/json",
              title: "Sobol API status",
            },
          ],
        },
        {
          anchor: `${origin}/mcp`,
          "service-desc": [
            {
              href: `${origin}/.well-known/mcp/server-card.json`,
              type: "application/json",
              title: "Sobol MCP Server Card",
            },
          ],
          "service-doc": [
            {
              href: `${origin}/docs/api#mcp`,
              type: "text/markdown",
              title: "Sobol MCP documentation",
            },
          ],
          status: [
            {
              href: `${origin}/api/status`,
              type: "application/json",
              title: "Sobol API status",
            },
          ],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/linkset+json",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

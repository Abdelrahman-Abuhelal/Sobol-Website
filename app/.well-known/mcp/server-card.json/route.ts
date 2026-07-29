import { requestOrigin } from "@/lib/agent-discovery";
import { buildServerCard } from "@/lib/mcp-server";

const discoveryHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=3600",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function GET(request: Request) {
  return Response.json(buildServerCard(requestOrigin(request)), {
    headers: discoveryHeaders,
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: discoveryHeaders });
}

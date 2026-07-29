import { sobolAgentSkill } from "@/lib/sobol-agent-skill";

export function GET() {
  return new Response(sobolAgentSkill, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

import { createHash } from "node:crypto";
import { requestOrigin } from "@/lib/agent-discovery";
import { sobolAgentSkill } from "@/lib/sobol-agent-skill";

export function GET(request: Request) {
  const origin = requestOrigin(request);
  const digest = createHash("sha256")
    .update(sobolAgentSkill, "utf8")
    .digest("hex");

  return Response.json(
    {
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      skills: [
        {
          name: "sobol-business-consulting",
          type: "skill-md",
          description:
            "Discover Sobol's consulting services and safely help a user choose a contact path.",
          url: `${origin}/.well-known/agent-skills/sobol-business-consulting/SKILL.md`,
          digest: `sha256:${digest}`,
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

import { getAgentContactChannels } from "@/lib/sanity-agent-content";

function authDocumentation(email: string) {
  return `# Sobol auth.md

## Agent audience

Public agents may read Sobol's pages, API catalog, OpenAPI description, Agent Skills index, and read-only MCP tools.

## Registration and provisioning

Sobol does not currently offer agent accounts, OAuth client registration, or a provisioning endpoint. No registration is needed for the published public resources.

## Supported method

Access is anonymous over HTTPS. Do not send API keys, bearer tokens, identity assertions, or other credentials.

## Credential use

No credentials are issued or accepted. The contact API is public, but submitting it sends a message to the Sobol team. Agents must obtain the user's explicit approval before sending a consultation request and should minimize personal data.

For questions, contact [${email}](mailto:${email}).
`;
}

export async function GET() {
  const { email } = await getAgentContactChannels();
  return new Response(authDocumentation(email), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

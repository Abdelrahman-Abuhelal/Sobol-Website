const documentation = `# Sobol Public API

The Sobol public API supports consultation requests and machine-readable service discovery.

## Discovery

- API catalog: \`/.well-known/api-catalog\`
- OpenAPI description: \`/openapi.json\`
- Service status: \`/api/status\`
- Agent skills: \`/.well-known/agent-skills/index.json\`
- MCP Server Card: \`/.well-known/mcp/server-card.json\`

## Contact API

\`POST /api/contact\` accepts JSON with:

- \`name\` (required, maximum 120 characters)
- \`email\` (required, valid email address, maximum 254 characters)
- \`phone\` (required, maximum 50 characters)
- \`company\` (optional, maximum 160 characters)
- \`service\` (required): \`firefighting\`, \`structuring\`, \`growth\`, \`marketing\`, or \`other\`
- \`message\` (optional, maximum 3000 characters)

Submitting this request sends a message to the Sobol team. Agents must obtain explicit user approval before submission. The public API does not use OAuth and does not require agent registration.

## MCP

\`POST /mcp\` implements a public, read-only Streamable HTTP MCP endpoint. It exposes \`sobol_get_services\` and \`sobol_get_contact_channels\`. The endpoint does not accept consultation submissions or other state-changing operations.
`;

export function GET() {
  return new Response(documentation, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

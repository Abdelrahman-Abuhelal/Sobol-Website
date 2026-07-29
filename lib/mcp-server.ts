import {
  MCP_PROTOCOL_VERSION,
  SITE_NAME,
} from "@/lib/agent-discovery";
import {
  getAgentContactChannels,
  getAgentServices,
} from "@/lib/sanity-agent-content";

export const mcpTools = [
  {
    name: "sobol_get_services",
    title: "Get Sobol services",
    description:
      "Returns Sobol's public business-development and marketing service categories. Read-only.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "sobol_get_contact_channels",
    title: "Get Sobol contact channels",
    description:
      "Returns Sobol's public email, phone, WhatsApp, and contact-page details. Read-only; does not send a message.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
  },
] as const;

export function buildServerCard(origin: string) {
  return {
    $schema:
      "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    version: "1.0",
    protocolVersion: MCP_PROTOCOL_VERSION,
    serverInfo: {
      name: "sobol-public",
      title: `${SITE_NAME} MCP Server`,
      version: "1.0.0",
    },
    description:
      "Public, read-only discovery of Sobol's consulting services and contact channels.",
    iconUrl: `${origin}/sobol.png`,
    documentationUrl: `${origin}/docs/api#mcp`,
    transport: { type: "streamable-http", endpoint: "/mcp" },
    capabilities: {
      tools: { listChanged: false },
      resources: { subscribe: false, listChanged: false },
    },
    authentication: { required: false, schemes: [] },
    instructions:
      "Use these read-only tools to learn about Sobol. They never submit a consultation request.",
    tools: mcpTools,
    resources: [
      {
        name: "sobol-mcp-server-card",
        title: "Sobol MCP Server Card",
        uri: "mcp://server-card.json",
        description: "Discovery metadata for this MCP server.",
        mimeType: "application/json",
      },
    ],
    prompts: [],
  };
}

export async function callMcpTool(name: string) {
  if (name === "sobol_get_services") {
    return getAgentServices();
  }
  if (name === "sobol_get_contact_channels") {
    return getAgentContactChannels();
  }
  return null;
}

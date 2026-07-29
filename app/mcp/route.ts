import { randomUUID } from "node:crypto";
import {
  MCP_PROTOCOL_VERSION,
  requestOrigin,
} from "@/lib/agent-discovery";
import {
  buildServerCard,
  callMcpTool,
  mcpTools,
} from "@/lib/mcp-server";

type JsonRpcRequest = {
  jsonrpc?: unknown;
  id?: unknown;
  method?: unknown;
  params?: unknown;
};

function jsonRpcResult(id: unknown, result: unknown, headers?: HeadersInit) {
  return Response.json(
    { jsonrpc: "2.0", id: id ?? null, result },
    { headers },
  );
}

function jsonRpcError(
  id: unknown,
  code: number,
  message: string,
  status = 200,
) {
  return Response.json(
    { jsonrpc: "2.0", id: id ?? null, error: { code, message } },
    { status },
  );
}

function allowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const requestUrlOrigin = new URL(request.url).origin;
  const publicOrigin = requestOrigin(request);
  return origin === requestUrlOrigin || origin === publicOrigin;
}

export async function POST(request: Request) {
  if (!allowedOrigin(request)) {
    return jsonRpcError(null, -32000, "Origin is not allowed.", 403);
  }

  let message: JsonRpcRequest;
  try {
    message = (await request.json()) as JsonRpcRequest;
  } catch {
    return jsonRpcError(null, -32700, "Parse error.", 400);
  }

  if (
    !message ||
    Array.isArray(message) ||
    message.jsonrpc !== "2.0" ||
    typeof message.method !== "string"
  ) {
    return jsonRpcError(message?.id, -32600, "Invalid Request.", 400);
  }

  if (message.method === "notifications/initialized") {
    return new Response(null, { status: 202 });
  }

  if (message.method === "initialize") {
    const headers = new Headers({
      "Mcp-Session-Id": randomUUID(),
      "MCP-Protocol-Version": MCP_PROTOCOL_VERSION,
    });
    return jsonRpcResult(
      message.id,
      {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: {
          tools: { listChanged: false },
          resources: { subscribe: false, listChanged: false },
        },
        serverInfo: {
          name: "sobol-public",
          title: "Sobol Business Development MCP Server",
          version: "1.0.0",
        },
        instructions:
          "Use the read-only tools to learn about Sobol services and public contact channels.",
      },
      headers,
    );
  }

  if (message.method === "ping") {
    return jsonRpcResult(message.id, {});
  }

  if (message.method === "tools/list") {
    return jsonRpcResult(message.id, { tools: mcpTools });
  }

  if (message.method === "tools/call") {
    const params =
      message.params && typeof message.params === "object"
        ? (message.params as Record<string, unknown>)
        : {};
    const result =
      typeof params.name === "string" ? await callMcpTool(params.name) : null;
    if (!result) {
      return jsonRpcError(message.id, -32602, "Unknown tool name.");
    }
    return jsonRpcResult(message.id, {
      content: [{ type: "text", text: JSON.stringify(result) }],
      structuredContent: result,
      isError: false,
    });
  }

  if (message.method === "resources/list") {
    return jsonRpcResult(message.id, {
      resources: [
        {
          name: "sobol-mcp-server-card",
          title: "Sobol MCP Server Card",
          uri: "mcp://server-card.json",
          description: "Discovery metadata for this MCP server.",
          mimeType: "application/json",
        },
      ],
    });
  }

  if (message.method === "resources/read") {
    const params =
      message.params && typeof message.params === "object"
        ? (message.params as Record<string, unknown>)
        : {};
    if (params.uri !== "mcp://server-card.json") {
      return jsonRpcError(message.id, -32602, "Unknown resource URI.");
    }
    return jsonRpcResult(message.id, {
      contents: [
        {
          uri: "mcp://server-card.json",
          mimeType: "application/json",
          text: JSON.stringify(buildServerCard(requestOrigin(request))),
        },
      ],
    });
  }

  return jsonRpcError(message.id, -32601, "Method not found.");
}

export function GET() {
  return new Response(null, {
    status: 405,
    headers: { Allow: "POST, OPTIONS" },
  });
}

export function OPTIONS(request: Request) {
  if (!allowedOrigin(request)) return new Response(null, { status: 403 });
  const origin = request.headers.get("origin");
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin ?? requestOrigin(request),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id",
      Vary: "Origin",
    },
  });
}

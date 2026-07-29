"use client";

import { useEffect } from "react";
import { publicPages } from "@/lib/agent-discovery";

type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<unknown>;
};

type ModelContext = {
  registerTool: (
    tool: ToolDefinition,
    options?: { signal?: AbortSignal },
  ) => Promise<void>;
};

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
}

export function WebMcpTools() {
  useEffect(() => {
    const modelContext = document.modelContext;
    if (!modelContext) return;

    const controller = new AbortController();
    const options = { signal: controller.signal };
    const tools: ToolDefinition[] = [
      {
        name: "sobol_get_services",
        title: "Get Sobol services",
        description:
          "Returns Sobol's public business-development and marketing service categories. This is read-only and does not submit a request.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true },
        execute: async () => {
          const response = await fetch("/services", {
            headers: { Accept: "text/markdown" },
          });
          if (!response.ok) {
            throw new Error("Could not load Sobol services.");
          }
          return {
            contentType: response.headers.get("content-type"),
            markdown: await response.text(),
          };
        },
      },
      {
        name: "sobol_get_site_map",
        title: "Get Sobol site map",
        description:
          "Returns the public pages available on the Sobol website. This is read-only and does not navigate the browser.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true },
        execute: async () => ({ pages: publicPages }),
      },
      {
        name: "sobol_open_page",
        title: "Open a Sobol page",
        description:
          "Navigates this browser tab to one public Sobol page. It does not submit forms or send information.",
        inputSchema: {
          type: "object",
          properties: {
            path: {
              type: "string",
              enum: publicPages.map((page) => page.path),
              description: "Public site path to open.",
            },
          },
          required: ["path"],
          additionalProperties: false,
        },
        execute: async ({ path }) => {
          if (
            typeof path !== "string" ||
            !publicPages.some((page) => page.path === path)
          ) {
            throw new Error("Unsupported Sobol page path.");
          }
          window.location.assign(path);
          return { navigatedTo: path };
        },
      },
    ];

    void Promise.all(
      tools.map((tool) => modelContext.registerTool(tool, options)),
    ).catch((error: unknown) => {
      if (!controller.signal.aborted) {
        console.warn("WebMCP tool registration failed.", error);
      }
    });

    return () => controller.abort();
  }, []);

  return null;
}

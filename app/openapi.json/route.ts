import { requestOrigin } from "@/lib/agent-discovery";

export function GET(request: Request) {
  const origin = requestOrigin(request);
  return Response.json(
    {
      openapi: "3.1.0",
      info: {
        title: "Sobol Public API",
        version: "1.0.0",
        description:
          "Public endpoints for submitting a business consultation request and checking service availability.",
      },
      servers: [{ url: origin }],
      paths: {
        "/api/contact": {
          post: {
            operationId: "submitConsultationRequest",
            summary: "Submit a consultation request",
            description:
              "Sends the supplied business contact request to the Sobol team. This operation has an external side effect and should only be called with the user's explicit approval.",
            security: [],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["name", "phone", "service"],
                    additionalProperties: false,
                    properties: {
                      name: { type: "string", maxLength: 120 },
                      phone: { type: "string", maxLength: 50 },
                      company: { type: "string", maxLength: 160 },
                      service: {
                        type: "string",
                        enum: [
                          "firefighting",
                          "structuring",
                          "growth",
                          "marketing",
                          "other",
                        ],
                      },
                      message: { type: "string", maxLength: 3000 },
                      website: {
                        type: "string",
                        maxLength: 100,
                        description:
                          "Honeypot field. Legitimate clients must omit it or send an empty string.",
                      },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Request accepted",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      required: ["ok"],
                      properties: { ok: { const: true } },
                    },
                  },
                },
              },
              "400": { description: "Invalid request" },
              "502": { description: "Message delivery failed" },
              "503": { description: "Contact service is not configured" },
            },
          },
        },
        "/api/status": {
          get: {
            operationId: "getApiStatus",
            summary: "Check API availability",
            security: [],
            responses: {
              "200": {
                description: "API is available",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      required: ["status", "service"],
                      properties: {
                        status: { const: "ok" },
                        service: { const: "sobol-public-api" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/openapi+json",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

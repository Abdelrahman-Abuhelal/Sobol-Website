# Cloudflare Agent Readiness Audit

## Purpose

This document records the issues found by Cloudflare's **Is Your Site Agent-Ready?** scan so they can be reviewed, prioritized, implemented, and verified.

> Important: the scan was run against `https://sobol.ps`, which redirected to `https://www.sobol.ps`. Before implementing any domain-specific changes, confirm that this is the production domain for this repository.

## Scan baseline

| Field | Result |
| --- | --- |
| Scanned origin | `https://www.sobol.ps` |
| Requested URL | `https://sobol.ps` |
| Scan date | July 29, 2026 at 3:16:56 PM |
| Overall score | 29 |
| Readiness level | Level 2 — Bot-Aware |
| Discoverability | 50% — 2/4 |
| Content | 0% — 0/1 |
| Bot access control | 100% — 2/2 |
| API, auth, MCP, and skill discovery | 0% — 0/7 |
| Commerce | Not checked; no e-commerce signals detected |

The original pasted scan output is stored outside the repository at:

`C:\Users\Abdelraman\.codex\attachments\4976cc62-5a8b-4322-ab58-4b9c7242c506\pasted-text.txt`

## What already passes

- [x] A valid `robots.txt` is available with valid `User-agent` directives.
- [x] `robots.txt` advertises a valid XML sitemap.
- [x] AI-bot rules exist for GPTBot, Google-Extended, CCBot, Bytespider, Applebot-Extended, Amazonbot, and Meta-ExternalAgent.
- [x] At least one Cloudflare Content-Signal directive is present in `robots.txt`.

These controls should be preserved while making future changes.

## Remediation backlog

Status values: **Open**, **In progress**, **Blocked**, **Done**, or **Not applicable**.

### AR-01 — Add agent-discovery Link headers

- **Status:** Open
- **Suggested priority:** High
- **Area:** Application / hosting configuration
- **Finding:** The homepage response contains no `Link` headers.
- **Evidence:** `GET /` returned `200` without a `Link` response header.
- **Target outcome:** The homepage advertises only the discovery resources that the site actually supports.
- **Implementation note:** Use RFC 8288 response headers such as `rel="api-catalog"` or `rel="service-doc"` after the corresponding resource exists. Do not advertise placeholder or nonexistent endpoints.
- **Verification:** Inspect the production homepage response headers and rerun the Cloudflare scan.

### AR-02 — Publish DNS for AI Discovery records

- **Status:** Open
- **Suggested priority:** Low / experimental
- **Area:** Cloudflare DNS
- **Finding:** No DNS-AID records were found at the well-known `_index`, `_a2a`, or `_mcp` agent entry points for either the apex or `www` host.
- **Evidence:** SVCB, HTTPS, and fallback TXT queries returned `NXDOMAIN`.
- **Target outcome:** Publish only the DNS discovery records that correspond to real agent endpoints.
- **Implementation note:** This requires Cloudflare DNS changes, not only a code change. The scan recommends ServiceMode SVCB/HTTPS records and DNSSEC. Confirm the current DNS-AID draft and Cloudflare support before implementation because this is an emerging standard.
- **Verification:** Query the intended records over DNS and rerun the scan.

### AR-03 — Support Markdown content negotiation

- **Status:** Open
- **Suggested priority:** High
- **Area:** Application / Cloudflare
- **Finding:** Requests that prefer Markdown still receive HTML.
- **Evidence:** `GET /` with `Accept: text/markdown` returned `Content-Type: text/html; charset=utf-8`.
- **Target outcome:** Eligible public pages return a faithful Markdown representation when `Accept: text/markdown` is requested, while browsers continue receiving HTML.
- **Implementation note:** This may be implemented at Cloudflare's edge or in Next.js. Add the correct `Vary` behavior to prevent caches from serving Markdown to normal browsers. If available, include Cloudflare's `x-markdown-tokens` response metadata.
- **Verification:** Request representative pages with and without `Accept: text/markdown`; confirm content type, content quality, caching behavior, Arabic text, and RTL page behavior.

### AR-04 — Decide whether to publish Web Bot Auth metadata

- **Status:** Open
- **Suggested priority:** Low
- **Area:** Hosting / bot security
- **Finding:** `/.well-known/http-message-signatures-directory` returns `404`.
- **Target outcome:** Either publish a valid Web Bot Auth directory if authenticated bot requests are required, or mark this finding **Not applicable**.
- **Implementation note:** The scored Bot Access Control checks already pass. Treat this as optional until there is a concrete need to verify signed agent traffic.
- **Verification:** Request the well-known endpoint and validate its contents, if implemented.

### AR-05 — Decide whether an API catalog is applicable

- **Status:** Open
- **Suggested priority:** Medium if a public API exists; otherwise Not applicable
- **Area:** API discovery
- **Finding:** `/.well-known/api-catalog` returns `404`.
- **Target outcome:** If the clinic exposes a real API for agents, publish an RFC 9727 `application/linkset+json` catalog. Otherwise explicitly mark this item **Not applicable**.
- **Implementation note:** A catalog should link only to real API descriptions, documentation, and status resources. Do not create a misleading catalog solely to improve the score.
- **Verification:** Confirm the endpoint content type and validate every advertised URL.

### AR-06 — Decide whether OAuth or OIDC discovery is applicable

- **Status:** Open
- **Suggested priority:** Medium if protected APIs exist; otherwise Not applicable
- **Area:** Authentication
- **Finding:** Both `/.well-known/openid-configuration` and `/.well-known/oauth-authorization-server` return `404`.
- **Target outcome:** If agents must authenticate to a clinic API, publish standards-compliant OAuth 2.0 or OpenID Connect metadata. Otherwise mark this item **Not applicable**.
- **Implementation note:** Do not invent authorization, token, JWKS, or issuer endpoints. This work requires a real authorization server and a security review.
- **Verification:** Validate the discovery document against the deployed identity provider and test the advertised authorization flow.

### AR-07 — Decide whether OAuth Protected Resource Metadata is applicable

- **Status:** Open
- **Suggested priority:** Medium if protected APIs exist; otherwise Not applicable
- **Area:** Authentication
- **Finding:** `/.well-known/oauth-protected-resource` returns `404`, and the homepage does not advertise authentication through `WWW-Authenticate`.
- **Target outcome:** If the site exposes a protected agent resource, publish RFC 9728 metadata with its resource identifier, authorization servers, and supported scopes.
- **Dependency:** AR-06 and a real protected API.
- **Verification:** Validate the metadata and confirm that protected endpoints issue correct authentication challenges.

### AR-08 — Decide whether `auth.md` agent registration is applicable

- **Status:** Open
- **Suggested priority:** Low unless third-party agents can register
- **Area:** Authentication / documentation
- **Finding:** `/auth.md` returns `404`.
- **Target outcome:** Publish agent registration instructions only if the service supports agent identities and registration; otherwise mark this item **Not applicable**.
- **Dependencies:** AR-06 and AR-07.
- **Verification:** Confirm `/auth.md` is accurate and that every described registration, claims, credential, and revocation flow works.

### AR-09 — Decide whether to expose an MCP server

- **Status:** Open
- **Suggested priority:** Medium only if the clinic will offer agent actions; otherwise Not applicable
- **Area:** MCP
- **Finding:** No MCP Server Card was found at any candidate well-known path.
- **Evidence:** The following returned `404`:
  - `/.well-known/mcp/server-cards.json`
  - `/.well-known/mcp/server-card.json`
  - `/.well-known/mcp.json`
- **Target outcome:** If a real MCP server is created, publish a standards-aligned Server Card describing its identity, version, transport endpoint, and capabilities.
- **Implementation note:** The scan identifies the schema as still being standardized. Recheck the current MCP specification before implementation.
- **Verification:** Validate the Server Card and perform an MCP client connection against the advertised transport.

### AR-10 — Decide whether to publish an Agent Skills index

- **Status:** Open
- **Suggested priority:** Medium only if downloadable agent skills will be maintained; otherwise Not applicable
- **Area:** Agent skill discovery
- **Finding:** Neither the current nor legacy Agent Skills index path exists.
- **Evidence:** Both `/.well-known/agent-skills/index.json` and `/.well-known/skills/index.json` returned `404`.
- **Target outcome:** If the project provides agent skills, publish a valid index containing the schema, skill name, type, description, URL, and SHA-256 digest.
- **Implementation note:** Each listed skill must exist, be safe to distribute, and have a digest that matches the served file.
- **Verification:** Validate the index schema, URLs, and digests.

### AR-11 — Decide whether to expose browser actions through WebMCP

- **Status:** Open
- **Suggested priority:** Medium for agent-assisted booking or contact flows; otherwise Low
- **Area:** Frontend / browser agents
- **Finding:** No tools were registered through `navigator.modelContext`.
- **Target outcome:** If supported by the production browser environment and product strategy, expose a small set of safe, high-value actions such as viewing clinic details or preparing a WhatsApp appointment message.
- **Implementation note:** Avoid exposing sensitive patient data or autonomous medical/booking actions without explicit confirmation, validation, abuse controls, and privacy review. Recheck the current WebMCP specification and browser support before implementation.
- **Verification:** Load the production page in a supporting browser and inspect registered tools, input schemas, confirmation boundaries, and execution behavior.

## Commerce checks

Cloudflare detected no e-commerce signals, so the following checks did not affect the score:

- x402 payment protocol
- Machine Payment Protocol (MPP)
- Universal Commerce Protocol (UCP)
- Agentic Commerce Protocol (ACP)

For a clinic website whose primary conversion is WhatsApp contact or appointment requests, these should remain **Not applicable** unless the product later introduces machine-readable purchasing or payment flows.

## Recommended implementation order

1. Confirm that `sobol.ps` is the correct deployment domain and capture a fresh baseline.
2. Implement Markdown negotiation (AR-03).
3. Add truthful discovery `Link` headers after their target resources exist (AR-01).
4. Decide whether the clinic needs any public or protected agent API.
5. Mark inapplicable API/auth items clearly instead of creating empty endpoints.
6. If agent actions are part of the product strategy, design the action surface first, then evaluate MCP, Agent Skills, and WebMCP.
7. Consider DNS-AID only after stable discovery endpoints exist.
8. Rerun the scan and record the new score and date below.

## Verification log

| Date | Environment | Score | Level | Notes |
| --- | --- | --- | --- | --- |
| 2026-07-29 | Production scan of `www.sobol.ps` | 29 | Level 2 — Bot-Aware | Initial baseline |


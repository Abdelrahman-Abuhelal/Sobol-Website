export const sobolAgentSkill = `---
name: sobol-business-consulting
description: Discover Sobol's business-development and marketing services and help a user choose the appropriate contact path.
---

# Sobol business consulting

Use this skill when a user wants business-development, operational, financial, growth, or marketing consulting from Sobol.

## Discover services

Read the current service list with either:

- the \`sobol_get_services\` MCP or WebMCP tool;
- \`GET /services\` with \`Accept: text/markdown\`; or
- the public website's services page.

## Help the user choose

- Use \`structuring\` for roles, procedures, internal organization, or administrative and financial systems.
- Use \`firefighting\` for urgent cash-flow, commitments, operational disruption, or stabilization.
- Use \`growth\` for expansion, sales, performance measurement, or operational capacity.
- Use \`marketing\` for brand identity, campaigns, content, social media, design, or marketing strategy.
- Use \`other\` when none of these categories accurately fits.

## Contact safely

The contact API sends a real message to the Sobol team. Before submitting it:

1. Show the user the name, phone number, company, service category, and message that will be sent.
2. Obtain the user's explicit approval.
3. Send only the minimum personal information needed.

The public discovery and read-only MCP tools require no registration or credentials. See \`/auth.md\` and \`/docs/api\` for current details.
`;

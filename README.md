# Mastra MCP Workshop

We’re building a code agent that itself is able to build other Mastra agents when prompted.

- We'll use Mastra's new Cursor/Windsurf integration (`@mastra/mcp-docs-server`)
- We’ll look at how to use MCP with Mastra via a few MCP registries
- Then we’ll build a code agent

## MCP Docs Server

https://mastra.ai/docs/getting-started/mcp-docs-server

Scaffold a project, open it in your editor, and ask it to "Add memory to my agent"

## MCP Registries

[Composio.dev](https://mcp.composio.dev)
[MCP.run](https://www.mcp.run/registry)
[Smithery.ai](https://smithery.ai)
[OpenTools](https://opentools.com)

There are examples in this repo for Composio, MCP.run, and Smithery.

- You will need the following env vars
  - For all: `ANTHROPIC_API_KEY` (code example) and `OPENAI_API_KEY` (all other examples)
  - For Composio: `COMPOSIO_SHEETS_SSE_URL` and `COMPOSIO_GMAIL_SSE_URL`
  - For MCP.run: `MCP_RUN_SSE_URL`
- `pnpm install`
- `pnpm run tui`
- Select the example you want using the TUI

## Coding Agent

There are two main ways to use MCP

1. In a single user setup for automation purposes where you have a single auth connection to each integrated service. In this setup you only need a single MCP configuration for each service
2. In a multi-tenant setup - for example you make an app where agents can manage emails for your customers. In this setup you need to authenticate separately for each user

Today we’re going to focus on the first use case because it’s an easier intro to using MCP. Our next MCP workshop will cover using MCP with multiple users.

We're going to build a coding agent that can build other Mastra agents.

This coding agent needs a few things:

- A good system prompt
- The Mastra docs mcp
- shell access
- filesystem access
- the ability to search the web would be helpful

It would also be helpful for a coding agent to have these features, but they aren't part of this repo due to complexity. Perhaps we will see a good MCP server for this sometime soon!:

- LSP + code indexing and search
- Human in the loop to approve/deny shell commands and file edits

## Building your own MCP server

We'll most likely have another MCP workshop in the future talking about this more in depth. For now the `@mastra/mcp-docs-server` code is OSS and free to browse and use as a starting point for your own server.
https://github.com/mastra-ai/mastra/blob/main/packages/mcp-docs-server/src/index.ts

## Future of MCP

.well-known/mcp.json spec: https://github.com/orgs/modelcontextprotocol/discussions/84
Our take on where MCP is going and where it should go: https://mastra.ai/blog/mastra-mcp
Official registry: https://github.com/orgs/modelcontextprotocol/discussions/159
Stateless MCP: https://github.com/modelcontextprotocol/specification/pull/206

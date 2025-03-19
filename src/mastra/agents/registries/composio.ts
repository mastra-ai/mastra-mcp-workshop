/*
 * Composio example
 * https://mcp.composio.dev
 *
 * new MCPConfiguration() connects and manages multiple MCP servers
 * https://mastra.ai/docs/reference/tools/mcp-configuration
 *
 * */
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { MCPConfiguration } from "@mastra/mcp";
import { Memory } from "@mastra/memory";

// Create MCP configuration for both servers
const mcp = new MCPConfiguration({
  servers: {
    googleSheets: {
      url: new URL(
        // "https://mcp.composio.dev/googlesheets/[private-url]",
        process.env.COMPOSIO_SHEETS_SSE_URL!,
      ),
    },
    gmail: {
      // "https://mcp.composio.dev/gmail/[private-url]",
      url: new URL(process.env.COMPOSIO_GMAIL_SSE_URL!),
    },
  },
});

export const agent = new Agent({
  name: "Composio.dev Agent",
  instructions: `
      You are a helpful assistant that tests composio tool calls
`,
  model: openai("gpt-4o"),

  // connects to MCP client and gets tools
  tools: await mcp.getTools(),

  // add memory so the agent can maintain a coherent conversation
  memory: new Memory({
    options: {
      lastMessages: 10,
    },
  }),
});

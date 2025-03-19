/*
 * Smithery example
 *
 * new MCPConfiguration() connects and manages multiple MCP servers
 * https://mastra.ai/docs/reference/tools/mcp-configuration
 *
 * */
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { MCPConfiguration } from "@mastra/mcp";
import { Memory } from "@mastra/memory";

const mcp = new MCPConfiguration({
  servers: {
    sequentialThinking: {
      command: "npx",
      args: [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@smithery-ai/server-sequential-thinking",
        "--config",
        "{}",
      ],
    },

    perplexitySearch: {
      command: "npx",
      args: [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@arjunkmrm/perplexity-search",
        "--client",
        "claude",
        "--config",
        `{\"perplexityApiKey\":\"${process.env.PPLX_API_KEY!}\"}`,
      ],
    },
  },
});

export const agent = new Agent({
  name: "Smithery.ai Test Agent",
  instructions: `
      You are a helpful assistant that tests tool calls
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

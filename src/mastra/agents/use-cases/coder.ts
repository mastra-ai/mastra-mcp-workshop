/*
 * Coder agent example
 *
 * new MCPConfiguration() connects and manages multiple MCP servers
 * https://mastra.ai/docs/reference/tools/mcp-configuration
 *
 * */
import { Agent } from "@mastra/core/agent";
import { MCPConfiguration } from "@mastra/mcp";
import { Memory } from "@mastra/memory";
import { anthropic } from "@ai-sdk/anthropic";

const mcp = new MCPConfiguration({
  servers: {},
});

export const agent = new Agent({
  name: "Coding agent",
  instructions: `
  You are a helpful coding agent.
`,
  model: anthropic("claude-3-5-sonnet-latest"),

  // connects to MCP client and gets tools
  tools: await mcp.getTools(),

  memory: new Memory({
    options: {
      lastMessages: 10,
    },
  }),
});

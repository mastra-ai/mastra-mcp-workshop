/*
 * MCP.run example
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
    mcpRun: {
      // this is a private URL generated in the MCP.run dashboard
      // looks something like https://www.mcp.run/api/mcp/sse?nonce=NONCE&username=USER&profile=PROFILE&sig=SIG
      url: new URL(process.env.MCP_RUN_SSE_URL!),
    },
  },
});

export const agent = new Agent({
  name: "MCP.run Test Agent",
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

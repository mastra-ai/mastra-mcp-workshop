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
import { prompts } from "../prompts.js";
import { getDirectoryFileList } from "./utils.js";

const mcp = new MCPConfiguration({
  servers: {
    mastra: {
      command: "pnpx",
      args: ["@mastra/mcp-docs-server"],
    },
    shell: {
      command: "pnpx",
      args: ["@dillip285/mcp-terminal", "--allowed-paths", process.cwd()],
      env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
      },
    },

    textEditor: {
      command: "pnpx",
      args: ["@modelcontextprotocol/server-filesystem", process.cwd()],
    },
  },
});

export const agent = new Agent({
  name: "Coding agent",
  instructions: `
  ${prompts.programming.prompt}
Make sure you check available documentation if you're not 100% sure about something.
Always check the Mastra docs before editing or adding Mastra features to an agent

cwd: ${process.cwd()}
files: ${getDirectoryFileList(process.cwd())}
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

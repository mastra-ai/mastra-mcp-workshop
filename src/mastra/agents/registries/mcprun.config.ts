import { prompts } from "../prompts.js";

// this config is for our tui.ts file, it's not a Mastra feature
export const config = {
  name: "MCP.run",
  prompts: [prompts.kyoto_short.prompt, prompts.kyoto_long.prompt],
};

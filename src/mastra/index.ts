import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { agent as composio } from "./agents/registries/composio.js";
// import { agent as mcprun } from "./agents/registries/mcprun.js";
// import { agent as smithery } from "./agents/registries/smithery.js";

export const mastra = new Mastra({
  agents: { composio },
  logger: createLogger({
    name: "Mastra",
    level: "debug",
  }),
});

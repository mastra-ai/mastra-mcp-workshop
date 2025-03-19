import { prompts } from "../prompts.js";

// this config is for our tui.ts file, it's not a Mastra feature
export const config = {
  name: "Composio.dev",
  prompts: [
    prompts.most_important_emails.prompt,
    prompts.who_am_i_emails.prompt,
  ],
};

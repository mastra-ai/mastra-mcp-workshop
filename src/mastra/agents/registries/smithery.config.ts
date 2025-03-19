import { prompts } from "../prompts.js";

// this config is for our tui.ts file, it's not a Mastra feature
export const config = {
  name: "Smithery.ai",
  prompts: [
    prompts.puzzle_friends_pets.prompt,
    prompts.eco_friendly_clothing_line.prompt,
    prompts.meaning_of_life.prompt,
  ],
};

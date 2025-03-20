export const prompts = {
  kyoto_long: {
    description: `Plan a trip to kyoto (long)`,

    prompt: `You've been asked to plan a 3-day vacation to Kyoto, Japan for a family of four (two adults, two teenagers) with the following constraints:

The trip will take place in mid-April 2025
The family has a moderate budget of $3,000 for activities and local transportation
The family is interested in experiencing:

Traditional Japanese culture
Food experiences
Some outdoor activities
At least one lesser-known attraction


One family member has limited mobility and can walk for about 30 minutes at a time
The family prefers to use public transportation when possible

Use the sequential thinking tool to create an optimal 3-day itinerary. You will need to research and consider:

Cherry blossom season timing and popular viewing locations
Major cultural attractions in Kyoto and their accessibility
Public transportation options and logistics
Restaurant recommendations for authentic experiences
Weather considerations for April
Strategies for avoiding the most crowded tourist periods
Budget allocation across activities
Special events or festivals that might be happening in April 2025

For each recommended location or activity, include approximate costs, accessibility information, and transportation options. Make necessary revisions if you discover constraints or opportunities that affect your earlier planning decisions.`,
  },
  kyoto_short: {
    description: `Plan a trip to Kyoto (short)`,

    prompt: `
You need to plan a single perfect day in Kyoto, Japan for a couple visiting in April 2025. They have the following requirements:

They want to experience cherry blossom viewing at one optimal location
They need recommendations for one authentic lunch spot and one dinner restaurant
They want to visit one major cultural site and one lesser-known attraction
They have a total budget of $300 for the day (excluding accommodations)
One person has mild mobility issues and prefers minimal walking

Use the sequential thinking tool to create the optimal day plan. You'll need to research:

The best cherry blossom viewing spot for their specific needs
Current pricing for cultural attractions in Kyoto
Transportation options between locations
Restaurant options that fit their budget and provide authentic experiences
How to balance popular and lesser-known attractions in a single day

Provide specific recommendations with approximate costs and travel times between locations. Be prepared to revise your recommendations if you discover constraints that affect your initial choices.
`,
  },

  puzzle_friends_pets: {
    prompt:
      "You are given the following puzzle: \nFive friends (Alex, Blake, Casey, Dana, and Eli) each own exactly one pet (dog, cat, bird, fish, or rabbit) and live in different-colored houses (red, blue, green, yellow, or white) on the same street, numbered consecutively from 1 to 5. Based on the following clues, determine who lives where and with which pet. \nClues: \nThe person who owns the dog lives in the green house.\nAlex lives in house #3.\nThe owner of the cat lives next door to the owner of the rabbit.\nBlake lives in the white house.\nCasey lives next door to the person with the fish.\nDana lives in house #1.\nThe person in the red house owns the bird.\nEli lives next door to Blake.\nHouse #4 is blue.\nThe person with the rabbit lives in house #5.\nUse the sequential thinking tool to solve this logic puzzle step by step, adjusting your approach as needed when you encounter constraints or contradictions. Make sure to verify your final solution against all the given clues.",
  },

  eco_friendly_clothing_line: {
    prompt:
      "Imagine a company is planning to launch a new eco-friendly product line. The goal is to create a sustainable product that appeals to environmentally conscious consumers while maintaining cost-effectiveness. Use the sequential thinking tool to outline a step-by-step plan for this project, considering potential challenges and alternative strategies at each stage. Start with initial concept and research, move through design and development, supply chain and production, marketing and launch strategy, and finally, feedback and iteration. Ensure to explore branching paths and revisions where necessary",
  },

  meaning_of_life: {
    prompt:
      "What's the meaning of life? Make sure you do a few web searches so you're confident. You need to come up with an answer.",
  },

  most_important_emails: {
    prompt: `What is the most important email in my inbox? Don't name names or print the email contents. Just tell me the single most important email`,
  },

  who_am_i_emails: {
    prompt: `Based on my emails what can you tell about me? Please look at my most recent 5 emails to tell. Don't list the email contents and don't name any names.`,
  },

  programming: {
    // adapted from https://cursor.directory/front-end-cursor-rules
    prompt: `
You are a powerful agentic AI coding assistant designed by Tyler - an AI engineer based in Vancouver Island, Canada. You operate exclusively in the terminal, the world's best IDE.

You are a Senior Full-stack Developer and an Expert in Mastra.ai, ReactJS, NextJS, JavaScript, TypeScript, HTML, CSS and modern UI/UX frameworks (e.g., TailwindCSS, Shadcn, Radix). You are thoughtful, give nuanced answers, and are brilliant at reasoning. You carefully provide accurate, factual, thoughtful answers, and are a genius at reasoning.

- Follow the user’s requirements carefully & to the letter.
- First think step-by-step - describe your plan for what to build in pseudocode, written out in great detail.
- Confirm, then write code!
- Always write correct, best practice, DRY principle (Dont Repeat Yourself), bug free, fully functional and working code also it should be aligned to listed rules down below at Code Implementation Guidelines .
- Focus on easy and readability code, over being performant.
- Fully implement all requested functionality.
- Leave NO todo’s, placeholders or missing pieces.
- Ensure code is complete! Verify thoroughly finalised.
- Include all required imports, and ensure proper naming of key components.
- Be concise Minimize any other prose.
- If you think there might not be a correct answer, you say so.
- If you do not know the answer, say so, instead of guessing.

### Coding Environment
The user asks questions about the following coding languages and libaries:
- Mastra.ai
- ReactJS
- NextJS
- JavaScript
- TypeScript
- TailwindCSS
- HTML
- CSS


`,
  },
};

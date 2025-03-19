import inquirer from "inquirer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import chalk from "chalk";
import ora from "ora";
import type { Agent } from "@mastra/core/agent";

export function wrapStepText(text: string) {
  return `\n${text}\n`;
}

export function truncateMessage(
  message: string | Record<any, any>,
  length = 200,
) {
  const text =
    typeof message === `string` ? message : JSON.stringify(message, null, 2);
  const subtext = text.substring(0, length);
  const hiddenLines = text.split("\n").length - subtext.split("\n").length;
  const hiddenChars = text.length - subtext.length;
  const truncated =
    hiddenLines > 0
      ? `... + ${hiddenLines} lines ...`
      : hiddenChars > 0
        ? `... + ${hiddenChars} chars ...`
        : ``;

  return { text: subtext, truncated };
}

// Get all available agent configs
async function getAgentConfigs() {
  try {
    const registriesDir = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "mastra/agents/registries",
    );
    const useCasesDir = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "mastra/agents/use-cases",
    );

    const addPath = (parent: string) => (file: string) =>
      path.resolve(import.meta.dirname, `./mastra/agents/`, parent, file);
    const files = [
      ...(await fs.readdir(useCasesDir)).map(addPath(`use-cases`)),
      ...(await fs.readdir(registriesDir)).map(addPath(`registries`)),
    ];

    // Find all config files
    const configFiles = files.filter((file) => file.endsWith(".config.ts"));

    // Load all configs
    const configs = await Promise.all(
      configFiles.map(async (configPath) => {
        const module = await import(configPath);
        return {
          ...module.config,
          configPath,
        };
      }),
    );

    return configs;
  } catch (error) {
    console.error(chalk.red("Error loading agent configs:"), error);
    process.exit(1);
  }
}

// Add agent selection at startup
export async function selectAgent() {
  const configs = await getAgentConfigs();

  if (configs.length === 0) {
    console.error(chalk.red("No agent configs found."));
    process.exit(1);
  }

  const { selectedAgent } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedAgent",
      message: "Mastra MCP examples",
      theme: {
        icon: {
          cursor: "👉",
        },
        style: {
          highlight: (text: string) => chalk.blue(text) + " 🔨",
        },
      },
      choices: configs.map((config) => ({
        name: config.name,
        value: config,
      })),
    },
  ]);

  try {
    // Get agent path from config path by removing .config
    const agentPath = selectedAgent.configPath.replace(".config.ts", ".ts");

    console.log();
    const spinner = ora({
      text: `Loading ${selectedAgent.name} servers...\n`,
      color: "green",
    }).start();

    const agentModule = await import(agentPath);

    spinner.succeed(`${selectedAgent.name} MCP servers connected`);

    return {
      agent: agentModule.agent as Agent,
      prompts: (selectedAgent.prompts || []) satisfies string[],
    };
  } catch (error) {
    console.error(
      chalk.red(`Error loading agent ${selectedAgent.name}:`),
      error,
    );
    process.exit(1);
  }
}

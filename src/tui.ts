import crypto from "node:crypto";
import { gracefulExit } from "exit-hook";
import tinycolor from "tinycolor2";
import chalk from "chalk";
import Readline from "readline";
import { selectAgent, truncateMessage, wrapStepText } from "./utils.js";

const resourceId = "TylerB";
const threadId = crypto.randomUUID();

console.clear();

const { agent, prompts } = await selectAgent();

console.log(
  `\n${chalk.bold("Available tools")}:\n  🔨 ${chalk.green(Object.keys(agent.tools).join(`\n  🔨 `))}`,
);

if (prompts?.length) {
  console.log(
    chalk.yellow(
      `\n\n${chalk.bold(`Hint:`)} use up/down arrows for demo prompts\n`,
    ),
  );
}

while (true) {
  const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    history: prompts || [],
  });

  rl.on("SIGINT", () => {
    rl.close();
    gracefulExit();
  });

  process.stdout.write(`\n\n`);
  const answer: string = await new Promise((res) => {
    rl.question(chalk.grey("\n> "), (answer) => {
      setImmediate(() => res(answer));
    });
  });
  console.log();

  const { fullStream } = await agent.stream(answer, {
    threadId,
    resourceId,
    maxSteps: 10,
  });

  for await (const part of fullStream) {
    switch (part.type) {
      case "text-delta":
        process.stdout.write(
          chalk.hex(tinycolor("seagreen").toHex())(part.textDelta),
        );
        break;
      case "tool-call":
        console.log();
        console.log(
          wrapStepText(
            `${chalk.yellow("Using tool")} ${chalk.bold.blue(part.toolName)} ${chalk.dim(truncateMessage(part.args).text)}`,
          ),
        );
        break;
      case "tool-result":
        const { text, truncated } = truncateMessage(
          part.result,
          part.toolName.includes(`GMAIL`) ? 50 : 200,
        );
        console.log(
          wrapStepText(
            `${chalk.green("Finished")} ${chalk.bold.blue(part.toolName)} ${chalk.dim(text)}\n${truncated ? chalk.dim(`\n  ${truncated}`) : ""}\n\n`,
          ),
        );
        break;
      case "error":
        process.stdout.write(chalk.red(`\nError: ${part.error}\n`));
        break;
      case "finish":
        process.stdout.write("\n");
        break;
    }
  }
  rl.close();
}

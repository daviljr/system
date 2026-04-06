import { decide } from "../core/decision.engine";
import { runQueue } from "../core/executor";

async function main() {
  console.log("System booting...\n");

  const state = {}; // agora não depende mais de JSON

  const queue = decide(state);

  console.log("Fila:", queue, "\n");

  await runQueue(queue);

  console.log("\nSistema finalizado.");
}

main();

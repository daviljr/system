import * as fs from "fs";
import * as path from "path";

import {
  initStore,
  getStoreStatus,
  createToyAdapter,
  listToysAdapter,
} from "../adapters/store.adapter";

import { decideNextActions } from "../core/decision.engine";

console.log("System booting...");

// caminho do state
const statePath = path.resolve(__dirname, "../core/system_state.json");

// ler estado
const raw = fs.readFileSync(statePath, "utf-8");
let state = JSON.parse(raw);

// função para atualizar o estado
function updateState(newState: any) {
  fs.writeFileSync(statePath, JSON.stringify(newState, null, 2));
  state = newState; //  mantém o estado em memória sincronizado
}

// mostrar estado atual
console.log("\nCurrent State:");
console.log(JSON.stringify(state, null, 2));

// iniciar store
initStore();

const status = getStoreStatus();
console.log("\nStore Status:", status);

//  DECISION ENGINE (INTELIGÊNCIA)

const decidedState = decideNextActions(state);

if (JSON.stringify(decidedState) !== JSON.stringify(state)) {
  console.log("\nState updated by Decision Engine");
  updateState(decidedState);
}

//  EXECUTOR DE AÇÕES

function runAction(action: string) {
  switch (action) {
    case "run_queue":
      console.log("\n--- RUNNING QUEUE ---");

      if (!state.queue || state.queue.length === 0) {
        console.log("Queue is empty.");

        updateState({
          ...state,
          next_action: "idle",
        });

        return;
      }

      const queue = [...state.queue];

      while (queue.length > 0) {
        const current = queue.shift();

        console.log("\nExecuting:", current);

        switch (current) {
          case "create_toy":
            createToyAdapter("Toy " + Date.now());
            break;

          case "list_toys":
            const toys = listToysAdapter();
            console.log("Toys:", toys);
            break;

          default:
            console.log("Unknown action:", current);
        }
      }

      // limpa fila após execução
      updateState({
        ...state,
        queue: [],
        next_action: "idle",
        last_action: "run_queue",
      });

      console.log("\nQueue finished. System idle.");
      break;

    case "idle":
      console.log("\nSystem is idle.");
      break;

    default:
      console.log("\nNo valid action found.");
  }
}

//  EXECUÇÃO FINAL

console.log("\nNext Action:", state.next_action);
runAction(state.next_action);
import { create_toy, list_toys } from "./actions";

export async function runQueue(queue: string[]) {
  for (const action of queue) {
    console.log("Executando:", action);

    if (action === "create_toy") await create_toy();
    if (action === "list_toys") await list_toys();
  }
}

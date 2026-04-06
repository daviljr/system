import fs from "fs";
import path from "path";

const statePath = path.resolve(__dirname, "system_state.json");

export function loadState() {
  const raw = fs.readFileSync(statePath, "utf-8");
  return JSON.parse(raw);
}

export function saveState(state: any) {
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
}

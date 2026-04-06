import { getDecision } from "./intelligence.adapter";

export function decide(state: any): string[] {
  return getDecision({ state });
}

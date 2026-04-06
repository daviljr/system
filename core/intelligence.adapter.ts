export function getDecision(input: any): string[] {
  const state = input.state;
  const queue: string[] = [];

  if (!state.toys) state.toys = [];

  if (state.toys.length < 3) {
    queue.push("create_toy");
  }

  queue.push("list_toys");

  return queue;
}

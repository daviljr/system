export function validateCommand(command: any): boolean {
  if (!command || !command.type) {
    return false;
  }

  return true;
}

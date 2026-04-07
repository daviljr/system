export async function execute(actions: string[]): Promise<void> {
  for (const action of actions) {
    switch (action) {
      case "PROCESS_PAYMENT":
        console.log("Executando ação: PROCESS_PAYMENT");
        break;

      default:
        console.log(`Ação desconhecida: ${action}`);
    }
  }
}

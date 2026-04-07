import {
  PedidoState,
  ExecucaoState,
  ParceiroState,
} from "./states";

/* =========================
 * PEDIDO
 * ========================= */
export function podeProcessarPagamento(
  pedidoState: PedidoState
): boolean {
  return pedidoState === PedidoState.CRIADO;
}

/* =========================
 * EXECUÇÃO
 * ========================= */
export function podeConfirmarExecucao(
  pedidoState: PedidoState,
  execucaoState: ExecucaoState
): boolean {
  return (
    pedidoState === PedidoState.PAGO &&
    execucaoState === ExecucaoState.PENDENTE
  );
}

/* =========================
 * PARCEIRO
 * ========================= */
export function parceiroEhElegivel(
  parceiroState: ParceiroState
): boolean {
  return parceiroState === ParceiroState.ATIVO;
}

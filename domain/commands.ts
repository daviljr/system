/**
 * CORE COMMANDS
 *
 * Executam transições puras de estado.
 *
 * - NÃO decidem
 * - NÃO validam sozinhos (rules já validaram)
 * - NÃO executam infraestrutura
 *
 * Recebem estado + intenção
 * Retornam novo estado
 */
import {
  PedidoState,
  ExecucaoState,
  ParceiroState,
} from './states';

import * as Rules from './rules';

/* =========================
 * PEDIDO
 * ========================= */
export function marcarPedidoComoPago(
  pedidoState: PedidoState
): PedidoState {
  if (!Rules.podeProcessarPagamento(pedidoState)) {
    throw new Error("Pedido não pode ser pago");
  }

  return PedidoState.PAGO;
}

/* =========================
 * EXECUÇÃO
 * ========================= */
export function confirmarExecucao(
  pedidoState: PedidoState,
  execucaoState: ExecucaoState
): ExecucaoState {
  if (!Rules.podeConfirmarExecucao(pedidoState, execucaoState)) {
    throw new Error("Execução não pode ser confirmada");
  }

  return ExecucaoState.CONFIRMADA;
}

/* =========================
 * PARCEIRO
 * ========================= */
export function bloquearParceiro(
  parceiroState: ParceiroState
): ParceiroState {
  if (!Rules.parceiroEhElegivel(parceiroState)) {
    throw new Error("Parceiro já está inelegível");
  }

  return ParceiroState.BLOQUEADO;
}

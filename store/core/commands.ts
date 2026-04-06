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
  Rules.podeProcessarPagamento(pedidoState);

  return PedidoState.PAGO;
}

/* =========================
 * EXECUÇÃO
 * ========================= */

export function confirmarExecucao(
  pedidoState: PedidoState,
  execucaoState: ExecucaoState
): ExecucaoState {
  Rules.podeConfirmarExecucao(pedidoState, execucaoState);

  return ExecucaoState.CONFIRMADA;
}

/* =========================
 * PARCEIRO
 * ========================= */

export function bloquearParceiro(
  parceiroState: ParceiroState
): ParceiroState {
  Rules.parceiroEhElegivel(parceiroState);

  return ParceiroState.BLOQUEADO;
}
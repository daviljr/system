/**
 * CORE — RULES
 *
 * Este arquivo contém REGRAS LÓGICAS INVARIANTES.
 *
 * Rules:
 * - Respondem apenas "pode / não pode"
 * - NÃO escolhem caminhos
 * - NÃO executam ações
 *
 * Elas são usadas por:
 * - decisions.ts
 *
 * Este arquivo:
 * - NÃO conhece infraestrutura
 * - NÃO conhece Application
 */

import { PedidoState } from './states';

export const CoreRules = {
  podePagar(pedidoState: PedidoState): boolean {
    return pedidoState === PedidoState.CRIADO;
  },

  podeExecutar(pedidoState: PedidoState): boolean {
    return pedidoState === PedidoState.PAGO;
  },
};
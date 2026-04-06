/**
 * CORE — CONTRACTS
 *
 * Este arquivo define os CONTRATOS DE ENTRADA E SAÍDA do Core.
 *
 * Ele é o ponto de acoplamento explícito entre:
 * - Application layer
 * - Core decisions
 *
 * Este arquivo:
 * - NÃO executa lógica
 * - NÃO valida regras
 */

import { PedidoState, ParceiroState } from './states';

export type ConfirmarExecucaoInput = {
  pedidoState: PedidoState;
  parceiros: Array<{
    id: string;
    estado: ParceiroState;
    confianca: number;
  }>;
};

export type ConfirmarExecucaoOutput = {
  parceiroEscolhido: string;
};
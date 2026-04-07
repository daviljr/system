/**
 * CORE — CONTRACTS
 */

import { PedidoState, ParceiroState } from './state';

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

/**
 * CORE — POLICIES
 *
 * Este arquivo define POLÍTICAS DE ESCOLHA.
 *
 * Policies:
 * - São usadas quando múltiplas opções são válidas
 * - Retornam INTENÇÕES, nunca ações
 *
 * Este arquivo:
 * - NÃO valida permissões
 * - NÃO altera estados
 * - NÃO executa efeitos colaterais
 */

import { ParceiroState } from './states';

export const CorePolicies = {
  escolherParceiro(
    parceiros: Array<{
      id: string;
      estado: ParceiroState;
      confianca: number;
    }>
  ): string | null {
    const elegiveis = parceiros
      .filter(p => p.estado === ParceiroState.ATIVO)
      .sort((a, b) => b.confianca - a.confianca);

    return elegiveis[0]?.id ?? null;
  },
};
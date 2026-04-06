/**
 * CORE — DECISIONS
 *
 * Este arquivo contém DECISÕES COMPOSTAS do Core.
 *
 * Decisions:
 * - Orquestram rules + policies
 * - Retornam DecisionResult
 *
 * Este arquivo:
 * - NÃO executa infraestrutura
 * - NÃO altera estados persistentes
 * - NÃO conhece Application
 */

import { DecisionResult } from './decision_result';
import { CoreRules } from './rules';
import { CorePolicies } from './policies';
import { CoreErrorCode } from './errors';
import {
  ConfirmarExecucaoInput,
  ConfirmarExecucaoOutput,
} from './contracts';

export const CoreDecisions = {
  confirmarExecucao(
    input: ConfirmarExecucaoInput
  ): DecisionResult<ConfirmarExecucaoOutput> {

    if (!CoreRules.podeExecutar(input.pedidoState)) {
      return {
        ok: false,
        error: {
          code: CoreErrorCode.EXECUCAO_NAO_PERMITIDA,
          message: 'Pedido não está apto para execução',
        },
      };
    }

    const parceiro = CorePolicies.escolherParceiro(input.parceiros);

    if (!parceiro) {
      return {
        ok: false,
        error: {
          code: CoreErrorCode.SEM_PARCEIRO_ELEGIVEL,
          message: 'Nenhum parceiro elegível encontrado',
        },
      };
    }

    return {
      ok: true,
      data: {
        parceiroEscolhido: parceiro,
      },
    };
  },
};
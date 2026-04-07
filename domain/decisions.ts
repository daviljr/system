import { DecisionResult } from './decision_result';
import { selecionarParceiro } from './policies';
import { CoreErrorCode } from './errors';
import {
  ConfirmarExecucaoInput,
  ConfirmarExecucaoOutput,
} from './contracts';
import { PedidoState } from './state';

export const CoreDecisions = {
  confirmarExecucao(
    input: ConfirmarExecucaoInput
  ): DecisionResult<ConfirmarExecucaoOutput> {

    // 🔹 Regra de domínio (forte e tipada)
    if (!input || input.pedidoState !== PedidoState.PRONTO) {
      return {
        ok: false,
        error: {
          code: CoreErrorCode.EXECUCAO_NAO_PERMITIDA,
          message: 'Pedido não está apto para execução',
        },
      };
    }

    // 🔹 Política isolada
    const parceiro = selecionarParceiro(input);

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

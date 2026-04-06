/**
 * CORE — DECISION RESULT
 *
 * Este arquivo define o FORMATO CANÔNICO de retorno do Core.
 *
 * Ele é usado por:
 * - decisions.ts (decisões compostas)
 * - index.ts (fachada do Core)
 * - Application layer (indiretamente)
 *
 * Responsabilidade:
 * - Padronizar como decisões retornam sucesso ou falha
 * - Garantir previsibilidade e tipagem explícita
 *
 * Este arquivo:
 * - NÃO conhece regras
 * - NÃO conhece políticas
 * - NÃO conhece estados
 * - NÃO executa lógica
 *
 * Ele apenas define o contrato de saída do Core.
 */

export type DecisionResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      error: {
        code: string;
        message: string;
      };
    };
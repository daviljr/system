/**
 * CORE — ERRORS
 *
 * Este arquivo define os ERROS SEMÂNTICOS do Core.
 *
 * Eles representam:
 * - violações de regra
 * - impossibilidades lógicas
 * - estados inválidos
 *
 * Este arquivo:
 * - NÃO lança exceções
 * - NÃO executa lógica
 *
 * Ele fornece códigos que:
 * - são retornados em DecisionResult
 * - podem ser mapeados pela Application layer
 */

export enum CoreErrorCode {
  PEDIDO_INVALIDO = 'PEDIDO_INVALIDO',
  PAGAMENTO_NAO_PERMITIDO = 'PAGAMENTO_NAO_PERMITIDO',
  EXECUCAO_NAO_PERMITIDA = 'EXECUCAO_NAO_PERMITIDA',
  SEM_PARCEIRO_ELEGIVEL = 'SEM_PARCEIRO_ELEGIVEL',
}
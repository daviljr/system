/**
 * CORE — FACADE (INDEX)
 *
 * Este arquivo é a ÚNICA porta de entrada do Core.
 *
 * Application layer:
 * - SÓ pode importar deste arquivo
 *
 * Ele expõe:
 * - Decisions
 * - Estados
 * - Códigos de erro
 *
 * Ele protege:
 * - Implementação interna do Core
 * - Evolução sem quebra
 */

export { CoreDecisions } from './decisions';
export { CoreErrorCode } from './errors';
export {
  PedidoState,
  ExecucaoState,
  ParceiroState,
} from './states';
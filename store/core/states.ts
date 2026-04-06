/**
 * CORE — STATES
 *
 * Este arquivo define TODOS os estados possíveis reconhecidos pelo Core.
 *
 * Estados:
 * - Representam a realidade do domínio
 * - São usados por rules.ts e decisions.ts
 *
 * Este arquivo:
 * - NÃO executa lógica
 * - NÃO decide fluxos
 * - NÃO valida permissões
 *
 * Ele é a FONTE ÚNICA da verdade sobre estados válidos.
 */

export enum PedidoState {
  CRIADO = 'CRIADO',
  PAGO = 'PAGO',
  CANCELADO = 'CANCELADO',
}

export enum ExecucaoState {
  PENDENTE = 'PENDENTE',
  CONFIRMADA = 'CONFIRMADA',
  ATRASADA = 'ATRASADA',
  FALHOU = 'FALHOU',
}

export enum ParceiroState {
  ATIVO = 'ATIVO',
  BLOQUEADO = 'BLOQUEADO',
}
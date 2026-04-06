/**
 * PILLAR 3 — ORDER CONTRACTS
 *
 * Logical contracts for Order-related operations.
 * This file defines what can be requested and what is returned.
 *
 * No execution, mutation or side effects occur here.
 */

/* =========================
 * BASE CONTRACT TYPES
 * ========================= */

export type ContractSuccess<T> = {
  ok: true;
  data: T;
};

export type ContractFailure<E> = {
  ok: false;
  error: E;
};

export type ContractResult<T, E> =
  | ContractSuccess<T>
  | ContractFailure<E>;

/* =========================
 * ORDER STATES (CONTRACT-LEVEL)
 * ========================= */

/**
 * Order states as exposed to the system boundary.
 * These are stable and independent from Core implementation.
 */
export type OrderState =
  | 'CREATED'
  | 'PAID'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'CONTINGENCY';

/* =========================
 * CONTRACT INPUT / OUTPUT
 * ========================= */

/**
 * Input required to request order creation.
 */
export interface CreateOrderInput {
  customerId: string;
  productId: string;
  unitPrice: number;
  quantity?: number;
  source: 'web' | 'app' | 'api';
}

/**
 * Output returned after order creation request.
 */
export interface CreateOrderOutput {
  orderId: string;
  state: OrderState;
}

/**
 * Input required to request order cancellation.
 */
export interface CancelOrderInput {
  orderId: string;
}

/**
 * Output returned after cancellation attempt.
 */
export interface CancelOrderOutput {
  orderId: string;
  state: OrderState;
}

/* =========================
 * CONTRACT ERRORS
 * ========================= */

export type CreateOrderErrors =
  | 'INVALID_INPUT';

export type CancelOrderErrors =
  | 'ORDER_NOT_FOUND'
  | 'CANCELLATION_NOT_ALLOWED';

/* =========================
 * CONTRACT IMPLEMENTATION
 * ========================= */

/**
 * Order Contracts
 *
 * Responsibilities:
 * - Validate minimum intent and shape
 * - Protect Application layer from malformed input
 *
 * This is NOT domain logic.
 */
export const orderContracts = {
  validateCreation(
    input: CreateOrderInput
  ): ContractResult<null, CreateOrderErrors> {
    if (
      !input.customerId ||
      !input.productId ||
      input.unitPrice <= 0 ||
      (input.quantity !== undefined && input.quantity <= 0)
    ) {
      return {
        ok: false,
        error: 'INVALID_INPUT',
      };
    }

    return {
      ok: true,
      data: null,
    };
  },
};
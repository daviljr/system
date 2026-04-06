/**
 * PILLAR 3 — PAYMENT CONTRACTS
 *
 * Logical contracts for Payment-related operations.
 * Defines how the system can initiate, confirm or retry a payment.
 *
 * No execution, validation or side effects occur here.
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
 * CONTRACT-LEVEL STATES
 * ========================= */

/**
 * Payment states exposed at the system boundary.
 * Independent from Core implementation.
 */
export type PaymentState =
  | 'INITIATED'
  | 'PENDING'
  | 'PAID'
  | 'FAILED'
  | 'RETRYING';

/**
 * Order states relevant to payment flow.
 */
export type OrderState =
  | 'CREATED'
  | 'PAID'
  | 'CANCELLED'
  | 'CONTINGENCY';

/* =========================
 * INPUT / OUTPUT DTOs
 * ========================= */

/**
 * Input to initiate a payment.
 */
export interface InitiatePaymentInput {
  orderId: string;
  paymentMethod: 'card' | 'pix' | 'boleto';
}

/**
 * Output after initiating a payment.
 */
export interface InitiatePaymentOutput {
  orderId: string;
  orderState: OrderState;
  paymentState: PaymentState;
}

/**
 * Input to confirm a payment.
 */
export interface ConfirmPaymentInput {
  orderId: string;
  paymentId: string;
}

/**
 * Output after confirming a payment.
 */
export interface ConfirmPaymentOutput {
  orderId: string;
  orderState: OrderState;
  paymentState: PaymentState;
}

/**
 * Input to retry a payment attempt.
 */
export interface RetryPaymentInput {
  paymentId: string;
}

/**
 * Output after retry attempt.
 */
export interface RetryPaymentOutput {
  paymentState: PaymentState;
}

/* =========================
 * CONTRACT ERRORS
 * ========================= */

export type InitiatePaymentErrors =
  | 'INVALID_PAYMENT_DATA'
  | 'PAYMENT_GATEWAY_FAILURE';

export type ConfirmPaymentErrors =
  | 'DUPLICATE_PAYMENT'
  | 'PAYMENT_NOT_CONFIRMED';

export type RetryPaymentErrors =
  | 'PAYMENT_NOT_CONFIRMABLE';

/* =========================
 * CONTRACT SIGNATURES
 * ========================= */

/**
 * Initiate Payment Contract
 *
 * Intention:
 * - Start the payment process for an order
 *
 * Origin:
 * - domain_flows.md (payment initiation)
 */
export type InitiatePaymentContract = (
  input: InitiatePaymentInput
) => Promise<ContractResult<InitiatePaymentOutput, InitiatePaymentErrors>>;

/**
 * Confirm Payment Contract
 *
 * Intention:
 * - Confirm an already initiated payment
 *
 * Origin:
 * - domain_flows.md (payment confirmation)
 */
export type ConfirmPaymentContract = (
  input: ConfirmPaymentInput
) => Promise<ContractResult<ConfirmPaymentOutput, ConfirmPaymentErrors>>;

/**
 * Retry Payment Contract
 *
 * Intention:
 * - Retry a failed or pending payment
 *   without immediate extra effort from the customer
 *
 * Origin:
 * - domain_rules.md (invisible persistence)
 */
export type RetryPaymentContract = (
  input: RetryPaymentInput
) => Promise<ContractResult<RetryPaymentOutput, RetryPaymentErrors>>;
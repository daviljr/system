// store/infrastructure/payment/payment_adapter.ts

/**
 * Payment Adapter
 *
 * Infrastructure adapter responsible for executing
 * payment attempts against an external system.
 *
 * This is a stub implementation.
 *
 * Responsibilities:
 * - Simulate an external payment gateway
 * - Return raw execution results
 *
 * This adapter:
 * - knows NO business rules
 * - knows NO application logic
 * - knows NO contracts
 */

export type PaymentExecutionResult =
  | {
      status: 'PAID';
      transactionId: string;
    }
  | {
      status: 'FAILED';
      reason: 'DECLINED' | 'PROVIDER_ERROR';
      message?: string;
    };

export interface ExecutePaymentInput {
  orderId: string;
  paymentMethod: 'card' | 'pix' | 'boleto';
}

export const paymentAdapter = {
  async executePayment(
    input: ExecutePaymentInput
  ): Promise<PaymentExecutionResult> {
    // --- Stub behavior ---
    // Simple deterministic simulation for now

    // Example rule:
    // Orders ending with an even character succeed
    const shouldSucceed =
      input.orderId.charCodeAt(
        input.orderId.length - 1
      ) % 2 === 0;

    if (shouldSucceed) {
      return {
        status: 'PAID',
        transactionId: crypto.randomUUID(),
      };
    }

    return {
      status: 'FAILED',
      reason: 'DECLINED',
      message: 'Payment was declined by the provider.',
    };
  },
};
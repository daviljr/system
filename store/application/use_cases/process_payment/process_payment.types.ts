// store/application/use_cases/process_payment/process_payment.types.ts

/**
 * Input required to decide payment processing.
 * Payment execution itself is handled externally.
 */
export interface ProcessPaymentInput {
  orderId: string;
  attemptId: string;
  method: 'card' | 'pix' | 'boleto';

  /**
   * Result of the external payment execution.
   * Provided by infrastructure adapters.
   */
  executionResult?: {
    status: 'PAID' | 'DECLINED' | 'ERROR';
    transactionId?: string;
    reason?: 'DECLINED' | 'PROVIDER_ERROR';
    message?: string;
  };
}

/**
 * Result of the Process Payment use case.
 * Discriminated union enforcing explicit success or failure.
 */
export type ProcessPaymentResult =
  | {
      success: true;
      data: {
        orderId: string;
        status: 'PAID';
        transactionId: string;
        message: string;
      };
    }
  | {
      success: false;
      error: {
        code:
          | 'DUPLICATE_PAYMENT_ATTEMPT'
          | 'PAYMENT_NOT_EXECUTED'
          | 'PAYMENT_DECLINED'
          | 'PAYMENT_PROVIDER_ERROR';
        message: string;
      };
    };
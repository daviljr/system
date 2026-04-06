// store/application/use_cases/post_purchase/post_purchase.types.ts

/**
 * Input required to decide post-purchase communication.
 * Communication execution itself is handled externally.
 */
export interface PostPurchaseInput {
  orderId: string;

  /**
   * Post-purchase event that triggered the communication.
   */
  event:
    | 'ORDER_CREATED'
    | 'PAYMENT_CONFIRMED'
    | 'EXECUTION_CONFIRMED'
    | 'CONTINGENCY_ACTIVATED'
    | 'UPDATE'
    | 'COMPLETED';

  /**
   * Result of the external communication execution.
   */
  executionResult?: {
    status: 'SENT' | 'SCHEDULED' | 'FAILED';
    message?: string;
  };
}

/**
 * Result of the Post Purchase use case.
 * Discriminated union enforcing explicit success or failure.
 */
export type PostPurchaseResult =
  | {
      success: true;
      data: {
        orderId: string;
        communication: {
          status: 'SENT' | 'SCHEDULED';
          channel: string;
        };
        message: string;
      };
    }
  | {
      success: false;
      error: {
        code:
          | 'INVALID_ORDER_EVENT'
          | 'COMMUNICATION_NOT_EXECUTED'
          | 'COMMUNICATION_FAILED';
        message: string;
      };
    };
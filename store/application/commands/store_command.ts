// store/application/commands/store_command.ts

/**
 * Store Command
 *
 * Canonical command envelope for the Store module.
 *
 * This is the ONLY valid command shape accepted by:
 * - ApplicationService
 * - ApplicationRuntime
 *
 * Responsibilities:
 * - Express intent
 * - Carry explicit data
 * - Remain infrastructure-agnostic
 * - Remain domain-safe
 *
 * Commands do NOT:
 * - Execute logic
 * - Contain rules
 * - Contain policies
 */

export type StoreCommand =
  | {
      type: 'CREATE_ORDER';
      payload: {
        customerId: string;
        productId: string;
        quantity: number;
        unitPrice: number;
        source: 'web' | 'app' | 'api';
      };
    }
  | {
      type: 'PROCESS_PAYMENT';
      payload: {
        orderId: string;
        attemptId: string;
        method: 'card' | 'pix' | 'boleto';
        executionResult: {
          status: 'PAID' | 'DECLINED' | 'ERROR';
          transactionId?: string;
          reason?: 'DECLINED' | 'PROVIDER_ERROR';
          message?: string;
        };
      };
    }
  | {
      type: 'CONFIRM_EXECUTION';
      payload: {
        orderId: string;
        availablePartners: Array<{
          partnerId: string;
          trustScore: number;
        }>;
        executionResult?: {
          status: 'CONFIRMED' | 'FAILED';
          message?: string;
        };
      };
    }
  | {
      type: 'ACTIVATE_CONTINGENCY';
      payload: {
        orderId: string;
        reason:
          | 'PARTNER_FAILURE'
          | 'UNAVAILABILITY'
          | 'EXTERNAL_EVENT';
        previousAttempts?: Array<{
          strategy:
            | 'REASSIGNMENT'
            | 'POSTPONEMENT'
            | 'ALTERNATIVE'
            | 'TRANSFER'
            | 'HUMAN_RESOLUTION';
          attemptedAt: string;
        }>;
        executionResult?: {
          status: 'ACTIVATED' | 'FAILED';
          message?: string;
        };
      };
    }
  | {
      type: 'POST_PURCHASE';
      payload: {
        orderId: string;
        event:
          | 'ORDER_CREATED'
          | 'PAYMENT_CONFIRMED'
          | 'EXECUTION_CONFIRMED'
          | 'CONTINGENCY_ACTIVATED'
          | 'UPDATE'
          | 'COMPLETED';
        executionResult?: {
          status: 'SENT' | 'SCHEDULED' | 'FAILED';
          message?: string;
        };
      };
    };
// store/application/use_cases/confirm_execution/confirm_execution.types.ts

/**
 * Input required to decide execution confirmation.
 * Execution itself is handled externally.
 */
export interface ConfirmExecutionInput {
  orderId: string;

  /**
   * Result of the external execution confirmation.
   */
  executionResult?: {
    status: 'CONFIRMED' | 'FAILED';
    message?: string;
  };
}

/**
 * Result of the Confirm Execution use case.
 * Discriminated union enforcing explicit success or failure.
 */
export type ConfirmExecutionResult =
  | {
      success: true;
      data: {
        orderId: string;
        executionState: 'CONFIRMED';
        message: string;
      };
    }
  | {
      success: false;
      error: {
        code:
          | 'EXECUTION_NOT_CONFIRMED'
          | 'EXECUTION_CONFIRMATION_FAILED';
        message: string;
      };
    };
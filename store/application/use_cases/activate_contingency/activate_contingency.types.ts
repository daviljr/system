// store/application/use_cases/activate_contingency/activate_contingency.types.ts

/**
 * Input required to decide contingency activation.
 * Contingency execution itself is handled externally.
 */
export interface ActivateContingencyInput {
  orderId: string;

  /**
   * Reason that triggered the contingency.
   */
  reason:
    | 'PARTNER_FAILURE'
    | 'UNAVAILABILITY'
    | 'EXTERNAL_EVENT';

  /**
   * Previous contingency attempts, if any.
   */
  previousAttempts?: Array<{
    strategy:
      | 'REASSIGNMENT'
      | 'POSTPONEMENT'
      | 'ALTERNATIVE'
      | 'TRANSFER'
      | 'HUMAN_RESOLUTION';
    attemptedAt: string;
  }>;

  /**
   * Result of the external contingency execution.
   */
  executionResult?: {
    status: 'ACTIVATED' | 'FAILED';
    message?: string;
  };
}

/**
 * Result of the Activate Contingency use case.
 * Discriminated union enforcing explicit success or failure.
 */
export type ActivateContingencyResult =
  | {
      success: true;
      data: {
        orderId: string;
        strategy:
          | 'REASSIGNMENT'
          | 'POSTPONEMENT'
          | 'ALTERNATIVE'
          | 'TRANSFER'
          | 'HUMAN_RESOLUTION';
        status: 'ACTIVATED';
        message: string;
      };
    }
  | {
      success: false;
      error: {
        code:
          | 'INVALID_ORDER_STATE'
          | 'NO_CONTINGENCY_STRATEGY'
          | 'CONTINGENCY_ACTIVATION_FAILED';
        message: string;
      };
    };
// store/application/use_cases/activate_contingency/activate_contingency.use_case.ts

import {
  ActivateContingencyInput,
  ActivateContingencyResult,
} from './activate_contingency.types';

/**
 * Activate Contingency Use Case
 *
 * Responsibilities:
 * - Interpret contingency execution result
 * - Validate presence of a decided strategy
 * - Produce an application-level result
 *
 * This use case:
 * - does NOT decide strategy
 * - does NOT mutate core state
 * - does NOT call infrastructure
 */
export const activateContingencyUseCase = {
  async execute(
    input: ActivateContingencyInput
  ): Promise<ActivateContingencyResult> {

    // 1. Basic validation
    if (!input.orderId || !input.executionResult) {
      return {
        success: false,
        error: {
          code: 'INVALID_ORDER_STATE',
          message: 'Order or execution result missing.',
        },
      };
    }

    // 2. Ensure a strategy exists (must come from previous decision)
    const lastAttempt =
      input.previousAttempts?.[
        input.previousAttempts.length - 1
      ];

    if (!lastAttempt) {
      return {
        success: false,
        error: {
          code: 'NO_CONTINGENCY_STRATEGY',
          message:
            'No contingency strategy was provided for activation.',
        },
      };
    }

    // 3. Interpret execution result
    if (input.executionResult.status !== 'ACTIVATED') {
      return {
        success: false,
        error: {
          code: 'CONTINGENCY_ACTIVATION_FAILED',
          message:
            input.executionResult.message ??
            'Contingency activation failed.',
        },
      };
    }

    // 4. Successful contingency activation
    return {
      success: true,
      data: {
        orderId: input.orderId,
        strategy: lastAttempt.strategy,
        status: 'ACTIVATED',
        message:
          'Contingency activated successfully.',
      },
    };
  },
};
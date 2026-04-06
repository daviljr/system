// store/application/use_cases/confirm_execution/confirm_execution.use_case.ts

import {
  ConfirmExecutionInput,
  ConfirmExecutionResult,
} from './confirm_execution.types';

/**
 * Confirm Execution Use Case
 *
 * Responsibilities:
 * - Interpret execution confirmation result
 * - Produce application-level decision
 *
 * This use case:
 * - does NOT select partners
 * - does NOT mutate core state
 * - does NOT call infrastructure
 */
export const confirmExecutionUseCase = {
  async execute(
    input: ConfirmExecutionInput
  ): Promise<ConfirmExecutionResult> {

    // 1. Execution result must exist
    if (!input.executionResult) {
      return {
        success: false,
        error: {
          code: 'EXECUTION_NOT_CONFIRMED',
          message: 'Execution confirmation result is missing.',
        },
      };
    }

    // 2. Execution failed
    if (input.executionResult.status !== 'CONFIRMED') {
      return {
        success: false,
        error: {
          code: 'EXECUTION_CONFIRMATION_FAILED',
          message:
            input.executionResult.message ??
            'Execution could not be confirmed.',
        },
      };
    }

    // 3. Successful confirmation
    return {
      success: true,
      data: {
        orderId: input.orderId,
        executionState: 'CONFIRMED',
        message: 'Execution confirmed successfully.',
      },
    };
  },
};
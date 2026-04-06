// store/infrastructure/execution/execution_adapter.ts

/**
 * Execution Adapter
 *
 * Infrastructure adapter responsible for executing
 * order fulfillment with external executors (partners).
 *
 * This is a stub implementation.
 *
 * Responsibilities:
 * - Simulate execution confirmation
 * - Simulate execution failures
 *
 * This adapter:
 * - knows NO business rules
 * - knows NO application logic
 * - knows NO contracts
 */

export type ExecutionExecutionResult =
  | {
      status: 'CONFIRMED';
    }
  | {
      status: 'FAILED';
      reason: 'NO_PARTNER' | 'PARTNER_ERROR';
      message?: string;
    };

export interface ExecuteExecutionInput {
  orderId: string;
}

export const executionAdapter = {
  async executeExecution(
    input: ExecuteExecutionInput
  ): Promise<ExecutionExecutionResult> {
    // --- Stub behavior ---
    // Deterministic simulation based on orderId

    const shouldConfirm =
      input.orderId.charCodeAt(
        input.orderId.length - 1
      ) % 3 !== 0;

    if (shouldConfirm) {
      return {
        status: 'CONFIRMED',
      };
    }

    return {
      status: 'FAILED',
      reason: 'NO_PARTNER',
      message: 'No partner available for execution.',
    };
  },
};
// store/application/use_cases/process_payment/process_payment.use_case.ts

import {
  ProcessPaymentInput,
  ProcessPaymentResult,
} from './process_payment.types';

/**
 * Process Payment Use Case
 *
 * Responsibilities:
 * - Interpret payment execution result
 * - Decide application-level outcome
 *
 * This use case:
 * - does NOT execute payment
 * - does NOT know infrastructure
 * - does NOT validate business rules
 */
export const processPaymentUseCase = {
  async execute(
    input: ProcessPaymentInput
  ): Promise<ProcessPaymentResult> {

    // 1. Execution result must exist
    if (!input.executionResult) {
      return {
        success: false,
        error: {
          code: 'PAYMENT_NOT_EXECUTED',
          message: 'Payment execution result is missing.',
        },
      };
    }

    // 2. Successful payment
    if (input.executionResult.status === 'PAID') {
      return {
        success: true,
        data: {
          orderId: input.orderId,
          status: 'PAID',
          transactionId:
            input.executionResult.transactionId ?? '',
          message: 'Payment confirmed successfully.',
        },
      };
    }

    // 3. Declined or provider error
    return {
      success: false,
      error: {
        code:
          input.executionResult.reason === 'DECLINED'
            ? 'PAYMENT_DECLINED'
            : 'PAYMENT_PROVIDER_ERROR',
        message:
          input.executionResult.message ??
          'Payment could not be completed.',
      },
    };
  },
};
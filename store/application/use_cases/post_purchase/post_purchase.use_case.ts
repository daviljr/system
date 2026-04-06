import {
  PostPurchaseInput,
  PostPurchaseResult,
} from './post_purchase.types';

/**
 * Post Purchase Use Case
 *
 * Responsibilities:
 * - Interpret post-purchase communication result
 * - Produce application-level outcome
 *
 * This use case:
 * - does NOT decide communication strategy
 * - does NOT send messages
 * - does NOT call infrastructure
 */
export const postPurchaseUseCase = {
  async execute(
    input: PostPurchaseInput
  ): Promise<PostPurchaseResult> {

    // 1. Execution result must exist
    if (!input.executionResult) {
      return {
        success: false,
        error: {
          code: 'COMMUNICATION_NOT_EXECUTED',
          message: 'Post-purchase communication was not executed.',
        },
      };
    }

    // 2. Communication failed
    if (
      input.executionResult.status !== 'SENT' &&
      input.executionResult.status !== 'SCHEDULED'
    ) {
      return {
        success: false,
        error: {
          code: 'COMMUNICATION_FAILED',
          message:
            input.executionResult.message ??
            'Post-purchase communication failed.',
        },
      };
    }

    // 3. Successful communication
    return {
      success: true,
      data: {
        orderId: input.orderId,
        communication: {
          status: input.executionResult.status,
          channel: 'UNKNOWN',
        },
        message: 'Post-purchase communication completed successfully.',
      },
    };
  },
};
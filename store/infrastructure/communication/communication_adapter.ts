// store/infrastructure/communication/communication_adapter.ts

/**
 * Communication Adapter
 *
 * Infrastructure adapter responsible for sending
 * or scheduling external communications (email, SMS, push).
 *
 * This is a stub implementation.
 *
 * Responsibilities:
 * - Simulate message sending
 * - Simulate message scheduling
 * - Simulate failures
 *
 * This adapter:
 * - knows NO business rules
 * - knows NO application logic
 * - knows NO contracts
 */

export type CommunicationExecutionResult =
  | {
      status: 'SENT';
      channel: 'EMAIL' | 'SMS' | 'PUSH';
    }
  | {
      status: 'SCHEDULED';
      channel: 'EMAIL' | 'SMS' | 'PUSH';
      scheduledAt: string;
    }
  | {
      status: 'FAILED';
      reason: 'PROVIDER_ERROR';
      message?: string;
    };

export interface ExecuteCommunicationInput {
  orderId: string;
  channel: 'EMAIL' | 'SMS' | 'PUSH';
}

export const communicationAdapter = {
  async executeCommunication(
    input: ExecuteCommunicationInput
  ): Promise<CommunicationExecutionResult> {
    // --- Stub behavior ---
    // Deterministic simulation based on orderId

    const lastCharCode =
      input.orderId.charCodeAt(
        input.orderId.length - 1
      );

    // Every 5th order schedules instead of sending
    if (lastCharCode % 5 === 0) {
      return {
        status: 'SCHEDULED',
        channel: input.channel,
        scheduledAt: new Date(
          Date.now() + 60 * 60 * 1000
        ).toISOString(),
      };
    }

    // Every 7th order fails
    if (lastCharCode % 7 === 0) {
      return {
        status: 'FAILED',
        reason: 'PROVIDER_ERROR',
        message: 'Communication provider unavailable.',
      };
    }

    // Default: sent successfully
    return {
      status: 'SENT',
      channel: input.channel,
    };
  },
};
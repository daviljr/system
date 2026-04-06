// observability/application_logger.ts

import { DomainLogger } from './domain_logger';

/**
 * Application Logger
 *
 * Canonical observability boundary for the Application layer.
 *
 * Responsibilities:
 * - Log command reception
 * - Log execution success
 * - Log execution failure
 *
 * This logger:
 * - Observes orchestration only
 * - Does NOT log domain rules
 * - Does NOT log infrastructure details
 * - Does NOT mutate state
 *
 * Logs produced here must be:
 * - Deterministic
 * - Structured
 * - Audit-friendly
 */
export class ApplicationLogger {
  private static readonly CONTEXT = 'ApplicationService';

  /**
   * Command reception log
   */
  static commandReceived(
    commandType: string,
    payload: unknown
  ): void {
    DomainLogger.info(
      ApplicationLogger.CONTEXT,
      `Command received: ${commandType}`,
      {
        event: 'COMMAND_RECEIVED',
        commandType,
        payload,
      }
    );
  }

  /**
   * Successful command execution log
   */
  static commandSucceeded(
    commandType: string,
    result: unknown
  ): void {
    DomainLogger.info(
      ApplicationLogger.CONTEXT,
      `Command succeeded: ${commandType}`,
      {
        event: 'COMMAND_SUCCEEDED',
        commandType,
        result,
      }
    );
  }

  /**
   * Failed command execution log
   */
  static commandFailed(
    commandType: string,
    error: unknown
  ): void {
    DomainLogger.error(
      ApplicationLogger.CONTEXT,
      `Command failed: ${commandType}`,
      {
        event: 'COMMAND_FAILED',
        commandType,
        error,
      }
    );
  }
}
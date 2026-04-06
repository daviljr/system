// security/command_guard.ts

import { SecurityContext } from './security_context';
import { StoreCommand } from '../store/application/commands/store_command';

/**
 * Command Guard
 *
 * Canonical security boundary before Application execution.
 *
 * This is the ONLY place where:
 * - authentication is enforced
 * - trust level is validated
 * - command source is checked
 *
 * Responsibilities:
 * - Validate authentication
 * - Validate trust level
 * - Validate execution source
 * - Block invalid commands early
 *
 * This guard:
 * - does NOT know Core
 * - does NOT know Use Cases
 * - does NOT execute commands
 * - does NOT mutate state
 * - does NOT log (observability is external)
 *
 * Any command that passes this guard
 * is considered SAFE to reach the Application layer.
 */

/* =========================
 * SECURITY ERROR
 * ========================= */

export class SecurityViolationError extends Error {
  readonly code = 'SECURITY_VIOLATION';

  constructor(message: string) {
    super(message);
    this.name = 'SecurityViolationError';
  }
}

/* =========================
 * COMMAND GUARD
 * ========================= */

export class CommandGuard {
  static authorize(
    command: StoreCommand,
    context: SecurityContext
  ): void {

    // 1. Authentication check
    if (!context.authenticated) {
      throw new SecurityViolationError(
        'Unauthenticated actor is not allowed to execute commands.'
      );
    }

    // 2. Trust check
    if (!context.trusted) {
      throw new SecurityViolationError(
        'Untrusted actor is not allowed to execute commands.'
      );
    }

    // 3. Source validation (SECURITY layer uses UPPERCASE)
    const validSources = ['WEB', 'APP', 'API', 'INTERNAL'] as const;

    if (!validSources.includes(context.source)) {
      throw new SecurityViolationError(
        `Invalid execution source: ${context.source}`
      );
    }

    // 4. Command structural validation
    if (!command || typeof command.type !== 'string') {
      throw new SecurityViolationError(
        'Invalid or malformed command.'
      );
    }

    // If this point is reached:
    // - the actor is authenticated
    // - the actor is trusted
    // - the source is valid
    // - the command is structurally valid
  }
}
// observability/domain_logger.ts

export type DomainLogLevel =
  | 'INFO'
  | 'WARNING'
  | 'ERROR';

export interface DomainLogEntry {
  timestamp: string;
  level: DomainLogLevel;
  context: string;
  message: string;
  metadata?: Record<string, unknown>;
}

/**
 * Domain Logger
 *
 * Deterministic, synchronous, side-effect free.
 * This logger does NOT send logs anywhere.
 * It only standardizes log structure.
 */
export class DomainLogger {
  static log(entry: DomainLogEntry) {
    const payload = {
      ...entry,
      timestamp: new Date().toISOString(),
    };

    // Temporary output strategy
    console.log(JSON.stringify(payload));
  }

  static info(
    context: string,
    message: string,
    metadata?: Record<string, unknown>
  ) {
    this.log({
      level: 'INFO',
      context,
      message,
      metadata,
      timestamp: '',
    });
  }

  static warning(
    context: string,
    message: string,
    metadata?: Record<string, unknown>
  ) {
    this.log({
      level: 'WARNING',
      context,
      message,
      metadata,
      timestamp: '',
    });
  }

  static error(
    context: string,
    message: string,
    metadata?: Record<string, unknown>
  ) {
    this.log({
      level: 'ERROR',
      context,
      message,
      metadata,
      timestamp: '',
    });
  }
}
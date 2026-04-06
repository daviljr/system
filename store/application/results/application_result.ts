// store/application/results/application_result.ts

/**
 * Application Result
 *
 * Canonical result envelope returned by the Application layer.
 *
 * This is the ONLY valid output shape produced by:
 * - ApplicationService
 * - ApplicationRuntime
 *
 * Observed and validated in:
 * - runtime_test
 * - CHECKPOINT V1.0
 *
 * Responsibilities:
 * - Express success or failure explicitly
 * - Carry data OR error (never both)
 * - Be deterministic
 * - Be serializable
 * - Be safe for logging, transport and persistence
 */

/* =========================
 * SUCCESS
 * ========================= */

export type ApplicationSuccess<T = unknown> = {
  success: true;
  data: T;
};

/* =========================
 * FAILURE
 * ========================= */

export type ApplicationError = {
  code: string;
  message: string;
  /**
   * Optional structured details for observability,
   * debugging or audit purposes.
   * Must never be required for control flow.
   */
  details?: unknown;
};

export type ApplicationFailure = {
  success: false;
  error: ApplicationError;
};

/* =========================
 * CANONICAL RESULT
 * ========================= */

export type ApplicationResult<T = unknown> =
  | ApplicationSuccess<T>
  | ApplicationFailure;

/* =========================
 * GUARANTEES (DOCUMENTED CONTRACT)
 * ========================= *
 *
 * - If success === true → data is ALWAYS present
 * - If success === false → error is ALWAYS present
 * - data and error are mutually exclusive
 * - No side effects occur at this layer
 * - This shape must NEVER be extended ad-hoc
 *
 * Any deviation from this contract is a violation
 * of the Application boundary.
 */
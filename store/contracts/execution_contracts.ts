/**
 * PILLAR 3 — EXECUTION CONTRACTS
 *
 * Logical contracts for Execution-related operations.
 * Execution includes physical delivery, document issuing
 * (voucher, ticket, boarding pass) or experiences.
 *
 * No execution, validation or decision occurs here.
 */

/* =========================
 * BASE CONTRACT TYPES
 * ========================= */

export type ContractSuccess<T> = {
  ok: true;
  data: T;
};

export type ContractFailure<E> = {
  ok: false;
  error: E;
};

export type ContractResult<T, E> =
  | ContractSuccess<T>
  | ContractFailure<E>;

/* =========================
 * CONTRACT-LEVEL STATES
 * ========================= */

/**
 * Execution states exposed at system boundary.
 */
export type ExecutionState =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'CONFIRMED'
  | 'FAILED'
  | 'COMPLETED';

/**
 * Suggested actions after execution failure.
 */
export type ExecutionFailureAction =
  | 'RETRY'
  | 'REASSIGN_PARTNER'
  | 'ACTIVATE_CONTINGENCY'
  | 'MANUAL_RESOLUTION';

/* =========================
 * INPUT / OUTPUT DTOs
 * ========================= */

/**
 * Input to start execution for a paid order.
 */
export interface StartExecutionInput {
  orderId: string;
}

/**
 * Output after execution start attempt.
 */
export interface StartExecutionOutput {
  orderId: string;
  executionState: ExecutionState;
}

/**
 * Input to register an execution failure or delay.
 */
export interface RegisterExecutionFailureInput {
  orderId: string;
  reason: string;
}

/**
 * Output after failure registration.
 */
export interface RegisterExecutionFailureOutput {
  suggestedAction: ExecutionFailureAction;
}

/**
 * Input to complete execution successfully.
 */
export interface CompleteExecutionInput {
  orderId: string;
}

/**
 * Output after successful execution completion.
 */
export interface CompleteExecutionOutput {
  orderId: string;
  executionState: ExecutionState;
}

/* =========================
 * CONTRACT ERRORS
 * ========================= */

export type StartExecutionErrors =
  | 'ORDER_NOT_READY'
  | 'NO_PARTNER_AVAILABLE';

export type RegisterExecutionFailureErrors =
  | 'EXECUTION_NOT_FOUND'
  | 'EXECUTION_ALREADY_COMPLETED';

export type CompleteExecutionErrors =
  | 'EXECUTION_NOT_IN_PROGRESS'
  | 'EXECUTION_FAILED';

/* =========================
 * CONTRACT SIGNATURES
 * ========================= */

/**
 * Start Execution Contract
 *
 * Intention:
 * - Start execution for a paid order
 *
 * Origin:
 * - domain_flows.md (execution start)
 */
export type StartExecutionContract = (
  input: StartExecutionInput
) => Promise<ContractResult<StartExecutionOutput, StartExecutionErrors>>;

/**
 * Register Execution Failure Contract
 *
 * Intention:
 * - Register a failure or delay during execution
 * - Obtain a suggested recovery action
 *
 * Origin:
 * - domain_flows.md (contingency handling)
 */
export type RegisterExecutionFailureContract = (
  input: RegisterExecutionFailureInput
) => Promise<
  ContractResult<
    RegisterExecutionFailureOutput,
    RegisterExecutionFailureErrors
  >
>;

/**
 * Complete Execution Contract
 *
 * Intention:
 * - Mark execution as successfully completed
 *
 * Origin:
 * - domain_flows.md (execution completion)
 */
export type CompleteExecutionContract = (
  input: CompleteExecutionInput
) => Promise<
  ContractResult<CompleteExecutionOutput, CompleteExecutionErrors>
>;
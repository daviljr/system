/**
 * PILLAR 3 — POST PURCHASE CONTRACTS
 *
 * Logical contracts for post-purchase operations.
 * Post-purchase includes support, human events,
 * communication, predictability and retention.
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

export type OrderState =
  | 'CREATED'
  | 'PAID'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'CONTINGENCY';

export type ExecutionState =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'CONFIRMED'
  | 'FAILED'
  | 'COMPLETED';

/**
 * Human-related events that affect post-purchase flow.
 */
export type HumanEventType =
  | 'FAMILY_EMERGENCY'
  | 'HEALTH_ISSUE'
  | 'UNEXPECTED_EVENT';

/**
 * Suggested next actions for post-purchase issues.
 */
export type PostPurchaseAction =
  | 'CONTACT_SUPPORT'
  | 'ACTIVATE_CONTINGENCY'
  | 'RESCHEDULE'
  | 'TRANSFER'
  | 'MANUAL_RESOLUTION';

/* =========================
 * INPUT / OUTPUT DTOs
 * ========================= */

/**
 * Input to request post-purchase support.
 */
export interface RequestPostPurchaseSupportInput {
  orderId: string;
  reason: string;
}

/**
 * Output after support request.
 */
export interface RequestPostPurchaseSupportOutput {
  orderId: string;
  confirmationMessage: string;
}

/**
 * Input to register a human event.
 */
export interface RegisterHumanEventInput {
  orderId: string;
  eventType: HumanEventType;
}

/**
 * Output after human event registration.
 */
export interface RegisterHumanEventOutput {
  orderId: string;
  suggestedAction: PostPurchaseAction;
}

/**
 * Input to query post-purchase status.
 */
export interface QueryPostPurchaseStatusInput {
  orderId: string;
}

/**
 * Output with current order and execution status.
 */
export interface QueryPostPurchaseStatusOutput {
  orderId: string;
  orderState: OrderState;
  executionState: ExecutionState;
  contextualMessage: string;
}

/**
 * Input to register a post-purchase issue.
 */
export interface RegisterPostPurchaseIssueInput {
  orderId: string;
  description: string;
}

/**
 * Output after issue registration.
 */
export interface RegisterPostPurchaseIssueOutput {
  orderId: string;
  nextAction: PostPurchaseAction;
}

/* =========================
 * CONTRACT ERRORS
 * ========================= */

export type RequestPostPurchaseSupportErrors = never;

export type RegisterHumanEventErrors =
  | 'CRITICAL_HUMAN_EVENT';

export type QueryPostPurchaseStatusErrors = never;

export type RegisterPostPurchaseIssueErrors =
  | 'EXECUTION_FAILURE';

/* =========================
 * CONTRACT SIGNATURES
 * ========================= */

/**
 * Request Post-Purchase Support Contract
 *
 * Intention:
 * - Open a human support channel
 *
 * Origin:
 * - domain_flows.md (post-purchase)
 */
export type RequestPostPurchaseSupportContract = (
  input: RequestPostPurchaseSupportInput
) => Promise<
  ContractResult<
    RequestPostPurchaseSupportOutput,
    RequestPostPurchaseSupportErrors
  >
>;

/**
 * Register Human Event Contract
 *
 * Intention:
 * - Register a real human event and obtain alternatives
 *
 * Origin:
 * - domain_stories.md (real life events)
 */
export type RegisterHumanEventContract = (
  input: RegisterHumanEventInput
) => Promise<
  ContractResult<
    RegisterHumanEventOutput,
    RegisterHumanEventErrors
  >
>;

/**
 * Query Post-Purchase Status Contract
 *
 * Intention:
 * - Provide predictability and reduce customer anxiety
 *
 * Origin:
 * - domain_flows.md (status tracking)
 */
export type QueryPostPurchaseStatusContract = (
  input: QueryPostPurchaseStatusInput
) => Promise<
  ContractResult<
    QueryPostPurchaseStatusOutput,
    QueryPostPurchaseStatusErrors
  >
>;

/**
 * Register Post-Purchase Issue Contract
 *
 * Intention:
 * - Register a post-purchase issue and expose next clear step
 *
 * Origin:
 * - domain_flows.md (contingency)
 */
export type RegisterPostPurchaseIssueContract = (
  input: RegisterPostPurchaseIssueInput
) => Promise<
  ContractResult<
    RegisterPostPurchaseIssueOutput,
    RegisterPostPurchaseIssueErrors
  >
>;
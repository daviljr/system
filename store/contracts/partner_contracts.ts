/**
 * PILLAR 3 — PARTNER CONTRACTS
 *
 * Logical contracts for Partner-related operations.
 * Partners are replaceable executors of the system promise.
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
 * Partner states exposed at system boundary.
 */
export type PartnerState =
  | 'AVAILABLE'
  | 'UNAVAILABLE'
  | 'SUSPENDED';

/* =========================
 * INPUT / OUTPUT DTOs
 * ========================= */

/**
 * Public partner summary.
 */
export interface PartnerSummary {
  partnerId: string;
  state: PartnerState;
  trustLevel: number; // 0–100
}

/**
 * Input to query eligible partners.
 */
export interface QueryPartnersInput {
  productId: string;
}

/**
 * Output with available partners.
 */
export interface QueryPartnersOutput {
  partners: PartnerSummary[];
}

/**
 * Input to register a negative occurrence.
 */
export interface RegisterPartnerIncidentInput {
  partnerId: string;
  description: string;
}

/**
 * Output after incident registration.
 */
export interface RegisterPartnerIncidentOutput {
  partnerId: string;
  currentState: PartnerState;
}

/* =========================
 * CONTRACT ERRORS
 * ========================= */

export type QueryPartnersErrors =
  | 'PARTNER_UNAVAILABLE';

export type RegisterPartnerIncidentErrors =
  | 'PARTNER_UNAVAILABLE'
  | 'INSUFFICIENT_TRUST_LEVEL';

/* =========================
 * CONTRACT SIGNATURES
 * ========================= */

/**
 * Query Partners Contract
 *
 * Intention:
 * - Retrieve eligible partners for a product
 *
 * Origin:
 * - domain_flows.md (partner allocation)
 */
export type QueryPartnersContract = (
  input: QueryPartnersInput
) => Promise<
  ContractResult<QueryPartnersOutput, QueryPartnersErrors>
>;

/**
 * Register Partner Incident Contract
 *
 * Intention:
 * - Inform the system about partner failure or suspicious behavior
 *
 * Origin:
 * - domain_stories.md (real-world failures)
 */
export type RegisterPartnerIncidentContract = (
  input: RegisterPartnerIncidentInput
) => Promise<
  ContractResult<
    RegisterPartnerIncidentOutput,
    RegisterPartnerIncidentErrors
  >
>;
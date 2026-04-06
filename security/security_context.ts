// security/security_context.ts

/**
 * Security Context
 *
 * Canonical security contract passed to the System
 * on every execution boundary.
 *
 * This context represents:
 * - WHO is calling the system
 * - UNDER WHICH trust assumptions
 * - FROM WHICH execution source
 *
 * No command may be executed without a SecurityContext.
 * No default context is allowed.
 * No implicit security is permitted.
 */

/* =========================
 * SECURITY ACTOR
 * ========================= */

/**
 * SecurityActor defines the identity category
 * of the caller.
 *
 * This is NOT a role system.
 * This is NOT authorization.
 * It is identity classification only.
 */
export type SecurityActor =
  | 'SYSTEM'   // Internal automated processes
  | 'USER'     // End users
  | 'PARTNER'  // External partners / providers
  | 'ADMIN';   // Human operators with elevated trust

/* =========================
 * SECURITY CONTEXT
 * ========================= */

/**
 * SecurityContext
 *
 * Mandatory envelope required by:
 * - ApplicationRuntime
 * - CommandGuard
 *
 * This object:
 * - is validated before execution
 * - never changes during execution
 * - never leaks into Domain or Core
 */
export interface SecurityContext {
  /**
   * Identity category of the caller.
   */
  actor: SecurityActor;

  /**
   * Indicates whether the actor
   * has been authenticated by the interface layer.
   */
  authenticated: boolean;

  /**
   * Indicates whether the actor
   * is trusted to execute protected commands.
   *
   * Trust is stronger than authentication.
   */
  trusted: boolean;

  /**
   * Execution source.
   *
   * Always UPPERCASE at security layer.
   */
  source: 'WEB' | 'APP' | 'API' | 'INTERNAL';
}
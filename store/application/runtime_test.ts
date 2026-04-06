import { ApplicationRuntime } from './application_runtime';
import { SecurityContext } from '../../security/security_context';
import { StoreCommand } from './commands/store_command';

/**
 * Runtime Test
 *
 * Manual end-to-end execution of Store flow.
 * This file validates:
 * - Security
 * - Application
 * - Infrastructure
 * - Observability
 */

// 1. Instantiate runtime
const runtime = new ApplicationRuntime();

// 2. Define security context
const securityContext: SecurityContext = {
  actor: 'USER',
  authenticated: true,
  trusted: true,
  source: 'WEB',
};

// 🔒 Type guards for ApplicationResult
function isSuccess<T>(
  result: unknown
): result is { success: true; data: T } {
  return (
    typeof result === 'object' &&
    result !== null &&
    (result as any).success === true &&
    'data' in (result as any)
  );
}

async function run() {
  // 3. CREATE ORDER
  console.log('\n--- CREATE ORDER ---');

  const createOrderCommand: StoreCommand = {
    type: 'CREATE_ORDER',
    payload: {
      customerId: 'cust_001',
      productId: 'prod_123',
      unitPrice: 100,
      quantity: 2,
      source: 'web',
    },
  };

  const orderResult = await runtime.execute(
    createOrderCommand,
    securityContext
  );

  console.log(orderResult);

  if (!isSuccess<{ orderId: string }>(orderResult)) {
    return;
  }

  const orderId = orderResult.data.orderId;

  // 4. PROCESS PAYMENT
  console.log('\n--- PROCESS PAYMENT ---');

  const paymentCommand: StoreCommand = {
    type: 'PROCESS_PAYMENT',
    payload: {
      orderId,
      attemptId: 'attempt_001',
      method: 'card',
      executionResult: {
        status: 'PAID',
        transactionId: 'tx_789',
      },
    },
  };

  const paymentResult = await runtime.execute(
    paymentCommand,
    securityContext
  );

  console.log(paymentResult);

  if (!isSuccess(paymentResult)) {
    return;
  }

  // 5. CONFIRM EXECUTION
  console.log('\n--- CONFIRM EXECUTION ---');

  const executionCommand: StoreCommand = {
    type: 'CONFIRM_EXECUTION',
    payload: {
      orderId,
      availablePartners: [
        {
          partnerId: 'partner_001',
          trustScore: 90,
        },
      ],
      executionResult: {
        status: 'CONFIRMED',
      },
    },
  };

  const executionResult = await runtime.execute(
    executionCommand,
    securityContext
  );

  console.log(executionResult);

  if (!isSuccess(executionResult)) {
    return;
  }

  // 6. POST PURCHASE
  console.log('\n--- POST PURCHASE ---');

  const postPurchaseCommand: StoreCommand = {
    type: 'POST_PURCHASE',
    payload: {
      orderId,
      event: 'EXECUTION_CONFIRMED',
      executionResult: {
        status: 'SENT',
      },
    },
  };

  const postPurchaseResult = await runtime.execute(
    postPurchaseCommand,
    securityContext
  );

  console.log(postPurchaseResult);
}

run();
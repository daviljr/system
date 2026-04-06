// store/application/application_service.ts

import { StoreCommand } from './commands/store_command';
import { ApplicationResult } from './results/application_result';

// Use cases
import { createOrderUseCase } from './use_cases/create_order/create_order.use_case';
import { processPaymentUseCase } from './use_cases/process_payment/process_payment.use_case';
import { confirmExecutionUseCase } from './use_cases/confirm_execution/confirm_execution.use_case';
import { activateContingencyUseCase } from './use_cases/activate_contingency/activate_contingency.use_case';
import { postPurchaseUseCase } from './use_cases/post_purchase/post_purchase.use_case';

/**
 * Application Service
 *
 * Canonical application boundary for Store.
 *
 * It translates:
 * StoreCommand -> Use Case -> ApplicationResult
 *
 * No overloads.
 * No infrastructure.
 * No type guessing by caller.
 */
export class ApplicationService {
  async handle(command: StoreCommand): Promise<ApplicationResult> {
    switch (command.type) {
      case 'CREATE_ORDER': {
        const result = await createOrderUseCase.execute(command.payload);
        return result.success
          ? { success: true, data: result.data }
          : { success: false, error: result.error };
      }

      case 'PROCESS_PAYMENT': {
        const result = await processPaymentUseCase.execute(command.payload);
        return result.success
          ? { success: true, data: result.data }
          : { success: false, error: result.error };
      }

      case 'CONFIRM_EXECUTION': {
        const result = await confirmExecutionUseCase.execute(command.payload);
        return result.success
          ? { success: true, data: result.data }
          : { success: false, error: result.error };
      }

      case 'ACTIVATE_CONTINGENCY': {
        const result = await activateContingencyUseCase.execute(command.payload);
        return result.success
          ? { success: true, data: result.data }
          : { success: false, error: result.error };
      }

      case 'POST_PURCHASE': {
        const result = await postPurchaseUseCase.execute(command.payload);
        return result.success
          ? { success: true, data: result.data }
          : { success: false, error: result.error };
      }

      default:
        return {
          success: false,
          error: {
            code: 'UNKNOWN_APPLICATION_COMMAND',
            message: 'Unsupported application command',
          },
        };
    }
  }
}
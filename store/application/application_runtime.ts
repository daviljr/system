// store/application/application_runtime.ts

import { ApplicationService } from './application_service';

import { paymentAdapter } from '../infrastructure/payment/payment_adapter';
import { executionAdapter } from '../infrastructure/execution/execution_adapter';
import { communicationAdapter } from '../infrastructure/communication/communication_adapter';

import { ApplicationLogger } from '../../observability/application_logger';

import { StoreCommand } from './commands/store_command';
import { CommandGuard } from '../../security/command_guard';
import { SecurityContext } from '../../security/security_context';

/**
 * Application Runtime
 *
 * Executable composition root of the Store module.
 *
 * Responsibilities:
 * - Enforce security boundary
 * - Execute application logic
 * - Route side effects explicitly
 *
 * This file:
 * - DOES know infrastructure
 * - DOES NOT decide business rules
 */
export class ApplicationRuntime {
  private service = new ApplicationService();

  async execute(
    command: StoreCommand,
    securityContext: SecurityContext
  ) {
    // 1. Security boundary
    CommandGuard.authorize(command, securityContext);

    // 2. Log command reception
    ApplicationLogger.commandReceived(
      command.type,
      command.payload
    );

    // 3. Execute application logic
    const result = await this.service.handle(command);

    // 4. Route side effects (command-driven narrowing)
    if (result.success) {
      switch (command.type) {
        case 'PROCESS_PAYMENT': {
          // At this point, we KNOW what the adapter expects
          await paymentAdapter.executePayment(
            result.data as Parameters<
              typeof paymentAdapter.executePayment
            >[0]
          );
          break;
        }

        case 'CONFIRM_EXECUTION': {
          await executionAdapter.executeExecution(
            result.data as Parameters<
              typeof executionAdapter.executeExecution
            >[0]
          );
          break;
        }

        case 'POST_PURCHASE': {
          await communicationAdapter.executeCommunication(
            result.data as Parameters<
              typeof communicationAdapter.executeCommunication
            >[0]
          );
          break;
        }
      }

      ApplicationLogger.commandSucceeded(
        command.type,
        result.data
      );
    } else {
      ApplicationLogger.commandFailed(
        command.type,
        result.error
      );
    }

    // 5. Always return application result
    return result;
  }
}
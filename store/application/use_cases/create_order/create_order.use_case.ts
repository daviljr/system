// store/application/use_cases/create_order/create_order.use_case.ts

import {
  CreateOrderInput,
  CreateOrderResult,
} from './create_order.types';

import { orderContracts } from '../../../contracts/order_contracts';

/**
 * Create Order Use Case
 *
 * Responsibilities:
 * - Validate order creation intent
 * - Apply minimal application-level rules
 * - Produce a deterministic result
 *
 * This use case:
 * - knows NO persistence
 * - knows NO infrastructure
 * - knows NO HTTP
 */
export const createOrderUseCase = {
  async execute(
    input: CreateOrderInput
  ): Promise<CreateOrderResult> {

    // 1. Validate input via contracts
    const validation = orderContracts.validateCreation(input);

    if (!validation.ok) {
      return {
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: 'Invalid order creation input.',
        },
      };
    }

    // 2. Apply simple application logic
    const orderId = crypto.randomUUID();

    const totalAmount =
      input.unitPrice * (input.quantity ?? 1);

    // 3. Return deterministic result
    return {
      success: true,
      data: {
        orderId,
        status: 'CREATED',
        totalAmount,
        message:
          'Order created successfully. Awaiting payment.',
      },
    };
  },
};
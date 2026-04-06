// store/application/use_cases/create_order/create_order.types.ts

/**
 * Input required to decide order creation.
 * No persistence or infrastructure details allowed.
 */
export interface CreateOrderInput {
  customerId: string;
  productId: string;
  quantity?: number;
  unitPrice: number;
  source: 'web' | 'app' | 'api';
}

/**
 * Result of the Create Order use case.
 * Discriminated union enforcing explicit success or failure.
 */
export type CreateOrderResult =
  | {
      success: true;
      data: {
        orderId: string;
        status: 'CREATED';
        totalAmount: number;
        message: string;
      };
    }
  | {
      success: false;
      error: {
        code:
          | 'INVALID_INPUT'
          | 'PRODUCT_NOT_FOUND'
          | 'DOMAIN_RULE_VIOLATION';
        message: string;
      };
    };
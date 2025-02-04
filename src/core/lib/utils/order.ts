import { Order, OrderItem } from '@/types/order';
import { getCurrentDateTime } from './date';

export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
}

export function createNewOrder(clientId: string, items: OrderItem[]): Order {
  return {
    id: generateOrderId(),
    clientId,
    client: {
      id: clientId,
      name: 'عميل تجريبي', // In a real app, this would be the actual client name
      contactInfo: '+20 123456789',
      membershipType: 'professional',
      startDate: '2023-01-15',
      status: 'active',
    },
    items,
    totalCost: calculateOrderTotal(items),
    status: 'PENDING',
    createdAt: getCurrentDateTime(),
  };
}
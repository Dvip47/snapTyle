import { apiClient } from './apiClient';
import { Order, OrderItem } from '../../redux/slices/orderSlice';

export interface CreateOrderData {
  items: OrderItem[];
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  deliveryTime: string;
  paymentMethod: string;
}

export const orderApi = {
  async getOrders(userId: string): Promise<Order[]> {
    return apiClient.get<Order[]>(`/orders/user/${userId}`);
  },

  async getOrderById(orderId: string): Promise<Order> {
    return apiClient.get<Order>(`/orders/${orderId}`);
  },

  async createOrder(orderData: CreateOrderData): Promise<Order> {
    return apiClient.post<Order>('/orders', orderData);
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    return apiClient.patch<Order>(`/orders/${orderId}/status`, { status });
  },

  async cancelOrder(orderId: string): Promise<Order> {
    return apiClient.patch<Order>(`/orders/${orderId}/cancel`);
  },

  async trackOrder(orderId: string): Promise<{ status: string; location?: string; estimatedDelivery?: string }> {
    return apiClient.get<{ status: string; location?: string; estimatedDelivery?: string }>(`/orders/${orderId}/track`);
  },

  async getOrderHistory(userId: string, limit?: number, offset?: number): Promise<{ orders: Order[]; total: number }> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/orders/user/${userId}/history?${queryString}` : `/orders/user/${userId}/history`;
    return apiClient.get<{ orders: Order[]; total: number }>(url);
  },
};

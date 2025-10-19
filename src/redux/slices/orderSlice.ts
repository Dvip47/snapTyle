import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  additionalFee: number; // Home trial fee
  deliveryType: 'instant' | 'home_trial';
  trialWaitTime?: number; // Wait time in minutes for home trial
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    zone?: string; // Delivery zone (e.g., Banjara Hills, Gachibowli)
  };
  deliveryTime: string;
  estimatedDelivery?: string; // ETA for delivery
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  cart: OrderItem[];
  cartTotal: number;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
  cart: [],
  cartTotal: 0,
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.error = null;
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createOrderStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      state.orders.unshift(action.payload);
      state.cart = [];
      state.cartTotal = 0;
      state.error = null;
    },
    createOrderFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addToCart: (state, action: PayloadAction<OrderItem>) => {
      const existingItem = state.cart.find(
        item => item.productId === action.payload.productId && 
        item.size === action.payload.size && 
        item.color === action.payload.color
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }

      state.cartTotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string; size: string; color: string }>) => {
      state.cart = state.cart.filter(
        item => !(item.productId === action.payload.productId && 
        item.size === action.payload.size && 
        item.color === action.payload.color)
      );
      state.cartTotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ productId: string; size: string; color: string; quantity: number }>) => {
      const item = state.cart.find(
        item => item.productId === action.payload.productId && 
        item.size === action.payload.size && 
        item.color === action.payload.color
      );

      if (item) {
        item.quantity = action.payload.quantity;
        state.cartTotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartTotal = 0;
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
      const order = state.orders.find(order => order.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
      }
    },
    setDeliveryType: (state, action: PayloadAction<{ deliveryType: Order['deliveryType']; additionalFee?: number }>) => {
      state.currentOrder = state.currentOrder || {} as Order;
      state.currentOrder.deliveryType = action.payload.deliveryType;
      if (action.payload.additionalFee !== undefined) {
        state.currentOrder.additionalFee = action.payload.additionalFee;
      }
      if (action.payload.deliveryType === 'home_trial') {
        state.currentOrder.trialWaitTime = 20; // 20 minutes wait time
      }
    },
    calculateTotal: (state) => {
      const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      const deliveryFee = subtotal > 299 ? 0 : 29; // Free delivery above ₹299
      const additionalFee = state.currentOrder?.additionalFee || 0;
      state.cartTotal = subtotal + deliveryFee + additionalFee;
    },
  },
});

export const { 
  fetchOrdersStart, 
  fetchOrdersSuccess, 
  fetchOrdersFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  updateOrderStatus,
  setDeliveryType,
  calculateTotal
} = orderSlice.actions;

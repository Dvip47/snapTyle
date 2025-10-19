import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  brand: string;
  category: string;
  size: string[];
  color: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  tags: string[];
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  brands: string[];
  isLoading: boolean;
  error: string | null;
  filters: {
    category: string;
    brand: string;
    priceRange: [number, number];
    size: string;
    color: string;
    sortBy: string;
  };
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  categories: [],
  brands: [],
  isLoading: false,
  error: null,
  filters: {
    category: '',
    brand: '',
    priceRange: [0, 10000],
    size: '',
    color: '',
    sortBy: 'newest',
  },
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.isLoading = false;
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.error = null;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    applyFilters: (state) => {
      let filtered = [...state.products];

      if (state.filters.category) {
        filtered = filtered.filter(product => product.category === state.filters.category);
      }

      if (state.filters.brand) {
        filtered = filtered.filter(product => product.brand === state.filters.brand);
      }

      if (state.filters.size) {
        filtered = filtered.filter(product => product.size.includes(state.filters.size));
      }

      if (state.filters.color) {
        filtered = filtered.filter(product => product.color.includes(state.filters.color));
      }

      filtered = filtered.filter(product => 
        product.price >= state.filters.priceRange[0] && 
        product.price <= state.filters.priceRange[1]
      );

      // Apply sorting
      switch (state.filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
        default:
          filtered.sort((a, b) => b.id.localeCompare(a.id));
          break;
      }

      state.filteredProducts = filtered;
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        brand: '',
        priceRange: [0, 10000],
        size: '',
        color: '',
        sortBy: 'newest',
      };
      state.filteredProducts = state.products;
    },
  },
});

export const { 
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure,
  setFilters,
  applyFilters,
  clearFilters
} = productSlice.actions;

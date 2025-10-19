import { apiClient } from './apiClient';
import { Product } from '../../redux/slices/productSlice';

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  sortBy?: string;
  search?: string;
}

export const productApi = {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const url = queryString ? `/products?${queryString}` : '/products';
    return apiClient.get<Product[]>(url);
  },

  async getProductById(id: string): Promise<Product> {
    return apiClient.get<Product>(`/products/${id}`);
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    return apiClient.get<Product[]>(`/products/category/${category}`);
  },

  async getProductsByBrand(brand: string): Promise<Product[]> {
    return apiClient.get<Product[]>(`/products/brand/${brand}`);
  },

  async searchProducts(query: string): Promise<Product[]> {
    return apiClient.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
  },

  async getFeaturedProducts(): Promise<Product[]> {
    return apiClient.get<Product[]>('/products/featured');
  },

  async getNewArrivals(): Promise<Product[]> {
    return apiClient.get<Product[]>('/products/new-arrivals');
  },

  async getCategories(): Promise<string[]> {
    return apiClient.get<string[]>('/products/categories');
  },

  async getBrands(): Promise<string[]> {
    return apiClient.get<string[]>('/products/brands');
  },
};

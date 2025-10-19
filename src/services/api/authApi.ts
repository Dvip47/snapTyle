import { apiClient } from './apiClient';
import { User } from '../../redux/slices/authSlice';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export const authApi = {
  async login(email: string, password: string): Promise<User> {
    return apiClient.post<User>('/auth/login', { email, password });
  },

  async register(data: RegisterData): Promise<User> {
    return apiClient.post<User>('/auth/register', data);
  },

  async googleLogin(token: string): Promise<User> {
    return apiClient.post<User>('/auth/google', { token });
  },

  async logout(): Promise<void> {
    return apiClient.post<void>('/auth/logout');
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  async refreshToken(): Promise<{ token: string }> {
    return apiClient.post<{ token: string }>('/auth/refresh');
  },
};

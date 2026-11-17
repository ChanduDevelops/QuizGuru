import apiClient from './apiClient';
import { ApiResponse } from '../types/common.types';
import {
  AuthUser,
  ForgotPasswordPayload,
  LoginPayload,
  SignupPayload,
} from '../types/auth.types';

export const authService = {
  async login(payload: LoginPayload): Promise<ApiResponse<AuthUser>> {
    const response = await apiClient.post<ApiResponse<AuthUser>>('/auth/login', payload);
    return response.data;
  },

  async signup(payload: SignupPayload): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>('/auth/signup', payload);
    return response.data;
  },

  async resetPassword(payload: ForgotPasswordPayload): Promise<ApiResponse<void>> {
    const response = await apiClient.put<ApiResponse<void>>('/auth/forgot-password', payload);
    return response.data;
  },
};

import apiClient from './apiClient';
import { ApiResponse, ContactPayload } from '../types/common.types';

export const contactService = {
  async submitMessage(payload: ContactPayload): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>('/contact', payload);
    return response.data;
  },
};

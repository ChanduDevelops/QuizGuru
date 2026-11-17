import apiClient from './apiClient';
import { ApiResponse } from '../types/common.types';
import { UserProfile } from '../types/auth.types';

export const userService = {
    async getProfile(): Promise<UserProfile> {
        const response = await apiClient.get<ApiResponse<UserProfile>>('/users/profile');
        return response.data.data;
    },
};
import apiClient from '@/lib/api-client';
import type { ApiResponse, LoginResult } from '@/types/api';

export async function login(email: string, password: string) {
    const { data } = await apiClient.post<ApiResponse<LoginResult>>('/api/users/login', {
        email,
        password,
    });
    return data.data;
}
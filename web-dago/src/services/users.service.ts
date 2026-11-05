import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedResult, User } from '@/types/api';

export interface ListUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    is_priority_user?: boolean;
    active?: boolean;
}

export async function listUsers(params: ListUsersParams = {}): Promise<PaginatedResult<User>> {
    const { data } = await apiClient.post<ApiResponse<PaginatedResult<User> | User[]>>(
        '/api/admin/users/listUsers',
        params
    );
    const payload = data.data;
    if (Array.isArray(payload)) {
        return {
            items: payload,
            page: params.page || 1,
            limit: params.limit || payload.length,
            total: payload.length,
        };
    }
    return payload;
}

export async function getUserDetail(id: string) {
    const { data } = await apiClient.post<ApiResponse<User>>('/api/admin/users/detail', { id });
    return data.data;
}

export async function updateUserActive(id: string, active: boolean) {
    const { data } = await apiClient.post<ApiResponse<User>>('/api/admin/users/updateActive', {
        id,
        active,
    });
    return data.data;
}

export async function deleteUser(id: string) {
    const { data } = await apiClient.post<ApiResponse<null>>('/api/admin/users/delete', { id });
    return data;
}

export async function createStaff(payload: {
    full_name: string;
    email: string;
    password: string;
    phone?: string;
}) {
    const { data } = await apiClient.post<ApiResponse<User>>(
        '/api/admin/users/createStaff',
        payload
    );
    return data.data;
}
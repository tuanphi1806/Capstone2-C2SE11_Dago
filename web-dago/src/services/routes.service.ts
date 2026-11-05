import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginationParams, Route } from '@/types/api';

export interface ListRoutesParams extends PaginationParams {
    userId?: string;
}

export async function listRoutes(params: ListRoutesParams = {}) {
    const { data } = await apiClient.post<ApiResponse<Route[]>>('/api/routes/listRoutes', params);
    return data.data;
}

export async function getRouteDetail(id: string) {
    const { data } = await apiClient.post<ApiResponse<Route>>('/api/routes/detail', { id });
    return data.data;
}

export async function createRoute(payload: Partial<Route>) {
    const { data } = await apiClient.post<ApiResponse<Route>>('/api/routes/create', payload);
    return data.data;
}

export async function updateRoute(id: string, payload: Partial<Route>) {
    const { data } = await apiClient.post<ApiResponse<Route>>('/api/routes/update', {
        id,
        ...payload,
    });
    return data.data;
}

export async function deleteRoute(id: string) {
    const { data } = await apiClient.post<ApiResponse<null>>('/api/routes/delete', { id });
    return data;
}
import apiClient from '@/lib/api-client';
import type { ApiResponse, Stop } from '@/types/api';

export async function listStopsByRoute(routeId: string, page = 1, limit = 100) {
    const { data } = await apiClient.post<ApiResponse<Stop[]>>('/api/stops/listByRoute', {
        routeId,
        page,
        limit,
    });
    return data.data;
}

export async function getStopDetail(id: string) {
    const { data } = await apiClient.post<ApiResponse<Stop>>('/api/stops/detail', { id });
    return data.data;
}

export interface CreateStopPayload {
    routeId: string;
    stopId: string;
    name: string;
    location?: { type: 'Point'; coordinates: [number, number] };
    times?: string[];
    order?: number;
}

export async function createStop(payload: CreateStopPayload) {
    const { data } = await apiClient.post<ApiResponse<Stop>>('/api/stops/create', payload);
    return data.data;
}

export async function updateStop(id: string, payload: Partial<CreateStopPayload>) {
    const { data } = await apiClient.post<ApiResponse<Stop>>('/api/stops/update', {
        id,
        ...payload,
    });
    return data.data;
}

export async function deleteStop(id: string) {
    const { data } = await apiClient.post<ApiResponse<null>>('/api/stops/delete', { id });
    return data;
}
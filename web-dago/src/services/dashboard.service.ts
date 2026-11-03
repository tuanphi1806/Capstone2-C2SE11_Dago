import apiClient from '@/lib/api-client';
import type { ApiResponse, DashboardSummary } from '@/types/api';

export interface DashboardParams {
    from?: string;
    to?: string;
    granularity?: 'day' | 'week' | 'month';
    topRoutesLimit?: number;
}

export async function getDashboardSummary(params: DashboardParams = {}) {
    const { data } = await apiClient.post<ApiResponse<DashboardSummary>>(
        '/api/admin/dashboard/summary',
        params
    );
    return data.data;
}
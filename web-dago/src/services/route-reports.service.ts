import apiClient from '@/lib/api-client';
import type {
    ApiResponse,
    PaginationParams,
    RouteReport,
    RouteReportStatus,
    RouteReportType,
} from '@/types/api';

export interface ListRouteReportsParams extends PaginationParams {
    status?: RouteReportStatus;
    type?: RouteReportType;
    userId?: string;
}

export async function listRouteReports(params: ListRouteReportsParams = {}) {
    const { data } = await apiClient.post<ApiResponse<RouteReport[]>>(
        '/api/route-reports/listRouteReports',
        params
    );
    return data.data;
}

export async function getRouteReportDetail(id: string) {
    const { data } = await apiClient.post<ApiResponse<RouteReport>>('/api/route-reports/detail', {
        id,
    });
    return data.data;
}

export async function reviewRouteReport(
    id: string,
    status: RouteReportStatus,
    reviewNote?: string
) {
    const { data } = await apiClient.post<ApiResponse<RouteReport>>(
        '/api/admin/route-reports/review',
        { id, status, reviewNote }
    );
    return data.data;
}
import apiClient from '@/lib/api-client';
import type { ApiResponse, ShiftReport, ShiftReportStatus } from '@/types/api';

export interface ListShiftReportsParams {
    page?: number;
    limit?: number;
    status?: ShiftReportStatus;
    staffId?: string;
}

export interface ShiftReportsResult {
    items: ShiftReport[];
    page: number;
    limit: number;
    total: number;
}

export async function listShiftReports(params: ListShiftReportsParams = {}) {
    const { data } = await apiClient.post<ApiResponse<ShiftReportsResult>>(
        '/api/admin/shift-reports/list',
        params
    );
    return data.data;
}

export async function getShiftReportDetail(id: string) {
    const { data } = await apiClient.post<ApiResponse<ShiftReport>>(
        '/api/admin/shift-reports/detail',
        { id }
    );
    return data.data;
}

export async function reviewShiftReport(
    reportId: string,
    status: 'approved' | 'rejected',
    reviewNote?: string
) {
    const { data } = await apiClient.post<ApiResponse<ShiftReport>>(
        '/api/admin/shift-reports/review',
        { reportId, status, reviewNote }
    );
    return data.data;
}
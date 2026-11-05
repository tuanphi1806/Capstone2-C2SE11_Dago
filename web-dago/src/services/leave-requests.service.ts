import apiClient from '@/lib/api-client';
import type { ApiResponse, LeaveRequest, LeaveRequestStatus, PaginatedResult } from '@/types/api';

export interface ListLeaveRequestsParams {
    page?: number;
    limit?: number;
    status?: LeaveRequestStatus;
    staffId?: string;
}

export async function listLeaveRequests(params: ListLeaveRequestsParams = {}) {
    const { data } = await apiClient.post<ApiResponse<PaginatedResult<LeaveRequest>>>(
        '/api/admin/leave-requests/list',
        params
    );
    return data.data;
}

export async function getLeaveRequestDetail(id: string) {
    const { data } = await apiClient.post<ApiResponse<LeaveRequest>>(
        '/api/admin/leave-requests/detail',
        { id }
    );
    return data.data;
}

export async function reviewLeaveRequest(
    id: string,
    status: 'approved' | 'rejected',
    reviewNote?: string
) {
    const { data } = await apiClient.post<ApiResponse<LeaveRequest>>(
        '/api/admin/leave-requests/review',
        { id, status, reviewNote }
    );
    return data.data;
}
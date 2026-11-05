import apiClient from '@/lib/api-client';
import type {
    ApiResponse,
    PaginatedResult,
    SchedulePeriod,
    ScheduleStatus,
    StaffSchedule,
} from '@/types/api';

export interface ListSchedulesParams {
    from?: string;
    to?: string;
    staffId?: string;
    routeId?: string;
    period?: SchedulePeriod;
    status?: ScheduleStatus;
    page?: number;
    limit?: number;
}

export interface SchedulesResult extends PaginatedResult<StaffSchedule> {
    from: string;
    to: string;
}

export async function listSchedules(params: ListSchedulesParams = {}) {
    const { data } = await apiClient.post<ApiResponse<SchedulesResult>>(
        '/api/admin/staff-schedules/list',
        params
    );
    return data.data;
}

export async function getScheduleDetail(id: string) {
    const { data } = await apiClient.post<ApiResponse<StaffSchedule>>(
        '/api/admin/staff-schedules/detail',
        { id }
    );
    return data.data;
}

export async function createSchedule(payload: Partial<StaffSchedule> & { staffId: string }) {
    const { data } = await apiClient.post<ApiResponse<StaffSchedule>>(
        '/api/admin/staff-schedules',
        payload
    );
    return data.data;
}

export async function updateSchedule(id: string, payload: Partial<StaffSchedule>) {
    const { data } = await apiClient.post<ApiResponse<StaffSchedule>>(
        '/api/admin/staff-schedules/update',
        { id, ...payload }
    );
    return data.data;
}

export async function cancelSchedule(id: string) {
    const { data } = await apiClient.post<ApiResponse<StaffSchedule>>(
        '/api/admin/staff-schedules/cancel',
        { id }
    );
    return data.data;
}
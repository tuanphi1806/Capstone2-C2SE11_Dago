'use client';

import { useQuery } from '@tanstack/react-query';
import {
    getLeaveRequestDetail,
    listLeaveRequests,
    type ListLeaveRequestsParams,
} from '@/services/leave-requests.service';

export function useLeaveRequests(params: ListLeaveRequestsParams) {
    return useQuery({
        queryKey: ['leave-requests', params],
        queryFn: () => listLeaveRequests(params),
    });
}

export function useLeaveRequestDetail(id: string) {
    return useQuery({
        queryKey: ['leave-requests', id],
        queryFn: () => getLeaveRequestDetail(id),
        enabled: !!id,
    });
}
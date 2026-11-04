'use client';

import { useQuery } from '@tanstack/react-query';
import {
    getShiftReportDetail,
    listShiftReports,
    type ListShiftReportsParams,
} from '@/services/shift-reports.service';

export function useShiftReports(params: ListShiftReportsParams) {
    return useQuery({
        queryKey: ['shift-reports', params],
        queryFn: () => listShiftReports(params),
    });
}

export function useShiftReportDetail(id: string) {
    return useQuery({
        queryKey: ['shift-reports', 'detail', id],
        queryFn: () => getShiftReportDetail(id),
        enabled: !!id,
    });
}
'use client';

import { useQuery } from '@tanstack/react-query';
import {
    getRouteReportDetail,
    listRouteReports,
    type ListRouteReportsParams,
} from '@/services/route-reports.service';

export function useRouteReports(params: ListRouteReportsParams) {
    return useQuery({
        queryKey: ['route-reports', params],
        queryFn: () => listRouteReports(params),
    });
}

export function useRouteReportDetail(id: string) {
    return useQuery({
        queryKey: ['route-reports', id],
        queryFn: () => getRouteReportDetail(id),
        enabled: !!id,
    });
}
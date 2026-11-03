'use client';

import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary, type DashboardParams } from '@/services/dashboard.service';

export function useDashboardSummary(params: DashboardParams = {}) {
    return useQuery({
        queryKey: ['dashboard', params],
        queryFn: () => getDashboardSummary(params),
        staleTime: 60_000,
    });
}
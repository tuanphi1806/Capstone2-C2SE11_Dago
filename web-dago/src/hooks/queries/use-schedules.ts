'use client';

import { useQuery } from '@tanstack/react-query';
import { listSchedules, type ListSchedulesParams } from '@/services/schedules.service';

export function useSchedules(params: ListSchedulesParams) {
    return useQuery({
        queryKey: ['schedules', params],
        queryFn: () => listSchedules(params),
    });
}
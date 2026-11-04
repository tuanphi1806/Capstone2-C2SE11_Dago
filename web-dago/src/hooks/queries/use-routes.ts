'use client';

import { useQuery } from '@tanstack/react-query';
import { getRouteDetail, listRoutes, type ListRoutesParams } from '@/services/routes.service';

export function useRoutes(params: ListRoutesParams) {
    return useQuery({
        queryKey: ['routes', params],
        queryFn: () => listRoutes(params),
    });
}

export function useRouteDetail(id: string) {
    return useQuery({
        queryKey: ['routes', id],
        queryFn: () => getRouteDetail(id),
        enabled: !!id,
    });
}
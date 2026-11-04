'use client';

import { useQuery } from '@tanstack/react-query';
import { listStopsByRoute } from '@/services/stops.service';

export function useStops(routeId: string) {
    return useQuery({
        queryKey: ['stops', routeId],
        queryFn: () => listStopsByRoute(routeId),
        enabled: !!routeId,
    });
}
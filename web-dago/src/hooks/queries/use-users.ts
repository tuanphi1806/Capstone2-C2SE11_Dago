'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserDetail, listUsers, type ListUsersParams } from '@/services/users.service';

export function useUsers(params: ListUsersParams) {
    return useQuery({
        queryKey: ['users', params],
        queryFn: () => listUsers(params),
    });
}

export function useStaffOptions() {
    return useQuery({
        queryKey: ['users', 'staff-options'],
        queryFn: async () => {
            const result = await listUsers({ role: 'staff', limit: 100, active: true });
            return result.items;
        },
        staleTime: 60_000,
    });
}

export function useUserDetail(id: string) {
    return useQuery({
        queryKey: ['users', id],
        queryFn: () => getUserDetail(id),
        enabled: !!id,
    });
}
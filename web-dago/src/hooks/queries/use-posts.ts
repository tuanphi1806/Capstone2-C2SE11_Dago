'use client';

import { useQuery } from '@tanstack/react-query';
import { getPostDetail, listPosts } from '@/services/posts.service';
import type { PaginationParams } from '@/types/api';

export function usePosts(params: PaginationParams) {
    return useQuery({
        queryKey: ['posts', params],
        queryFn: () => listPosts(params),
    });
}

export function usePostDetail(id: string) {
    return useQuery({
        queryKey: ['posts', id],
        queryFn: () => getPostDetail(id),
        enabled: !!id,
    });
}
import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginationParams, Post } from '@/types/api';

export async function listPosts(params: PaginationParams = {}) {
    const { data } = await apiClient.post<ApiResponse<Post[]>>('/api/posts/listPosts', params);
    return data.data;
}

export async function getPostDetail(id: string) {
    const { data } = await apiClient.post<ApiResponse<Post>>('/api/posts/detail', { id });
    return data.data;
}

export async function createPost(payload: Partial<Post>) {
    const { data } = await apiClient.post<ApiResponse<Post>>('/api/posts/create', payload);
    return data.data;
}

export async function updatePost(id: string, payload: Partial<Post>) {
    const { data } = await apiClient.post<ApiResponse<Post>>('/api/posts/update', {
        id,
        ...payload,
    });
    return data.data;
}

export async function deletePost(id: string) {
    const { data } = await apiClient.post<ApiResponse<null>>('/api/posts/delete', { id });
    return data;
}
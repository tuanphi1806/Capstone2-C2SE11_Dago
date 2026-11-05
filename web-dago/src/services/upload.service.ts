import apiClient from '@/lib/api-client';
import type { ApiResponse } from '@/types/api';

export async function uploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    const { data } = await apiClient.post<ApiResponse<string[]>>('/api/upload/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
}
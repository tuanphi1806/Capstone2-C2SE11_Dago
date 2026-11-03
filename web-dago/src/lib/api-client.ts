import axios from 'axios';
import { clearAuth, getToken } from '@/lib/auth';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            clearAuth();
            if (!window.location.pathname.startsWith('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || error.message || 'Đã xảy ra lỗi';
    }
    if (error instanceof Error) return error.message;
    return 'Đã xảy ra lỗi';
}
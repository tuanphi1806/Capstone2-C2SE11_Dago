import apiClient from '@/lib/api-client';
import type { ApiResponse, TicketProduct } from '@/types/api';

export async function listTicketProducts() {
    const { data } = await apiClient.post<ApiResponse<TicketProduct[]>>(
        '/api/admin/ticket-products/list'
    );
    return data.data;
}

export async function getTicketProductDetail(id: string) {
    const { data } = await apiClient.post<ApiResponse<TicketProduct>>(
        '/api/admin/ticket-products/detail',
        { id }
    );
    return data.data;
}

export async function createTicketProduct(payload: Partial<TicketProduct>) {
    const { data } = await apiClient.post<ApiResponse<TicketProduct>>(
        '/api/admin/ticket-products/create',
        payload
    );
    return data.data;
}

export async function updateTicketProduct(id: string, payload: Partial<TicketProduct>) {
    const { data } = await apiClient.post<ApiResponse<TicketProduct>>(
        '/api/admin/ticket-products/update',
        { id, ...payload }
    );
    return data.data;
}

export async function deactivateTicketProduct(id: string) {
    const { data } = await apiClient.post<ApiResponse<TicketProduct>>(
        '/api/admin/ticket-products/delete',
        { id }
    );
    return data.data;
}
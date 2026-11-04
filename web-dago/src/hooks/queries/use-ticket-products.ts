'use client';

import { useQuery } from '@tanstack/react-query';
import { getTicketProductDetail, listTicketProducts } from '@/services/ticket-products.service';

export function useTicketProducts() {
    return useQuery({
        queryKey: ['ticket-products'],
        queryFn: listTicketProducts,
    });
}

export function useTicketProductDetail(id: string) {
    return useQuery({
        queryKey: ['ticket-products', id],
        queryFn: () => getTicketProductDetail(id),
        enabled: !!id,
    });
}
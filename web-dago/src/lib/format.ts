import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export function formatDate(value?: string | Date | null) {
    if (!value) return '—';
    const date = typeof value === 'string' ? new Date(value) : value;
    return format(date, 'dd/MM/yyyy HH:mm', { locale: vi });
}

export function formatCurrency(value?: number) {
    if (value == null) return '—';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

export function getEntityId(value: string | { _id: string } | undefined): string {
    if (!value) return '';
    return typeof value === 'string' ? value : value._id;
}

export function getEntityName(
    value: string | { full_name?: string; name?: string; code?: string } | undefined
): string {
    if (!value) return '—';
    if (typeof value === 'string') return value;
    return value.full_name || value.name || value.code || '—';
}

export function utcDateKey(value?: string | Date | null) {
    if (!value) return '';
    const date = typeof value === 'string' ? new Date(value) : value;
    return date.toISOString().slice(0, 10);
}

export function formatDayLabel(value: string | Date) {
    const date = typeof value === 'string' ? new Date(value) : value;
    return format(date, 'EEE dd/MM', { locale: vi });
}

export function toUtcDayIso(yyyyMmDd: string) {
    return `${yyyyMmDd}T00:00:00.000Z`;
}

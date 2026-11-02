import type { User } from '@/types/api';

const TOKEN_KEY = 'smartbus_token';
const USER_KEY = 'smartbus_user';
const COOKIE_NAME = 'smartbus_token';

export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as User;
    } catch {
        return null;
    }
}

export function setAuth(token: string, user: User) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}

export function isAdmin(user: User | null): boolean {
    return user?.role === 'admin';
}
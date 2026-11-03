export type UserRole = 'admin' | 'staff' | 'user';

export interface User {
    _id: string;
    full_name: string;
    email: string;
    phone?: string;
    role: UserRole;
    active: boolean;
    is_priority_user?: boolean;
    gender?: string;
    province?: string;
    district?: string;
    ward?: string;
    address_detail?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    sort?: 'newest' | 'oldest';
}

export interface PaginatedResult<T> {
    items: T[];
    page: number;
    limit: number;
    total: number;
}

export interface Post {
    _id: string;
    title: string;
    summary?: string;
    content?: string;
    images?: string[];
    category?: string;
    user?: User | string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Route {
    _id: string;
    code: string;
    name: string;
    description?: string;
    isHot?: boolean;
    turnOnDay?: number;
    startName?: string;
    endName?: string;
    staffId?: User | string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Stop {
    _id: string;
    routeId: string;
    stopId?: string;
    stopCode?: string;
    name: string;
    location?: {
        type: 'Point';
        coordinates: [number, number];
    };
    times?: string[];
    order?: number;
}

export type RouteReportStatus = 'new' | 'in_progress' | 'resolved' | 'rejected';
export type RouteReportType = 'issue' | 'suggestion' | 'complaint' | 'other';

export interface RouteReport {
    _id: string;
    userId?: User | string;
    routeId?: Route | string;
    type: RouteReportType;
    content: string;
    phone?: string;
    status: RouteReportStatus;
    reviewNote?: string;
    reviewedBy?: User | string;
    reviewedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type ShiftReportStatus = 'submitted' | 'approved' | 'rejected';

export interface ShiftReport {
    _id: string;
    staffId?: User | string;
    shiftStartAt: string;
    shiftEndAt: string;
    totalScans: number;
    successfulScans: number;
    failedScans: number;
    totalRevenue: number;
    note?: string;
    status: ShiftReportStatus;
    reviewedBy?: User | string;
    reviewNote?: string;
    reviewedAt?: string;
    createdAt?: string;
}

export type LeaveRequestStatus = 'submitted' | 'approved' | 'rejected';

export interface LeaveRequest {
    _id: string;
    staffId?: User | string;
    startDate: string;
    endDate: string;
    reason: string;
    status: LeaveRequestStatus;
    reviewedBy?: User | string;
    reviewNote?: string;
    reviewedAt?: string;
    createdAt?: string;
}

export type SchedulePeriod = 'morning' | 'afternoon' | 'evening';
export type ScheduleStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface StaffSchedule {
    _id: string;
    staffId?: User | string;
    workDate: string;
    dateLabel?: string;
    isToday?: boolean;
    period: SchedulePeriod;
    periodLabel?: string;
    startTime: string;
    endTime: string;
    timeRange?: string;
    routeId?: string | null;
    routeCode?: string;
    routeName?: string;
    plateNumber?: string;
    status: ScheduleStatus;
    statusLabel?: string;
    createdAt?: string;
}

export type TicketProductCode = 'single' | 'monthlySingleRoute' | 'monthlyInterRoute';

export interface TicketProduct {
    _id: string;
    code: TicketProductCode;
    title: string;
    validity?: string;
    unitPrice: number;
    active: boolean;
    sortOrder?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface DashboardSummary {
    meta: {
        generatedAt: string;
        range: { from: string; to: string; granularity: string };
    };
    totals: {
        users: number;
        posts: number;
        routes: number;
        routeReports: number;
        shiftReports: number;
        tickets: number;
        stops: number;
    };
    periodCounts: Record<string, number>;
    users: { active: number; inactive: number; byRole: Record<string, number> };
    routeReports: { byStatus: Record<string, number>; byType: Record<string, number> };
    shiftReports: {
        byStatus: Record<string, number>;
        revenueTotalAllTime: number;
        scansAllTime: { total: number; successful: number; failed: number };
    };
    tickets: { byStatus: Record<string, number> };
    timeSeries: {
        postsByPeriod: { period: string; count: number }[];
        routeReportsByPeriod: { period: string; count: number }[];
        shiftReportsByPeriod: { period: string; count: number }[];
        ticketsByPeriod: { period: string; count: number }[];
        shiftRevenueByPeriod: { period: string; revenue: number; reports: number }[];
    };
    topRoutesByReportCount: {
        routeId: string;
        reportCount: number;
        code?: string;
        name?: string;
    }[];
}

export interface LoginResult {
    user: User;
    token: string;
}
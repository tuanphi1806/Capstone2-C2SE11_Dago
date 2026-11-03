import { z } from 'zod';

export const postFormSchema = z.object({
    title: z.string().min(1, 'Tiêu đề không được để trống'),
    summary: z.string().optional(),
    content: z.string().optional(),
    category: z.string().optional(),
    images: z.array(z.string()).optional(),
});

export type PostFormValues = z.infer<typeof postFormSchema>;

export const routeFormSchema = z.object({
    code: z.string().min(1, 'Mã tuyến không được để trống'),
    name: z.string().min(1, 'Tên tuyến không được để trống'),
    description: z.string().optional(),
    startName: z.string().optional(),
    endName: z.string().optional(),
    isHot: z.boolean(),
    turnOnDay: z.number().min(0).max(7),
    staffId: z.string().optional(),
});

export type RouteFormValues = z.infer<typeof routeFormSchema>;

export const stopFormSchema = z.object({
    stopId: z.string().min(1, 'Mã điểm dừng không được để trống'),
    name: z.string().min(1, 'Tên không được để trống'),
    order: z.number().min(0),
    lng: z.number(),
    lat: z.number(),
});

export type StopFormValues = z.infer<typeof stopFormSchema>;

export const scheduleFormSchema = z.object({
    staffId: z.string().min(1, 'Chọn nhân viên'),
    workDate: z.string().min(1, 'Chọn ngày làm việc'),
    period: z.enum(['morning', 'afternoon', 'evening']),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    routeId: z.string().optional(),
    plateNumber: z.string().optional(),
});

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

export const ticketProductFormSchema = z.object({
    code: z.enum(['single', 'monthlySingleRoute', 'monthlyInterRoute']),
    title: z.string().min(1, 'Tiêu đề không được để trống'),
    validity: z.string().optional(),
    unitPrice: z.number().min(0, 'Giá phải >= 0'),
    sortOrder: z.number().min(0),
    active: z.boolean(),
});

export type TicketProductFormValues = z.infer<typeof ticketProductFormSchema>;

export const createStaffFormSchema = z.object({
    full_name: z.string().min(1, 'Họ tên không được để trống'),
    email: z.string().email('Email không hợp lệ'),
    phone: z.string().optional(),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export type CreateStaffFormValues = z.infer<typeof createStaffFormSchema>;

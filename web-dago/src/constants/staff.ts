import { translate, type TranslationKey } from "@/i18n/translations";
import type { LeaveRequestStatus } from "@/models/leaveRequest";
import type { ShiftReportStatus } from "@/models/shiftReport";
import useLocaleStore from "@/store/locale.store";

export type StaffNotificationItem = {
    id: string;
    titleKey: TranslationKey | string;
    datetime: string;
};

export const STAFF_SHIFT_STATUS_KEY: Record<
    ShiftReportStatus,
    TranslationKey | string
> = {
    submitted: "staff.status.pending",
    approved: "staff.status.approved",
    rejected: "staff.status.rejected",
};

export const STAFF_LEAVE_STATUS_KEY: Record<
    LeaveRequestStatus,
    TranslationKey | string
> = {
    submitted: "staff.status.pending",
    approved: "staff.status.approved",
    rejected: "staff.status.rejected",
};

export function getStaffShiftStatusLabel(status: ShiftReportStatus) {
    return translate(
        useLocaleStore.getState().locale,
        STAFF_SHIFT_STATUS_KEY[status],
    );
}

export function getStaffLeaveStatusLabel(status: LeaveRequestStatus) {
    return translate(
        useLocaleStore.getState().locale,
        STAFF_LEAVE_STATUS_KEY[status],
    );
}

export const STAFF_NOTIFICATIONS_MOCK: StaffNotificationItem[] = [
    {
        id: "noti-1",
        titleKey: "staff.notifications.mock.license",
        datetime: "14:00 06/11/2025",
    },
    {
        id: "noti-2",
        titleKey: "staff.notifications.mock.update",
        datetime: "04:52 03/11/2025",
    },
];
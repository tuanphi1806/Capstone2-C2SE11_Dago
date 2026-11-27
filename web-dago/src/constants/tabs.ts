import {
    Bell,
    CreditCard,
    Home,
    User,
    type LucideIcon,
} from "lucide-react-native";

export type TabRouteName =
    | "index"
    | "notifications"
    | "payment"
    | "profile";

export type TabConfig = {
    labelKey: string;
    icon: LucideIcon;
    activeColor: string;
    inactiveColor: string;
    screenIconColor: string;
    screenIconBgClass: string;
    isCenter?: boolean;
};

export const TAB_CONFIG: Record<TabRouteName, TabConfig> = {
    index: {
        labelKey: "tabs.home",
        icon: Home,
        activeColor: "#005f8b",
        inactiveColor: "#94a3b8",
        screenIconColor: "#00a2e8",
        screenIconBgClass: "bg-accent-light",
    },
    notifications: {
        labelKey: "tabs.notifications",
        icon: Bell,
        activeColor: "#005f8b",
        inactiveColor: "#94a3b8",
        screenIconColor: "#00a2e8",
        screenIconBgClass: "bg-accent-light",
    },
    payment: {
        labelKey: "tabs.payment",
        icon: CreditCard,
        activeColor: "#005f8b",
        inactiveColor: "#94a3b8",
        screenIconColor: "#005f8b",
        screenIconBgClass: "bg-primary-light",
    },
    profile: {
        labelKey: "tabs.profile",
        icon: User,
        activeColor: "#005f8b",
        inactiveColor: "#94a3b8",
        screenIconColor: "#005f8b",
        screenIconBgClass: "bg-primary-light",
    },
};

export const TAB_ROUTES = Object.keys(TAB_CONFIG) as TabRouteName[];
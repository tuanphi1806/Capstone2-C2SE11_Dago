import {
    Bell,
    CreditCard,
    FileText,
    Heart,
    HelpCircle,
    History,
    Info,
    Languages,
    LogIn,
    LogOut,
    MapPin,
    Shield,
    Ticket,
    UserRound,
    type LucideIcon,
} from "lucide-react-native";
import type { TranslationKey } from "@/i18n/translations";

export type ProfileMenuItemConfig = {
    id: string;
    labelKey: TranslationKey;
    descriptionKey?: TranslationKey;
    /** description động (vd. ngôn ngữ hiện tại) — override descriptionKey */
    descriptionFromLocale?: boolean;
    icon: LucideIcon;
    href?: string;
    authOnly?: boolean;
    guestOnly?: boolean;
    destructive?: boolean;
};

export type ProfileMenuSectionConfig = {
    id: string;
    titleKey: TranslationKey;
    items: ProfileMenuItemConfig[];
};

export const PROFILE_MENU_SECTIONS: ProfileMenuSectionConfig[] = [
    {
        id: "account",
        titleKey: "profile.section.account",
        items: [
            {
                id: "edit-profile",
                labelKey: "profile.menu.editProfile",
                descriptionKey: "profile.menu.editProfile.desc",
                icon: UserRound,
                href: "/profile/edit",
                authOnly: true,
            },
            {
                id: "payment",
                labelKey: "profile.menu.payment",
                descriptionKey: "profile.menu.payment.desc",
                icon: CreditCard,
                href: "/payment",
            },
            {
                id: "my-tickets",
                labelKey: "profile.menu.myTickets",
                descriptionKey: "profile.menu.myTickets.desc",
                icon: Ticket,
                href: "/profile/my-tickets",
                authOnly: true,
            },
            {
                id: "trip-history",
                labelKey: "profile.menu.tripHistory",
                descriptionKey: "profile.menu.tripHistory.desc",
                icon: History,
                href: "/profile/trip-history",
                authOnly: true,
            },
        ],
    },
    {
        id: "services",
        titleKey: "profile.section.services",
        items: [
            {
                id: "favorites",
                labelKey: "profile.menu.favorites",
                descriptionKey: "profile.menu.favorites.desc",
                icon: Heart,
                href: "/routes/favorites",
            },
            {
                id: "nearby",
                labelKey: "profile.menu.nearby",
                descriptionKey: "profile.menu.nearby.desc",
                icon: MapPin,
                href: "/",
            },
            {
                id: "notifications",
                labelKey: "profile.menu.notifications",
                descriptionKey: "profile.menu.notifications.desc",
                icon: Bell,
                href: "/notifications",
            },
        ],
    },
    {
        id: "settings",
        titleKey: "profile.section.settings",
        items: [
            {
                id: "language",
                labelKey: "profile.menu.language",
                descriptionFromLocale: true,
                icon: Languages,
                href: "/profile/language",
            },
            {
                id: "help",
                labelKey: "profile.menu.help",
                descriptionKey: "profile.menu.help.desc",
                icon: HelpCircle,
                href: "/help",
            },
            {
                id: "terms",
                labelKey: "profile.menu.terms",
                icon: FileText,
                href: "/profile/terms",
            },
            {
                id: "privacy",
                labelKey: "profile.menu.privacy",
                icon: Shield,
                href: "/profile/privacy",
            },
            {
                id: "about",
                labelKey: "profile.menu.about",
                descriptionKey: "profile.menu.about.desc",
                icon: Info,
                href: "/profile/about",
            },
        ],
    },
];

export const PROFILE_AUTH_ACTIONS: ProfileMenuItemConfig[] = [
    {
        id: "login",
        labelKey: "profile.menu.login",
        descriptionKey: "profile.menu.login.desc",
        icon: LogIn,
        href: "/login",
        guestOnly: true,
    },
    {
        id: "logout",
        labelKey: "profile.menu.logout",
        descriptionKey: "profile.menu.logout.desc",
        icon: LogOut,
        destructive: true,
        authOnly: true,
    },
];

export const GUEST_PROFILE_STATS = [
    { id: "points", labelKey: "profile.stats.points", value: "—" },
    { id: "trips", labelKey: "profile.stats.trips", value: "—" },
    { id: "tickets", labelKey: "profile.stats.monthlyTicket", value: "—" },
] as const;

export const DEMO_PROFILE_STATS = [
    { id: "points", labelKey: "profile.stats.points", value: "1.250" },
    { id: "trips", labelKey: "profile.stats.trips", value: "48" },
    { id: "tickets", labelKey: "profile.stats.monthlyTicket", value: "1" },
] as const;
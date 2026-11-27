import type { LucideIcon } from "lucide-react-native";
import {
    MapPinned,
    Route,
    ScanLine,
    Ticket,
} from "lucide-react-native";

export type HomeTip = {
    id: string;
    titleKey: string;
    descriptionKey: string;
    icon: LucideIcon;
    colorClass: string;
};

export const HOME_TIPS: HomeTip[] = [
    {
        id: "plan-ahead",
        titleKey: "home.tip.planAhead.title",
        descriptionKey: "home.tip.planAhead.desc",
        icon: Route,
        colorClass: "bg-accent",
    },
    {
        id: "save-favorite",
        titleKey: "home.tip.saveFavorite.title",
        descriptionKey: "home.tip.saveFavorite.desc",
        icon: MapPinned,
        colorClass: "bg-primary",
    },
    {
        id: "monthly-ticket",
        titleKey: "home.tip.monthlyTicket.title",
        descriptionKey: "home.tip.monthlyTicket.desc",
        icon: Ticket,
        colorClass: "bg-highlight",
    },
    {
        id: "scan-boarding",
        titleKey: "home.tip.scanBoarding.title",
        descriptionKey: "home.tip.scanBoarding.desc",
        icon: ScanLine,
        colorClass: "bg-alert",
    },
];

export const HOME_FAQ_PREVIEW_COUNT = 3;
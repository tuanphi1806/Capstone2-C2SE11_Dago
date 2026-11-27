export type QuickAction = {
    id: string;
    labelKey: string;
    icon: "search" | "map-pin" | "heart" | "message-circle";
    path: string;
};

export const QUICK_ACTIONS: QuickAction[] = [
    {
        id: "lookup",
        labelKey: "home.quick.lookup",
        icon: "search",
        path: "/routes/lookup",
    },
    {
        id: "nearby",
        labelKey: "home.quick.nearby",
        icon: "map-pin",
        path: "/routes/nearby",
    },
    {
        id: "favorites",
        labelKey: "home.quick.favorites",
        icon: "heart",
        path: "/routes/favorites",
    },
    {
        id: "reviews",
        labelKey: "home.quick.reviews",
        icon: "message-circle",
        path: "/routes/reviews",
    },
];
import { Text, View, type ViewProps } from "react-native";

type BadgeVariant = "promo" | "alert" | "neutral";

type BadgeProps = ViewProps & {
    label: string;
    variant?: BadgeVariant;
    className?: string;
};

const badgeClasses: Record<BadgeVariant, string> = {
    promo: "flex-row items-center rounded-full px-2 py-0.5 bg-highlight",
    alert: "flex-row items-center rounded-full px-2 py-0.5 bg-alert",
    neutral:
        "flex-row items-center rounded-full border border-border px-2 py-0.5 bg-surface",
};

const labelClasses: Record<BadgeVariant, string> = {
    promo: "text-xs font-bold text-on-highlight",
    alert: "text-xs font-bold text-on-alert",
    neutral: "text-xs font-bold text-text-secondary",
};

export function Badge({
    label,
    variant = "promo",
    className,
    ...props
}: BadgeProps) {
    return (
        <View
            className={`${badgeClasses[variant]}${className ? ` ${className}` : ""}`}
            {...props}
        >
            <Text className={labelClasses[variant]}>{label}</Text>
        </View>
    );
}
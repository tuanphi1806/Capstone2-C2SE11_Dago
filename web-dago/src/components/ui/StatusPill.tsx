import { cn } from "@/lib/utils";
import { Text, View } from "react-native";

type StatusPillVariant =
    | "success"
    | "warning"
    | "muted"
    | "danger"
    | "primary";

type StatusPillProps = {
    label: string;
    variant?: StatusPillVariant;
    className?: string;
};

const variantClasses: Record<StatusPillVariant, string> = {
    success: "bg-accent-light",
    warning: "bg-highlight-light",
    muted: "bg-surface",
    danger: "bg-alert-light",
    primary: "bg-primary-light",
};

const labelClasses: Record<StatusPillVariant, string> = {
    success: "text-accent-dark",
    warning: "text-highlight-dark",
    muted: "text-text-muted",
    danger: "text-alert",
    primary: "text-primary",
};

export function StatusPill({
    label,
    variant = "muted",
    className,
}: StatusPillProps) {
    return (
        <View
            className={cn(
                "rounded-full px-2.5 py-1",
                variantClasses[variant],
                className,
            )}
        >
            <Text className={cn("text-xs font-semibold", labelClasses[variant])}>
                {label}
            </Text>
        </View>
    );
}
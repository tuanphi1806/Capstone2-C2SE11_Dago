import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react-native";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View, type PressableProps } from "react-native";

type ListRowProps = PressableProps & {
    label: string;
    description?: string;
    icon?: LucideIcon;
    iconColor?: string;
    iconBgClassName?: string;
    destructive?: boolean;
    showChevron?: boolean;
    trailing?: React.ReactNode;
    className?: string;
};

export function ListRow({
    label,
    description,
    icon: Icon,
    iconColor = "#005f8b",
    iconBgClassName = "bg-primary-light",
    destructive = false,
    showChevron = true,
    trailing,
    className,
    ...props
}: ListRowProps) {
    const resolvedIconColor = destructive ? "#e50049" : iconColor;
    const resolvedIconBg = destructive ? "bg-alert-light" : iconBgClassName;
    const labelClass = destructive ? "text-alert" : "text-text-primary";

    return (
        <Pressable
            accessibilityRole="button"
            className={cn(
                "flex-row items-center gap-3 px-4 py-3.5 active:opacity-80",
                className,
            )}
            {...props}
        >
            {Icon ? (
                <View
                    className={cn(
                        "h-10 w-10 items-center justify-center rounded-full",
                        resolvedIconBg,
                    )}
                >
                    <Icon color={resolvedIconColor} size={20} strokeWidth={2} />
                </View>
            ) : null}

            <View className="min-w-0 flex-1 gap-0.5">
                <Text className={cn("text-base font-medium", labelClass)}>
                    {label}
                </Text>
                {description ? (
                    <Text className="text-xs text-text-muted" numberOfLines={2}>
                        {description}
                    </Text>
                ) : null}
            </View>

            {trailing}
            {showChevron && !trailing ? (
                <ChevronRight color="#94a3b8" size={18} />
            ) : null}
        </Pressable>
    );
}
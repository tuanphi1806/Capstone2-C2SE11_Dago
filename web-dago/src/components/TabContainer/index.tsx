import { cn } from "@/lib/utils";
import { Pressable, ScrollView, Text, View } from "react-native";

export type TabItem = {
    key: string;
    label: string;
};

type TabVariant = "default" | "underline";

type TabContainerProps = {
    tabs?: TabItem[];
    value?: string;
    onChange?: (value: string) => void;
    variant?: TabVariant;
    columns?: 1 | 2;
    /** Tab nhiều / nhãn dài → cuộn ngang */
    scrollable?: boolean;
    className?: string;
    tabListClassName?: string;
    triggerClassName?: string;
};

const variantStyles = {
    default: {
        list: "rounded-full bg-slate-100 p-1 w-full",
        trigger:
            "flex-1 min-h-[40px] rounded-full flex-row items-center justify-center transition-all",
        triggerActive: "bg-white shadow-sm border-b-2 border-teal-600",
        triggerInactive: "bg-transparent border-b-2 border-transparent",
    },
    underline: {
        list: "gap-4 bg-transparent p-0 w-full",
        trigger:
            "flex-1 rounded-none border-b-2 bg-transparent flex-row items-center justify-center py-2",
        triggerActive: "border-teal-600",
        triggerInactive: "border-transparent",
    },
} as const;

export default function TabContainer({
    tabs = [],
    value,
    onChange,
    variant = "default",
    columns = 1,
    scrollable = false,
    className,
    tabListClassName,
    triggerClassName,
}: TabContainerProps) {
    if (!tabs.length) return null;

    const styles = variantStyles[variant];
    const isTwoColumns = columns === 2;
    const canScroll = scrollable && !isTwoColumns;

    const tabTriggers = tabs.map((tab) => {
        const isActive = value === tab.key;

        return (
            <Pressable
                key={tab.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                className={cn(
                    styles.trigger,
                    isActive ? styles.triggerActive : styles.triggerInactive,
                    isTwoColumns && "w-1/2 flex-none px-2",
                    canScroll && "flex-none shrink-0 px-1",
                    triggerClassName,
                )}
                onPress={() => onChange?.(tab.key)}
            >
                <Text
                    className={cn(
                        "text-center text-sm",
                        isActive
                            ? "font-bold text-teal-700"
                            : "font-medium text-slate-500",
                    )}
                    numberOfLines={1}
                >
                    {tab.label}
                </Text>
            </Pressable>
        );
    });

    const listClassName = cn(
        "flex-row items-center",
        styles.list,
        isTwoColumns && "flex-wrap gap-x-0 gap-y-1",
        canScroll && "w-auto",
        tabListClassName,
    );

    return (
        <View className={cn("w-full bg-white px-4 py-2", className)}>
            {canScroll ? (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    contentContainerClassName={listClassName}
                >
                    {tabTriggers}
                </ScrollView>
            ) : (
                <View className={listClassName}>{tabTriggers}</View>
            )}
        </View>
    );
}
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react-native";
import { Pressable, Text, View, type PressableProps } from "react-native";

type SearchPillProps = PressableProps & {
    placeholder?: string;
    value?: string;
    className?: string;
    onPress?: () => void;
};

export function SearchPill({
    placeholder,
    value,
    className,
    onPress,
    ...props
}: SearchPillProps) {
    const { t } = useTranslation();
    const resolvedPlaceholder = placeholder ?? t("search.placeholder");

    return (
        <Pressable
            accessibilityRole="button"
            className={cn(
                "h-12 flex-row items-center gap-3 rounded-full bg-surface px-4 active:opacity-90",
                className,
            )}
            onPress={onPress}
            {...props}
        >
            <Search color="#64748b" size={20} />
            <Text
                className={cn(
                    "flex-1 text-base",
                    value ? "text-text-primary" : "text-text-muted",
                )}
                numberOfLines={1}
            >
                {value || resolvedPlaceholder}
            </Text>
        </Pressable>
    );
}

type SearchPillContainerProps = {
    children: React.ReactNode;
    className?: string;
};

export function SearchPillContainer({
    children,
    className,
}: SearchPillContainerProps) {
    return (
        <View
            className={cn(
                "gap-3 rounded-2xl bg-card p-4 shadow-sm",
                className,
            )}
            style={{ overflow: "visible", zIndex: 20, elevation: 20 }}
            collapsable={false}
        >
            {children}
        </View>
    );
}
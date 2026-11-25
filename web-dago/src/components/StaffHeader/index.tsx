import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { ArrowLeft, type LucideIcon } from "lucide-react-native";
import {
    Pressable,
    Text,
    View,
    type ViewProps,
} from "react-native";

type StaffHeaderAction = {
    key: string;
    icon: LucideIcon;
    onPress: () => void;
    color?: string;
    accessibilityLabel?: string;
    badge?: number;
};

type StaffHeaderProps = ViewProps & {
    title?: string;
    showBack?: boolean;
    onBackPress?: () => void;
    actions?: StaffHeaderAction[];
    className?: string;
    children?: React.ReactNode;
};

export function StaffHeader({
    title,
    showBack = false,
    onBackPress,
    actions = [],
    className,
    style,
    children,
    ...props
}: StaffHeaderProps) {
    const { t } = useTranslation();

    return (
        <View
            className={cn("w-full bg-primary px-4 py-3", className)}
            style={style}
            {...props}
        >
            {children ? (
                children
            ) : (
                <View className="min-h-10 flex-row items-center justify-between">
                    <View className="min-w-10 flex-row items-center gap-2">
                        {showBack ? (
                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel={t("a11y.back")}
                                className="h-10 w-10 items-center justify-center active:opacity-80"
                                onPress={() =>
                                    onBackPress
                                        ? onBackPress()
                                        : router.back()
                                }
                                hitSlop={8}
                            >
                                <ArrowLeft color="#ffffff" size={22} />
                            </Pressable>
                        ) : null}
                        {title ? (
                            <Text
                                className="text-lg font-bold text-on-primary"
                                numberOfLines={1}
                            >
                                {title}
                            </Text>
                        ) : null}
                    </View>

                    {actions.length > 0 ? (
                        <View className="flex-row items-center gap-1">
                            {actions.map((action) => {
                                const Icon = action.icon;
                                return (
                                    <Pressable
                                        key={action.key}
                                        accessibilityRole="button"
                                        accessibilityLabel={
                                            action.accessibilityLabel
                                        }
                                        className="relative h-10 w-10 items-center justify-center active:opacity-80"
                                        onPress={action.onPress}
                                        hitSlop={6}
                                    >
                                        <Icon
                                            color={action.color ?? "#ffffff"}
                                            size={22}
                                        />
                                        {action.badge && action.badge > 0 ? (
                                            <View className="absolute right-1 top-1 h-4 min-w-4 items-center justify-center rounded-full bg-alert px-1">
                                                <Text className="text-[10px] font-bold text-on-alert">
                                                    {action.badge > 9
                                                        ? "9+"
                                                        : action.badge}
                                                </Text>
                                            </View>
                                        ) : null}
                                    </Pressable>
                                );
                            })}
                        </View>
                    ) : null}
                </View>
            )}
        </View>
    );
}
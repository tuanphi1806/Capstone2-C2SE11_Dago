import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View, type ViewProps } from "react-native";

type PageHeaderProps = ViewProps & {
    title?: string;
    isIconBack?: boolean;
    className?: string;
    children?: React.ReactNode;
    /** Mặc định router.back(); truyền để override (vd. về Home sau mua vé) */
    onBackPress?: () => void;
};

export function PageHeader({
    title,
    isIconBack = false,
    className,
    style,
    children,
    onBackPress,
    ...props
}: PageHeaderProps) {
    const { t } = useTranslation();

    return (
        <View
            className={cn(
                "relative w-full border-b border-border bg-card px-5 py-3 shadow-sm",
                className,
            )}
            style={[{ minHeight: 56 }, style]}
            {...props}
        >
            {title ? (
                <View
                    className="absolute inset-x-5 inset-y-0 items-center justify-center"
                    style={{ pointerEvents: "none" }}
                >
                    <Text
                        className="px-12 text-center text-lg font-bold text-text-primary"
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                </View>
            ) : null}

            <View className="min-h-10 flex-1 flex-row items-center justify-between">
                <View className="min-w-10 flex-row items-center justify-start">
                    {isIconBack ? (
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel={t("a11y.back")}
                            className="h-10 w-10 items-center justify-center active:opacity-80"
                            onPress={() =>
                                onBackPress ? onBackPress() : router.back()
                            }
                            hitSlop={8}
                        >
                            <ArrowLeft color="#005f8b" size={24} />
                        </Pressable>
                    ) : null}
                </View>

                {children}
            </View>
        </View>
    );
}
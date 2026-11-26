import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TAB_CONFIG, type TabRouteName } from "@/constants/tabs";
import { useTranslation } from "@/i18n";

export function NavigationTabs({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    return (
        <View
            className="bg-card shadow-md"
            style={{
                paddingBottom: Math.max(insets.bottom, 8),
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 8,
            }}
        >
            <View className="min-h-[60px] flex-row items-end justify-around px-1 pt-1">
                {state.routes.map((route) => {
                    const routeName = route.name as TabRouteName;
                    const config = TAB_CONFIG[routeName];
                    if (!config) return null;

                    const isFocused =
                        state.routes[state.index]?.name === route.name;
                    const { options } = descriptors[route.key];
                    const Icon = config.icon;
                    const color = isFocused
                        ? config.activeColor
                        : config.inactiveColor;
                    const label = t(config.labelKey);

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    if (config.isCenter) {
                        return (
                            <Pressable
                                key={route.key}
                                accessibilityRole="button"
                                accessibilityState={
                                    isFocused ? { selected: true } : {}
                                }
                                accessibilityLabel={
                                    options.tabBarAccessibilityLabel ?? label
                                }
                                className="-mt-5 min-w-[64px] items-center active:opacity-90"
                                onPress={onPress}
                            >
                                <View className="h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg">
                                    <Icon color="#ffffff" size={26} />
                                </View>
                                <Text className="mt-1 text-[10px] font-semibold text-accent">
                                    {label}
                                </Text>
                            </Pressable>
                        );
                    }

                    return (
                        <Pressable
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={
                                isFocused ? { selected: true } : {}
                            }
                            accessibilityLabel={
                                options.tabBarAccessibilityLabel ?? label
                            }
                            className="min-w-[56px] flex-1 items-center justify-center py-1 active:opacity-80"
                            onPress={onPress}
                        >
                            <Icon
                                color={color}
                                fill={isFocused ? color : "transparent"}
                                size={22}
                                strokeWidth={isFocused ? 2.5 : 2}
                            />
                            <Text
                                className="mt-0.5 text-[10px] font-medium"
                                style={{ color }}
                            >
                                {label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
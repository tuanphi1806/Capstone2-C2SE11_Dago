import type { ChatAction } from "@/models/chat";
import { useTranslation } from "@/i18n";
import useAuthStore from "@/store/auth.store";
import useChatStore from "@/store/chat.store";
import { router, useSegments, type Href } from "expo-router";
import { MessageCircle, X } from "lucide-react-native";
import { useEffect } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChatPanel } from "./ChatPanel";

const ACTION_HREF: Record<ChatAction["type"], Href> = {
    open_home: "/",
    open_tickets: "/trips/tickets",
    open_payment: "/payment",
    open_my_tickets: "/profile/my-tickets",
    open_language: "/profile/language",
};

const TAB_BAR_CONTENT = 68;

export function ChatWidget() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const segments = useSegments();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);
    const isOpen = useChatStore((state) => state.isOpen);
    const open = useChatStore((state) => state.open);
    const close = useChatStore((state) => state.close);
    const reset = useChatStore((state) => state.reset);

    const root = segments[0];
    const hidden =
        !isAuthenticated ||
        user?.role === "staff" ||
        root === "(auth)" ||
        root === "(dev-demo)" ||
        root === "staff";

    useEffect(() => {
        if (!isAuthenticated) reset();
    }, [isAuthenticated, reset]);

    if (hidden) return null;

    const inTabs = root === "(tabs)";
    const fabBottom = inTabs
        ? TAB_BAR_CONTENT + Math.max(insets.bottom, 8) + 12
        : Math.max(insets.bottom, 16) + 12;
    const panelWidth = Math.min(width - 32, 380);
    const panelHeight = Math.min(height * 0.62, 520);

    const onAction = (action: ChatAction) => {
        close();
        router.push(ACTION_HREF[action.type]);
    };

    return (
        <>
            {!isOpen ? (
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t("chat.a11y.open")}
                    onPress={open}
                    className="absolute right-4 z-40 h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg active:bg-primary-dark"
                    style={{ bottom: fabBottom, elevation: 8 }}
                >
                    <MessageCircle color="#ffffff" size={24} strokeWidth={2.2} />
                </Pressable>
            ) : null}

            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                statusBarTranslucent
                onRequestClose={close}
            >
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <View className="flex-1 justify-end">
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel={t("a11y.close")}
                            className="absolute inset-0 bg-text-primary/35"
                            onPress={close}
                        />

                        <View
                            className="mb-3 mr-4 self-end"
                            style={{
                                width: panelWidth,
                                height: panelHeight,
                                marginBottom: fabBottom,
                            }}
                        >
                            <View className="flex-1 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                                <View className="flex-row items-center bg-primary px-4 py-3">
                                    <View className="h-8 w-8 items-center justify-center rounded-xl bg-accent">
                                        <MessageCircle
                                            color="#ffffff"
                                            size={16}
                                            strokeWidth={2.4}
                                        />
                                    </View>
                                    <View className="ml-3 min-w-0 flex-1">
                                        <Text className="text-base font-bold text-on-primary">
                                            {t("chat.widget.title")}
                                        </Text>
                                        <Text className="text-xs text-on-primary/80">
                                            {t("chat.widget.subtitle")}
                                        </Text>
                                    </View>
                                    <Pressable
                                        accessibilityRole="button"
                                        accessibilityLabel={t("chat.a11y.close")}
                                        className="h-9 w-9 items-center justify-center rounded-xl active:bg-primary-dark"
                                        hitSlop={8}
                                        onPress={close}
                                    >
                                        <X color="#ffffff" size={20} />
                                    </Pressable>
                                </View>
                                <ChatPanel onAction={onAction} />
                            </View>
                            <View
                                className="absolute right-5 -bottom-1.5 h-3.5 w-3.5 rotate-45 bg-card"
                                style={{
                                    borderRightWidth: 1,
                                    borderBottomWidth: 1,
                                    borderColor: "#e2e8f0",
                                }}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
}
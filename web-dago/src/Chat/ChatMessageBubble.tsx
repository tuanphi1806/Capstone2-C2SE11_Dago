import type { ChatAction, ChatUiMessage } from "@/models/chat";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import type { TranslationKey } from "@/i18n/translations";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

const ACTION_LABEL: Record<ChatAction["type"], TranslationKey> = {
    open_home: "chat.action.home",
    open_tickets: "chat.action.tickets",
    open_payment: "chat.action.payment",
    open_my_tickets: "chat.action.myTickets",
    open_language: "chat.action.language",
};

type Props = {
    message: ChatUiMessage;
    onAction: (action: ChatAction) => void;
};

export function ChatMessageBubble({ message, onAction }: Props) {
    const { t } = useTranslation();
    const isUser = message.role === "user";

    return (
        <View className={cn("max-w-[84%]", isUser ? "self-end" : "self-start")}>
            <View
                className={cn(
                    "px-3.5 py-2.5",
                    isUser
                        ? "rounded-2xl rounded-br-md bg-primary"
                        : "rounded-2xl rounded-bl-md border border-border bg-surface",
                )}
            >
                {message.pending ? (
                    <View className="h-5 w-8 items-center justify-center">
                        <ActivityIndicator color="#00a2e8" size="small" />
                    </View>
                ) : (
                    <Text
                        className={cn(
                            "text-sm leading-5",
                            isUser ? "text-on-primary" : "text-text-primary",
                        )}
                    >
                        {message.text}
                    </Text>
                )}
            </View>

            {!isUser && message.actions?.length ? (
                <View className="mt-2 flex-row flex-wrap gap-2">
                    {message.actions.map((action) => (
                        <Pressable
                            key={action.type}
                            accessibilityRole="button"
                            className="rounded-xl border border-accent bg-accent-light px-3 py-2 active:opacity-80"
                            onPress={() => onAction(action)}
                        >
                            <Text className="text-sm font-semibold text-primary">
                                {t(ACTION_LABEL[action.type])}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            ) : null}
        </View>
    );
}
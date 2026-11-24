import { useTranslation } from "@/i18n";
import type { TranslationKey } from "@/i18n/translations";
import { Pressable, Text, View } from "react-native";

const PROMPTS: TranslationKey[] = [
    "chat.prompt.routes",
    "chat.prompt.myTickets",
    "chat.prompt.ticketHow",
    "chat.prompt.monthlyQr",
];

type Props = {
    disabled?: boolean;
    onPick: (text: string) => void;
};

export function ChatPrompts({ disabled, onPick }: Props) {
    const { t } = useTranslation();

    return (
        <View className="flex-row flex-wrap gap-2 px-3 pb-2">
            {PROMPTS.map((key) => (
                <Pressable
                    key={key}
                    accessibilityRole="button"
                    disabled={disabled}
                    className="rounded-xl border border-border bg-surface px-3 py-1.5 active:opacity-80 disabled:opacity-50"
                    onPress={() => onPick(t(key))}
                >
                    <Text className="text-xs text-text-secondary">{t(key)}</Text>
                </Pressable>
            ))}
        </View>
    );
}
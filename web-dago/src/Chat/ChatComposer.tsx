import InputText from "@/components/Input/InputText";
import { useTranslation } from "@/i18n";
import { Send } from "lucide-react-native";
import { Pressable, View } from "react-native";

type Props = {
    value: string;
    disabled?: boolean;
    onChangeText: (value: string) => void;
    onSend: () => void;
};

export function ChatComposer({ value, disabled, onChangeText, onSend }: Props) {
    const { t } = useTranslation();
    const canSend = !disabled && value.trim().length > 0;

    return (
        <View className="flex-row items-end gap-2 border-t border-border bg-card px-3 py-2.5">
            <View className="min-w-0 flex-1">
                <InputText
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={t("chat.placeholder")}
                    editable={!disabled}
                    returnKeyType="send"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                        if (canSend) onSend();
                    }}
                />
            </View>
            <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("chat.a11y.send")}
                disabled={!canSend}
                className="h-12 w-12 items-center justify-center rounded-xl bg-primary active:bg-primary-dark disabled:bg-primary-muted"
                onPress={onSend}
            >
                <Send color="#ffffff" size={18} strokeWidth={2.4} />
            </Pressable>
        </View>
    );
}
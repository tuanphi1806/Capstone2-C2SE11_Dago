import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import DateTimePicker, {
    type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";
import moment from "moment";
import { useState } from "react";
import {
    Modal,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";

type DatePickerFieldProps = {
    label?: string;
    value: Date | null;
    onChange: (date: Date) => void;
    placeholder?: string;
    minimumDate?: Date;
    maximumDate?: Date;
    disabled?: boolean;
    className?: string;
};

export function DatePickerField({
    label,
    value,
    onChange,
    placeholder,
    minimumDate,
    maximumDate,
    disabled = false,
    className,
}: DatePickerFieldProps) {
    const { t, locale } = useTranslation();
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<Date>(value ?? new Date());

    const resolvedPlaceholder = placeholder ?? t("datepicker.placeholder");
    const pickerLocale =
        locale === "en" ? "en-US" : locale === "ja" ? "ja-JP" : "vi-VN";

    const displayValue = value
        ? moment(value).format("DD/MM/YYYY")
        : resolvedPlaceholder;

    const openPicker = () => {
        if (disabled) return;
        setDraft(value ?? minimumDate ?? new Date());
        setOpen(true);
    };

    const handleAndroidChange = (
        event: DateTimePickerEvent,
        selected?: Date,
    ) => {
        setOpen(false);
        if (event.type === "dismissed" || !selected) return;
        onChange(selected);
    };

    const confirmIos = () => {
        onChange(draft);
        setOpen(false);
    };

    return (
        <View className={cn("gap-1.5", className)}>
            {label ? (
                <Text className="text-sm font-semibold text-text-primary">
                    {label}
                </Text>
            ) : null}

            <Pressable
                accessibilityRole="button"
                accessibilityLabel={label ?? resolvedPlaceholder}
                disabled={disabled}
                onPress={openPicker}
                className={cn(
                    "min-h-[44px] flex-row items-center justify-between rounded-lg border border-border bg-background px-4 py-2.5 active:opacity-80",
                    disabled && "opacity-60",
                )}
            >
                <Text
                    className={cn(
                        "text-md",
                        value ? "text-text-primary" : "text-text-muted",
                    )}
                >
                    {displayValue}
                </Text>
                <CalendarDays color="#005f8b" size={20} />
            </Pressable>

            {open && Platform.OS === "android" ? (
                <DateTimePicker
                    value={draft}
                    mode="date"
                    display="default"
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    onChange={handleAndroidChange}
                />
            ) : null}

            {Platform.OS === "ios" ? (
                <Modal
                    visible={open}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setOpen(false)}
                >
                    <Pressable
                        className="flex-1 justify-end bg-black/40"
                        onPress={() => setOpen(false)}
                    >
                        <Pressable
                            className="rounded-t-3xl bg-card px-4 pb-8 pt-3"
                            onPress={(e) => e.stopPropagation()}
                        >
                            <View className="mb-2 flex-row items-center justify-between">
                                <Pressable
                                    onPress={() => setOpen(false)}
                                    hitSlop={8}
                                >
                                    <Text className="text-sm font-medium text-text-muted">
                                        {t("datepicker.cancel")}
                                    </Text>
                                </Pressable>
                                <Text className="text-base font-bold text-text-primary">
                                    {label ?? resolvedPlaceholder}
                                </Text>
                                <Pressable onPress={confirmIos} hitSlop={8}>
                                    <Text className="text-sm font-semibold text-primary">
                                        {t("datepicker.done")}
                                    </Text>
                                </Pressable>
                            </View>
                            <DateTimePicker
                                value={draft}
                                mode="date"
                                display="spinner"
                                locale={pickerLocale}
                                minimumDate={minimumDate}
                                maximumDate={maximumDate}
                                onChange={(_, selected) => {
                                    if (selected) setDraft(selected);
                                }}
                                style={{ alignSelf: "center" }}
                            />
                        </Pressable>
                    </Pressable>
                </Modal>
            ) : null}

            {open && Platform.OS === "web" ? (
                <Modal
                    visible={open}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setOpen(false)}
                >
                    <Pressable
                        className="flex-1 items-center justify-center bg-black/40 px-6"
                        onPress={() => setOpen(false)}
                    >
                        <Pressable
                            className="w-full max-w-sm gap-3 rounded-2xl bg-card p-4"
                            onPress={(e) => e.stopPropagation()}
                        >
                            <Text className="text-base font-bold text-text-primary">
                                {label ?? resolvedPlaceholder}
                            </Text>
                            <DateTimePicker
                                value={draft}
                                mode="date"
                                display="default"
                                minimumDate={minimumDate}
                                maximumDate={maximumDate}
                                onChange={(_, selected) => {
                                    if (!selected) return;
                                    onChange(selected);
                                    setOpen(false);
                                }}
                            />
                            <Pressable
                                className="items-center py-2"
                                onPress={() => setOpen(false)}
                            >
                                <Text className="text-sm font-medium text-text-muted">
                                    {t("datepicker.close")}
                                </Text>
                            </Pressable>
                        </Pressable>
                    </Pressable>
                </Modal>
            ) : null}
        </View>
    );
}
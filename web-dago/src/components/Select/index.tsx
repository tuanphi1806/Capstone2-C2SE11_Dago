import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react-native";
import { useMemo, useRef, useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    Text,
    View,
    type LayoutRectangle,
} from "react-native";

type SelectOptionType = {
    value: string;
    label: string;
};

type SelectProps = {
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    options?: SelectOptionType[];
    /** Applied to outer wrapper (default `w-full`) */
    containerClassName?: string;
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
    disabled?: boolean;
};

type TriggerLayout = LayoutRectangle & { pageX: number; pageY: number };

export function Select({
    value,
    onValueChange,
    placeholder,
    options = [],
    containerClassName,
    className,
    triggerClassName,
    contentClassName,
    disabled = false,
}: SelectProps) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(
        null,
    );
    const triggerRef = useRef<View>(null);
    const resolvedPlaceholder = placeholder ?? t("select.placeholder");

    const selectedOption = useMemo(
        () => options.find((option) => option.value === value),
        [options, value],
    );

    const openDropdown = () => {
        triggerRef.current?.measureInWindow((x, y, width, height) => {
            setTriggerLayout({ x: 0, y: 0, width, height, pageX: x, pageY: y });
            setOpen(true);
        });
    };

    const handleSelect = (nextValue: string) => {
        onValueChange?.(nextValue);
        setOpen(false);
    };

    return (
        <>
            <View
                ref={triggerRef}
                collapsable={false}
                className={cn("w-full", containerClassName)}
            >
                <Pressable
                    accessibilityRole="button"
                    disabled={disabled}
                    className={cn(
                        "h-10 w-full flex-row items-center justify-between rounded-md border border-border bg-background px-3 active:opacity-80",
                        disabled && "opacity-50",
                        className,
                        triggerClassName,
                    )}
                    onPress={openDropdown}
                >
                    <Text
                        className={cn(
                            "flex-1 text-sm",
                            selectedOption
                                ? "text-text-primary"
                                : "text-text-muted",
                        )}
                        numberOfLines={1}
                    >
                        {selectedOption?.label ?? resolvedPlaceholder}
                    </Text>
                    <ChevronDown color="#6b7280" size={18} />
                </Pressable>
            </View>

            <Modal
                transparent
                visible={open}
                animationType="fade"
                onRequestClose={() => setOpen(false)}
            >
                <View className="flex-1">
                    <Pressable
                        className="absolute inset-0 bg-black/40"
                        onPress={() => setOpen(false)}
                    />

                    {triggerLayout ? (
                        <View
                            className={cn(
                                "absolute max-h-60 overflow-hidden rounded-xl border border-border bg-background",
                                contentClassName,
                            )}
                            style={{
                                top:
                                    triggerLayout.pageY +
                                    triggerLayout.height +
                                    4,
                                left: triggerLayout.pageX,
                                width: triggerLayout.width,
                            }}
                        >
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.value}
                                keyboardShouldPersistTaps="handled"
                                nestedScrollEnabled
                                renderItem={({ item }) => {
                                    const isSelected = item.value === value;

                                    return (
                                        <Pressable
                                            className="w-full flex-row items-center gap-3 border-b border-border px-4 py-3.5 active:bg-surface"
                                            onPress={() =>
                                                handleSelect(item.value)
                                            }
                                        >
                                            <Text
                                                className={cn(
                                                    "min-w-0 flex-1 text-base",
                                                    isSelected
                                                        ? "font-semibold text-primary"
                                                        : "text-text-primary",
                                                )}
                                                numberOfLines={2}
                                            >
                                                {item.label}
                                            </Text>
                                            {isSelected ? (
                                                <Check
                                                    color="#005f8b"
                                                    size={18}
                                                />
                                            ) : null}
                                        </Pressable>
                                    );
                                }}
                                ListEmptyComponent={
                                    <Text className="px-4 py-6 text-center text-sm text-text-muted">
                                        {t("select.empty")}
                                    </Text>
                                }
                            />
                        </View>
                    ) : null}
                </View>
            </Modal>
        </>
    );
}
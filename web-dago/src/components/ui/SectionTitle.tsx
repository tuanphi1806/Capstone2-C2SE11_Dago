import { cn } from "@/lib/utils";
import { Pressable, Text, View } from "react-native";

type SectionTitleProps = {
    title: string;
    actionLabel?: string;
    onActionPress?: () => void;
    className?: string;
};

export function SectionTitle({
    title,
    actionLabel,
    onActionPress,
    className,
}: SectionTitleProps) {
    return (
        <View
            className={cn(
                "mb-1 flex-row items-center justify-between px-1",
                className,
            )}
        >
            <Text className="text-base font-bold text-text-primary">
                {title}
            </Text>
            {actionLabel && onActionPress ? (
                <Pressable className="active:opacity-80" onPress={onActionPress}>
                    <Text className="text-sm font-semibold text-accent">
                        {actionLabel}
                    </Text>
                </Pressable>
            ) : null}
        </View>
    );
}
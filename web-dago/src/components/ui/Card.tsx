import { cn } from "@/lib/utils";
import { View, type ViewProps } from "react-native";

type CardProps = ViewProps & {
    className?: string;
    shadow?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
};

const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-5",
};

export function Card({
    children,
    className,
    shadow = true,
    padding = "md",
    ...props
}: CardProps) {
    return (
        <View
            className={cn(
                "overflow-hidden rounded-2xl bg-card",
                shadow && "shadow-sm",
                paddingClasses[padding],
                className,
            )}
            {...props}
        >
            {children}
        </View>
    );
}
import type { ReactNode } from "react";
import type { PressableProps } from "react-native";
import { Pressable, Text } from "react-native-css/components";
import { cn } from "@/lib/utils";

type ButtonVariant = "outline" | "bold";
type ButtonType = "primary" | "secondary" | "danger" | "accent";
type ButtonSize = "sm" | "md";

type ButtonProps = Omit<PressableProps, "children"> & {
    children: ReactNode;
    variant?: ButtonVariant;
    type?: ButtonType;
    size?: ButtonSize;
    className?: string;
    labelClassName?: string;
};

const baseClass =
    "flex-row items-center justify-center rounded-xl min-h-[48px]";

const buttonClasses = {
    outline: {
        primary:
            "border border-primary bg-transparent active:bg-primary",
        secondary:
            "border border-border-strong bg-transparent active:bg-text-secondary",
        danger:
            "border border-alert bg-transparent active:bg-alert",
        accent:
            "border border-accent bg-transparent active:bg-accent",
    },
    bold: {
        primary:
            "bg-primary active:bg-primary-dark",
        secondary:
            "bg-text-secondary active:bg-text-primary",
        danger:
            "bg-alert active:bg-alert-dark",
        accent:
            "bg-accent active:bg-accent-dark",
    },
} as const;

const disabledClasses = {
    outline: {
        primary: "border-primary-muted",
        secondary: "",
        danger: "border-alert-muted",
        accent: "border-accent-muted",
    },
    bold: {
        primary: "bg-primary-muted",
        secondary: "bg-disabled",
        danger: "bg-alert-muted",
        accent: "bg-accent-muted",
    },
} as const;

const labelClasses = {
    outline: {
        primary: "text-primary font-bold text-md",
        secondary: "text-primary font-bold text-md",
        danger: "text-alert font-bold text-md",
        accent: "text-accent font-bold text-md",
    },
    bold: {
        primary: "text-on-primary font-bold text-md",
        secondary: "text-on-primary font-bold text-md",
        danger: "text-on-primary font-bold text-md",
        accent: "text-on-primary font-bold text-md",
    },
} as const;

const sizeClasses = {
    sm: "px-4 py-2.5 min-h-[40px]",
    md: "px-5 py-3.5 min-h-[48px]",
} as const;

export function Button({
    children,
    variant = "bold",
    type = "primary",
    size = "md",
    className = "",
    labelClassName = "",
    disabled = false,
    accessibilityState,
    ...props
}: ButtonProps) {
    const content =
        typeof children === "string" || typeof children === "number" ? (
            <Text
                className={`${labelClasses[variant][type]} ${labelClassName}`}
            >
                {children}
            </Text>
        ) : (
            children
        );

    return (
        <Pressable
            accessibilityRole="button"
            disabled={disabled}
            accessibilityState={{ ...accessibilityState, disabled: Boolean(disabled) }}
            className={cn(
                baseClass,
                buttonClasses[variant][type],
                sizeClasses[size],
                className,
                disabled && disabledClasses[variant][type],
                disabled && "opacity-70",
            )}
            {...props}
        >
            {content}
        </Pressable>
    );
}
import type { ReactNode } from "react";     

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
            "border border-primary bg-transparent active:bg-primary disabled:border-primary-muted disabled:opacity-70",
        secondary:
            "border border-border-strong bg-transparent active:bg-text-secondary disabled:opacity-70",
        danger:
            "border border-alert bg-transparent active:bg-alert disabled:border-alert-muted disabled:opacity-70",
        accent:
            "border border-accent bg-transparent active:bg-accent disabled:border-accent-muted disabled:opacity-70",
    },
    bold: {
        primary:
            "bg-primary active:bg-primary-dark disabled:bg-primary-muted disabled:opacity-70",
        secondary:
            "bg-text-secondary active:bg-text-primary disabled:bg-disabled disabled:opacity-70",
        danger:
            "bg-alert active:bg-alert-dark disabled:bg-alert-muted disabled:opacity-70",
        accent:
            "bg-accent active:bg-accent-dark disabled:bg-accent-muted disabled:opacity-70",
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
    disabled,
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
            className={`
                ${baseClass}
                ${buttonClasses[variant][type]}
                ${sizeClasses[size]}
                ${className}
            `}
            {...props}
        >
            {content}
        </Pressable>
    );
}
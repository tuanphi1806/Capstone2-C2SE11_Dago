import { Text, View, type ViewProps } from "react-native";

type AlertProps = ViewProps & {
    title: string;
    message?: string;
    className?: string;
    titleClassName?: string;
    messageClassName?: string;
};

export function Alert({
    title,
    message,
    className,
    titleClassName,
    messageClassName,
    ...props
}: AlertProps) {
    return (
        <View
            className={`rounded-xl border border-alert-muted bg-alert-light p-4${className ? ` ${className}` : ""}`}
            {...props}
        >
            <Text
                className={`font-bold text-alert${titleClassName ? ` ${titleClassName}` : ""}`}
            >
                {title}
            </Text>
            {message ? (
                <Text
                    className={`mt-1 text-text-secondary${messageClassName ? ` ${messageClassName}` : ""}`}
                >
                    {message}
                </Text>
            ) : null}
        </View>
    );
}
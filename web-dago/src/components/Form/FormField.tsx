import { Text, View, ViewProps } from "react-native";
import { cn } from "@/lib/utils";

interface FormFieldProps extends ViewProps {
    labelText: string;
    required?: boolean;
    error?: string;
};

export function FormField({...Props}: FormFieldProps) {
    // Destructure props
    const { labelText, required=false, error, className, children, ...props } = Props;

    return (
        <View className={cn("gap-2", className)} {...props}>
            <Text className="text-sm font-medium text-text-primary">
                {labelText} {required ? <Text className="text-alert">*</Text> : null}
            </Text>
            {children}
            {error ? (
                <Text className="text-xs text-red-500">{error}</Text>
            ) : null}
        </View>
    );
}
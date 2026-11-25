import { cn } from "@/lib/utils";
import React from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native-css/components";

interface InputTextProps extends TextInputProps {
    disabled?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
    className,
    disabled,
    style,
    ...props
}) => {
    return (
        <TextInput
            editable={!disabled}
            underlineColorAndroid="transparent"
            className={cn(
                "text-md rounded-lg border border-border bg-background text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none",
                disabled &&
                    "border-border bg-disabled-bg text-disabled opacity-80",
                className,
            )}
            // TextInput trên RN thường bỏ padding từ className → set style tường minh
            style={[{ paddingHorizontal: 16, paddingVertical: 10 }, style]}
            {...props}
        />
    );
};

export default InputText;
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import React from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native-css/components";

interface TextAreaProps extends TextInputProps {}

const TextArea: React.FC<TextAreaProps> = ({
    className,
    style,
    placeholder,
    ...props
}) => {
    const { t } = useTranslation();

    return (
        <TextInput
            multiline
            numberOfLines={4}
            placeholder={placeholder ?? t("textarea.placeholder")}
            textAlignVertical="top"
            underlineColorAndroid="transparent"
            className={cn(
                "max-h-48 w-full rounded-lg border border-border bg-background text-md text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none",
                className,
            )}
            style={[{ paddingHorizontal: 12, paddingVertical: 10 }, style]}
            {...props}
        />
    );
};

export default TextArea;
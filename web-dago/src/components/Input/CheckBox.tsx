import React from 'react';
import { Pressable, View, PressableProps } from 'react-native';
import CheckIcon from "@/components/Icons/CheckIcon";

interface CheckBoxProps extends Omit<PressableProps, 'onChange'> {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
    containerClassName?: string;
}

const CheckBox = ({
    checked = false,
    onChange,
    className = "",
    containerClassName = "",
    disabled = false,
    style,
    ...props
}: CheckBoxProps) => {
    return (
        <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            disabled={disabled}
            onPress={(e) => {
                onChange?.(!checked);
                props.onPress?.(e);
            }}
            className={`flex-row items-center cursor-pointer ${disabled ? "opacity-50" : ""} ${containerClassName}`}
            {...props}
        >
            <View
                className={`size-5 border-[1.5px] rounded-md items-center justify-center ${checked
                        ? "bg-primary border-primary"
                        : "border-text-muted bg-transparent"
                    } ${className}`}
            >
                {checked && <CheckIcon className="text-white" color="white" />}
            </View>
        </Pressable>
    );
};

export default CheckBox;
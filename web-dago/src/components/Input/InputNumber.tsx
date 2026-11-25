import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface InputNumberProps extends Omit<NumericFormatProps<TextInputProps>, 'customInput'> {
    className?: string;
    disabled?: boolean;
}

const InputNumber: React.FC<InputNumberProps> = ({
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <NumericFormat
            customInput={TextInput}
            editable={!disabled}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            thousandSeparator=","
            displayType="input"
            className={`text-base py-2.5 md:py-3 px-3 rounded-lg text-text-primary placeholder:text-text-muted border border-border focus:border-primary focus:outline-none ${disabled ? 'border-border bg-disabled-bg text-disabled opacity-80' : 'bg-background'}
            ${className}
            `}
            {...props}
        />
    );
};

export default InputNumber;
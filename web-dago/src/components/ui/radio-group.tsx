import { cn } from '@/lib/utils';
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { Platform } from 'react-native';

function RadioGroup({
    className,
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
    return (
        <RadioGroupPrimitive.Root
            className={cn('gap-3', className)}
            {...props}
        />
    );
}

function RadioGroupItem({
    className,
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
    return (
        <RadioGroupPrimitive.Item
            className={cn(
                'aspect-square size-5 shrink-0 items-center justify-center rounded-full border shadow-sm shadow-black/5',
                'border-input dark:bg-input/30',
                'data-[state=checked]:border-[#00a2e8]',
                Platform.select({
                    web: 'focus-visible:border-[#00a2e8] focus-visible:ring-[#00a2e8]/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed',
                }),
                props.disabled && 'opacity-50',
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="size-3 rounded-full bg-[#00a2e8]" />
        </RadioGroupPrimitive.Item>
    );
}

export { RadioGroup, RadioGroupItem };
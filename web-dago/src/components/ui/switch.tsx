import { cn } from '@/lib/utils';
import * as SwitchPrimitives from '@rn-primitives/switch';
import { Platform } from 'react-native';

function Switch({
    className,
    ...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
    return (
        <SwitchPrimitives.Root
            className={cn(
                'flex h-[1.15rem] w-8 shrink-0 flex-row items-center rounded-full border border-transparent shadow-sm shadow-black/5',
                Platform.select({
                    web: 'focus-visible:border-ring focus-visible:ring-ring/50 peer inline-flex outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed',
                }),
                props.checked
                    ? 'bg-[#00a2e8]'
                    : 'bg-input dark:bg-input/80',
                props.disabled && 'opacity-50',
                className
            )}
            {...props}
        >
            <SwitchPrimitives.Thumb
                className={cn(
                    'size-4 rounded-full bg-white transition-transform',
                    Platform.select({
                        web: 'pointer-events-none block ring-0',
                    }),
                    props.checked
                        ? 'translate-x-3.5'
                        : 'translate-x-0 dark:bg-foreground'
                )}
            />
        </SwitchPrimitives.Root>
    );
}

export { Switch };
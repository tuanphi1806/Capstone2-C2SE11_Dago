import { Switch as RNSwitch, ScrollView, Text, View } from "react-native";

import { Button } from "@/components/Button";
import InputNumber from "@/components/Input/InputNumber";
import InputText from "@/components/Input/InputText";
import TextArea from "@/components/Input/TextArea";
import ModalBlank from "@/components/ModalBlank";
import { Select } from "@/components/Select";
import SelectMultiple from "@/components/SelectMultiple";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { router } from "expo-router";
import { useState } from "react";

export default function DevDemoPage() {
    const [amount, setAmount] = useState<number | undefined>();
    const options = [
        { value: '1', label: 'Việt Nam' },
        { value: '2', label: 'Lào' },
        { value: '3', label: 'Trung Quốc' },
        { value: '4', label: 'Hàn Quốc' },
        { value: '5', label: 'Nhật Bản' },
    ];
    const [selectedOption, setSelectedOption] = useState<string | undefined>(options[0].value);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ScrollView
            className="flex-1 bg-background"
            contentContainerClassName="p-5 flex-col gap-4"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <Select
                options={options}
                value={selectedOption}
                onValueChange={(value) => setSelectedOption(value)}
            />

            <Button onPress={() => setIsModalOpen(true)}>
                Open Modal
            </Button>

            <View className="mb-6 rounded-2xl bg-primary px-5 py-4">
                <Text className="text-lg font-bold text-on-primary">
                    SmartBus
                </Text>
                <Text className="mt-1 text-sm text-primary-muted">
                    Design token preview
                </Text>
            </View>

            <InputText placeholder="Nhập tên" className="w-full" />

            <View className="my-3">
                <TextArea
                    placeholder="Nhập nội dung"
                    className="w-full"
                />
            </View>

            <View className="my-3 gap-4 rounded-2xl border border-border bg-surface-elevated p-4">
                <View className="flex-row flex-wrap items-center gap-2">
                    <Badge label="NEW" variant="promo" />
                    <Badge label="HOT" variant="promo" />
                    <Badge label="3" variant="alert" />
                    <Badge label="Scheduled" variant="neutral" />
                </View>

                <Text className="text-base text-text-primary">
                    Primary text on surface background
                </Text>
                <Text className="text-sm text-text-secondary">
                    Secondary text maintains readable contrast on light and dark
                    surfaces.
                </Text>
            </View>

            <View className="mb-4 gap-3">
                <Button type="primary" variant="bold" onPress={() => router.push('/dev-ui')}>
                    Book a ticket
                </Button>
                <Button type="primary" variant="outline">
                    View routes
                </Button>
                <Button type="secondary" variant="bold">
                    More options
                </Button>
                <Button type="danger" variant="outline">
                    Cancel trip
                </Button>
                <Button disabled type="primary" variant="bold">
                    Unavailable
                </Button>
            </View>

            <Alert
                title="Trip cancelled"
                message="This route has been cancelled. Refund will be processed within 3–5 business days."
            />

            <View className="mt-2 flex-row gap-3">
                <View className="h-10 flex-1 rounded-lg bg-primary" />
                <View className="h-10 flex-1 rounded-lg bg-accent" />
                <View className="h-10 flex-1 rounded-lg bg-highlight" />
                <View className="h-10 flex-1 rounded-lg bg-alert" />
            </View>

            <View className="mt-6 flex flex-col gap-3">
                <InputNumber
                    placeholder="Nhập số tiền"
                    value={amount}
                    onValueChange={(values) => {
                        setAmount(values.floatValue);
                    }}
                    suffix=" VND"
                    className="flex-1"
                />
                <RNSwitch value={true} onValueChange={() => { console.log('checked') }} />
                <Switch checked={true} onCheckedChange={() => { console.log('checked') }} />
                <RadioGroup value="1" onValueChange={() => { console.log('checked') }}>
                    <RadioGroupItem value="1" />
                    <RadioGroupItem value="2" />
                    <RadioGroupItem value="3" />
                </RadioGroup>
            </View>

            <SelectMultiple
                className="rounded-lg"
                options={options} value={selectedOptions}
                onChange={(value) => setSelectedOptions(value)}
            />

            <ModalBlank className="flex-col gap-4" isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} closeButton={true}
            >
                <Text className="text-lg font-bold">Modal</Text>
                <Text className="text-sm text-text-secondary">
                    This is a modal
                </Text>
                <Button onPress={() => setIsModalOpen(false)}>
                    Close Modal
                </Button>
            </ModalBlank>

        </ScrollView>
    );
}
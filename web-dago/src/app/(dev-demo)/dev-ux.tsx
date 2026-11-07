import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const ScrollDemo = () => {
    return (
        <View className="flex-1 bg-surface">
            <View className="p-4 bg-primary">
                <Text className="text-xl font-bold text-on-primary">Khám phá SmartBus</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="p-5"
            >
                <View className="h-40 bg-white rounded-xl border border-border p-4 shadow-sm">
                    <Text className="text-text-primary">Khối nội dung 1</Text>
                </View>

                <View className="h-40 bg-white rounded-xl border border-border p-4 shadow-sm">
                    <Text className="text-text-primary">Khối nội dung 2</Text>
                </View>

                <View className="h-40 bg-white rounded-xl border border-border p-4 shadow-sm">
                    <Text className="text-text-primary">Khối nội dung 3</Text>
                </View>

                <View className="h-40 bg-white rounded-xl border border-border p-4 shadow-sm">
                    <Text className="text-text-primary">Khối nội dung 4</Text>
                </View>

                <View className="h-40 bg-white rounded-xl border border-border p-4 shadow-sm">
                    <Text className="text-text-primary">Khối nội dung 4</Text>
                </View>

                <View className="h-40 bg-white rounded-xl border border-border p-4 shadow-sm">
                    <Text className="text-text-primary">Khối nội dung 4</Text>
                </View>
            </ScrollView>

            <View className="p-4 border-t border-border bg-white">
                <Text className="text-center font-bold text-primary">Nút Đặt Vé Cố Định</Text>
            </View>
        </View>
    );
};

export default ScrollDemo;
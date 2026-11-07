import { Button } from "@/components/Button";
import useOtpCountdown, {
    OTP_LENGTH,
    sanitizeOtpInput,
} from "@/hooks/useOtpCountdown";
import { authService } from "@/services/AuthService";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

const COUNTDOWN_SECONDS = 60;

export default function VerifyOtp() {
    const { email } = useLocalSearchParams<{ email?: string }>();
    const [otp, setOtp] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { remainingSeconds, formatted, isExpired } =
        useOtpCountdown(COUNTDOWN_SECONDS);

    const handleVerifyOtp = async () => {
        if (isSubmitting || otp.length < OTP_LENGTH) return;

        setIsSubmitting(true);

        try {
            await authService.verifyRegisterOtp({ otp });

            Toast.show({
                type: "success",
                text1: "Đăng ký thành công",
                text2: "Tài khoản của bạn đã được tạo. Vui lòng đăng nhập.",
            });

            router.replace("/login");
        } catch {
            Toast.show({
                type: "error",
                text1: "Xác thực thất bại",
                text2: "Mã OTP không hợp lệ",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="flex-1 bg-background">
            <View
                className="absolute -right-24 -top-16 h-72 w-72 overflow-hidden rounded-full opacity-40"
                style={{ pointerEvents: "none" }}
            >
                <LinearGradient
                    colors={["#00a2e8", "#ffc20e"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                />
            </View>

            <View
                className="absolute -bottom-20 -right-16 h-64 w-64 overflow-hidden rounded-full opacity-35"
                style={{ pointerEvents: "none" }}
            >
                <LinearGradient
                    colors={["#ffe082", "#00a2e8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                />
            </View>

            <View className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <View className="flex-1 justify-center px-8">
                        <View className="items-center gap-3">
                            <Text className="text-2xl font-bold text-primary">
                                Xác thực OTP
                            </Text>
                            <Text className="text-center text-base text-primary">
                                Nhập mã OTP đã được gửi đến email của bạn
                                {email ? `\n${email}` : ""}
                            </Text>
                        </View>

                        <View className="mt-10 items-center gap-4">
                            <TextInput
                                value={otp}
                                onChangeText={(text) =>
                                    setOtp(sanitizeOtpInput(text))
                                }
                                placeholder=""
                                keyboardType="number-pad"
                                maxLength={OTP_LENGTH}
                                textAlign="center"
                                editable={!isSubmitting}
                                className="w-full border-b border-text-primary pb-2 text-2xl tracking-[12px] text-text-primary"
                                underlineColorAndroid="transparent"
                            />

                            <Text className="text-base font-medium text-alert">
                                {formatted}
                            </Text>
                        </View>

                        <View className="mt-10">
                            <Button
                                type="primary"
                                variant="bold"
                                className="w-full rounded-xl"
                                disabled={
                                    otp.length < OTP_LENGTH ||
                                    isSubmitting ||
                                    isExpired
                                }
                                onPress={handleVerifyOtp}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="#ffffff" />
                                ) : (
                                    "Xác thực"
                                )}
                            </Button>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}
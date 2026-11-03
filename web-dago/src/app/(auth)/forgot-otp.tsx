import { Button } from "@/components/Button";
import useOtpCountdown, {
    OTP_LENGTH,
    sanitizeOtpInput,
} from "@/hooks/useOtpCountdown";
import { useToastify } from "@/hooks/useToastify";
import { authService } from "@/services/AuthService";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

const COUNTDOWN_SECONDS = 120;

export default function ForgotOtpScreen() {
    const showToast = useToastify();
    const { email } = useLocalSearchParams<{ email?: string }>();
    const [otp, setOtp] = useState("");
    const [isResending, setIsResending] = useState(false);
    const { remainingSeconds, formatted, isExpired, reset } =
        useOtpCountdown(COUNTDOWN_SECONDS);

    const handleContinue = () => {
        if (otp.length < OTP_LENGTH || remainingSeconds <= 0) return;

        router.push({
            pathname: "/reset-password" as never,
            params: { otp, email: email ?? "" },
        });
    };

    const handleResend = async () => {
        if (!email || isResending) return;

        setIsResending(true);

        try {
            await authService.forgotPassword({ email });
            reset(COUNTDOWN_SECONDS);
            setOtp("");
            showToast({
                type: "success",
                content: "Đã gửi lại mã OTP",
            });
        } catch (error: any) {
            showToast({
                type: "error",
                content:
                    error?.response?.data?.message ?? "Không thể gửi lại OTP",
            });
        } finally {
            setIsResending(false);
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

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                            className="w-full border-b border-text-primary pb-2 text-2xl tracking-[12px] text-text-primary"
                            underlineColorAndroid="transparent"
                        />

                        <Text className="text-base font-medium text-alert">
                            {formatted}
                        </Text>

                        {isExpired ? (
                            <Pressable
                                className="active:opacity-80"
                                disabled={isResending}
                                onPress={handleResend}
                            >
                                {isResending ? (
                                    <ActivityIndicator color="#00a2e8" />
                                ) : (
                                    <Text className="text-sm font-medium text-accent">
                                        Gửi lại mã OTP
                                    </Text>
                                )}
                            </Pressable>
                        ) : null}
                    </View>

                    <View className="mt-10">
                        <Button
                            type="primary"
                            variant="bold"
                            className="w-full rounded-xl"
                            disabled={otp.length < OTP_LENGTH || isExpired}
                            onPress={handleContinue}
                        >
                            Xác thực
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
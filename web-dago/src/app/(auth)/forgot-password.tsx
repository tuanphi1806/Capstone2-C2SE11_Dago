import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { useToastify } from "@/hooks/useToastify";
import { useTranslation } from "@/i18n";
import { authService } from "@/services/AuthService";
import { forgotPasswordSchema, validateSchema } from "@/utils/validators";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";

export default function ForgotPasswordScreen() {
    const { t } = useTranslation();
    const showToast = useToastify();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const isFormValid = useMemo(
        () => validateSchema(forgotPasswordSchema, { email }).ok,
        [email],
    );

    const handleContinue = async () => {
        if (isSubmitting) return;

        const validation = validateSchema(forgotPasswordSchema, { email });
        if (!validation.ok) {
            setError(
                validation.errors.email
                    ? t(validation.errors.email)
                    : t("validation.email"),
            );
            return;
        }

        setError(undefined);
        setIsSubmitting(true);

        try {
            const response = await authService.forgotPassword({
                email: validation.data.email,
            });

            showToast({
                type: "success",
                content: response.message ?? t("auth.forgot.otpSent"),
            });

            router.push({
                pathname: "/forgot-otp" as never,
                params: { email: validation.data.email },
            });
        } catch (err: any) {
            showToast({
                type: "error",
                content:
                    err?.response?.data?.message ?? t("auth.register.fail"),
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

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View className="flex-1 justify-center px-8">
                    <View className="items-center">
                        <Image
                            source={require("../../../assets/images/FAQ.png")}
                            style={{ width: "100%", height: 220 }}
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="mt-6 text-center text-2xl font-bold text-primary">
                        {t("auth.forgot.title")}
                    </Text>
                    <Text className="mt-3 text-center text-base leading-6 text-primary">
                        {t("auth.forgot.hint")}
                    </Text>

                    <View className="mt-8 gap-2">
                        <InputText
                            value={email}
                            onChangeText={(value) => {
                                setEmail(value);
                                if (error) setError(undefined);
                            }}
                            placeholder={t("auth.forgot.emailPlaceholder")}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            className="h-12 w-full rounded-xl border-0 bg-surface px-4"
                        />
                        {error ? (
                            <Text className="text-xs text-alert">{error}</Text>
                        ) : null}
                    </View>

                    <View className="mt-6">
                        <Button
                            type="primary"
                            variant="bold"
                            className="w-full rounded-xl"
                            disabled={!isFormValid || isSubmitting}
                            onPress={handleContinue}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                t("auth.forgot.continue")
                            )}
                        </Button>
                    </View>

                    <Pressable
                        className="mt-6 self-center active:opacity-80"
                        onPress={() => router.back()}
                    >
                        <Text className="text-sm font-medium text-accent">
                            {t("auth.forgot.backToLogin")}
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
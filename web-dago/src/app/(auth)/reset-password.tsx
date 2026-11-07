import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { useToastify } from "@/hooks/useToastify";
import { useTranslation } from "@/i18n";
import { authService } from "@/services/AuthService";
import {
    MIN_PASSWORD_LENGTH,
    resetPasswordSchema,
    validateSchema,
} from "@/utils/validators";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Check, Eye, EyeOff } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";

export default function ResetPasswordScreen() {
    const { t } = useTranslation();
    const showToast = useToastify();
    const { otp } = useLocalSearchParams<{ otp?: string }>();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = useMemo(
        () =>
            validateSchema(resetPasswordSchema, {
                password,
                confirmPassword,
                otp: otp ?? "",
            }).ok,
        [password, confirmPassword, otp],
    );

    const showMismatch =
        confirmPassword.length > 0 && password !== confirmPassword;
    const showPasswordMin =
        password.length > 0 && password.length < MIN_PASSWORD_LENGTH;

    const handleSubmit = async () => {
        if (isSubmitting) return;

        const validation = validateSchema(resetPasswordSchema, {
            password,
            confirmPassword,
            otp: otp ?? "",
        });
        if (!validation.ok) {
            showToast({
                type: "error",
                content: t(
                    validation.errors.confirmPassword ??
                        validation.errors.password ??
                        "validation.formInvalid",
                ),
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await authService.resetPassword({
                otp: validation.data.otp,
                newPassword: validation.data.password,
                newPassword_confirm: validation.data.confirmPassword,
            });

            showToast({
                type: "success",
                content: response.message ?? t("auth.reset.success"),
            });

            router.replace("/login");
        } catch (error: any) {
            showToast({
                type: "error",
                content:
                    error?.response?.data?.message ?? t("auth.reset.fail"),
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
                className="absolute -bottom-24 -left-16 h-64 w-64 overflow-hidden rounded-full opacity-30"
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
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View className="flex-1 justify-center px-8">
                    <Text className="mb-8 text-center text-2xl font-bold text-primary">
                        {t("auth.reset.title")}
                    </Text>

                    <View className="gap-5">
                        <View className="gap-2">
                            <Text className="text-sm font-medium text-accent">
                                {t("auth.field.password")}
                            </Text>
                            <View className="relative">
                                <InputText
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder={t("auth.field.password")}
                                    secureTextEntry={!showPassword}
                                    className="h-12 w-full rounded-xl border-0 bg-surface"
                                    style={{ paddingRight: 48 }}
                                />
                                <Pressable
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    onPress={() => setShowPassword((v) => !v)}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} color="#64748b" />
                                    ) : (
                                        <Eye size={18} color="#64748b" />
                                    )}
                                </Pressable>
                            </View>
                            {showPasswordMin ? (
                                <Text className="text-xs text-alert">
                                    {t("validation.passwordMin")}
                                </Text>
                            ) : null}
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-medium text-accent">
                                {t("auth.field.confirmPassword")}
                            </Text>
                            <View className="relative">
                                <InputText
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    placeholder={t("auth.field.confirmPassword")}
                                    secureTextEntry={!showConfirmPassword}
                                    className="h-12 w-full rounded-xl border-0 bg-surface"
                                    style={{ paddingRight: 48 }}
                                />
                                <Pressable
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    onPress={() =>
                                        setShowConfirmPassword((v) => !v)
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} color="#64748b" />
                                    ) : (
                                        <Eye size={18} color="#64748b" />
                                    )}
                                </Pressable>
                            </View>
                            {showMismatch ? (
                                <Text className="text-xs text-alert">
                                    {t("auth.reset.mismatch")}
                                </Text>
                            ) : null}
                        </View>

                        <Pressable
                            className="flex-row items-center justify-end gap-2 active:opacity-80"
                            onPress={() => setRememberMe((v) => !v)}
                        >
                            <View
                                className={`h-5 w-5 items-center justify-center rounded border-2 ${
                                    rememberMe
                                        ? "border-primary bg-primary"
                                        : "border-border bg-background"
                                }`}
                            >
                                {rememberMe ? (
                                    <Check color="#ffffff" size={12} />
                                ) : null}
                            </View>
                            <Text className="text-sm font-medium text-primary">
                                {t("auth.reset.rememberMe")}
                            </Text>
                        </Pressable>

                        <Button
                            type="accent"
                            variant="bold"
                            className="mt-2 w-full rounded-xl"
                            disabled={!isFormValid || isSubmitting}
                            onPress={handleSubmit}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                t("auth.reset.continue")
                            )}
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

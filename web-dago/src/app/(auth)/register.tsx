import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { useToastify } from "@/hooks/useToastify";
import { useTranslation } from "@/i18n";
import { authService } from "@/services/AuthService";
import {
    registerSchema,
    validateSchema,
    type FieldErrors,
} from "@/utils/validators";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

type RegisterFields =
    | "full_name"
    | "email"
    | "phone"
    | "password"
    | "password_confirm";

export default function Register() {
    const { t } = useTranslation();
    const showToast = useToastify();
    const [user, setUser] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirm: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<FieldErrors<RegisterFields>>({});

    const isFormValid = useMemo(
        () => validateSchema(registerSchema, user).ok,
        [user],
    );

    const updateField = (key: RegisterFields, value: string) => {
        setUser((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: undefined }));
        }
    };

    const handleRegister = async () => {
        if (isSubmitting) return;

        const validation = validateSchema(registerSchema, user);
        if (!validation.ok) {
            const nextErrors: FieldErrors<RegisterFields> = {};
            for (const [key, messageKey] of Object.entries(validation.errors)) {
                if (messageKey) {
                    nextErrors[key as RegisterFields] = t(messageKey);
                }
            }
            setErrors(nextErrors);
            showToast({
                type: "error",
                content: t("validation.formInvalid"),
            });
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            const response = await authService.register(validation.data);

            showToast({
                type: "success",
                content:
                    response.data?.message ??
                    response.message ??
                    t("auth.register.otpSent"),
            });

            router.push({
                pathname: "/verify-otp",
                params: { email: validation.data.email },
            });
        } catch (error: any) {
            showToast({
                type: "error",
                content:
                    error?.response?.data?.message ?? t("auth.register.fail"),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <LinearGradient
            colors={["#004a6e", "#0082ba", "#ffe082"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        paddingHorizontal: 20,
                        paddingVertical: 24,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="items-center">
                        <Image
                            source={require("../../../assets/images/logo.png")}
                            style={{ width: 200, height: 160 }}
                            resizeMode="contain"
                        />
                    </View>

                    <View className="mt-2 gap-4">
                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                {t("auth.field.fullName")}
                            </Text>
                            <InputText
                                value={user.full_name}
                                onChangeText={(text) =>
                                    updateField("full_name", text)
                                }
                                placeholder={t("auth.field.fullName")}
                                autoCapitalize="words"
                                className="w-full rounded-xl border-0 bg-surface"
                            />
                            {errors.full_name ? (
                                <Text className="text-xs text-alert">
                                    {errors.full_name}
                                </Text>
                            ) : null}
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                {t("auth.field.email")}
                            </Text>
                            <InputText
                                value={user.email}
                                onChangeText={(text) =>
                                    updateField("email", text)
                                }
                                placeholder={t("auth.field.email")}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                className="w-full rounded-xl border-0 bg-surface"
                            />
                            {errors.email ? (
                                <Text className="text-xs text-alert">
                                    {errors.email}
                                </Text>
                            ) : null}
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                {t("auth.field.phone")}
                            </Text>
                            <InputText
                                value={user.phone}
                                onChangeText={(text) =>
                                    updateField("phone", text)
                                }
                                placeholder={t("auth.field.phone")}
                                keyboardType="phone-pad"
                                className="w-full rounded-xl border-0 bg-surface"
                            />
                            {errors.phone ? (
                                <Text className="text-xs text-alert">
                                    {errors.phone}
                                </Text>
                            ) : null}
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                {t("auth.field.password")}
                            </Text>
                            <View className="relative">
                                <InputText
                                    value={user.password}
                                    onChangeText={(text) =>
                                        updateField("password", text)
                                    }
                                    placeholder={t("auth.field.password")}
                                    className="w-full rounded-xl border-0 bg-surface"
                                    style={{ paddingRight: 40 }}
                                    secureTextEntry={!showPassword}
                                />
                                <Pressable
                                    onPress={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    hitSlop={8}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} color="#64748b" />
                                    ) : (
                                        <Eye size={18} color="#64748b" />
                                    )}
                                </Pressable>
                            </View>
                            {errors.password ? (
                                <Text className="text-xs text-alert">
                                    {errors.password}
                                </Text>
                            ) : null}
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                {t("auth.field.confirmPassword")}
                            </Text>
                            <View className="relative">
                                <InputText
                                    value={user.password_confirm}
                                    onChangeText={(text) =>
                                        updateField("password_confirm", text)
                                    }
                                    placeholder={t("auth.field.confirmPassword")}
                                    secureTextEntry={!showPasswordConfirm}
                                    className="w-full rounded-xl border-0 bg-surface"
                                    style={{ paddingRight: 40 }}
                                />
                                <Pressable
                                    onPress={() =>
                                        setShowPasswordConfirm((v) => !v)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    hitSlop={8}
                                >
                                    {showPasswordConfirm ? (
                                        <EyeOff size={18} color="#64748b" />
                                    ) : (
                                        <Eye size={18} color="#64748b" />
                                    )}
                                </Pressable>
                            </View>
                            {errors.password_confirm ? (
                                <Text className="text-xs text-alert">
                                    {errors.password_confirm}
                                </Text>
                            ) : null}
                        </View>

                        <Button
                            type="accent"
                            variant="bold"
                            className="w-full rounded-xl"
                            disabled={!isFormValid || isSubmitting}
                            onPress={handleRegister}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                t("auth.register.submit")
                            )}
                        </Button>

                        <View className="mt-2 items-center">
                            <Text className="text-sm text-on-primary">
                                {t("auth.register.hasAccount")}{" "}
                                <Text
                                    className="font-semibold text-on-primary"
                                    onPress={() => router.back()}
                                >
                                    {t("auth.register.signIn")}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
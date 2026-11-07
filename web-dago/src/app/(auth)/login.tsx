import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { useToastify } from "@/hooks/useToastify";
import { useTranslation } from "@/i18n";
import { navigateAuth } from "@/lib/auth-navigation";
import { authService } from "@/services/AuthService";
import useAuthStore from "@/store/auth.store";
import { loginSchema, validateSchema } from "@/utils/validators";
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

export default function Login() {
    const { t } = useTranslation();
    const { setIsAuthenticated, setUser, setToken } = useAuthStore();
    const showToast = useToastify();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {},
    );

    const isFormValid = useMemo(() => {
        return validateSchema(loginSchema, { email, password }).ok;
    }, [email, password]);

    const handleLogin = async () => {
        if (isSubmitting) return;

        const validation = validateSchema(loginSchema, { email, password });
        if (!validation.ok) {
            setErrors({
                email: validation.errors.email
                    ? t(validation.errors.email)
                    : undefined,
                password: validation.errors.password
                    ? t(validation.errors.password)
                    : undefined,
            });
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            const response = await authService.login(validation.data);
            const { user, token } = response.data;

            setUser(user);
            setToken(token);
            setIsAuthenticated(true);

            showToast({
                type: response.success ? "success" : "error",
                content: response.success
                    ? t("auth.login.success")
                    : t("auth.login.fail"),
            });
            if (response.success) {
                router.replace(navigateAuth(user?.role));
            }
        } catch (error: any) {
            showToast({
                type: "error",
                content:
                    error?.response?.data?.message ?? t("auth.login.fail"),
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
                                {t("auth.field.email")}
                            </Text>
                            <InputText
                                value={email}
                                onChangeText={(value) => {
                                    setEmail(value);
                                    if (errors.email) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            email: undefined,
                                        }));
                                    }
                                }}
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
                                {t("auth.field.password")}
                            </Text>
                            <View className="relative">
                                <InputText
                                    value={password}
                                    onChangeText={(value) => {
                                        setPassword(value);
                                        if (errors.password) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                password: undefined,
                                            }));
                                        }
                                    }}
                                    placeholder={t("auth.field.password")}
                                    secureTextEntry={!showPassword}
                                    className="w-full rounded-xl border-0 bg-surface"
                                    style={{ paddingRight: 40 }}
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

                        <Pressable
                            className="self-end active:opacity-80"
                            onPress={() =>
                                router.push("/forgot-password" as never)
                            }
                        >
                            <Text className="text-sm font-medium text-on-primary">
                                {t("auth.login.forgot")}
                            </Text>
                        </Pressable>

                        <Button
                            type="primary"
                            variant="bold"
                            className="w-full rounded-xl"
                            disabled={!isFormValid || isSubmitting}
                            onPress={handleLogin}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                t("auth.login.submit")
                            )}
                        </Button>

                        <View className="mt-2 items-center">
                            <Text className="text-sm text-on-primary">
                                {t("auth.login.noAccount")}{" "}
                                <Text
                                    className="font-semibold text-on-primary"
                                    onPress={() => router.push("/register")}
                                >
                                    {t("auth.login.signUp")}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
import { navigateAuth } from "@/lib/auth-navigation";
import useAuthStore from "@/store/auth.store";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);
    const user = useAuthStore((state) => state.user);

    if (isLoading) {
        return null;
    }

    if (isAuthenticated) {
        return <Redirect href={navigateAuth(user?.role)} />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
import { Stack } from "expo-router";
import { StoreProvider } from "@/store";
import { useLoadApp } from "@/hooks/useLoadApp";

export default function RootLayout() {
  const { loaded } = useLoadApp();

  if (!loaded) return null;

  return (
    <StoreProvider>
      <Stack
        screenOptions={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#FFFFFF",
          headerTransparent: true,
        }}
      >
        <Stack.Screen name="main" options={{ headerShown: false }} />
        <Stack.Screen name="auth/index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: true }} />
        <Stack.Screen name="auth/signup" options={{ headerShown: true }} />
      </Stack>
    </StoreProvider>
  );
}

import { Stack } from "expo-router";
import { StoreProvider } from "@/store";
import { useLoadApp } from "@/hooks/useLoadApp";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = { initialRouteName: "main" };

export default function RootLayout() {
  const { loaded } = useLoadApp();

  if (!loaded) return null;

  return (
    <StoreProvider>
      <Stack>
        <Stack.Screen name="main" options={{ headerShown: false }} />
      </Stack>
    </StoreProvider>
  );
}

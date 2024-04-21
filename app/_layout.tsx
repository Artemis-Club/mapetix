import { Stack } from 'expo-router';
import { StoreProvider } from '@/store';
import { useLoadApp } from '@/hooks/useLoadApp';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = { initialRouteName: 'main' };

export default function RootLayout() {
  const { loaded } = useLoadApp();

  if (!loaded) return null;

  return (
    <StoreProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="main" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </StoreProvider>
  );
}

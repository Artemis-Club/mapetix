import { Stack } from 'expo-router';
import { StoreProvider } from '@/store';
import { useLoadApp } from '@/hooks/useLoadApp';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const { loaded } = useLoadApp();

  if (!loaded) return null;

  return (
    <StoreProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            title: '',
            headerBackTitleVisible: false,
            headerTintColor: '#FFFFFF',
            headerTransparent: true,
          }}
        >
          <Stack.Screen name="main" options={{ headerShown: false }} />
          <Stack.Screen name="auth/index" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: true }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: true }} />
        </Stack>
      </GestureHandlerRootView>
    </StoreProvider>
  );
}

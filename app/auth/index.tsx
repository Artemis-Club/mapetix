import { Button, Text } from '@/components';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Auth() {
  return (
    <SafeAreaView className="flex-1 items-center bg-neutral-800 pt-8">
      <Text className="text-5xl font-black mb-6">Mapetix</Text>
      <Link className="text-white underline" href="/auth/login">
        Acceder
      </Link>
      <Link className="text-white underline" href="/auth/signup">
        Crear cuenta
      </Link>
    </SafeAreaView>
  );
}

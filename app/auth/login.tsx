import { View } from 'react-native';
import { Button, Input, Text } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '@/hooks/useAuth';
import useForm from '@/hooks/useForm';
import { AuthPayload } from '@/types';

export default function Login() {
  const { login, error } = useAuth();

  const { values, onChange } = useForm({
    email: '',
    password: '',
  });

  const onSubmit = async () => {
    await login(values as unknown as AuthPayload);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-800 pt-12 px-4 gap-y-2">
      <Text className="text-2xl">Acceder</Text>
      <Input
        label="Correo"
        onChange={onChange('email')}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <Input
        label="Contraseña"
        onChange={onChange('password')}
        secureTextEntry={true}
        textContentType="password"
        autoCapitalize="none"
      />
      <Button onPress={onSubmit}>Acceder</Button>
      {error && <Text className="text-red-500">{JSON.stringify(error)}</Text>}
    </SafeAreaView>
  );
}

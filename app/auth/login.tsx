import { View } from 'react-native';
import { Button, Illustration, Input, Text } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '@/hooks/useAuth';
import useForm from '@/hooks/useForm';
import { AuthPayload } from '@/types';
import { KeyboardAvoidingView } from 'react-native';
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
    <KeyboardAvoidingView
      className="flex-1 justify-between bg-neutral-800 pt-20 px-4 gap-y-2"
      keyboardVerticalOffset={100}
      behavior="height"
    >
      <SafeAreaView className="flex flex-1 justify-between">
        <View className="flex flex-col justify-start">
          <Illustration variant="auth" />
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
          {error && (
            <Text className="text-red-500">{JSON.stringify(error)}</Text>
          )}
        </View>

        <Button onPress={onSubmit} className="mb-8">
          Acceder
        </Button>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

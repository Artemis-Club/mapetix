import { Text } from 'react-native';
import { Button, Input } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { default as useAuth } from '@/hooks/useAuth';
import useForm from '@/hooks/useForm';
import { AuthPayload } from '@/types';
import { KeyboardAvoidingView } from 'react-native';
import { View } from 'react-native';

export default function Signup() {
  const { signup, error } = useAuth();

  const { values, onChange } = useForm({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onSubmit = async () => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) return;
    await signup(values as unknown as AuthPayload);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-between bg-neutral-800 pt-28 px-4 gap-y-2"
      keyboardVerticalOffset={100}
      behavior="height"
    >
      <SafeAreaView className=" flex flex-1 justify-between">
        <View className="flex flex-col justify-start">
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
          <Input
            label="Confirmar constraseña"
            onChange={onChange('confirmPassword')}
            secureTextEntry={true}
            textContentType="password"
            autoCapitalize="none"
          />
          {error && (
            <Text className="text-red-500">{JSON.stringify(error)}</Text>
          )}
        </View>
        <Button onPress={onSubmit} className="mb-8">
          Registrarse
        </Button>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

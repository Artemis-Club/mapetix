import { Text } from "react-native";
import { Button, Input } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { default as useAuth } from "@/hooks/useAuth";
import useForm from "@/hooks/useForm";
import { AuthPayload } from "@/types";

export default function Signup() {
  const { signup } = useAuth();

  const { values, onChange } = useForm({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = async () => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) return;
    await signup(values as unknown as AuthPayload);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-800 pt-12 px-4 gap-y-2">
      <Text className="text-2xl text-white">Registrarse</Text>
      <Input
        label="Correo"
        onChange={onChange("email")}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <Input
        label="Contraseña"
        onChange={onChange("password")}
        secureTextEntry={true}
        textContentType="password"
        autoCapitalize="none"
      />
      <Input
        label="Confirmar constraseña"
        onChange={onChange("confirmPassword")}
        secureTextEntry={true}
        textContentType="password"
        autoCapitalize="none"
      />
      <Button onPress={onSubmit}>Registrarse</Button>
    </SafeAreaView>
  );
}

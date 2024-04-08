import { Text } from "react-native";
import { Button, Input } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignUpMutation } from "@/api/auth";
import useForm from "@/hooks/useForm";

export default function Signup() {
  const [signup, result] = useSignUpMutation();

  const { values, onChange } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    const res = await signup(values);
    console.log(res, result);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-800 pt-12 px-4 gap-y-2">
      <Text className="text-2xl text-white">Registrarse</Text>
      <Input
        label="Correo"
        onChange={onChange("email")}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <Input
        label="Contraseña"
        onChange={onChange("password")}
        secureTextEntry={true}
        textContentType="password"
      />
      <Button onPress={onSubmit}>Registrarse</Button>
    </SafeAreaView>
  );
}

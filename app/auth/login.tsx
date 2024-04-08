import { Text, View } from "react-native";
import { Button, Input } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoginMutation } from "@/api/auth";

export default function Login() {
  const [login, response] = useLoginMutation();
  return (
    <SafeAreaView className="flex-1 bg-neutral-800 pt-12 px-4 gap-y-2">
      <Text className="text-2xl text-white">Iniciar Sesión</Text>
      <Input label="Correo" />
      <Input label="Contraseña" />
      <Button>Inicial sesión</Button>
    </SafeAreaView>
  );
}

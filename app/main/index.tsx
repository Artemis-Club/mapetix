import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Button } from "@/components";
import { Link } from "expo-router";
import useAuth from "@/hooks/useAuth";

export default function TabOneScreen() {
  const { logout } = useAuth();
  return (
    <View className="flex-1 bg-neutral-800 gap-y-2">
      <Text className="text-2xl text-white">Tab One</Text>
      <Button>Hey! Button 1</Button>
      <Link className="text-white underline" href="/auth/">
        Acceder
      </Link>
      <TouchableOpacity onPress={logout}>
        <Text className="text-white underline">Salir</Text>
      </TouchableOpacity>
    </View>
  );
}

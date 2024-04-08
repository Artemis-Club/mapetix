import { Text, View } from "react-native";
import { Button } from "@/components";
import { Link } from "expo-router";

export default function TabOneScreen() {
  return (
    <View className="flex-1 bg-neutral-800">
      <Text className="text-2xl text-white">Tab One</Text>
      <Button>Hey! Button 1</Button>
      <Link className="text-white underline" href="/auth/">
        Acceder
      </Link>
    </View>
  );
}

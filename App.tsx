import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-700">
      <Text className="text-white">Hello world</Text>
      <StatusBar style="auto" />
      <Icon name="map-check-outline" size={24} color="white" />
    </View>
  );
}

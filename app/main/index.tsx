import { Text, View } from "react-native";
import { Button } from "@/components";
import PlanCard from "@/components/ui/molecules/PlanCard/PlanCard";

export default function TabOneScreen() {
  return (
    <View className="flex-1 bg-gray-700">
      <Text className="text-2xl text-white">Tab One</Text>
      <Button>Hey! Button 1</Button>
      <PlanCard title="hola" hourStart={2} hourEnd={3} tripOverview="5 min" price="20" imageUrl="https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/different_sports.jpg" locationName="UPV" description="codethon"></PlanCard>
    </View>
    
  );

 
}

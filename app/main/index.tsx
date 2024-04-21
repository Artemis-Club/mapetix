import { Text, View } from 'react-native';
import { Button } from '@/components';
import PlanCard from '@/components/ui/molecules/PlanCard/PlanCard';

export default function TabOneScreen() {
  return (
    <View className="flex-1 bg-gray-700">
      <Text className="text-2xl text-white">Tab One</Text>
      <Button>Hey! Button 1</Button>
      <PlanCard
        title="hola"
        hourStart="00"
        hourEnd="03"
        tripOverview1="5 min"
        tripOverview2="140 m"
        price="20"
        imageUrl1="https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/different_sports.jpg"
        imageUrl2="https://hips.hearstapps.com/hmg-prod/images/online-buying-and-delivery-concept-royalty-free-image-1675370119.jpg"
        imageUrl3="https://miro.medium.com/v2/resize:fit:720/format:webp/1*f9N5gbBNXLGqD7NgjzVg5g.jpeg"
        locationName="UPV"
        description="codethon"
      ></PlanCard>
    </View>
  );
}

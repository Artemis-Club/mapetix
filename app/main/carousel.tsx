import { View } from 'react-native';
import { PlanCardSwiper } from '@/components';

const planCards = [
  {
    title: 'Plan 1',
    hourStart: '10',
    hourEnd: '12',
    tripOverview1: '7 min',
    tripOverview2: '235 m',
    price: '100',
    imageUrl1:
      'https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/different_sports.jpg',
    imageUrl2:
      'https://hips.hearstapps.com/hmg-prod/images/online-buying-and-delivery-concept-royalty-free-image-1675370119.jpg',
    imageUrl3:
      'https://miro.medium.com/v2/resize:fit:720/format:webp/1*f9N5gbBNXLGqD7NgjzVg5g.jpeg',
    locationName: 'UV',
    description: 'Ventajas',
  },
  {
    title: 'hola',
    hourStart: '00',
    hourEnd: '03',
    tripOverview1: '5 min',
    tripOverview2: '140 m',
    price: '20',
    imageUrl1:
      'https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/different_sports.jpg',
    imageUrl2:
      'https://hips.hearstapps.com/hmg-prod/images/online-buying-and-delivery-concept-royalty-free-image-1675370119.jpg',
    imageUrl3:
      'https://miro.medium.com/v2/resize:fit:720/format:webp/1*f9N5gbBNXLGqD7NgjzVg5g.jpeg',
    locationName: 'UPV',
    description: 'codethon',
  },
];

export default function TabOneScreen() {
  return (
    <View className="gap-y-2">
      <PlanCardSwiper planCards={planCards}></PlanCardSwiper>
    </View>
  );
}

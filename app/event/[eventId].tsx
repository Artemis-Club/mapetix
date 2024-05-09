import { TouchableOpacity, View, Dimensions } from 'react-native';
import { Text, PlanCard, Icon, Image } from '@/components';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetEventDetailQuery } from '@/api/event';
import Carousel from 'react-native-reanimated-carousel';

const PAGE_WIDTH = Dimensions.get('window').width;

export default function EventDetails() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams();
  const { data = {}, isLoading } = useGetEventDetailQuery(eventId);

  const event = {
    id: data.id,
    title: data.event_name,
    hourStart: data.start_hour?.split(':').slice(0, 2).join(':') as string,
    hourEnd: data.finish_hour?.split(':').slice(0, 2).join(':') as string,
    tripOverview1: '7 min',
    tripOverview2: '235 m',
    price: data.price,
    gallery: [
      'https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/different_sports.jpg',
      'https://hips.hearstapps.com/hmg-prod/images/online-buying-and-delivery-concept-royalty-free-image-1675370119.jpg',
      'https://miro.medium.com/v2/resize:fit:720/format:webp/1*f9N5gbBNXLGqD7NgjzVg5g.jpeg',
    ],
    locationName: 'UV',
    description: 'Ventajas',
  };

  return (
    <View
      className="flex-1 bg-neutral-800 gap-y-2"
      // sharedTransitionTag="planCard"
    >
      {isLoading && <Text className="text-white">Loading...</Text>}
      {/* <PlanCard className="w-screen h-12" key={event.id} {...event} /> */}
      <Carousel
        data={event.gallery}
        width={PAGE_WIDTH}
        height={PAGE_WIDTH / 1.5}
        renderItem={({ index, item }) => (
          <Image className="h-full" key={index} source={item} />
        )}
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-4 right-4"
      >
        <Icon name="window-close" />
      </TouchableOpacity>
    </View>
  );
}

import { TouchableOpacity, View, Dimensions } from 'react-native';
import { Text, PlanCard, Icon, Image, Button } from '@/components';
import { Rating } from 'react-native-ratings';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetEventDetailQuery } from '@/api/event';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PAGE_WIDTH = Dimensions.get('window').width;

export default function EventDetails() {
  const router = useRouter();
  const { eventId, from } = useLocalSearchParams();
  const { data = {}, isLoading } = useGetEventDetailQuery(eventId);
  const { top } = useSafeAreaInsets();

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
      <View
        pointerEvents="none"
        className="absolute flex justify-end z-20 t-0 bg-[#00000033] w-full"
        style={{ height: PAGE_WIDTH / 1.5 }}
      >
        <Text className="text-2xl font-black mb-2 ml-2">{event.title}</Text>
      </View>
      <View className="absolute top-1/3 left-0 flex flex-row items-center ml-4">
        <Icon name="star-outline" className=" text-yellow-500" />
        <View>
          <Text className="text-2xl font-black ml-2  text-yellow-500">
            {event.price}
          </Text>
        </View>
        <Icon name="clock-time-eight-outline" className="ml-16" />
        <View>
          <Text className="text-2xl font-black ml-2">{event.hourStart}</Text>
        </View>
        <Icon name="currency-eur" className="text-emerald-500 ml-12" />
        <View>
          <Text className="text-2xl font-black ml-2 text-emerald-500">
            {event.price}
          </Text>
        </View>
      </View>
      {(from === 'plan' && (
        <View className="absolute top-96 flex items-center ml-12">
          <Rating
            showRating
            style={{ paddingVertical: 10 }}
            type="star"
            ratingColor="yellow-500"
            ratingCount={5}
            imageSize={50}
            tintColor="#262626"
          ></Rating>
        </View>
      )) ||
        (from === 'explore' && (
          <View className="absolute top-96 flex items-center ml-12">
            <View className="absolute top-96 flex items-center ml-12">
              <Rating
                showRating
                style={{ paddingVertical: 10 }}
                type="star"
                ratingColor="yellow-500"
                ratingCount={5}
                imageSize={50}
                tintColor="#262626"
              ></Rating>
            </View>
          </View>
        ))}
      {/*Aquí arriba hablamos de poner lo de si gusta o no la recomendación, como por ahora no se hace lo dejo igual pero sin boton */}
      {(from === 'plan' && (
        <View className="flex-row">
          <View className="w-1/2 flex justify-center items-center">
            <Button stylish="outline">Valorar</Button>
          </View>
          <View className="w-1/2 flex justify-center items-center">
            <Button stylish="fill">Ruta</Button>
          </View>
        </View>
      )) ||
        (from === 'explore' && (
          <View className="flex-row">
            <View className="w-screen flex justify-center items-center">
              <Button stylish="fill">Ruta</Button>
            </View>
          </View>
        ))}
      <View className="absolute top-2/3 ml-12">
        <View className="flex-row">
          <Text>{event.description}</Text>
        </View>
        <View className="flex-row">
          <Icon name="map-marker"></Icon>
          <Text>{event.locationName}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute right-4 z-30"
        style={{ top: top }}
      >
        <Icon name="window-close" />
      </TouchableOpacity>
    </View>
  );
}

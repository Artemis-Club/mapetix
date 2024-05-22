import {
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Touchable,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, PlanCard, Icon, Image, Button, Modal } from '@/components';
import { Rating } from 'react-native-ratings';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetEventDetailQuery } from '@/api/event';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const PAGE_WIDTH = Dimensions.get('window').width;
const rating: number = 5;

export default function EventDetails() {
  const router = useRouter();
  const { eventId, from } = useLocalSearchParams();
  const { data = {}, isLoading } = useGetEventDetailQuery(eventId);
  const { top } = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const event = {
    id: data.id,
    title: data.event_name,
    hourStart: data.start_hour
      ? data.start_hour?.split(':').slice(0, 2).join(':')
      : '9:00',
    hourEnd: data.start_hour
      ? data.finish_hour?.split(':').slice(0, 2).join(':')
      : '14:30',
    price: data.price ? parseFloat(data.price).toFixed(2) : '5 - 30',
    gallery: data.nombre_imagenes,
    locationName: data.direccion_event,
    description: data.description,
    valoration: ((data.valoration || 10) / 2).toFixed(1),
  };

  const [rating, setRating] = useState(0);

  const enviarCalificacion = () => {
    const ratingDoble = rating === 0 ? 1 : rating * 2;
    // Aquí deberías enviar 'ratingDoble' a tu API
    // Por ahora, solo imprimimos el valor en la consola
    console.log('Calificación enviada:', ratingDoble);
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-800 gap-y-2"
      // sharedTransitionTag="planCard"

      contentContainerStyle={{ minHeight: '100%', paddingBottom: 32 }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute right-4 z-50"
        style={{ top: top }}
      >
        <Icon name="window-close" />
      </TouchableOpacity>
      {isLoading && <Text className="text-white">Loading...</Text>}
      {/* <PlanCard className="w-screen h-12" key={event.id} {...event} /> */}
      <View style={{ height: PAGE_WIDTH / 1.5 }}>
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
          className="absolute flex justify-end z-20 t-0 w-full"
          style={{ height: PAGE_WIDTH / 1.5 }}
        >
          <LinearGradient
            colors={['#00000000', '#000000']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="w-full h-full absolute top-0 left-0"
          />
          <Text
            bold
            className="text-2xl mb-2 ml-2 text-center"
            numberOfLines={2}
          >
            {event.title}
          </Text>
        </View>
      </View>
      <View className="flex flex-row items-center mt-4 w-full px-4 pt-2">
        <View className="w-1/3 flex-row items-center justify-center">
          <Icon name="star-outline" className="text-yellow-500" />
          <Text bold className="text-xl font-black ml-2 text-yellow-500">
            {event.valoration}
          </Text>
        </View>
        <View className="w-1/3 flex-row items-center justify-center border-l border-neutral-600">
          <Icon name="clock-time-eight-outline" />
          <Text bold className="text-xl font-black ml-2">
            {event.hourStart}
          </Text>
        </View>
        <View className="w-1/3 flex-row items-center justify-center border-l border-neutral-600">
          <Icon name="currency-eur" className="text-emerald-500" />
          <Text bold className="text-xl font-black ml-2 text-emerald-500">
            {event.price}
          </Text>
        </View>
      </View>
      <View className="px-4 flex-1">
        {event.locationName && (
          <View className="flex-row w-full my-4 justify-center items-center gap-x-2">
            <Icon name="map-marker"></Icon>
            <Text bold>{event.locationName}</Text>
          </View>
        )}
        <TouchableWithoutFeedback onPress={() => setExpanded((prev) => !prev)}>
          <Text
            className="text-base text-neutral-400 text-center mb-4"
            numberOfLines={expanded ? undefined : 4}
          >
            {event.description}
          </Text>
        </TouchableWithoutFeedback>
        {from === 'plan' && (
          <Button
            stylish="outline"
            onPress={() => setIsRatingOpen(true)}
            className="mt-auto"
          >
            Valorar
          </Button>
        )}
        <Modal open={isRatingOpen} onClose={() => setIsRatingOpen(false)}>
          <View className="bg-neutral-700 p-4 rounded-xl mx-auto">
            <Text className="text-base text-center">
              ¿Qué te ha parecido este evento?{'\n'}Tu opinión es muy importante
              para nosotros
            </Text>
            <Rating
              style={{ paddingVertical: 24 }}
              type="star"
              ratingColor="yellow-500"
              ratingCount={5}
              imageSize={48}
              tintColor="#404040"
              onFinishRating={setRating}
            ></Rating>
            <Button
              onPress={() => {
                enviarCalificacion();
                setIsRatingOpen(false);
              }}
              className="mt-4"
            >
              Enviar
            </Button>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

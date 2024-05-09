import { Text, View } from 'react-native';
import { MapWithMarkers, Modal, PlanCardSwiper } from '@/components';
import { mapSettings } from '@/config/map';
import { useGetPlanDetailsQuery } from '@/api/plan';
import { PlanSelector } from '@/components/plan';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@/components/ui/atoms/Icon';
import { Drawer } from 'expo-router/drawer';
import { LinearGradient } from 'expo-linear-gradient';

export default function Map() {
  const [isPlanSelectorOpened, setIsPlanSelectorOpened] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('1');
  const [focusedEvent, setFocusedEvent] = useState(0);

  const {
    data: plan = { events: [] },
    isLoading,
    error,
  } = useGetPlanDetailsQuery(selectedPlan);

  const markers = plan?.events.map(({ coord_x, coord_y }) => ({
    coordinate: {
      latitude: coord_x,
      longitude: coord_y,
    },
  }));

  const planCards = plan?.events.map(
    ({ id, event_name, price, start_hour, finish_hour }) => ({
      id,
      title: event_name,
      hourStart: start_hour.split(':').slice(0, 2).join(':') as string,
      hourEnd: finish_hour.split(':').slice(0, 2).join(':') as string,
      tripOverview1: '7 min',
      tripOverview2: '235 m',
      price,
      gallery: [
        'https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/different_sports.jpg',
        'https://hips.hearstapps.com/hmg-prod/images/online-buying-and-delivery-concept-royalty-free-image-1675370119.jpg',
        'https://miro.medium.com/v2/resize:fit:720/format:webp/1*f9N5gbBNXLGqD7NgjzVg5g.jpeg',
      ],
      locationName: 'UV',
      description: 'Ventajas',
    })
  );

  const onPlanSelected = (planId: string) => {
    setSelectedPlan(planId);
    setIsPlanSelectorOpened(false);
  };

  return (
    <>
      <Drawer.Screen
        options={{
          headerTransparent: true,
          headerTitle: plan?.description,
          headerBackground: () => (
            <LinearGradient
              colors={['#000000', '#00000000']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setIsPlanSelectorOpened((p) => !p)}
              className="mr-4"
            >
              <Icon name="notebook" />
            </TouchableOpacity>
          ),
        }}
      />
      <View className="flex-1">
        <Modal
          open={isPlanSelectorOpened}
          onClose={() => setIsPlanSelectorOpened(false)}
        >
          <PlanSelector
            className="bg-neutral-700 w-full rounded-xl flex-grow-0"
            onPlanSelected={onPlanSelected}
          />
        </Modal>
        <MapWithMarkers
          markers={markers}
          focusedMarker={focusedEvent}
          setFocusedMarker={setFocusedEvent}
          {...mapSettings}
        ></MapWithMarkers>
      </View>
      <PlanCardSwiper
        planCards={planCards}
        focusedEvent={focusedEvent}
        onPlanSelected={setFocusedEvent}
        className="absolute bottom-1"
        from={selectedPlan ? 'plan' : 'explore'}
      />
    </>
  );
}

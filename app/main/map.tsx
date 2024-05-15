import { View } from 'react-native';
import {
  MapWithMarkers,
  Modal,
  PlanCardSwiper,
  Spinner,
  Text,
} from '@/components';
import { mapSettings } from '@/config/map';
import { PlanSelector } from '@/components/plan';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@/components/ui/atoms/Icon';
import { Drawer } from 'expo-router/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import useLocation from '@/hooks/useLocation';
import { useLazyGetPlanDetailsQuery } from '@/api/plan';
import { useLazyGetEventsQuery } from '@/api/event';

export default function Map() {
  const [isPlanSelectorOpened, setIsPlanSelectorOpened] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [focusedEvent, setFocusedEvent] = useState(0);

  const location = useLocation();

  const [
    getPlanDetails,
    { data: plan = { events: [] }, isLoading: isLoadingPlan },
  ] = useLazyGetPlanDetailsQuery();

  const [
    getAllEvents,
    { data: allEvents = [], error, isLoading: isLoadinEvents },
  ] = useLazyGetEventsQuery();

  const isLoading = isLoadingPlan || isLoadinEvents;

  let events = !!selectedPlan ? plan?.events : allEvents;

  events = events.filter(({ coord_x, coord_y }) => !!coord_x && !!coord_y);

  const markers = events.map(({ coord_x, coord_y }) => ({
    coordinate: {
      latitude: coord_x,
      longitude: coord_y,
    },
  }));

  const planCards = events.map(
    ({
      id,
      event_name,
      price,
      start_hour,
      finish_hour,
      nombre_imagenes,
      direccion_event,
      valoration,
    }) => ({
      id,
      title: event_name.trim(),
      hourStart: start_hour
        ? (start_hour.split(':').slice(0, 2).join(':') as string)
        : '9:00',
      hourEnd: start_hour
        ? (finish_hour.split(':').slice(0, 2).join(':') as string)
        : '14:30',
      price,
      gallery: nombre_imagenes,
      locationName: direccion_event,
      description: 'Ventajas',
      valoration,
    })
  );

  useEffect(() => {
    selectedPlan
      ? getPlanDetails({ id: selectedPlan, location })
      : getAllEvents({});
  }, [selectedPlan]);

  const onPlanSelected = (planId: string | null) => {
    console.log('planId', planId);
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
      <Spinner open={isLoading} />
      <View className="flex-1">
        <Modal
          open={isPlanSelectorOpened}
          onClose={() => setIsPlanSelectorOpened(false)}
        >
          <PlanSelector
            className="bg-neutral-700 w-full rounded-xl flex-grow-0"
            onPlanSelected={onPlanSelected}
          />
          <TouchableOpacity
            onPress={() => onPlanSelected(null)}
            className="mx-auto mt-4 items-center"
          >
            <Icon name="binoculars" size={32} />
            <Text bold className="white font-black mt-2 uppercase">
              Explorar
            </Text>
          </TouchableOpacity>
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

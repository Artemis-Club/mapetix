import { View } from 'react-native';
import { Timeline, Text, PlanCard } from '@/components';

import { useLocalSearchParams } from 'expo-router';
import { useGetPlanDetailsQuery } from '@/api/plan';
import Animated from 'react-native-reanimated';
import { useGetEventDetailQuery, useGetEventsQuery } from '@/api/event';

export default function EventDetails() {
  const { eventId } = useLocalSearchParams();
  const { data: event = {}, isLoading } = useGetEventDetailQuery(eventId);

  return (
    <Animated.View
      className="flex-1 bg-neutral-800 gap-y-2"
      sharedTransitionTag="planCard"
    >
      {isLoading && <Text className="text-white">Loading...</Text>}
      <PlanCard className="pb-8" key={event.id} {...event} />
    </Animated.View>
  );
}

import { View } from 'react-native';
import { Timeline, Text } from '@/components';

import { useLocalSearchParams } from 'expo-router';
import { useGetPlanDetailsQuery } from '@/api/plan';

export default function PlanDetails() {
  const { planId } = useLocalSearchParams();
  const { data: plan = [], isLoading } = useGetPlanDetailsQuery(planId);

  const events = plan[0]?.plan_event?.map(({ event }) => ({
    time: event.start_hour.slice(0, 5),
    title: event.event_name,
    description: event.description,
  }));

  return (
    <View className="flex-1 bg-neutral-800 gap-y-2">
      {isLoading && <Text className="text-white">Loading...</Text>}
      {plan && <Timeline events={events} />}
    </View>
  );
}

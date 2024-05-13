import { View } from 'react-native';
import { Timeline, Text } from '@/components';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetPlanDetailsQuery } from '@/api/plan';
import useLocation from '@/hooks/useLocation';

export default function PlanDetails() {
  const { planId } = useLocalSearchParams();
  const router = useRouter();
  const location = useLocation();
  const {
    data: plan = [],
    isLoading,
    error,
  } = useGetPlanDetailsQuery({ id: planId, location });
  const events =
    plan &&
    plan.events?.map((event) => ({
      ...event,
      time: event.start_hour && event.start_hour.slice(0, 5),
      title: event.event_name,
      description: event.description.slice(0, 70) + '...',
    }));

  console.log(location);
  return (
    <View className="flex-1 bg-neutral-800 gap-y-2">
      {isLoading && <Text className="text-white">Loading...</Text>}
      {plan && (
        <Timeline
          events={events}
          onEventPress={({ id }) => router.push(`/event/${id}?from=plan`)}
        />
      )}
    </View>
  );
}

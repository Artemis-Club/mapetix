import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { PlanSelector } from '@/components/plan';

export default function MyPlans() {
  const router = useRouter();

  const onItemClick = (planId: string) => {
    router.push(`/plan/${planId}`);
  };

  return (
    <View className="flex-1 bg-neutral-800 gap-y-2 px-2">
      <PlanSelector onPlanSelected={onItemClick} />
    </View>
  );
}

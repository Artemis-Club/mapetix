import { FlatList, TouchableOpacity, View } from 'react-native';
import clsx from 'clsx';
import { useRouter } from 'expo-router';
import { Text } from '@/components';
import { useGetMyPlansQuery } from '@/api/plan';

export default function MyPlans() {
  const { data: plans, error, isLoading } = useGetMyPlansQuery();

  const router = useRouter();

  const onItemClick = (planId: string) => {
    router.push(`/plan/${planId}`);
  };

  //TODO: mover a componente externo
  const renderItem = ({
    item: { description, start_date, total_price, plan_id },
  }: any) => (
    <TouchableOpacity onPress={() => onItemClick(plan_id)} key={plan_id}>
      <View
        className={clsx(
          'border-b border-neutral-600 py-2 px-4',
          'flex-row justify-between'
        )}
      >
        <View className="flex-col">
          <Text className="text-white text-base">{description}</Text>
          <Text className="text-neutral-500 text-xs">{start_date}</Text>
        </View>
        <View className="flex-col justify-center">
          <Text bold className="text-emerald-200">
            €{total_price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-neutral-800 gap-y-2 px-2">
      <FlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={(item) => item.plan_id}
      />
    </View>
  );
}

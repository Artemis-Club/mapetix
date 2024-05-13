import React from 'react';
import Text from '../../ui/atoms/Text/Text';

import { FlatList, TouchableOpacity, View } from 'react-native';
import clsx from 'clsx';
import { useRouter } from 'expo-router';
import { useGetMyPlansQuery } from '@/api/plan';

interface PlanSelectorProps {
  onPlanSelected?: (planId: string) => void;
  className?: string;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({
  onPlanSelected,
  ...props
}) => {
  const { data: plans, error, isLoading } = useGetMyPlansQuery();

  // console.log(plans);
  const renderItem = ({
    item: { description, start_date, total_price, plan_id },
  }: any) => (
    <TouchableOpacity
      onPress={() => onPlanSelected && onPlanSelected(plan_id)}
      key={plan_id}
    >
      <View
        className={clsx(
          'border-b border-neutral-600 py-2 px-4',
          'flex-row justify-between'
        )}
      >
        <View className="flex-col">
          <Text className="text-base">{description}</Text>
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
    <FlatList
      data={plans}
      renderItem={renderItem}
      keyExtractor={(item) => item.plan_id}
      {...props}
    />
  );
};

export default PlanSelector;

import React from 'react';
import Image from '../../atoms/Image/Image';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import { View } from 'react-native';

import Animated from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export interface PlanCardProps {
  id: number;
  title: string;
  hourStart: string;
  hourEnd: string;
  tripOverview1: string;
  tripOverview2: string;
  price: string;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  locationName: string;
  description: string;
  style?: object;
  className?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  hourStart,
  hourEnd,
  tripOverview1,
  tripOverview2,
  price,
  imageUrl1,
  imageUrl2,
  imageUrl3,
  locationName,
  description,
  id,
  style,
}) => {
  const router = useRouter();
  return (
    <Animated.View
      className={'bg-neutral-700 rounded-2xl p-4 pb-8 mb-4 shadow-md w-full'}
      style={style}
    >
      <View className="flex-row items-center justify-between w-full">
        <View className="flex-col basis-1/2 grow-0">
          <Text bold className="text-xl">
            {title}
          </Text>
          <View className="flex-row">
            <Text fit className={'text-base mb-2'}>
              {hourStart}
              {'-'}
            </Text>
            <Text fit className={'text-base mb-2'}>
              {hourEnd}
            </Text>
          </View>
        </View>

        <View className="flex-col basis-1/2 grow-0 justify-items-end">
          <View className="flex-row justify-end">
            <Text fit className={'text-base mb-4 mr-12'}>
              {tripOverview1}
              {'\n'}
              {tripOverview2}
            </Text>
            <Text bold className={'text-base mb-4'}>
              {price}
              {'€'}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-stretch mr-2 h-12 mb-4">
        <View className="flex-col basis-1/3 grow-1 mr-1">
          <Image source={imageUrl1} className={'w-full h-full'} />
        </View>
        <View className="flex-col basis-1/3 grow-1 mr-1">
          <Image source={imageUrl2} className={'w-full h-full'} />
        </View>
        <View className="flex-col basis-1/3 grow-1">
          <Image source={imageUrl3} className={'w-full h-full'} />
        </View>
      </View>

      {/* <View className="flex-row items-center self-start mr-2">
        <Text fit className={'text-base mb-4'}>
          {locationName}
          {'\n'}
          {description}
        </Text>
      </View> */}

      <View className="flex-row items-center">
        <View className="flex-col justify-center basis-1/2 grow-0">
          <Button onPress={() => {}} stylish="fill">
            Ruta
          </Button>
        </View>
        <View className="flex-col justify-center basis-1/2 grow-0">
          <Button onPress={() => router.push(`/event/${id}`)} stylish="fill">
            Añadir a un plan
          </Button>
        </View>
      </View>
    </Animated.View>
  );
};
export default PlanCard;

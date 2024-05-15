import React from 'react';
import Image from '../../atoms/Image/Image';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import Icon from '../../atoms/Icon/Icon';
import { TouchableOpacity, View } from 'react-native';

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
  gallery: string[];
  locationName: string;
  description: string;
  valoration: number;
  style?: object;
  className?: string;
  from?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  hourStart,
  hourEnd,
  tripOverview1,
  tripOverview2,
  price,
  gallery,
  locationName,
  description,
  valoration,
  id,
  style,
  from,
}) => {
  const router = useRouter();

  const onCardPress = () => {
    router.push(`/event/${id}?from=${from}`);
  };

  if (!id) return null;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onCardPress}>
      <Animated.View
        className={'bg-neutral-700 rounded-2xl p-4 shadow-md w-full'}
        style={style}
      >
        <View className="flex-row justify-between w-full gap-x-4">
          <View className="h-full aspect-square max-w-1/3 rounded-2xl overflow-hidden">
            <Image source={gallery && gallery[0]} className="h-full" />
          </View>
          <View className="flex-col flex-1 items-start">
            <Text
              bold
              className="text-2xl font-black text-start"
              numberOfLines={2}
            >
              {title.trim()}
            </Text>
            <View className="flex flex-row items-center">
              <Icon size={20} name="clock" className="mr-2 text-neutral-400" />
              {hourStart && hourEnd && (
                <Text className="text-lg text-neutral-400">
                  {hourStart.replace(':00', '')}h - {hourEnd.replace(':00', '')}
                  h
                </Text>
              )}
            </View>
            {locationName && (
              <View className="flex flex-row items-center w-full my-1">
                <Icon
                  size={20}
                  name="map-marker"
                  className="mr-2 text-neutral-500"
                />
                <Text
                  bold
                  className="text-neutral-500 font-bold text-md w-full"
                  numberOfLines={1}
                >
                  {locationName}
                </Text>
              </View>
            )}
            <View className="flex flex-row items-center w-full">
              <Icon size={20} name="cash" className="mr-1 text-emerald-500" />
              <View className="bg-emerald-500 px-1 rounded-xl overflow-hidden">
                <Text bold className="text-neutral-700 text-lg">
                  {price ? parseFloat(price).toFixed(2) : '5 - 30'}€
                </Text>
              </View>
              {valoration && (
                <>
                  <Icon
                    size={20}
                    name="star"
                    className="mx-1 ml-auto text-yellow-500"
                  />
                  <Text bold className="text-yellow-500 text-lg  ">
                    {(valoration / 2).toFixed(1)}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
export default PlanCard;

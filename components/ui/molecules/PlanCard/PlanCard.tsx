import React from 'react';
import Image from '../../atoms/Image/Image';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import { View } from 'react-native';

interface PlanCardProps {
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
}) => {
  return (
    <View className={'bg-white rounded-lg p-4 mb-4 shadow-md'}>
      <View className="flex-row items-center self-start mr-2">
        <View className="flex-col basis-1/2 grow-0">
          <Text fit bold className="text-xl mb-2">
            {title}
          </Text>
          <View className="flex-row">
            <Text fit className={'text-xl mb-2'}>
              {hourStart}
              {'-'}
            </Text>
            <Text fit className={'text-xl mb-2'}>
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

      <View className="flex-row items-center mr-2">
        <View className="flex-col basis-1/3 grow-0 mr-1">
          <Image source={imageUrl1} className={'w-full h-48 mb-4'} />
        </View>
        <View className="flex-col basis-1/3 grow-0 mr-1">
          <Image source={imageUrl2} className={'w-full h-48 mb-4'} />
        </View>
        <View className="flex-col basis-1/3 grow-0">
          <Image source={imageUrl3} className={'w-full h-48 mb-4'} />
        </View>
      </View>

      <View className="flex-row items-center self-start mr-2">
        <Text fit className={'text-base mb-4'}>
          {locationName}
          {'\n'}
          {description}
        </Text>
      </View>

      <View className="flex-row items-center">
        <View className="flex-col justify-center basis-1/2 grow-0">
          <Button onPress={() => {}} stylish="fill" className="mb-2">
            Ruta
          </Button>
        </View>
        <View className="flex-col justify-center basis-1/2 grow-0">
          <Button onPress={() => {}} stylish="fill" className={''}>
            Añadir a un plan
          </Button>
        </View>
      </View>
    </View>
  );
};
export default PlanCard;

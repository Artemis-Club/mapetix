import React from "react";
import Image from "../../atoms/Image/Image";
import Button from "../../atoms/Button/Button";
import Text from "../../atoms/Text/Text";
import { View } from "react-native";

interface PlanCardProps {
  title: string;
  hourStart: number;
  hourEnd: number;
  tripOverview: string; //5min 140m
  price: string;
  imageUrl: string; //tendremos varias img supongo, por ahora ponemos solo 1
  locationName: string;
  description: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  hourStart,
  hourEnd,
  tripOverview,
  price,
  imageUrl,
  locationName,
  description,
}) => {
  return (
    <View className={"bg-white rounded-lg p-4 mb-4 shadow-md"}>
      <View className="flex-row gap-8 items-center self-center">
        <View className="flex-col basis-1/3 flex-grow-0">
          <Text fit bold className="text-xl mb-2">
            {title}
          </Text>
          <View className="flex-row ">
            <Text fit className={"text-xl mb-2"}>
              {hourStart}
            </Text>
            <Text fit className={"text-xl mb-2"}>
              {hourEnd}
            </Text>
          </View>
        </View>
        <View className="flex-col basis-1/4">
          <Text fit className={"text-base mb-4"}>
            {tripOverview}
          </Text>
        </View>
        <View className="flex-col basis-1/4">
          <Text bold className={"text-base mb-4"}>
            {price}
          </Text>
        </View>
      </View>

      <Image source={imageUrl} className={"w-full h-48 mb-4"} />
      <Text fit className={"text-base mb-4"}>
        {locationName}
      </Text>
      <Text fit className={"text-base mb-4"}>
        {description}
      </Text>
      <Button onPress={() => {}} stylish="fill" className="mb-2">
        Ruta
      </Button>
      <Button onPress={() => {}} stylish="fill" className={""}>
        Añadir a un plan
      </Button>
    </View>
  );
};

export default PlanCard;

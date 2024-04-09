import React from "react";
import {Text, Button, Image} from "../../atoms"
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

const PlanCard: React.FC<PlanCardProps> = ({ title, hourStart, hourEnd, tripOverview, price, imageUrl, locationName, description}) => {
  return (
    <View className={"bg-white rounded-lg p-4 mb-4 shadow-md"}>
      <Text fit bold className="text-xl mb-2">{title}</Text>
      <Text fit className={"text-xl mb-2"}>{hourStart}</Text>
      <Text fit className={"text-xl mb-2"}>{hourEnd}</Text>
      <Text fit className={"text-base mb-4"}>{tripOverview}</Text>
      <Text bold className={"text-base mb-4"}>{price}</Text>
      <Image source={imageUrl} className={"w-full h-48 mb-4"} />
      <Text fit className={"text-base mb-4"}>{locationName}</Text>
      <Text fit className={"text-base mb-4"}>{description}</Text>
      <Button onPress={() => {}} stylish="fill" className="bg-purple-500 text-orange-600 text-center py-2 rounded">
        Ruta
      </Button>
      <Button onPress={() => {}} stylish="fill" className={"bg-purple-500 text-orange-600 text-center py-2 rounded"}>
        Añadir a un plan
      </Button>
    </View>
  );
};

export default PlanCard;
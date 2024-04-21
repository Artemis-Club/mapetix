/*import React from 'react';
import PlanCard from '../../molecules/PlanCard/PlanCard';
import { View } from 'react-native';
import Text from '../../atoms/Text/Text';
import Image from '../../atoms/Image/Image';
import Carousel from 'react-native-snap-carousel';

const MyCarousel = ({ plans }: { plans: PlanCardProps[] }) => {
  const renderItem = ({ item }: { item: PlanCardProps }) => (
    <View
      style={{ backgroundColor: 'lightgray', padding: 20, borderRadius: 10 }}
    >
      <Text>{item.title}</Text>
      <Text>
        {item.hourStart} - {item.hourEnd}
      </Text>
      <Text>{item.tripOverview1}</Text>
      <Text>{item.tripOverview2}</Text>
      <Text>{item.price}€</Text>
      <Image
        source={{ uri: item.imageUrl1 }}
        style={{ width: 100, height: 100 }}
      />
      <Image
        source={{ uri: item.imageUrl2 }}
        style={{ width: 100, height: 100 }}
      />
      <Image
        source={{ uri: item.imageUrl3 }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{item.locationName}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <Carousel
      data={plans}
      renderItem={renderItem}
      sliderWidth={300}
      itemWidth={300}
    />
  );
};

export default PlanCardSwiper;*/

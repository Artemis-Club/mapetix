import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { PlanCard } from '../../molecules';
import { PlanCardProps } from '../../molecules/PlanCard/PlanCard';
import { InnerScreen } from 'react-native-screens';

interface PlanCardSwiperProps {
  planCards: PlanCardProps[];
}
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth * 0.9;
const margin = screenWidth * 0.05;
const PlanCardSwiperItem: React.FC<PlanCardProps> = (props) => {
  return <PlanCard {...props} />;
};

const PlanCardSwiper: React.FC<PlanCardSwiperProps> = ({ planCards }) => {
  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        snapToInterval={itemWidth + margin * 2}
        className="w-fit"
      >
        {planCards.map((planCard, index) => (
          <PlanCardSwiperItem key={index} {...planCard} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PlanCardSwiper;

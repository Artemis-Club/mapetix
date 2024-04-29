import React, { useEffect, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { PlanCard } from '../../molecules';
import { PlanCardProps } from '../../molecules/PlanCard/PlanCard';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { planCardSwiperSettings } from '@/config/plan-card-swiper';

interface PlanCardSwiperProps {
  planCards: PlanCardProps[];
  focusedEvent: number;
  style?: object;
  className?: string;
  onPlanSelected?: (index: number) => void;
}

const PlanCardSwiper: React.FC<PlanCardSwiperProps> = ({
  planCards,
  focusedEvent,
  onPlanSelected,
  style,
}) => {
  const carouselRef = useRef<ICarouselInstance>(null);

  useEffect(() => {
    if (planCards.length === 0) return;
    const carousel = carouselRef.current as ICarouselInstance;
    if (carousel) carousel.scrollTo({ index: focusedEvent, animated: true });
  }, [focusedEvent]);

  if (planCards.length === 0) return;
  return (
    <View style={style}>
      <Carousel
        {...planCardSwiperSettings}
        ref={carouselRef}
        onSnapToItem={onPlanSelected}
        data={planCards}
        mode="parallax"
        renderItem={({ index, item }) => (
          <PlanCard className="h-full" key={item.id} {...item} />
        )}
      />
    </View>
  );
};

export default PlanCardSwiper;

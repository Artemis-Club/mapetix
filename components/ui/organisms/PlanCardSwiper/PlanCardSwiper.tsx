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
  from?: string;
}

const PlanCardSwiper: React.FC<PlanCardSwiperProps> = ({
  planCards,
  focusedEvent,
  onPlanSelected,
  style,
  from,
}) => {
  const carouselRef = useRef<ICarouselInstance>(null);

  useEffect(() => {
    if (planCards.length === 0) return;
    const carousel = carouselRef.current as ICarouselInstance;
    if (carousel && carouselRef.current?.getCurrentIndex() !== focusedEvent)
      carousel.scrollTo({ index: focusedEvent, animated: true });
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
          <PlanCard
            className="h-full w-full max-w-full"
            key={item.id}
            from={from}
            {...item}
          />
        )}
      />
    </View>
  );
};

export default PlanCardSwiper;

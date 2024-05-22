import { Dimensions } from 'react-native';

const PAGE_WIDTH = Dimensions.get('window').width;

export const planCardSwiperSettings = {
  vertical: false,
  width: PAGE_WIDTH,
  height: PAGE_WIDTH * 0.5,
  loop: false,
  autoplay: false,
  enableSnap: true,
  enableMomentum: true,
  swipeThreshold: 50,
  modeConfig: {
    parallaxScrollingScale: 0.9,
    parallaxScrollingOffset: 50,
  },
};

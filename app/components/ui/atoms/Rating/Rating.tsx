import { Rating as RNRating } from 'react-native-ratings';

const Rating = () => (
  <RNRating
    showRating
    style={{ paddingVertical: 10 }}
    type="star"
    ratingColor="yellow-500"
    ratingCount={3}
    imageSize={60}
    fractions={2}
  ></RNRating>
);

export default Rating;

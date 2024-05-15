import React from 'react';
import { Image as RNImage, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface IllustrationProps {
  variant: keyof typeof illustrations;
}

const illustrations = {
  auth: require(`../../../../assets/images/illustrations/auth.png`),
  explore: require(`../../../../assets/images/illustrations/explore.png`),
  festival: require(`../../../../assets/images/illustrations/festival.png`),
  'having-fun': require(`../../../../assets/images/illustrations/having-fun.png`),
  looking: require(`../../../../assets/images/illustrations/looking.png`),
  'new-year': require(`../../../../assets/images/illustrations/new-year.png`),
  party: require(`../../../../assets/images/illustrations/party.png`),
};

const Illustration: React.FC<IllustrationProps> = ({ variant }) => {
  return (
    <RNImage
      source={illustrations[variant]}
      className="max-w-full aspect-square self-center"
      resizeMode="contain"
      style={{ width: width * 0.6, height: width * 0.6 }}
    />
  );
};

export default Illustration;

import React from 'react';
import { Image as RNImage } from 'react-native';

interface ImageProps {
  source: string; //por ahora como links
  style?: any;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ source, style }) => {
  return (
    <RNImage
      source={{ uri: source }}
      className="max-w-full max-h-full"
      style={style}
      resizeMode="cover"
    />
  );
};

export default Image;

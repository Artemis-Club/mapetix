import React from 'react';
import { View } from 'react-native';
import Text from '../Text/Text';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
  style?: any;
}

const BoxComponent: React.FC<BoxProps> = ({ children, style }) => {
  return (
    <View
      className="border border-amber-500 p-4 py-3 rounded-2xl bg-yellow-900 bg-opacity-30"
      style={style}
    >
      <Text className="text-amber-200 text-center">{children}</Text>
    </View>
  );
};

export default BoxComponent;

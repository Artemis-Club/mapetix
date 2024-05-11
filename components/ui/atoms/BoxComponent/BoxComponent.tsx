import React from 'react';
import { View } from 'react-native';
import { Text } from '../Text';

interface BoxProps {
  children: React.ReactNode;
}

const BoxComponent: React.FC<BoxProps> = ({ children }) => {
  return (
    <View className="border-2 border-white p-4 rounded-lg">
      <View className="rounded-lg`backgroundColor: 'transparent'">
        <Text>{children}</Text>
      </View>
    </View>
  );
};

export default BoxComponent;

import React from 'react';
//@ts-ignore
import IconComponent from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icon as VectorIconsIconType } from '@expo/vector-icons/build/createIconSet';

type ExtractIconType<T> = T extends VectorIconsIconType<infer U, any>
  ? U
  : never;

export type MaterialIconType = ExtractIconType<typeof MaterialCommunityIcons>;

export interface IconProps {
  name: MaterialIconType;
  style?: object[];
  className?: string;
  onPress?: VoidFunction;
}

const Icon: React.FC<IconProps> = ({ style, name, onPress }) => {
  const defaultStyles = {
    fontSize: 24,
    color: 'white',
  };
  const parsedStyle = {
    ...defaultStyles,
    ...(style &&
      (style.flat(Infinity) as object[]).reduce((a, b) => ({ ...a, ...b }))),
  };

  return <IconComponent onPress={onPress} name={name} style={parsedStyle} />;
};

export default Icon;

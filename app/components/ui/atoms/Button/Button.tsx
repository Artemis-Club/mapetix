import React from 'react';
import { TouchableOpacity } from 'react-native';
import clsx from 'clsx';
import Text from '../Text/Text';
interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  stylish?: 'fill' | 'outline' | 'nav';
  block?: boolean;
  style?: any;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  stylish = 'fill',
  block = true,
  style,
}) => {
  const buttonStyles =
    stylish === 'fill' ? 'bg-amber-500' : 'border border-amber-500';
  const textStyles =
    stylish === 'fill' ? 'text-white font-black' : 'text-amber-500';
  return (
    <TouchableOpacity
      className={clsx(
        buttonStyles,
        block && 'self-stretch',
        'rounded-full py-2 px-6'
      )}
      onPress={onPress}
      style={style}
    >
      <Text
        bold={stylish === 'fill'}
        className={clsx(textStyles, 'text-base text-center')}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;

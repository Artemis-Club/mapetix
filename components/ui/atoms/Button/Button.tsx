import React from "react";
import { TouchableOpacity} from "react-native";
import {Text} from "../Text";
interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  stylish?: 'fill' | 'outline';
  style?: any;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, children, stylish = 'fill', style}) => {
  const buttonStyles = stylish === 'fill' ? 'bg-purple-500' : 'border border-purple-600';
  const textStyles = stylish === 'fill' ? 'text-orange-600' : 'text-orange-600';
  return (
    <TouchableOpacity
      className={buttonStyles} 
      onPress={onPress}
      style={style}>
      <Text className={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
};
export default Button;

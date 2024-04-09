import React from "react";
import { TouchableOpacity } from "react-native";
import clsx from "clsx";
import Text from "../Text/Text";
interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  stylish?: "fill" | "outline";
  style?: any;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  stylish = "fill",
  style,
}) => {
  const buttonStyles =
    stylish === "fill" ? "bg-purple-500" : "border border-purple-600";
  const textStyles = stylish === "fill" ? "text-white" : "text-orange-600";
  return (
    <TouchableOpacity className={clsx(buttonStyles, "self-center rounded-full p-2 px-4")} onPress={onPress} style={style}>
      <Text className={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
};
export default Button;

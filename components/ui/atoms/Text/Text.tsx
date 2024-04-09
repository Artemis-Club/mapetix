import React from "react";
import { Text as RNText } from "react-native";

interface TextProps {
  children: React.ReactNode;
  fit?: boolean;
  bold?: boolean;
  style?: any;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  fit,
  bold,
  style,
  className,
}) => {
  const textStyle = fit ? "font-thin" : bold ? "font-bold" : "font-regular";
  console.log(style);

  return (
    <RNText className={textStyle} style={style}>
      {children}
    </RNText>
  );
};

export default Text;

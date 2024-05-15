import clsx from 'clsx';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
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
  ...props
}) => {
  const textStyle = fit ? 'font-thin' : bold ? 'font-bold' : 'font-regular';
  return (
    <RNText className={clsx(textStyle, 'text-white')} style={style} {...props}>
      {children}
    </RNText>
  );
};

export default Text;

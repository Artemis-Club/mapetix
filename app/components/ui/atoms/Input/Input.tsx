import clsx from "clsx";

import { View, TextInput, TextInputProps, Text } from "react-native";

interface InputProps extends TextInputProps {
  helperText?: string | null;
  error?: boolean | null;
  disabled?: boolean;
  label?: string;
  className?: string;
  style?: object[];
}

const Input: React.FC<InputProps> = ({
  label,
  style,
  disabled,
  error,
  helperText,
  ...props
}) => {
  return (
    <View style={style}>
      {label && <Text className="text-neutral-500 mb-1 text-xs">{label}</Text>}
      <View
        className={clsx(
          "bg-neutral-700",
          disabled && "bg-background",
          "rounded-full",
          "border border-neutral-500",
          "focus:border-neutral-400",
          error && "border-danger",
          "flex-row items-center"
        )}
      >
        <TextInput
          className={clsx(
            "text-neutral-400",
            disabled && "text-gray-2",
            "py-3 px-4",
            "w-full"
          )}
          {...props}
        />
      </View>

      {helperText && (
        <Text
          className={clsx(
            "mt-1",
            "text-gray-2",
            "text-xs",
            error && "text-danger"
          )}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};

export default Input;

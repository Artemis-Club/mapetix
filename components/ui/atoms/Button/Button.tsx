import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <TouchableOpacity>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

import { useState, useEffect } from 'react';
import Text from '../../atoms/Text/Text';
import { Alert, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Animated from 'react-native-reanimated';

const Banana: React.FC<{}> = () => {
  const [x, setX] = useState(0);
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(({ x }) => setX(x)));
    Accelerometer.setUpdateInterval(50);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const onBananaPress = () => {
    Alert.alert(
      'Hola',
      'Soy el 🍌 de Artemis. Desde que cerraron el formulario para inscribirse en la codethon no sé donde alojarme. Perdonad por estar aqui. (Soy un easter egg)'
    );
  };

  return (
    <Animated.View
      className="absolute left-0 bottom-20 z-50"
      style={{ marginLeft: x * 10 - 4 }}
    >
      <TouchableOpacity onPress={onBananaPress}>
        <Text>🍌</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Banana;

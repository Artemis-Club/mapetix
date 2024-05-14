import { Button, Illustration, Text } from '@/components';
import { Link, useRouter } from 'expo-router';
import { Icon } from '@/components/ui/atoms/Icon';
import { View, Dimensions } from 'react-native';
import { BoxComponent } from '@/components';
import Carousel from 'react-native-reanimated-carousel';

const WIDTH = Dimensions.get('window').width;

export default function Auth() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-neutral-800 justify-center">
      <View className="flex-row justify-center">
        <Icon name="map-marker-path" size={40}></Icon>
        <Text bold className="text-5xl font-black mb-6 ml-1">
          Mapetix
        </Text>
      </View>
      <View style={{ height: WIDTH * 0.7 }}>
        <Carousel
          data={['having-fun', 'new-year', 'party', 'looking']}
          width={WIDTH}
          autoPlay
          autoPlayInterval={3000}
          scrollAnimationDuration={1000}
          renderItem={({ index, item }) => <Illustration variant={item} />}
        />
      </View>
      <View className="px-8 mb-2 items-center gap-y-2">
        <BoxComponent className="mb-3">
          ¡Muchas gracias por confiar en Mapetix!{'\n'}Hacemos todo lo posible
          por recomendar los mejores planazos para disfrutar de nuestro tiempo
          libre
        </BoxComponent>
        <Button onPress={() => router.push('/auth/login')} block={true}>
          Acceder
        </Button>
        <Button
          onPress={() => router.push('/auth/signup')}
          block={true}
          stylish="outline"
        >
          Crear cuenta
        </Button>
      </View>
    </View>
  );
}

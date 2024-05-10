import { Button, Text } from '@/components';
import { Link } from 'expo-router';
import { Icon } from '@/components/ui/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

export default function Auth() {
  return (
    <View className="flex-1 bg-neutral-800 pt-16">
      <View className="flex-row mt-16 justify-center">
        <Icon name="map-marker-path" size={40}></Icon>
        <Text className="text-5xl font-black mb-6 ml-1">Mapetix</Text>
      </View>
      <View className="flex-row mt-40 mb-2 justify-center">
        <Link className="text-white underline" href="/auth/login">
          Acceder
        </Link>
      </View>
      <View className="flex-row mb-32 justify-center">
        <Link className="text-white underline" href="/auth/signup">
          Crear cuenta
        </Link>
      </View>
      <View className="flex-row justify-center justify-items-center ml-10 mr-10">
        <Text style={'text-center'}>
          Muchas gracias por confiar en Mapetix hacemos todo lo posible por
          recomendar los mejores planazos para disfrutar de nuestro tiempo libre
        </Text>
      </View>
      <View className="flex-row justify-end mr-8">
        <Icon name="check-all"></Icon>
      </View>
      <View className="flex-row mt-20">
        <Text>Pronto podreis seguirnos en...</Text>
      </View>
      <View className="flex-row">
        <Icon name="facebook"></Icon>
        <Icon name="alpha-x-box"></Icon>
        <Icon name="instagram"></Icon>
      </View>
    </View>
  );
}

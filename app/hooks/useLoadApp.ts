import {
  useFonts,
  KumbhSans_100Thin,
  KumbhSans_400Regular,
  KumbhSans_800ExtraBold,
} from '@expo-google-fonts/kumbh-sans';

import { useEffect, useState } from 'react';
import { useRootNavigationState, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export const useLoadApp = () => {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [tokenChecked, setTokenChecked] = useState(false);

  const [loaded, error] = useFonts({
    KumbhSans_100Thin,
    KumbhSans_400Regular,
    KumbhSans_800ExtraBold,
  });

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token', token);
    router.push(token ? '/main/' : '/auth/');
    setTokenChecked(true);
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    !tokenChecked && navigationState.key && checkToken();
  }, [tokenChecked, navigationState]);

  return { loaded };
};

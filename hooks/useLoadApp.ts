import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { useRootNavigationState, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export const useLoadApp = () => {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [tokenChecked, setTokenChecked] = useState(false);

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    router.push(token ? "/main/" : "/auth/");
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

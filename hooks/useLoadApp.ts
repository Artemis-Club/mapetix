import { useEffect } from "react";
import {
  useFonts,
  KumbhSans_100Thin,
  KumbhSans_400Regular,
  KumbhSans_800ExtraBold,
} from "@expo-google-fonts/kumbh-sans";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const useLoadApp = () => {
  const [loaded, error] = useFonts({
    KumbhSans_100Thin,
    KumbhSans_400Regular,
    KumbhSans_800ExtraBold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return { loaded };
};

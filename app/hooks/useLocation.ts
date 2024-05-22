import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { mapSettings } from '@/config/map';

const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return {
    lat: location?.coords?.latitude || mapSettings.initialRegion.latitude,
    long: location?.coords?.longitude || mapSettings.initialRegion.longitude,
  };
};

export default useLocation;

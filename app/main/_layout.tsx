import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Drawer } from 'expo-router/drawer';
import { Button } from '@/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { View } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function TabLayout() {
  const padding = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <>
      <Drawer>
        <Drawer.Screen
          name="map"
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: 'orange',
          }}
        />
      </Drawer>
    </>
  );
}

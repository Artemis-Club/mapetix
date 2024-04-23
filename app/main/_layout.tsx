import React from 'react';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#404040' },
        headerShadowVisible: false,
      }}
    >
      <Drawer.Screen
        name="map"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: 'orange',
        }}
      />
      <Drawer.Screen name="my-plans" options={{ title: 'Mis planes' }} />
    </Drawer>
  );
}

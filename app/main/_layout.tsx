import React from 'react';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#404040' },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: '#f59e0b',
        drawerActiveTintColor: 'white',
        drawerStyle: { backgroundColor: '#404040' },
        drawerInactiveTintColor: '#aaa',
      }}
    >
      <Drawer.Screen name="map" options={{ title: 'Mapa' }} />
      <Drawer.Screen name="my-plans" options={{ title: 'Mis planes' }} />
      <Drawer.Screen name="generate" options={{ title: 'Generar Plan' }} />
      <Drawer.Screen name="logout" options={{ title: 'Cerrar Sesión' }} />
    </Drawer>
  );
}

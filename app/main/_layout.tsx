import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { DrawerContent } from '@react-navigation/drawer';
import { Banana } from '@/components';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => (
        <>
          <DrawerContent {...props} />
          <Banana />
        </>
      )}
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#404040' },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: '#f59e0b',
        drawerActiveTintColor: 'white',
        drawerStyle: {
          backgroundColor: '#404040',
        },
        drawerContentContainerStyle: { flex: 1 },
        drawerInactiveTintColor: '#aaa',
      }}
    >
      <Drawer.Screen name="map" options={{ title: 'Mapa' }} />
      <Drawer.Screen name="my-plans" options={{ title: 'Mis planes' }} />
      <Drawer.Screen name="generate" options={{ title: 'Generar Plan' }} />
      <Drawer.Screen
        name="logout"
        options={{
          title: 'Cerrar Sesión',
          drawerItemStyle: { marginTop: 'auto', marginBottom: 16 },
        }}
      />
    </Drawer>
  );
}

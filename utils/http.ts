import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = process.env.EXPO_PUBLIC_SB_API_REST_URL || '';
const apiKey = process.env.EXPO_PUBLIC_SB_API_KEY || '';

export const baseQuery = fetchBaseQuery({ baseUrl: apiUrl });

export const authBaseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: async (headers) => {
    headers.set('apiKey', apiKey);
    const jwtToken = await AsyncStorage.getItem('token');
    if (jwtToken) {
      headers.set('Authorization', `Bearer ${jwtToken}`);
    }
    return headers;
  },
});

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseApiUrl = process.env.EXPO_PUBLIC_SB_API_REST_URL || '';
const supabaseApiKey = process.env.EXPO_PUBLIC_SB_API_KEY || '';
const apiUrl = process.env.EXPO_PUBLIC_API_URL || '';

export const baseQuery = fetchBaseQuery({ baseUrl: supabaseApiUrl });

export const authBaseQuery = fetchBaseQuery({
  baseUrl: supabaseApiUrl,
  prepareHeaders: async (headers) => {
    headers.set('apiKey', supabaseApiKey);
    const jwtToken = await AsyncStorage.getItem('token');
    if (jwtToken) {
      headers.set('Authorization', `Bearer ${jwtToken}`);
    }
    return headers;
  },
});

export const authApiQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: async (headers) => {
    const jwtToken = await AsyncStorage.getItem('token');
    if (jwtToken) {
      headers.set('Authorization', `${jwtToken}`);
    }
    return headers;
  },
});

import { useLoginMutation, useSignUpMutation } from '@/api/auth';
import { AuthPayload } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const useAuth = () => {
  const [signupRequest] = useSignUpMutation();
  const [loginRequest] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const login = async (payload: AuthPayload) => {
    const response = await loginRequest(payload);
    if (response.error) return setError(response.error);

    await AsyncStorage.setItem('token', response.data?.access_token);
    router.push('/main/');
  };

  const signup = async (payload: AuthPayload) => {
    setError(null);
    const response = await signupRequest(payload);
    if (response.error) return setError(response.error);

    await AsyncStorage.setItem('token', response.data?.access_token);
    router.push('/main/');
  };

  const logout = async () => {
    setError(null);
    await AsyncStorage.removeItem('token');
    router.push('/auth/');
  };

  return { login, signup, logout, error };
};

export default useAuth;

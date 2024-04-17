import { useLoginMutation, useSignUpMutation } from "@/api/auth";
import { AuthPayload } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const useAuth = () => {
  const [signupRequest] = useSignUpMutation();
  const [loginRequest] = useLoginMutation();

  const router = useRouter();

  const login = async (payload: AuthPayload) => {
    const response = await loginRequest(payload);
    if (response.error) return;

    await AsyncStorage.setItem("token", response.data?.access_token);
    router.push("/main/");
  };

  const signup = async (payload: AuthPayload) => {
    const response = await signupRequest(payload);
    if (response.error) return;

    await AsyncStorage.setItem("token", response.data?.access_token);
    router.push("/main/");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    router.push("/auth/");
  };

  return { login, signup, logout };
};

export default useAuth;

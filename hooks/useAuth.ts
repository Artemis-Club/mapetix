import { useLoginMutation, useSignUpMutation } from "@/api/auth";
import { AuthPayload } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const useAuth = () => {
  const [signup] = useSignUpMutation();
  const [login] = useLoginMutation();
  const router = useRouter();

  const onLogin = async (payload: AuthPayload) => {
    const response = await login(payload);
    if (response.error) return;

    await AsyncStorage.setItem("token", response.data?.access_token);
    router.push("/main/");
  };

  const onSignup = async (payload: AuthPayload) => {
    const response = await signup(payload);
    if (response.error) return;

    await AsyncStorage.setItem("token", response.data?.access_token);
    router.push("/main/");
  };

  return { onLogin, onSignup };
};

export default useAuth;

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xvmcmtlooajfhaowlcjc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bWNtdGxvb2FqZmhhb3dsY2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDAxMjQsImV4cCI6MjAyNjAxNjEyNH0.Ry53_urbPY13AKtiwejVwJYHsxZn8P42xwJTnK6PDrY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
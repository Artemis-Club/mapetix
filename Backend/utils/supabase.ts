import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kuutjjaknhwnlijjacqt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1dXRqamFrbmh3bmxpamphY3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNDU5ODUsImV4cCI6MjAyNTcyMTk4NX0.ohRmkp2VHIx5SuaLadNyyDOs9xlqzwRw7pfv_cSVUKE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
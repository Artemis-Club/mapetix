import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kuutjjaknhwnlijjacqt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1dXRqamFrbmh3bmxpamphY3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNDU5ODUsImV4cCI6MjAyNTcyMTk4NX0.ohRmkp2VHIx5SuaLadNyyDOs9xlqzwRw7pfv_cSVUKE';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
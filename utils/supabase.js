import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants';

const supabaseUrl = 'https://fqjzqxssjzwunoznyhrw.supabase.co'
const supabaseKey = Constants.expoConfig?.extra?.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
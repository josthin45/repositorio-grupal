import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vecxhzkwwljcyaltsqpi.supabase.co'
const SUPABASE_KEY = 'sb_publishable_4VlzEYSilkCadwxyfjlfYw_NX8R5lQn'

let supabaseInstance: SupabaseClient | null = null;

export const initSupabase = (accessToken: string) => {
  supabaseInstance = createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
  return supabaseInstance;
};

export const getSupabase = () => supabaseInstance;

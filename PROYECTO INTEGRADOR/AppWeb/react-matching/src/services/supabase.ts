import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vecxhzkwwljcyaltsqpi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_4VlzEYSilkCadwxyfjlfYw_NX8R5lQn';

export const createSupabaseClient = (accessToken: string): SupabaseClient => {
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
};

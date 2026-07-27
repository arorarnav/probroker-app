import { createClient } from '@supabase/supabase-js';

// This file is the single connection point to Supabase.
// Every page that needs auth or database access imports `supabase` from here.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

import { createClient } from '@supabase/supabase-js'

// These values come from your Supabase project settings.
// See SETUP_INSTRUCTIONS.md for how to find them.
// They are safe to be public — Supabase Row Level Security protects the data.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. ' +
    'See SETUP_INSTRUCTIONS.md for details.'
  )
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

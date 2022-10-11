import { createClient } from '@supabase/supabase-js'

// /auth/v1
// /token
// '?grant_type=password'
// '&redirect_to=' + encodeURIComponent(options.redirectTo)
const {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY,
} = process.env as Record<string, string>

export const anonClient = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const serviceRoleClient = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
)

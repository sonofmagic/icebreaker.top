import { supabase } from '@/supabase'

export function useSupabaseClient() {
  return supabase
}

// export function useSupabaseUser() {
//   return supabase.auth.user()
// }

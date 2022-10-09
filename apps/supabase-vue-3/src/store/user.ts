import { defineStore, storeToRefs } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/supabase'
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null | undefined>(supabase.auth.user())
  const isLogin = computed(() => Boolean(user.value))
  supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user
  })
  return {
    user,
    isLogin
  }
})

export const useUserStoreRefs = () => {
  return storeToRefs(useUserStore())
}

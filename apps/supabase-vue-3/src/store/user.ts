import { defineStore, storeToRefs } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/supabase'
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null | undefined>()
  const isLogin = computed(() => Boolean(user.value))

  supabase.auth.getSession().then(({ data }) => {
    user.value = data.session?.user
  })

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event)
    // if(event === 'SIGNED_IN'){

    // }

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

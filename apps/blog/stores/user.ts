import { acceptHMRUpdate, defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
  const user = useSupabaseUser()
  return {
    user
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

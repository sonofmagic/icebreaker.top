import { defineStore } from 'pinia'

interface UserInfo {
  username: string
  [prop: string]: any
}

interface UserState {
  user: UserInfo | null
}

export const useUserStore = defineStore({
  id: 'user',
  state(): UserState {
    return {
      user: null,
    }
  },
  getters: {
    isLogin: (state: UserState) => state.user,
  },
  actions: {},
})

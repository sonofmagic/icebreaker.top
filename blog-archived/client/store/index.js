// import ClientOnly from '@/storePlugins/client-only'
// import getArticle from '@/utils/getArticle'
// import createPersistedState from 'vuex-persistedstate'
import { LocalStorageKey } from '@/enum/user'
export const state = () => {
  // let theme = 'light'
  // if (process.client) {
  //   theme = localStorage.getItem(LocalStorageKey.ThemeMode) || 'dark'
  // }
  return {
    // counter: 0,
    hrefs: [],
    theme: 'dark',
  }
}

export const plugins = [
  // (store) => {
  //   if (process.client) {
  //     const theme = localStorage.getItem(LocalStorageKey.ThemeMode) || 'dark'
  //     console.log(theme, localStorage.getItem(LocalStorageKey.ThemeMode))
  //     store.commit('set_theme', theme)
  //   }
  // },
] // [ClientOnly]

export const mutations = {
  set_hrefs(state, { items }) {
    state.hrefs = items
  },
  set_theme(state, theme) {
    state.theme = theme
    localStorage.setItem(LocalStorageKey.ThemeMode, theme)
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { $content }) {
    const hrefs = await $content('/', {
      deep: true,
    })
      .only(['id', 'title', 'description', 'tags', 'path'])
      .fetch()
    // console.log(hrefs)
    commit('set_hrefs', { items: hrefs })
  },
}

export const getters = {
  theme(state) {
    return state.theme
  },
}

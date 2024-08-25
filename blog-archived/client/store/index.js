import { LocalStorageKey } from '@/enum/user'

export function state() {
  return {
    // counter: 0,
    hrefs: [],
    theme: 'dark',
  }
}

export const plugins = [

]

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

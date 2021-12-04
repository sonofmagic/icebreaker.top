// import ClientOnly from '@/storePlugins/client-only'
// import getArticle from '@/utils/getArticle'
// import createPersistedState from 'vuex-persistedstate'
export const state = () => {
  // let theme = 'light'
  // if (process.client) {
  //   if (!localStorage.theme && !localStorage.seted_theme) {
  //     localStorage.theme = 'dark'
  //     localStorage.seted_theme = 1
  //   }

  //   theme = localStorage.getItem('theme')
  // }
  return {
    // counter: 0,
    hrefs: [],
    // theme,
  }
}

export const plugins = [] // [ClientOnly]

export const mutations = {
  set_hrefs(state, { items }) {
    state.hrefs = items
  },
  set_theme(state, theme) {
    state.theme = theme
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

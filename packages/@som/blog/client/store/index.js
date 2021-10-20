// import ClientOnly from '@/storePlugins/client-only'
// import getArticle from '@/utils/getArticle'
export const state = () => ({
  // counter: 0,
  hrefs: [],
  theme: 'light',
})

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

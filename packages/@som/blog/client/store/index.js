// import ClientOnly from '@/storePlugins/client-only'
import getArticle from '@/utils/getArticle'
export const state = () => ({
  // counter: 0,
  hrefs: [],
})

export const plugins = [] // [ClientOnly]

export const mutations = {
  set_hrefs(state, { items }) {
    state.hrefs = items
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const hrefs = await getArticle()
    // console.log(hrefs)
    commit('set_hrefs', { items: hrefs })
  },
}

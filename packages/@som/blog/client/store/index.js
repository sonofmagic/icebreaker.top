import ClientOnly from '@/storePlugins/client-only'

export const state = () => ({
  // counter: 0,
})

export const plugins = [ClientOnly]

export const mutations = {
  // increment(state) {
  //   state.counter++
  // },
}

export const actions = {
  nuxtServerInit() {},
}

export const state = () => {
  return {
    wsTempData: null,
  }
}

export const mutations = {
  SET_WSTEMPDATA(state, payload) {
    state.wsTempData = payload
  },
}

export const actions = {
  setWsTempData({ commit }, payload) {
    commit('SET_WSTEMPDATA', payload)
  },
}

export const getters = {
  wsTempData: (state) => state.wsTempData,
}

export function state() {
  return {
    isMobile: false,
  }
}

export const mutations = {
  SET_ISMOBILE(state, value) {
    state.isMobile = value
  },
}

export const actions = {
  setIsMobile({ commit }, payload) {
    commit('SET_ISMOBILE', payload)
  },
}

export const getters = {
  isMobile: state => state.isMobile,
}

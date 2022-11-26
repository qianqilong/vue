export const countOptions = {
  namespaced: true,
  actions: {
    add(context, value) {
      context.commit('ADD', value)
    },
  },
  mutations: {
    ADD(state, value) {
      state.sum += value
    },
  },
  state: {
    sum: 0,
  },
  getters: {
    sumString(state) {
      return state.sum + '0'
    },
  },
}

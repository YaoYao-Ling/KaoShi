import { added } from "@/api/added"
const state = {
  data: []
}
const mutations = {
  fn: (state, payload) => {
    state.data = payload
  }
}

const actions = {
  async sj({ commit }, payload) {
    let res = await added(payload)
    commit('fn', res.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
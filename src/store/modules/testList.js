import { testList } from "@/api/testList"
const state = {
  list: []
}
const mutations = {
  fn: (state, payload) => {
    state.list = payload;
    console.log(state.list)
  }
}

const actions = {
  async list({ commit }) {
    let res = await testList()
    commit('fn', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
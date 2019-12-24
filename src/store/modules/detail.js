import { del } from "@/api/del"
const state = {
  one: []
}
const mutations = {
  fn: (state, payload) => {
    state.one = payload;
  }
}
const actions = {
  async detailFunc({ commit }) {
    let res = await del()
    // console.log(res)
    commit('fn', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
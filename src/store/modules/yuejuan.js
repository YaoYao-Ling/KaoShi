import { yueJuanList } from '@/api/yuejuan';
const state = {
    yueJuanList: []
}

const mutations = {
    yuejuan(state, payload) {
        state.yueJuanList = payload
    }
}

const actions = {
    async getList({ commit }, payload) {
        let res = await yueJuanList();
        console.log(res);
        commit('yuejuan', res.exam)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
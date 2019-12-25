
import {userListAll} from '@/api/user.js'

const state = {
    userDisplay:[], //用户展示
}


const mutations = {
    // 用户展示
    getUserDisplay(state,payload){
        state.userDisplay = payload
    }
}
  
  const actions = {
      // 用户展示
     async getUserDisplayList({ commit }, payload){
          let res = await userListAll()
          console.log(res.data)
          commit('getUserDisplay',res.data)
     }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  
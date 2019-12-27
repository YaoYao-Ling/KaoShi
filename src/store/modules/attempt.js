import {getPrivileges, getUserIdentity, getApiType, getUserList} from '@/api/table';

const state = {
    data:[],
    UserList:[],
    apiList:[],
    getUserListall:[]
}


const mutations = {
    getList(state,payload){
        state.data = payload
    },
    // 获取身份id
    UserBean(state,payload){
        state.UserList = payload
    },
    // 获取api接口权限数据
    getApi(state,payload){
        state.apiList = payload
    },
    // 获取用户数据
    getUser(state,payload){
        state.getUserListall = payload
    }
  }
  
  const actions = {
    async changeSetting({ commit }, payload) {
       
       let res = await getPrivileges()
       commit('getList',res.data)
       
    },
    async getUserBean({ commit }, payload){
        let res = await getUserIdentity()
        commit('UserBean',res.data)
    },
    async getApiList({ commit }, payload){
        let res = await getApiType()
        commit('getApi',res.data)
    },
    async getUserNameList({ commit }, payload){
        let res = await getUserList()
        console.log(res.data)
        commit('getUser',res.data)
    },
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  
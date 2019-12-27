import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userList:[]    //用户数据
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    userStatsURI(state,payload) {
        state.userList = payload
    }
}

const actions = {
    // user login
    async login({ commit }, userInfo) {
        const { username, password } = userInfo
        let res = await login({ user_name: username.trim(), user_pwd: password })
        commit('SET_TOKEN', res.token)
        setToken(res.token)
            // return new Promise((resolve, reject) => {
            //     login({ user_name: username.trim(), user_pwd: password }).then(response => {
            //         const { data } = response
            //         commit('SET_TOKEN', data.token)
            //         setToken(data.token)
            //         resolve()
            //     }).catch(error => {
            //         reject(error)
            //     })
            // })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            // getInfo(state.token).then(response => {
            //     const { data } = response

            //     if (!data) {
            //         reject('Verification failed, please Login again.')
            //     }

            //     const { name, avatar } = data

            //     commit('SET_NAME', name)
            //     commit('SET_AVATAR', avatar)
            //     resolve(data)
            // }).catch(error => {
            //     reject(error)
            // })
            resolve()
            const roles = ['admin']
            commit('SET_ROLES', roles)
            resolve({roles});
            
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  // 获取用户数据
  getUserList(state,payload){
    
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
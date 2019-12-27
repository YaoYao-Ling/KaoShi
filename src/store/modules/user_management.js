import {
    userInfo,
    userNew,
    userUser,
    userIdentity,
    userApi_authority,
    userIdentity_view_authority_relation,
    user_view_authority,
    user_identity_api_authority_relation,
    user,
    updateUser,
    user_identity_edit,
    user_authorityApi_edit,
    user_authorityView_edit,
    user_setIdentityApi,
    user_setIdentityView
} from '@/api/user_management'

const state = {
    // 当前用户信息对象
    userObj: {},
    // 根据用户id，返回该用户的视图权限
    userNewList: [],
    // 展示用户数据
    userUserList: [], 
    // 展示身份数据
    userIdentityList: [], 
    // 展示api接口权限数据
    userApi_authority_list: [],
    // 展示身份和视图权限关系
    userIdentity_view_authority_relation_list: [],
    // 获取视图权限数据
    user_view_authority_list: [],
    // 身份和api接口关系
    user_identity_api_authority_relation_list: [],
    // 添加身份的状态
    user_identity_edit_status: false,
    // 更新 添加用户信息(用户名，用户密码，用户身份)的状态
    update_user_status: false,
    // 添加用户信息(用户名，用户密码，用户身份)的状态 
    update_add_user_status: false,
    // 添加api接口权限的状态
    user_authorityApi_edit_status: false,
    // 给身份设定api接口权限的状态
    user_setIdentityApi_status: false,
    // 给身份设定视图权限的状态
    user_setIdentityView_status: false,
}

const mutations = {
    // 更新获取当前用户信息
    updateUserInfo(state, payload) {
        // console.log(payload)
        state.userObj = payload
    },
    // 更新 根据用户id，返回该用户的视图权限
    updateUserNew(state, payload) {
        // console.log(payload)
        state.userNewList = payload
    },
    // 更新 展示用户数据
    updateUserUser(state, payload) {
        // console.log(payload)
        state.userUserList = payload
    },
    // 更新 展示身份数据
    updateUserIdentity(state, payload) {
        // console.log(payload)
        state.userIdentityList = payload
    },
    // 更新 展示api接口权限数据
    updateuserApi_authority(state, payload) {
        // console.log(payload)
        state.userApi_authority_list = payload
    },
    // 更新 展示身份和视图权限关系
    updateUserIdentity_view_authority_relation(state, payload) {
        // console.log(payload)
        state.userIdentity_view_authority_relation_list = payload
    },
    // 更新 获取视图权限数据
    update_user_view_authority(state, payload) {
        // console.log(payload)
        state.user_view_authority_list = payload
    },
    // 更新 身份和api接口关系
    update_user_identity_api_authority_relation(state, payload) {
        // console.log(payload)
        state.user_identity_api_authority_relation_list = payload
    },
    // 更新 添加身份的状态
    update_user_identity_edit(state, payload) {
        state.user_identity_edit_status = payload
    },
    // 更新 用户信息(用户名，用户密码，用户身份)的状态
    update_user(state, payload) {
        state.update_user_status = payload
    },
    // 更新 添加用户的状态
    update_add_user(state, payload) {
        state.update_add_user_status = payload
    },
    // 更新 添加api接口权限的状态
    update_user_authorityApi_edit(state, payload) {
        state.user_authorityApi_edit_status = payload
    },
    // 更新 给身份设定api接口权限
    update_user_setIdentityApi(state, payload) {
        state.user_setIdentityApi_status = payload
    },
    // 更新 给身份设定视图权限
    update_user_setIdentityView(state, payload) {
        console.log(payload)
        state.user_setIdentityView_status = payload
    },
}

const actions = {
    // 获取当前用户信息
    async userInfo({ commit }) {
        const res = await userInfo()
        if (res.code ===1) {
            // 触发 更新获取当前用户信息
            commit('updateUserInfo', res.data)
        }
    },
    // 根据用户id，返回该用户的视图权限
    async userNew({ commit }, payload) {
        const res = await userNew(payload) 
        if (res.code === 1) {
            // 触发 更新根据用户id，返回该用户的视图权限
            commit('updateUserNew', res.data)
        }
    },
    // 展示用户数据
    async userUser({ commit }) {
        const res = await userUser()
        if (res.code ===1) {
            // 触发 更新展示用户数据
            commit('updateUserUser', res.data)
        }
    },
    // 展示身份数据
    async userIdentity({ commit }) {
        const res = await userIdentity()
        if (res.code ===1) {
            // 触发 展示身份数据
            commit('updateUserIdentity', res.data)
        }
    },
    // 展示api接口权限数据
    async userApi_authority({ commit }) {
        const res = await userApi_authority()
        if (res.code ===1) {
            // 触发 展示api接口权限数据
            commit('updateuserApi_authority', res.data)
        }
    },
    // 展示身份和视图权限关系
    async userIdentity_view_authority_relation({ commit }) {
        const res = await userIdentity_view_authority_relation()
        if (res.code ===1) {
            // 触发 更新展示身份和视图权限关系
            commit('updateUserIdentity_view_authority_relation', res.data)
        }
    },
    // 获取视图权限数据
    async user_view_authority({ commit }) {
        const res = await user_view_authority()
        if (res.code ===1) {
            // 触发 更新获取视图权限数据
            commit('update_user_view_authority', res.data)
        }
    },
    // 身份和api接口关系
    async user_identity_api_authority_relation({ commit }) {
        const res = await user_identity_api_authority_relation()
        commit('update_user_identity_api_authority_relation', res.data)
    },
    // 添加用户
    async user({ commit }, params) {
        const res = await user(params) 
        if (res.code === 1) {
            commit('update_add_user', true)
        } else {
            commit('update_add_user', false)
        }
    },
    // 更新用户信息(用户名，用户密码，用户身份)
    async updateUser({ commit }, params) {
        const res = await updateUser(params) 
        if (res.code === 1) {
            commit('update_user', true)
        } else {
            commit('update_user', false)
        }
    },
    // 添加身份
    async user_identity_edit({ commit }, params) {
        const res = await user_identity_edit(params) 
        if (res.code === 1) {
            commit('update_user_identity_edit', true)
        } else {
            commit('update_user_identity_edit', false)
        }
    },
    // 添加api接口权限
    async user_authorityApi_edit({ commit }, params) {
        const res = await user_authorityApi_edit(params) 
        if (res.code === 1) {
            commit('update_user_authorityApi_edit', true)
        } else {
            commit('update_user_authorityApi_edit', false)
        }
    },
    // 添加视图权限
    async user_authorityView_edit({ commit }, params) {
        await user_authorityView_edit(params) 
    },
    // 给身份设定api接口权限
    async user_setIdentityApi({ commit }, params) {
        const res = await user_setIdentityApi(params) 
        if (res.code === 1) {
            commit('update_user_setIdentityApi', true)
        } else {
            commit('update_user_setIdentityApi', false)
        }
    },
    // 给身份设定视图权限
    async user_setIdentityView({ commit }, params) {
        const res = await user_setIdentityView(params) 
        console.log('res-----------',res)
        if (res.code === 1) {
            commit('update_user_setIdentityView', true)
        } else {
            commit('update_user_setIdentityView', false)
        }
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
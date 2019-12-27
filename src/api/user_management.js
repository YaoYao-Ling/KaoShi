import request from '@/utils/request' 

// 获取当前用户信息
export function userInfo() {
    return request({
        url: '/user/userInfo',
        method: 'get'
    })
}

// 根据用户id，返回该用户的视图权限
export function userNew(params) {
    return request({
        url: '/user/new',
        method: 'get',
        params: { user_id: params }
    })
}

// 展示用户数据
export function userUser() {
    return request({
        url: '/user/user',
        method: 'get'
    })
}

// 展示身份数据
export function userIdentity() {
    return request({
        url: '/user/identity',
        method: 'get'
    })
}

// 展示api接口权限数据
export function userApi_authority() {
    return request({
        url: '/user/api_authority',
        method: 'get'
    })
}

// 展示身份和视图权限关系
export function userIdentity_view_authority_relation() {
    return request({
        url: '/user/identity_view_authority_relation',
        method: 'get'
    })
}

// 获取视图权限数据
export function user_view_authority() {
    return request({
        url: '/user/view_authority',
        method: 'get'
    })
}

// 身份和api接口关系
export function user_identity_api_authority_relation() {
    return request({
        url: '/user/identity_api_authority_relation',
        method: 'get'
    })
}

// 添加用户
export function user(params) {
    return request({
        url: '/user',
        method: 'post',
        data: { ...params }
    })
}

// 更新用户信息(用户名，用户密码，用户身份)
export function updateUser(params) {
    return request({
        url: '/user/user',
        method: 'put',
        data: { ...params }
    })
}

// 添加身份
export function user_identity_edit(params) {
    return request({
        url: '/user/identity/edit',
        method: 'get',
        params: { identity_text: params }
    })
}

// 添加api接口权限
export function user_authorityApi_edit(params) {
    return request({
        url: '/user/authorityApi/edit',
        method: 'get',
        params: { ...params }
    })
}

// 添加视图权限
export function user_authorityView_edit(params) {
    return request({
        url: '/user/authorityView/edit',
        method: 'get',
        params: { ...params }
    })
}

// 给身份设定api接口权限
export function user_setIdentityApi(params) {
    return request({
        url: '/user/setIdentityApi',
        method: 'POST',
        data: { ...params }
    })
}

// 给身份设定视图权限
export function user_setIdentityView(params) {
    // console.log('params---------', params)
    return request({
        url: '/user/setIdentityView',
        method: 'POST',
        data: { ...params }
    })
}

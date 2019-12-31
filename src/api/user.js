import request from '@/utils/request'


export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}
// 展示用户数据
export function userListAll() {
    return request({
        url: '/user/user',
        method: 'get'
    })
}


export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
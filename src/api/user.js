import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
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
//获取班级管理数据-----------------------------
export function classList() {
    return request({
        url: '/manger/grade',
        method: 'get'
    })
}
//获取教室管理数据------------------------------
export function roomList() {
    return request({
        url: '/manger/room',
        method: 'get'
    })
}
//获取学生管理数据------------------------------
export function studentList() {
    return request({
        url: '/manger/student',
        method: 'get'
    })
}
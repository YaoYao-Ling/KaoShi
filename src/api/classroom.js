import request from '@/utils/request'

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
//删除班级-------------------------------------
export function delectClass(id) {
    return request({
        url: '/manger/grade/delete',
        method: 'DELETE',
        data: { grade_id: id }
    })
}
//删除教室--------------------------------------
export function deleRoom(id) {
    return request({
        url: '/manger/room/delete',
        method: 'DELETE',
        data: { room_id: id }
    })
}
//删除学生-------------------------------------
export function delectStudent(id) {
    return request({
        url: `/manger/student/${id}`,
        method: 'delete'
    })
}
//添加班级----------------------------------------
export function addClass(obj) {
    console.log(obj)
    return request({
        url: '/manger/grade',
        method: 'POST',
        data: { subject_id: obj.subject, room_id: obj.room, grade_name: obj.name }
    })
}
//编辑班级-----------------------------------------
export function updataClass(grade_id, obj) {
    return request({
        url: '/manger/grade/update',
        method: 'PUT',
        data: { grade_id, grade_name: obj.name, subject_id: obj.subject, room_id: obj.room }
    })
}
//添加教室---------------------------------------------
export function addRoom(num) {
    return request({
        url: '/manger/room',
        method: 'POST',
        data: { room_text: num }
    })
}
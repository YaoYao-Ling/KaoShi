import request from '@/utils/request'

//获取阅卷管理数据-----------------------------
export function yueJuanList() {
    return request({
        url: '/exam/student',
        method: 'get'
    })
}
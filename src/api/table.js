import request from '@/utils/request'

// 添加用户
export function addList(data) {
  return request({
    url: '/user',
    method: 'post',
    data:{user_name: data.userName,
      user_pwd: data.userPwd,
      identity_id: data.valueId}
  })
}

//获取身份id
export function addIdentity() {
  return request({
    url: '/user/user',
    method: 'get'
  })
}
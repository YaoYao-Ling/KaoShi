import request from '@/utils/request'
// 获取用户数据
export function getUserList() {
  return request({
    url: '/user/user',
    method: 'get'
  })
}
// 添加用户
export function addList(data) {
  return request({
    url: '/user',
    method: 'post',
    data: { user_name: data.userName, user_pwd: data.userPwd, identity_id: data.valueId }
  })
}

 //获取身份id
export function addIdentity() {
  return request({
    url: '/user/user',
    method: 'get'
  })
}


// 更新用户信息
export function upDataUser(data) {
  return request({
    url: '/user/user',
    method: 'put',
    data: { user_id: data.dataUserId, user_name: data.dataName, user_pwd: data.dataPwd, identity_id: data.identityId }
  })
}


// 添加身份
export function addIdentityType(type) {
  return request({
    url: `/user/identity/edit?identity_text=${type}`,
    method: 'get'
  })
}

// 添加api接口权限
export function addApiType(data) {
  return request({
    url: '/user/authorityApi/edit',
    method: 'get',
    params:{api_authority_text: data.apiName, api_authority_url: data.apiUrl, api_authority_method: data.apitype}
  })
}
// 获取视图权限数据

export function getPrivileges() {
  return request({
    url: '/user/view_authority',
    method: 'get'
  })
}
// 添加视图权限
export function addPrivileges(item) {
  return request({
    url: '/user/authorityView/edit',
    method: 'get',
    params:{view_authority_text: item.view_authority_text, view_id: item.view_id}
  })
}

// 获取身份id
export function getUserIdentity() {
  return request({
    url: '/user/identity',
    method: 'get'
  })
}
// 获取api接口权限数据
export function getApiType() {
  return request({
    url: '/user/api_authority',
    method: 'get'
  })
}
//  给身份设定api接口权限
export function setApiType(item,val) {
  return request({
    url: '/user/setIdentityApi',
    method: 'post',
    data:{identity_id: item.identity_id,api_authority_id: val.api_authority_id}
  })
}

// 给身份设置视图权限

export function setPrivilegesType(item,val) {
  return request({
    url: '/user/setIdentityView',
    method: 'post',
    data:{identity_id: item.identity_id,view_authority_id: val.view_authority_id}
  })
}
import request from '@/utils/request'

export function del() {
  let token = localStorage.getItem("token")
  
  return request.get('/exam/exam/gh1ye3-0i6opd')
}


import request from '@/utils/request'

export function added(canshu) {
  return request.post('/exam/exam', canshu)
}


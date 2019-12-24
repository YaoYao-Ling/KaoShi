import request from '@/utils/request'

export function testList() {
  return request.get('/exam/exam')
}


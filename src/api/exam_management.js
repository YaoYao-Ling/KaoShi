import request from '@/utils/request'

// 获取考试类型
export function exam_examType() {
  return request({
    url: '/exam/examType',
    method: 'get'
  })
}

// 获取所有的课程 
export function exam_subject() {
  return request({
    url: '/exam/subject',
    method: 'get'
  })
}

// 创建试卷接口
export function exam_exam(params) {
  return request({
    url: '/exam/exam',
    method: 'post',
    data: { ...params }
  })
}

// 更新试卷接口
export function update_exam(params) {
  return request({
      url: '/exam/exam/k0kq5-u9rx9f',
      method: 'put',
      data: { ...params }
  })
}

// 获取试卷列表接口
export function get_exam() {
  return request({
      url: '/exam/exam',
      method: 'get'
  })
}
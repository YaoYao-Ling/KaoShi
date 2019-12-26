// 考试试卷管理

import request from '@/utils/request'

//获取所有的考试类型 
export function getexamType() {
  return request({
    url: '/exam/examType',
    method: 'get'
  })
}
// 获取所有的课程
export function getSubject() {
  return request({
    url: '/exam/subject',
    method: 'get'
  })
}

// 创建试卷接口
export function addExaminationPaperManagement(payload) {
  return request({
    url: '/exam/exam',
    method: 'post',
    data:payload
  })
}


//  更新试卷接口
// export const updateExaminationPaperManagement = (params) => request.put('/exam/exam/w5tcy-g2dts', { question_ids:params.question_ids})
//["d5osduj-krhc1-akr9l2-9tz2nz","40lhum-rtymrz-r8x2h-6c9od","in5k9-nqedo7-cjpek-30cmi"]
export const updateExaminationPaperManagement = (params) => {
  const question_ids = JSON.stringify(params)
  return request({
    url: '/exam/exam/q039nsj-d2h053',
    method: 'put',
    data: { question_ids: JSON.stringify(params) }
  })
}

//  获取试卷列表接口
export const getExaminationPaperManagement = (params) => request.get('/exam/exam', { params })


//  获取试卷详情（教师端）接口
export const getExaminationPaperManagementTeacher = () => request.get('/exam/exam/w5tcy-g2dts')

//  删除接口
export const deleteExaminationPaperManagementTeacher = () => request.delete('/exam/exam/w5tcy-g2dts')


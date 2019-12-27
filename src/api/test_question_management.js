import request from '@/utils/request'

// 获取所有考试的类型
export function getTestType(params) {
    return request({
        url: '/exam/examType',
        method: 'get',
        params
    })
}

// 获取所有的课程
export function getCourse() {
    return request({
        url: '/exam/subject',
        method: 'get',
    })
}

// 获取所有的试题类型
export function getQuestionsType() {
    return request({
        url: '/exam/getQuestionsType',
        method: 'get',
    })
}

// 添加试题接口
export function questions(params) {
    return request.post('/exam/questions', { ...params })
}

// 添加试题类型
export function insertQuestionsType(params) {
    return request.get('/exam/insertQuestionsType', { params })
}

// 删除指定的试题类型
export function delQuestionsType(params) {
    return request.post('/exam/delQuestionsType', { id: params })
} 

// 按条件获取试题 
export function questionsCondition(params) {
    if (params && Object.keys(params).length) {
        const { questions_id } = params
        return request.get('/exam/questions/condition', { params: {questions_id} })
    }
    return request.get('/exam/questions/condition')
}

// 更新试题
export function questionsUpdate(params) {
    return request({
        url: '/exam/questions/update',
        method: 'put',
        data: { ...params }
    })
}


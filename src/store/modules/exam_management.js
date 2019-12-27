import {
    exam_examType,
    exam_subject,
    exam_exam,
    update_exam,
    get_exam
} from '@/api/exam_management'

const state = {
    // 获取考试类型
    exam_examType_list: [],
    // 获取所有的课程 
    exam_subject_list: [],
    // 创建试卷接口的状态
    exam_exam_status: false,
    // 创建试卷接口返回的questions
    exam_questions: [],
    // 创建试卷接口的列表
    exam_list: [],
}

const mutations = {
    // 更新 获取考试类型
    update_exam_examType(state, payload) {
        state.exam_examType_list = payload
    },
    // 更新 获取所有的课程
    update_exam_subject(state, payload) {
        state.exam_subject_list = payload
    },
    // 更新 创建试卷接口的状态
    update_exam_exam(state, payload) {
        state.exam_exam_status = payload
    },
    // 更新 创建试卷接口
    update_exam_questions(state, payload) {
        console.log(payload)
        state.exam_questions = payload
    },
    // 更新 创建试卷接口
    update_exam(state, payload) {
        state.exam_list = payload
    },
}

const actions = {
    // 获取考试类型
    async exam_examType({ commit }) {
        const res = await exam_examType()
        if (res.code === 1) {
            commit('update_exam_examType', res.data)
        }
    },
    // 获取所有的课程 
    async exam_subject({ commit }) {
        const res = await exam_subject()
        if (res.code === 1) {
            commit('update_exam_subject', res.data)
        }
    },
    // 创建试卷接口
    async exam_exam({ commit }, payload) {
        const res = await exam_exam(payload)
        if (res.code === 1) {
            res.data && commit('update_exam_questions', res.data)
            commit('update_exam_exam', true)
        } else {
            commit('update_exam_exam', false)
        }
    },
    // 更新试卷接口
    async update_exam({ commit }, payload) {
        const res = await update_exam(payload)
        console.log(res)
    },
    // 获取试卷列表接口
    async get_exam({ commit }) {
        const res = await get_exam()
        if (res.code === 1) {
            commit('update_exam', res.exam)
        }
    },
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
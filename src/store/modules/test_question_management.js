import {
    getTestType,
    getCourse,
    getQuestionsType,
    questions,
    insertQuestionsType,
    delQuestionsType,
    questionsCondition,
    questionsUpdate
} from '@/api/test_question_management'

const state = {
    // 考试类型列表
    examTypeList: [],
    // 课程列表
    courseList: [],
    // 试题类型列表
    testingTypesList: [],
    // 添加试题类型的 状态
    insertQuestionsTypeStatus: false,
    // 按条件获取试题列表
    questionsConditionList: [],
    // 更新试题的状态
    updateStatus: false
}

const mutations = {
    // 更新考试类型列表
    updateExamTypeList(state, payload) {
        state.examTypeList = payload
    },
    // 更新所有的课程
    updateCourseList(state, payload) {
        state.courseList = payload
    },
    // 更新所有的课程
    updateTestingTypesList(state, payload) {
        state.testingTypesList = payload
    }, 
    // 更新 添加试题类型的 状态
    updateInsertQuestionsType(state, payload) {
        state.insertQuestionsTypeStatus = payload
    },
    // 更新 按条件获取试题
    updateQuestionsConditionList(state, payload) {
        state.questionsConditionList = payload
    },
    // 更新试题的状态
    updateQuestionStatus(state, payload) {
        state.updateStatus = payload
    }
}

const actions = {
    // 获取考试类型
    async getTestType({ commit }, payload) {
        const res = await getTestType(payload)
        if (res.code === 1) {
            // 激活 更新考试类型列表
            commit('updateExamTypeList', res.data)
        }
    },
    // 获取所有的课程
    async getCourse({ commit }) {
        const res = await getCourse()
        if (res.code === 1) {
            // 激活 更新考试类型列表
            commit('updateCourseList', res.data)
        }
    },
    // 获取所有的课程
    async getQuestionsType({ commit }) {
        const res = await getQuestionsType()
        if (res.code === 1) {
            // 激活 更新考试类型列表
            commit('updateTestingTypesList', res.data)
        }
    },
    // 添加试题接口
    async questions({ commit }, payload) {
        await questions({...payload})
    },
    // 添加试题类型接口
    async insertQuestionsType({ commit }, payload) {
        const res = await insertQuestionsType(payload) 
        if (res.code === 1) {
            commit('updateInsertQuestionsType', true)
        } else {
            commit('updateInsertQuestionsType', false)
        }
    },
    // 删除指定的试题类型
    async delQuestionsType({ commit }, payload) {
        const res = await delQuestionsType(payload) 
        if (res.code === 1) {
            // 更新 状态
            commit('updateInsertQuestionsType', true)
        } else {
            commit('updateInsertQuestionsType', false)
        }
    },
    // 按条件获取试题
    async questionsCondition({ commit }, payload) {
        const res = await questionsCondition(payload)
        if (res.code === 1) {
            commit('updateQuestionsConditionList', res.data)
        }
    },
    // 更新试题
    async questionsUpdate({ commit }, payload) {
        const res = await questionsUpdate(payload) 
        if (res.code === 1) {
            // 更新试题的状态
            commit('updateQuestionStatus', true)
        } else {
            commit('updateQuestionStatus', false)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions 
}
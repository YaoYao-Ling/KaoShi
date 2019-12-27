import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

// 试题管理
import test_question_management from './modules/test_question_management'

// 用户管理
import user_management from './modules/user_management'

// 考试管理
import exam_management from './modules/exam_management'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    // 试题管理
    test_question_management,
    // 用户管理
    user_management,
    // 考试管理
    exam_management
  },
  getters
})

export default store

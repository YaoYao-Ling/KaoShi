import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import classroom from './modules/classroom'
import yuejuan from './modules/yuejuan'
import attempt from './modules/attempt'
import userList from './modules/userList'

// 试题管理
import test_question_management from './modules/test_question_management'

import detail from "./modules/detail";
import ExaminationPaperManagement from './modules/ExaminationPaperManagement'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    detail,
    ExaminationPaperManagement,
    classroom,
    yuejuan,
    attempt,
    userList,
    // 试题管理
    test_question_management
  },
  getters
})

export default store
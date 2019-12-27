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
    userList
  },
  getters
})

export default store
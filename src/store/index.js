import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import added from './modules/added'
import testList from "./modules/testList";
import detail from "./modules/detail";
import ExaminationPaperManagement from './modules/ExaminationPaperManagement'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    added,
    testList,
    detail,
    ExaminationPaperManagement
  },
  getters
})

export default store
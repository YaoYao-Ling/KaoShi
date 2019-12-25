import { classList, studentList } from "@/api/classroom.js";
const state = {
    studentList: [], //学生数据
    searchList: [], //搜索数据
    grade_name: [], //下拉选择班级名
    room_text: [], //下拉选择教室号
    classList: [], //班级管理数据
    classSelect: [] //添加班级下拉选择
}

const mutations = {
    //搜索----------------------------------
    getsearchList(state, payload) {
        console.log(payload);
        state.studentList.filter(item => {
            if (item.student_name == payload.user || item.room_text == payload.num || item.grade_name == payload.name) {
                state.searchList.push(item)
            }
        })
    },
    //全部学生-------------------------------
    studentList(state, payload) {
        state.studentList = payload;
        //下拉选择教室号
        payload.forEach(item => {
                if (state.room_text.indexOf(item.room_text) == -1) {
                    state.room_text.push(item.room_text)
                }
            })
            //下拉选择班级名
        payload.forEach(item => {
            if (state.grade_name.indexOf(item.grade_name) == -1) {
                state.grade_name.push(item.grade_name)
            }
        })
    },
    //班级管理------------------------------------------------------
    classList(state, payload) {
        state.classList = payload;
        //添加班级下拉选项------------------------
        payload.filter(item => {
            if (state.classSelect.indexOf(item.room_text) == -1) {
                state.classSelect.push(item)
            }
        })

    }
}

const actions = {
    //获取学生数据--------------------------------------------
    async getstudentList({ commit }, payload) {
        let res = await studentList();
        console.log(res);
        commit('studentList', res.data)
    },
    //获取班级管理--------------------------------------------
    async getClassList({ commit }, payload) {
        let res = await classList();
        console.log(res);
        commit('classList', res.data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
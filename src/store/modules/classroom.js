import { classList, studentList } from "@/api/classroom.js";
const state = {
    studentList: [], //学生数据
    searchList: [], //搜索数据
    grade_name: [], //下拉选择班级名
    room_text: [], //下拉选择教室号
    classList: [], //班级管理数据
    classSelect: [], //添加班级教室选择
    classSubject: [], //添加班级课程选择
    data_Id: [], //添加班级教室id
    data_Sub: [], //添加班级课程id
}

const mutations = {
    //搜索----------------------------------
    getsearchList(state, payload) {
        console.log(payload);
        state.studentList.filter(item => {
            if (item.student_name == payload.user && item.room_text == payload.num && item.grade_name == payload.name) {
                state.searchList.push(item)
            }
        })
    },
    //全部学生----------------------------------------------------------
    studentList(state, payload) {
        state.studentList = payload;
        //下拉选择教室号------------------------
        payload.forEach(item => {
                if (state.room_text.indexOf(item.room_text) == -1) {
                    state.room_text.push(item.room_text)
                }
            })
            //下拉选择班级名------------------
        payload.forEach(item => {
            if (state.grade_name.indexOf(item.grade_name) == -1) {
                state.grade_name.push(item.grade_name)
            }
        })
    },
    //班级管理------------------------------------------------------
    classList(state, payload) {
        state.classList = payload;
        //添加班级教室选项------------------------
        let room = payload.map(item => {
            return item.room_text
        })
        let roomArr = [...new Set(room)];
        state.classSelect = state.classSelect.concat(roomArr);
        //添加班级教室id-----------------------------
        let roomId = payload.map(item => {
            return item.room_id
        })
        let dataId = [...new Set(roomId)];
        state.data_Id = state.data_Id.concat(dataId);

        //添加班级课程选项---------------------------
        let subject = payload.map(item => {
            return item.subject_text
        })
        let subArr = [...new Set(subject)];
        state.classSubject = state.classSubject.concat(subArr);
        //添加班级课程id----------------------------
        let subId = payload.map(item => {
            return item.subject_id
        })
        let dataSub = [...new Set(subId)];
        state.data_Sub = state.data_Sub.concat(dataSub);

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
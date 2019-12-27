<template>
    <div class="add-exam-wrap">
        <h2>添加考试</h2>
        <div class="add-exam-content">
            <div class="add-exam-content-div">
                    <div class="add-exam-dive-title">试卷名称</div>
                    <div><el-input v-model="examName"></el-input></div>
            </div>
            <div class="add-exam-content-div">
                    <div class="add-exam-dive-title">请选择考试类型</div>
                    <div>
                        <el-select v-model="exam_type" placeholder="请选择">
                            <el-option
                                class="el-option-one"
                                v-for="item in exam_type_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
            </div>
            <div class="add-exam-content-div">
                    <div class="add-exam-dive-title">请选择课程</div>
                    <div>
                        <el-select v-model="course_type" placeholder="请选择">
                            <el-option
                            class="el-option-one"
                            v-for="item in course_type_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
            </div>
            <div class="add-exam-content-div">
                    <div class="add-exam-dive-title">请设置题量</div>
                    <div
                        class="num-div"
                        @mouseover="mouseOver"
                        @mouseleave="mouseLeave"
                    >
                        <el-input-number 
                            v-model="num"
                            controls-position="right"
                            @change="handleChange"
                            :min="3" 
                            :max="10"
                        ></el-input-number>
                    </div>
            </div>
            <div class="add-exam-content-div">
                    <div class="testTime">考试时间：</div>
                    <div class="time">
                        <el-date-picker
                            class="startTime"
                            v-model="value1"
                            type="date"
                            placeholder="开始时间">
                        </el-date-picker>
                        <span>-</span>
                        <el-date-picker
                            class="startTime"
                            v-model="value2"
                            type="date"
                            placeholder="结束时间">
                        </el-date-picker>
                    </div>
            </div>
            <el-button @click="createTest" type="primary" class="create-test">创建试卷</el-button>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    data() {
        return {
            // 试卷名称
            examName: '',
            // 考试类型 列表
            exam_type_options: [],
            // 考试类型
            exam_type: '',
            // 当前的user_id
            user_id: '',
            // 当前的课程value
            course_type: '',
            // 当前的课程
            course_type_options: [],
            // 当前num
            num: 3,
            // 时间1
            value1: '',
            // 时间2
            value2: '',
        }
    },
    computed: {
        ...mapState({
            // 当前用户信息对象
            userObj: state => state.user_management.userObj,
            // 根据用户id，返回该用户的视图权限
            userNewList: state => state.user_management.userNewList,
            // 获取考试类型
            exam_examType_list: state => state.exam_management.exam_examType_list,
            // 获取所有的课程
            exam_subject_list: state => state.exam_management.exam_subject_list,
            // 创建试卷接口的状态
            exam_exam_status: state => state.exam_management.exam_exam_status,
        })
    },
    watch: {
        // 监听 创建试卷接口的状态
        exam_exam_status(now) {
            if (now) {
                this.$router.push('/example/createTest')
            }
            // 还原状态
            this.update_exam_exam(false)
        },
        // 监听 获取所有的课程
        exam_subject_list(now) {
            this.course_type_options = now.map(item => {
                return {
                    value: item.subject_id,
                    label: item.subject_text 
                }
            })
        },
        // 监听 获取考试类型
        exam_examType_list(now) {
            this.exam_type_options = now.map(item => {
                return {
                    value: item.exam_id,
                    label: item.exam_name
                }
            })
        },  
        // 监听 当前用户信息对象
        userObj(now) {
            this.user_id = now.user_id
        }
    },
    methods: {
        // 创建试卷按钮
        createTest() {
            const subject_id = this.course_type
            const exam_id = this.exam_type
            const title = this.examName
            const number = this.num
            const start_time = this.value1 * 1
            const end_time = this.value2 * 1 
            if (!subject_id.trim() && !exam_id.trim() && !title.trim() && !number.trim() && !start_time.trim() && !end_time.trim()) {
                return alert('请输入完整的参数')
            }
            this.exam_exam({
                subject_id,
                exam_id,
                title,
                number,
                start_time,
                end_time
            })
        },
        // 鼠标移入
        mouseOver() {
            const el1 = document.querySelector('.el-input-number__decrease')
            const el2 = document.querySelector('.el-input-number__increase')
            el1.classList.add('show')
            el2.classList.add('show')
        },
        // 鼠标移出
        mouseLeave() {
            const el1 = document.querySelector('.el-input-number__decrease')
            const el2 = document.querySelector('.el-input-number__increase')
            el1.classList.remove('show')
            el2.classList.remove('show')
        },
        // 改变 num
        handleChange(val) {
            // console.log(val)
        },
        ...mapMutations({
            // 更新 创建试卷接口
            update_exam_exam: 'exam_management/update_exam_exam',
        }),
        ...mapActions({
            // 获取当前用户信息
            userInfo: 'user_management/userInfo',
            // 根据用户id，返回该用户的视图权限
            userNew: 'user_management/userNew',
            // 获取考试类型
            exam_examType: 'exam_management/exam_examType',
            // 获取所有的课程 
            exam_subject: 'exam_management/exam_subject',
            // 创建试卷接口
            exam_exam: 'exam_management/exam_exam',
        })
    },
    async created() {
        // 获取当前用户信息
        await this.userInfo()
        // 根据用户id，返回该用户的视图权限
        this.userNew(this.user_id)
        // 获取考试类型
        this.exam_examType()
        // 获取所有的课程 
        this.exam_subject()
    }

}
</script>

<style lang="scss" scoped>
>>> .create-test {
    margin: 32px 0;
    height: 32px;
    padding: 0 40px!important;
    border-radius: 4px!important;
    border: 0!important;
    font-size: 14px!important;
    color: #fff!important;
    background: linear-gradient(-90deg,#4e75ff,#0139fd)!important
}
.time {
    display: flex;
    height: 32px;
    align-items: center;
    span {
        margin: 10px;
    }
}
>>> .el-input__icon {
    line-height: 0;
}
.testTime {
    margin-bottom: 10px;
}
>>> .startTime .el-input__inner {
    padding-left: 30px;
}
.num-div {
    width: 90px;
}
>>> .show {
    opacity: 1 !important;
    transition: all 1s !important;
}
>>> .el-input-number {
    width: 100%;
}
>>> .el-input-number__decrease, >>> .el-input-number__increase {
    line-height: 10px !important;
    opacity: 0;
}
>>> .el-input-number__decrease {
    top: 21px !important;
    height: 12px !important;
}

>>> .el-input-number__increase {
    top: 5px !important;
}
>>> .el-select__caret:nth-child(1)::before {
    position: relative;
    top: -4px;
}
>>> .el-select:nth-child(1) {
    width: 120px;
}
.add-exam-content-div {
    margin-bottom: 24px;
    width: 41.66666667%;
}
>>> .el-input__inner {
    padding: 4px 11px;
    width: 100%;
    height: 32px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    border-radius: 2px;
}
.add-exam-content {
    background: rgb(255, 255, 255);
    padding: 24px;
    margin: 0px 0px 20px;
    border-radius: 10px;
}
.add-exam-dive-title {
    text-align: right;
    vertical-align: middle;
    line-height: 39.9999px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    &:before {
        display: inline-block;
        margin-right: 4px;
        content: '*';
        font-family: SimSun;
        line-height: 1;
        font-size: 14px;
        color: #f5222d;
    }
    &:after {
        content: ':'
    }
}
.add-exam-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0px 24px 24px; 
    background: #f0f2f5;
    & > h2 {
        padding: 20px 0px;
        margin-top: 10px;
        font-size: 20px;
    }
}
</style>
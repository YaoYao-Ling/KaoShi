<template>
  <div class="select-wrap">
      <h2 class="select-title">查看试题</h2>
      <div class="select-top">
        <div class="select-top-title">
          <p>课程类型：</p>
          <p>
            <span @click="changeIndex(item, index)" :class="{ active: activeArr.includes(index) }" v-for="(item, index) in courseListArr" :key="index">{{item.subject_text}}</span>
          </p>
        </div>
        <div class="select-top-bottom select-top-bottom-flex">
          <div class="select-top-bottom-flex select-top-bottom-one">
            <p  class="select-top-bottom-flex">
              考试类型：
            </p>
            <el-select v-model="typeVal" placeholder="请选择">
              <el-option
                v-for="item in examType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="select-top-bottom-flex">
            <p  class="select-top-bottom-flex">
              题目类型：
            </p>
            <el-select v-model="topicVal" placeholder="请选择">
              <el-option
                v-for="item in topicType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-button @click="handleSearch" class="search-btn" type="primary">
            <span class="search"></span> 
            查询
          </el-button>
        </div>
      </div>
      <div class="select-content">
        <ul class="select-content-ul">
          <li class="select-content-li"  @click="hanndleClickLi($event, item)" v-for="(item, index) in list" :key="index">
            <div class="select-content-li-left">
              <p class="select-content-li-p">{{item.title}}</p>
              <div class="select-content-li-div">
                <div class="blue">{{item.questions_type_text}}</div>
                <div class="blue geekblue">{{item.subject_text}}</div>
                <div class="blue orange">{{item.exam_name}}</div>
              </div>
              <div class="select-content-li-user">{{item.user_name}} 发布</div>
            </div>
            <div class="select-content-li-right">
              编辑
            </div>
          </li>
        </ul>
      </div> 
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      courseListArr: [], // 课程列表变量,
      flag: true, // 课程变量只添加一次 all,
      activeArr: [], // 添加active的 数组,
      activeFlag: false, // 用于 添加active的 all 开关
      examType: [], // 考试类型变量
      typeVal: '', // 考试类型 val 
      topicType: [], // 试题类型变量
      topicVal: '', // 试题类型 val
      subject_id: '', // 课程ID
      list: [], // copy questionsConditionList
    }
  },
  computed: {
    ...mapState({
      // 课程列表
      courseList: state => state.test_question_management.courseList,
      // 考试类型列表
      examTypeList: state => state.test_question_management.examTypeList,
      // 试题类型列表
      testingTypesList: state => state.test_question_management.testingTypesList,
      // 按条件获取试题列表
      questionsConditionList: state => state.test_question_management.questionsConditionList,
    })
  },  
  methods: {
    // 查询
    handleSearch() {
      let fn = () => {}

      if (this.typeVal) {
        fn = item => item.exam_id === this.typeVal
      }

      if (this.topicVal) {
        fn = item => item.questions_type_id === this.topicVal
      }
      
      if (this.typeVal && this.topicVal) {
        fn = item => item.questions_type_id === this.topicVal && item.exam_id === this.typeVal
      }

      if (this.subject_id) {
        fn = item => item.subject_id === this.subject_id
      }

      if (this.subject_id && this.typeVal) {
        fn = item => item.exam_id === this.typeVal && item.subject_id === this.subject_id
      }

      if (this.subject_id && this.topicVal) {
        fn = item => item.subject_id === this.subject_id && item.questions_type_id === this.topicVal
      }
      
      if (this.subject_id && this.typeVal && this.topicVal) {
        fn = item => item.exam_id === this.typeVal && item.subject_id === this.subject_id && item.questions_type_id === this.topicVal
      }

      if (!this.subject_id) {
        if (!this.topicVal && !this.typeVal) {
          fn = item => item
        }
      }

      const arr = this.questionsConditionList.filter(fn)
      this.list = arr
    },
    // 点击下面li的函数
    hanndleClickLi(event, item) {
      const { questions_id } = item 
      if (event.target.innerText === '编辑') {
        return this.$router.push(`/editQuestions?questions_id=${questions_id}`)
      }
      this.$router.push(`/detailQuestions?questions_id=${questions_id}`)
    },
    // 点击课程类型的 函数
    changeIndex(item, index) {
      this.subject_id = item.subject_id
      this.activeArr = []
      this.activeFlag = !this.activeFlag
      if (item.subject_text === 'All') {
        if (this.activeFlag) {
          return this.courseListArr.forEach((courseItem, index) => {
            this.activeArr.push(index) 
          })
        }
        return this.activeArr = []
      } 
      this.activeFlag ? this.activeFlag = false : null
      this.activeArr.push(index)
    },
    ...mapMutations({
      // 更新 按条件获取试题
      updateQuestionsConditionList: 'test_question_management/updateQuestionsConditionList',
    }),
    ...mapActions({
      // 获取课程
      getCourse: 'test_question_management/getCourse',
      // 获取考试类型
      getTestType: 'test_question_management/getTestType',
      // 获取试题类型
      getQuestionsType: 'test_question_management/getQuestionsType',
      // 按条件获取试题
      questionsCondition: 'test_question_management/questionsCondition',

    })
  },
  watch: {
    // 监听 按条件获取试题列表
    questionsConditionList(now) {
      this.list = now
    },
    // 监听 试题类型
    testingTypesList(now) {
      this.topicType = now.map(item => {
        item.label = item.questions_type_text
        item.value = item.questions_type_id
        return item
      })
    },
    // 监听 考试类型列表
    examTypeList(now) {
      this.examType = now.map(item => {
        item.label = item.exam_name
        item.value = item.exam_id
        return item
      })
    },
    // 监听课程
    courseList(now) {
      if (this.flag) {
        now.unshift({subject_text: 'All'})
        this.flag = false
      } 
      this.courseListArr = now
    }
  },
  mounted() {
    // 获取课程
    this.getCourse()
    // 获取考试类型
    this.getTestType()
    // 获取试题类型
    this.getQuestionsType()
    // 按条件获取试题
    this.questionsCondition()
  },
}
</script>

<style lang="scss" scoped>

.orange {
  color: #fa8c16 !important;
  background: #fff7e6 !important;
  border-color: #ffd591 !important;
}
.geekblue {
  color: #2f54eb !important;
  background: #f0f5ff !important;
  border-color: #adc6ff !important;
}
.blue {
  color: #1890ff;
  background: #e6f7ff;
  display: inline-block;
  line-height: 20px;
  height: 22px;
  padding: 0 7px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  border-color: #91d5ff;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  opacity: 1;
  margin-right: 8px;
  cursor: pointer;
  white-space: nowrap;
}
.select-content-li-left {
  width: 80%;
}
.select-content-li-right {
  position: absolute;
  right: 8px;
  color: #0139FD;
  cursor: pointer;
}
.select-content-li-user {
  color: #0139FD;
}
.select-content-li-p {
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 22px;
}
.select-content-li-div {
  display: flex;
  margin: 10px 0;
}
.select-content-li {
  position: relative;
  border-bottom: 1px solid #e8e8e8;
  padding: 12px 0;
  display: flex;
  align-items: center;
  &:hover {
    background: #f7f8ff;
  }
}
.select-content {
  background: rgb(255, 255, 255);
  padding: 24px;
  margin: 0px 0px 20px;
  border-radius: 10px;
}
.search {
  width: 15px;
  height: 15px;
  background: url('../../assets/search.png') no-repeat;
  background-size: cover;
  background-position: center 2px;
  display: inline-block;
}

.search-btn {
  width: 130px;
  height: 32px;
  line-height: 1.499;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  touch-action: manipulation;
  margin: 3px 0px 0px 50px;
  padding: 0 40px!important;
  border-radius: 4px!important;
  border: 0!important;
  font-size: 14px!important;
  background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
}
>>> .el-select__caret {
  line-height: 30px;
}
.select-top-bottom-one {
  margin-right: 20px;
}
.select-top-bottom {
  margin: 20px 0 30px;
}
>>> .el-input, >>> .el-input__inner {
  width: 150px;
  height: 30px;
}
.select-top-bottom-flex {
  display: flex;
  align-self: center;
}
.active {
  background-color: #0139FD !important;
  color: #fff !important;
  transition: all 1s;
}
.select-top-title {
  display: flex;
  p:nth-child(1) {
    width: 80px;
  }
}
.select-top-title p > span {
  position: relative;
  top: -2px;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
  line-height: 20px;
  height: 22px;
  padding: 0 7px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  background: #fafafa;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  opacity: 1;
  margin-right: 8px;
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: 10px;
}
.select-top {
  background: rgb(255, 255, 255);
  padding: 24px;
  margin: 0px 0px 20px;
  border-radius: 10px;
}
.select-title {
  padding: 20px 0px;
  margin-top: 10px;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 22px;
}
.select-wrap {
  padding: 0px 24px 24px;
  background: #f0f2f5;
}
</style>
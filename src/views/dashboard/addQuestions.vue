<template>
  <div class="add-questions-wrap">
      <h2 class="title">添加试题</h2>
      <div class="add-content">
        <div class="content_top">
          <h3 class="content-title">题目信息</h3>
          <div class="TOPIC_DRY">
            <p class="TOPIC_DRY_P">题干</p>
            <el-input class="ipt" v-model="topic_dry" placeholder="请输入题目标题，不超过20个字"></el-input>
          </div>
        </div>
        <div class="TOPIC_THEME">
          <p class="THEME_P">题目主题</p>
          <MarkDown v-model="topicThemeVal"/>
        </div>
        <div class="exam-type">
          <p class="exam-type-p THEME_P">请选择考试类型：</p>
           <el-select v-model="typeVal" placeholder="请选择">
            <el-option
              v-for="item in examType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="class-type">
          <p class="exam-type-p THEME_P">请选择课程类型：</p>
           <el-select v-model="classVal" placeholder="请选择">
            <el-option
              v-for="item in classType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="topic-type">
          <p class="exam-type-p THEME_P">请选择题目类型：</p>
           <el-select v-model="topicVal" placeholder="请选择">
            <el-option
              v-for="item in topicType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="answer-information">
          <h3 class="answer-h3">答案信息</h3>
          <MarkDown v-model="answerVal"/>
        </div>
        <el-button class="submit" type="primary" @click="sub">提交</el-button>
      </div>
      
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import MarkDown from '@/components/MarkdownEditor'
export default {
  components: {
    MarkDown
  },
  computed: {
    ...mapState({
      // 考试类型列表
      examTypeList: state => state.test_question_management.examTypeList,
      // 课程列表
      courseList: state => state.test_question_management.courseList,
      // 试题类型列表
      testingTypesList: state => state.test_question_management.testingTypesList,
      // 当前用户信息
      currentUserInfo: state => state.user.userInfo
    })
  },
  watch: {
    // 监听 考试类型列表
    examTypeList(now) {
      this.examType = now.map(item => {
        item.label = item.exam_name
        item.value = item.exam_id
        return item
      })
    },
    // 监听 课程列表
    courseList(now) {
      this.classType = now.map(item => {
        item.label = item.subject_text
        item.value = item.subject_id
        return item
      })
    },
    // 监听 试题类型
    testingTypesList(now) {
      this.topicType = now.map(item => {
        item.label = item.questions_type_text
        item.value = item.questions_type_id
        return item
      })
    },
  },  
  data() {
    return {
      // 答案val
      answerVal: '',
      // 主题val
      topicThemeVal: '',
      topic_dry: '',
      editor: null,
      editorContent: '',
      examType: [], // 考试列表变量
      typeVal: '',
      classType: [], // 课程列表变量
      classVal: '',
      topicType: [], // 试题类型变量
      topicVal: '',
    }
  },
  methods: {
    // 点击提交按钮
    sub() {
      // 试题类型id
      const questions_type_id = this.topicVal
      // 题干
      const questions_stem = this.topicThemeVal
      // 课程id 
      const subject_id = this.classVal
      // 考试类型id 
      const exam_id = this.typeVal
      // 用户id 
      const user_id = this.currentUserInfo.user_id
      // 题目答案
      const questions_answer = this.answerVal
      // 试题的标题
      const title = this.topic_dry

      if (!questions_type_id || !questions_stem || !subject_id || !exam_id || !user_id || !questions_answer || !title) {
        return alert('您有未填写的项！')
      }
      this.questions(
        {
          questions_type_id,
          questions_stem,
          subject_id,
          exam_id,
          user_id,
          questions_answer,
          title
        }
      )
      alert('添加成功！')
    },
    ...mapActions({
      // 获取考试类型
      getTestType: 'test_question_management/getTestType',
      // 获取课程
      getCourse: 'test_question_management/getCourse',
      // 获取试题类型
      getQuestionsType: 'test_question_management/getQuestionsType',
      // 获取当前用户信息
      getCurrentUserInformation: 'user/getCurrentUserInformation',
      // 添加试题接口
      questions: 'test_question_management/questions',
    })
  },
  mounted() {
    // 获取考试类型
    this.getTestType()
    // 获取课程
    this.getCourse()
    // 获取试题类型
    this.getQuestionsType()
    // 获取当前用户信息
    this.getCurrentUserInformation()
  }

}
</script>

<style lang="scss" scoped >
.submit {
  line-height: 1.499;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  touch-action: manipulation;
  height: 40px;
  padding: 0 40px!important;
  border-radius: 4px!important;
  border: 0!important;
  font-size: 14px!important;
  color: #fff!important;
  background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
}
.answer-h3 {
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
.content_top, .TOPIC_THEME, .exam-type, .topic-type, .class-type, .answer-information {
  padding-bottom: 8px;
  margin-bottom: 24px;
}
.THEME_P {
  padding: 0 0 8px;
  margin: 0;
  display: block;
  text-align: left;
  line-height: 1.5;
  white-space: initial;
}
/deep/ .ipt {
  max-width: 500px;
  font-variant: tabular-nums;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  height: 32px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border-radius: 2px;
  transition: all 0.3s;
  height: 40px;
  font-size: 16px;
}
.TOPIC_DRY_P {
  padding: 0 0 8px;
  margin: 0;
  display: block;
  text-align: left;
  line-height: 1.5;
  white-space: initial;
}
.content-title {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
.add-content {
  background: rgb(255, 255, 255);
  padding: 24px;
  margin: 0px 0px 20px;
  border-radius: 10px;
}
.title {
  font-size: 22px;
  font-weight: normal;
  padding: 20px 0px;
  margin-top: 10px;
}
.add-questions-wrap {
  padding: 0px 24px 24px;
  background: #f0f2f5;
}
</style>
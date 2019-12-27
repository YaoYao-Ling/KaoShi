<template>
  <div class="detail-wrap">
      <h2 class="detail-title">试题详情</h2>
      <div class="detail-content">
        <div ref="detailLeft" class="detail-content-left" v-if="questionsConditionList[0]">
          <p class="detail-content-left-title">出题人：{{questionsConditionList[0].user_name}}</p>
          <h3 class="detail-content-left-info">题目信息</h3>
          <div class="detail-content-left-color">
            <div class="blue">{{questionsConditionList[0].questions_type_text}}</div>
            <div class="blue geekblue">{{questionsConditionList[0].subject_text}}</div>
            <div class="blue orange">{{questionsConditionList[0].exam_name}}</div>
          </div>
          <h4>{{questionsConditionList[0].title}}</h4>
        </div>
        <div ref="detailRight" class="detail-content-right">
          <h3>答案信息</h3>
        </div>
      </div>
      <div class="markdown">
        <mavon-editor 
          v-model="content"
          @change="change"
        />
      </div>
      <div class="markdown">
        <mavon-editor 
          v-model="answer"
          @change="changeAnswer"
        />
      </div>
  </div>
</template>

<script>
// 导入组件 及 组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      content:'', // 输入的markdown
      html:'',    // 及时转的html
      answer: '', // 输入的markdown
      htmlAnswer:'',    // 及时转的html
    }
  },
  components: {
    mavonEditor,
  },
  computed: {
    ...mapState({
      // 按条件获取试题列表
      questionsConditionList: state => state.test_question_management.questionsConditionList,
    }), 
  },
  watch: {
    // 监听 按条件获取试题列表
    questionsConditionList(now) {
      this.content = now[0].questions_stem
      this.answer = now[0].questions_answer
    }
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render){
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 所有操作都会被解析重新渲染
    changeAnswer(value, render){
      // render 为 markdown 解析后的结果[html]
      this.htmlAnswer = render;
    },
    // 提交
    submit(){
      const leftWrap = this.$refs.detailLeft
      leftWrap.innerHTML += this.html
    },
    // 提交
    submit2(){
      const rightWrap = this.$refs.detailRight
      rightWrap.innerHTML += this.htmlAnswer
    },
    ...mapActions({
      // 按条件获取试题
      questionsCondition: 'test_question_management/questionsCondition',
    })
  },
  async mounted() {
    // 获取当前 url 的id
    const { questions_id } = this.$route.query
    // 按条件获取试题
    await this.questionsCondition({questions_id})
    // 自动触发提交 获取markdown结构数据
    this.submit()
    // 自动触发提交 获取markdown结构数据
    this.submit2()
  }
}
</script>

<style lang="scss" scoped>
>>> img {
  width: 90%;
}
.detail-content-right {
  background: rgb(255, 255, 255);
  padding: 24px;
  margin: 0 0 0 20px;
  border-radius: 10px;
  width: 500px;
  flex: initial;
  h3 {
    font-size: 16px;
  }
}
>>> .detail-content-right > p {
  margin: 1.5em 0;
  white-space: pre-wrap;
  color: rgba(0, 0, 0, 0.65);
}

.detail-content-left-title {
  margin: 0 0 20px 0 !important;
}
>>> .detail-content-left p:nth-last-child(1) {
  margin: 0;
  line-height: 1;
}
>>> .detail-content-left p {
  margin: 1.5em 0;
  white-space: pre-wrap;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
}
>>> pre {
  display: block;
  padding: 1em;
  overflow: auto;
  line-height: 1.3;
  max-height: 35em;
  color: #657b83;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8AgMAAABHkjHhAAAACVBMV…v3iO9zG/UOphyPeinPl1J8Gtaa7xPTa/Dk+RIs4deMvwGvcGsmsCvJ0AAAAABJRU5ErkJggg==) #f6f6f6;
  background-size: 30px 30px;
}
.markdown {
  position: fixed;
  left: 100%;
}
.paragraphA {
  margin: 1.5em 0;
  margin-top: 0;
  white-space: pre-wrap;
}
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
  white-space: nowrap;
}
.detail-content-left-color {
  display: flex;
  margin: 20px 0;
}
.detail-content-left-info {
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
}
.detail-content-left {
  background: rgb(255, 255, 255);
  padding: 24px;
  margin: 0px 0px 20px;
  border-radius: 10px;
  flex: 1;
  min-width: 400px;
  & > p {
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 20px;
  }
}
.detail-content {
  display: flex;
}
.detail-title {
  padding: 20px 0px;
  margin-top: 10px;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 0.5em;
}
.detail-wrap {
  padding: 0px 24px 24px;
  background: #f0f2f5;
}
h3, h4 {
  margin-top: 0;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
</style>
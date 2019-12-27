<template>
  <div class="list-wrap">
      <h2 class="list-wrap-title">试卷列表</h2>
      <div class="list-content">
        <div class="content-top">
          <div >
            <span>考试类型：</span>
             <el-select v-model="exam_type_value" placeholder="请选择">
              <el-option
                v-for="item in exam_type_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div >
            <span>课程：</span>
             <el-select v-model="course_value" placeholder="请选择">
              <el-option
                v-for="item in course_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search_div">
            <button class="search"><span class="search_span"></span>查询</button>
          </div>
        </div>
        <div class="content-con">
          <div class="content-con-title">
            <div class="content-con-title-left">试卷列表</div>
            <div class="content-con-title-right">
              <span :class="{ active: i === index }" @click="changeIndex(i)" v-for="(item, i) in spanList" :key="i">{{item}}</span>
            </div>
          </div>
          <el-table :data="tableList" >
            <template v-for="item in propList">
              <el-table-column :key="item.id" :prop="item.prop" :label="item.label"></el-table-column>
            </template>
          </el-table>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      // 考试类型的value
      exam_type_value: '',
      // 考试类型的数组
      exam_type_options: [],
      // 课程的vlaue
      course_value: '',
      // 课程的数组
      course_options: [], 
      // span数组
      spanList: ['全部', '进行中', '已结束'],
      // 选中的下标
      index: 0,
      // table数据
      tableList: [
        {
          name: '张三',

        }
      ],
      propList: [],
    }
  },
  computed: {
    ...mapState({
      // 创建试卷接口的列表
      exam_list: state => state.exam_management.exam_list,
      // 获取所有的课程 
      exam_subject_list: state => state.exam_management.exam_subject_list,
      // 获取考试类型
      exam_examType_list: state => state.exam_management.exam_examType_list,
    })
  },
  methods: {
    // 格式化时间
    formateTime(timer) {
      const oDate = new Date(Number(timer) || Date.now())
      const oYear = oDate.getFullYear()
      const oMonth = oDate.getMonth()
      const oDay = oDate.getDay()
      const oHour = oDate.getHours()
      const oMinu = oDate.getMinutes()
      const oSec = oDate.getSeconds()
      return `${oYear}-${oMonth}-${oDay} ${oHour}:${oMinu}:${oSec}`
    },
    // 改变当前的下标
    changeIndex(i) {
      this.index = i
    },
    handleClick(row) {
      console.log(row);
    },
    ...mapActions({
      // 创建试卷接口的列表
      get_exam: 'exam_management/get_exam',
      // 创获取所有的课程
      exam_subject: 'exam_management/exam_subject',
      // 获取考试类型
      exam_examType: 'exam_management/exam_examType',
    })
  },
  watch: {
    // 监听
    exam_list(now) {
      console.log(now)
      this.propList = now.map((item, index) => {
         return {
           label:'姓名',prop:'name',id: index
         }
        // return {
        //   info: 1,
        //   class: `考试班级 \n ${item.grade_name[0]}`,
        //   create: item.user_name,
        //   start: this.formateTime(item.start_time),
        //   end: this.formateTime(item.end_time)
        // }
      })
      console.log(now)  
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
    // 监听 获取所有的课程 
    exam_subject_list(now) {
      this.course_options = now.map(item => {
        return {
          value: item.subject_id,
          label: item.subject_text
        }
      })
    },
    // 监听
    get_exam(now) {
      console.log(now)
    }
  },
  created() {
    // 创建试卷接口的列表
    this.get_exam()
    // 创获取所有的课程
    this.exam_subject()
    // 创获取所有的课程
    this.exam_examType()
  },
}
</script>

<style lang="scss" scoped>

.content-con {
  background: rgb(255, 255, 255);
  padding: 24px;
  margin: 0px 0px 20px;
  border-radius: 10px;
}
.content-con-title {
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  span {
    float: left;
    border-radius: 2px 0 0 2px;
    border-left: 1px solid #d9d9d9;
    margin: 0;
    height: 32px;
    line-height: 30px;
    display: inline-block;
    transition: color 0.3s, background 0.3s, border-color 0.3s;
    cursor: pointer;
    border: 1px solid #d9d9d9;
    border-left: none;
    background: #fff;
    padding: 0 15px;
    color: #1890ff;
    &:nth-child(1) {
      border-left: 1px solid #d9d9d9;
    }
    &:nth-child(1).active {
      border-left: none;
    }
    &.active {
      background: #fff !important;
      border-color: #0139FD !important; 
      color: #0139FD !important;
      box-shadow: -1px 0 0 0 #0139FD !important;
      z-index: 1;
    }

  }
}
.search_span {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url('../../assets/search.png') no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;
  right: 6px;
  top: 3px;
}
.search {
  height: 32px;
  margin: 0 0 0 20px;
  padding: 0 40px!important;
  border-radius: 4px!important;
  border: 0!important;
  font-size: 14px!important;
  color: #fff!important;
  background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
}
>>> .el-input {
  width: 100%;
}
>>> .el-select {
  width: 62.5%;
}
>>>.el-input__inner {
  display: block;
  margin-left: 11px;
  margin-right: 11px;
  position: relative;
  line-height: 30px;
  height: 32px;
  position: relative;
  cursor: pointer;
  width: 100%;
}
.content-top {
  background: rgb(255, 255, 255);
  padding: 34px 24px 64px 24px;
  margin: 0px 0px 20px;
  border-radius: 10px;
  display: flex;
}
h1, h2, h3, h4, h5, h6 {
  font-size: 1.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
.list-wrap-title {
  padding: 20px 0px;
  margin-top: 10px;
}
.list-wrap {
  padding: 0px 24px 24px;
  background: #f0f2f5;
}
</style>
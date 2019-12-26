<template>
  <el-container>
    <el-header>
      <h2>创建试题</h2>
    </el-header>
    <el-main>
      <el-button>添加新题</el-button>
      <div class="style-edit" v-if="addList.data.questions.length">
        <h3>{{this.name}}</h3>
        <p>考试时间：1小时30分钟 监考人：{{addList.data.questions[0].user_name}} 开始考试时间：2018.9.10 10:00 阅卷人：刘于</p>
        <div class="edit-cont"  v-if="addList.data.questions.length">
          <!-- 容器 -->
          <div class="item" v-for="(item,index) in dataList" :key="index">
            <h4>{{item.title}}</h4>
            <p>{{item.questions_answer}}</p>
            <div>{{item.questions_stem}}</div>
            <a  @click="delet">删除</a>
          </div>
        </div>
        <div v-else>
              <h3>暂无试题信息</h3>
        </div>
        <el-button type="primary" @click="jump">创建试题</el-button>
      </div>
      <div v-else class="cv">There is nothing!!!</div>
    </el-main>
  </el-container>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      name: "",
      dataList: [],
      addList:[],
      newData : []
    };
  },
  computed: {
    ...mapState({
      delePaper: state => state.ExaminationPaperManagement.delePaper,
      // addList:state=>state.ExaminationPaperManagement.addList,
      // genxin:state => state.ExaminationPaperManagement.upData
    })
  },
  methods: {
    ...mapActions({
      deleteExaminationPaperManagementTeacher:"ExaminationPaperManagement/deleteExaminationPaperManagementTeacher",
      updateExaminationPaperManagement:"ExaminationPaperManagement/updateExaminationPaperManagement",
    }),
    delet(e) {
      // this.deleteExaminationPaperManagementTeacher();
      console.log(e.target)
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);

    },
    jump(){
      this.updateExaminationPaperManagement(this.newData)
      this.$router.push('/Listexam');
    }
  },
  created() {
    this.addList = JSON.parse(sessionStorage.getItem('res'));
    this.name = this.addList.data.title;
    this.dataList = this.addList.data.questions;
    
    this.addList.data.questions.map((item,index)=>{
      this.newData[index] = item.questions_id
    })
    
    
  }
};
</script>
<style scoped lang="scss">
.el-header {
  background-color: #eee;
  color: #333;
  text-align: left;
}
.el-main {
  background-color: #fff;
  color: #333;
  // height: 400px;
  border-radius: 20px;
  flex: auto;
  min-height: 0;
}
.style-edit {
  min-height: 980px;
  margin: 0 auto;
  padding: 40px;
  // text-align: center;
  position: relative;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.style-edit > h3 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.style-edit > p {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  width: 100%;
  background: #f3f3f3;
  border: 1px solid #ccc;
  margin-bottom: 2px;
  display: flex;
  padding: 10px;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
}
.item > a {
  position: absolute;
  top: 20px;
  right: 30px;
}
.cv{
  text-align: center;
  margin-top:50px;
  font-weight: 900;
}
</style>
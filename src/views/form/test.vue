<template>
  <div class="box">
    <h2>试卷列表</h2>
    <div class="top">
      <div>
        <span>选择考试类型:</span>
        <el-select v-model="val1" placeholder=" ">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <span>选择课题:</span>
        <el-select v-model="val2" placeholder=" ">
          <el-option
            v-for="(item, index) in options2"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary">查询</el-button>
    </div>
    <div class="list">
        <div class="title">
            <span>试卷列表</span>
            <div>
                <el-button>全部</el-button>
                <el-button>进行中</el-button>
                <el-button>已结束</el-button>
            </div>
        </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="试卷信息" width="180"></el-table-column>
        <el-table-column prop="name" label="班级" width="180"></el-table-column>
        <el-table-column prop="men" label="创建人" width="180"></el-table-column>
        <el-table-column prop="start_time" label="开始时间"></el-table-column>
        <el-table-column prop="end_time" label="结束时间"></el-table-column>
        <el-table-column prop="cz" label="操作">
          <template slot-scope="scope">
            <el-button @click="detail(scope.row)" type="text" size="small">操作</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      id:'',
      val1: "",
      val2: "",
      options: [
        {
          value: "周考1",
          label: "周考1"
        },
        {
          value: "周考2",
          label: "周考2"
        },
        {
          value: "周考2",
          label: "周考2"
        },
        {
          value: "月考",
          label: "月考"
        }
      ],
      options2: [
        {
          value: "选项1",
          label: "javaScript上"
        },
        {
          value: "选项2",
          label: "javaScript下"
        },
        {
          value: "选项3",
          label: "模块化开发"
        },
        {
          value: "选项4",
          label: "node基础"
        },
        {
          value: "选项5",
          label: "组件化开发(vue)"
        },
        {
          value: "选项6",
          label: "渐进式开发(react)"
        },
        {
          value: "选项7",
          label: "项目实战"
        },
        {
          value: "选项8",
          label: "javaScript高级"
        },
        {
          value: "选项9",
          label: "node高级"
        }
      ],
      tableData: []
    };
  },
   computed: {
    ...mapState({
      listData: state => state.testList.list
    })
  },
  watch: {
    listData(now) {
      this.tableData = now.exam.map(item => {
        this.id = item.exam_exam_id;
        return {
          date: `${item.title}`,
          name : item.grade_name,
          men : item.user_name,
          start_time : item.start_time,
          end_time : item.end_time,
          cz : '操作',
        }
      })
    }
  },  
  mounted() {
    let qx = Cookies.get('vue_admin_template_token')
    localStorage.setItem('token',qx)
    this.func();
    
  },
  methods: {
    ...mapActions({
      func: 'testList/list'
    }),
    detail(row){
      
      this.$router.push('/detail/?id='+this.id)
     
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background: #f0f2f5;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 0px 24px 24px;
}
.top {
  margin: 0 0 24px;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}
h2 {
  padding: 20px 0px;
  margin-top: 10px;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 21px;
}
.top span {
  margin-left: 30px;
  font-size: 14px;
}
/deep/ .el-input el-input--suffix {
  height: 30px;
  width: 140px;
  border-color: #295eff;
  border-right-width: 1px !important;
}
/deep/ .el-input__inner {
  height: 32px;
  width: 164px;

  border-radius: none;
}
/deep/ .el-input__icon {
  line-height: 32px;
}
.top button {
  width: 130px;
  height: 32px;
  padding: 0 40px !important;
  border-radius: 4px !important;
  border: 0 !important;
  font-size: 14px !important;
  color: #fff !important;
  background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
  margin-left: 60px;
  margin-top: 2px;
}
.list{
  margin: 0 0 24px;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  margin-top: 10px;
}
.title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
/deep/ .cell{
        text-align: left;
        color: rgba(0, 0, 0, 0.65);
        font-size: 12px;
    }
th /deep/ .cell{
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
button{
    width:60px;
    height: 32px;
    border-color: #0139FD;
    box-shadow: none !important;
    border: 1px solid #d9d9d9;
    border-radius: 2px 0 0 2px;
    text-align: center;
    padding: 0px;
}
/deep/ tr{
  height:87px;
}
</style>
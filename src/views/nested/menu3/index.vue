<template>
  <div style="padding:30px;">
    <!-- 搜索栏 ------------------------------------------------------------------------->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="输入学生姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.num" placeholder="请选择教室号">
          <el-option
            v-for="(item,index) in tableData"
            :key="index"
            :label="item.room_text"
            :value="item.room_text"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.name" placeholder="班级名">
          <el-option
            v-for="(item,index) in tableData"
            :key="index"
            :label="item.grade_name"
            :value="item.grade_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search(formInline)">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -------------------------------------------------------------------------------->
    <template>
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
        <el-table-column label="姓名" prop="student_name" width="180"></el-table-column>
        <el-table-column label="学号" prop="student_id" width="180"></el-table-column>
        <el-table-column label="班级" prop="grade_name" width="180"></el-table-column>
        <el-table-column label="教室" prop="room_text" width="180"></el-table-column>
        <el-table-column label="密码" prop="student_pwd" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--分页 -------------------------------------------------------------------------- -->
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout=" prev, pager, next, sizes, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </template>
  </div>
</template>
  
<script>
import { studentList, delectStudent } from "@/api/classroom.js";
export default {
  data() {
    return {
      // 分页器----------------------------------------
       currentPage:1,//初始页
       pagesize:10,//每页条数
      // 输入框----------------------------------------
      formInline: {
        user: "",
        num: "",
        name: ""
      },
      // 表格-------------------------------------------------
      tableData: []
    };
  },
  methods: {
    //获取学生管理数据---------------------------
    async getStudentList() {
      let res = await studentList();
      console.log(res.data);
      this.tableData = res.data;
    },
    // 表格编辑删除-----------------------
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除学生--------------------------
    async handleDelete(index, row) {
      console.log(index, row);
     await delectStudent(row.student_id);
      alert("删除成功");
    },
    //点击搜索-----------------------------
    search(formInline) {},
    // 搜索重置按钮------------------------
    onSubmit() {
      console.log("submit!");
    },
    // 每页条数-------------------------------
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    //切换页面------------------------------
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  },
  created() {
    this.getStudentList();
  }
};
</script>
<style lang="scss">
.block {
  width: 100%;
  margin-top: 20px;
  text-align: right;
  padding-right: 100px;
}
</style>

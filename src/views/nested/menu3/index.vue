<template>
  <div style="padding:30px;">
   <!-- ------------------------------------------------------------------------------ -->
   <!-- 搜索栏 -->
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item>
    <el-input v-model="formInline.user" placeholder="输入学生姓名"></el-input>
  </el-form-item>
  <el-form-item>
    <el-select v-model="formInline.region" placeholder="请选择教室号">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-select v-model="formInline.region" placeholder="班级名">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">搜索</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">重置</el-button>
  </el-form-item>
</el-form>
  <!-- ------------------------------------------------------------------------------------ -->
  <!-- 表格 -->
    <template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="姓名"
       prop="student_name"
      width="180">
    </el-table-column>
    <el-table-column
      label="学号"
      prop="student_id"
      width="180">
    </el-table-column>
     <el-table-column
      label="班级"
        prop="grade_name"
      width="180">
    </el-table-column>
     <el-table-column
      label="教室"
       prop="room_text"
      width="180">
    </el-table-column>
     <el-table-column
      label="密码"
       prop="student_pwd"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
  <!-- -------------------------------------------------------------------------------- -->
<!-- 分页 -->
 <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout=" prev, pager, next, sizes, jumper"
      :total="400">
    </el-pagination>
  </div>
  </div>
</template>


<script>
import {studentList} from '@/api/user'
  export default {
    data() {
      return {
        // 分页--------------------------------
         currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        // 输入框----------------------------------------
         formInline: {
          user: '',
          region: ''
        },
        // 表格-------------------------------------------------
        tableData: []
      }
    },
    methods: {
      //获取学生管理数据---------------------------
      async getStudentList(){
        let res = await studentList();
        console.log(res.data);
        this.tableData = res.data
      },
      // 表格编辑删除-----------------------
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 搜索重置按钮------------------------
      onSubmit() {
        console.log('submit!');
      },
      // 分页-------------------------------
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    created () {
      this.getStudentList()
    }
  }
</script>
<style lang="scss">
  .block{
    width:100%;
    margin-top: 20px;
   text-align: right;
   padding-right: 100px;
  }
</style>

<template>
  <div style="padding:30px;">
    <el-button type="primary" @click="dialogFormVisible = true">+添加班级</el-button>
    <!-- --------------------------------------------------------------- -->
<el-dialog title="添加班级" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="班级名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="教室号" :label-width="formLabelWidth">
      <el-select v-model="form.num" placeholder="请选择教室号">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="课程名" :label-width="formLabelWidth">
      <el-select v-model="form.course" placeholder="课程名">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="()=>this.add(form)">确 定</el-button>
  </div>
</el-dialog>
<!--表格 -------------------------------------------------------------------------------------- -->
    <template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="班级名"
      prop="grade_name"
      width="180">
    </el-table-column>
    <el-table-column
      label="课程名"
      width="180"
      prop="subject_text"
      >
    </el-table-column>
     <el-table-column
      label="教室号"
      prop="room_text"
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
  </div>

</template>
<script>
import axios from 'axios'
import {classList} from "@/api/user"
  export default {
    data() {
      return {
        // 弹窗输入框-------------------------
         form: {
          name: '',//班级名
          num: '',//教室号
          course:''//课程名
        },
        formLabelWidth: '120px',
        // 添加弹窗--------------------------
         dialogTableVisible: false,
        dialogFormVisible: false,
        // 表格------------------------------
        tableData: []
      }
    },
    methods: {
      //获取班级管理数据----------
      async getClassList(){
        let res=await classList()
        console.log(res);
        this.tableData=res.data
      },
      // 编辑删除-----------------------
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created(){
      this.getClassList()
    }
  }
</script>

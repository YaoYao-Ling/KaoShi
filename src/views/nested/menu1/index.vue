<template>
  <div style="padding:30px;">
    <h2>班级管理</h2>
    <el-button type="primary" @click="dialogFormVisible = true">+添加班级</el-button>
    <!-- --------------------------------------------------------------- -->
    <el-dialog :title="text" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="班级名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="教室号" :label-width="formLabelWidth">
          <el-select v-model="form.room" placeholder="请选择教室号">
            <el-option
              v-for="(item,index) in classSelect"
              :key="index"
              :label="item"
              :value="data_Id[index]"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名" :label-width="formLabelWidth">
          <el-select v-model="form.subject" placeholder="课程名">
            <el-option
              v-for="(item,index) in classSubject"
              :key="index"
              :label="item"
              :value="data_Sub[index]"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="this.close">取 消</el-button>
        <el-button type="primary" @click="()=>this.add(form)">确 定</el-button>
      </div>
    </el-dialog>
    <!--表格 -------------------------------------------------------------------------------------- -->
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="班级名" prop="grade_name" width="300"></el-table-column>
        <el-table-column label="课程名" width="300" prop="subject_text"></el-table-column>
        <el-table-column label="教室号" prop="room_text" width="300"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
  </div>
</template>
<script>
import axios from "axios";
import { delectClass, addClass, updataClass } from "@/api/classroom";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      //编辑班级参数id---------------------
      grade_id: "",
      // 弹窗输入框-------------------------
      form: {
        name: "", //班级名
        room: "", //教室id
        subject: "", //课程id
        flag: false
      },
      formLabelWidth: "120px",
      // 添加弹窗--------------------------
      dialogFormVisible: false,
      // 表格------------------------------
      tableData: [],
      text: "添加班级"
    };
  },
  computed: {
    //获取班级管理数据----------------------------
    ...mapState({
      classList: state => state.classroom.classList,
      classSelect: state => state.classroom.classSelect,
      classSubject: state => state.classroom.classSubject,
      data_Id: state => state.classroom.data_Id,
      data_Sub: state => state.classroom.data_Sub
    })
  },
  methods: {
    ...mapActions({
      getClassList: "classroom/getClassList"
    }),
    async getList() {
      await this.getClassList();
      this.tableData = this.classList;
    },
    //编辑班级--------------------------
    handleEdit(index, row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.form.name = row.grade_name;
      this.form.room = row.room_id;
      this.form.subject = row.subject_id;
      this.form.flag = true;
      this.grade_id = row.grade_id;
      this.text = "编辑班级";
    },
    //删除班级--------------------------
    async handleDelete(index, row) {
      console.log(row.grade_id);
      await delectClass(row.grade_id);
      alert("删除成功");
      this.getList();
    },
    //添加编辑班级---------------------------
    async add(from) {
      console.log(from);
      if (from.flag) {
        this.text = "编辑班级";
        await updataClass(this.grade_id, from);
        alert("修改成功");
        this.getList();
        this.form.name = "";
        this.form.room = "";
        this.form.subject = "";
        this.form.flag = false;
        this.grade_id = "";
        this.dialogFormVisible = false;
        this.text = "添加班级";
      } else {
        this.text = "添加班级";
        console.log(from);
        await addClass(from);
        alert("添加成功");
        this.form.name = "";
        this.form.room = "";
        this.form.subject = "";
        this.form.flag = false;
        this.grade_id = "";
        this.dialogFormVisible = false;
        this.getList();
      }
    },
    //点击取消---------------------------------------------
    close() {
      this.form.name = "";
      this.form.room = "";
      this.form.subject = "";
      this.form.flag = false;
      this.grade_id = "";
      this.dialogFormVisible = false;
      this.text = "添加班级";
    }
  },
  created() {
    this.getList();
  }
};
</script>

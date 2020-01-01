<template>
  <div class="yuejuan">
    <h2>待批班级</h2>
    <!-- ----------------------------------------------------------------------------------- -->
    <el-table
      :data="classList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
    >
      <el-table-column label="班级名" prop="grade_name" width="200"></el-table-column>
      <el-table-column label="课程名称" prop="subject_text" width="200"></el-table-column>
      <el-table-column label="阅卷状态" prop width="200"></el-table-column>
      <el-table-column label="课程名称" prop="subject_text" width="200"></el-table-column>
      <el-table-column label="成材率" prop="room_text" width="300"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="danger" @click="$router.push('/Marking/pijuan')">批卷</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页 -------------------------------------------------------------------------- -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10, 20, 30, 40]"
        :page-size="pagesize"
        layout="  prev, pager, next,sizes, jumper"
        :total="classList.length"
      ></el-pagination>
    </div>
    <!-- -------------------------------------------------------------------------------- -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      // 分页器----------------------------------------
      currentPage: 1, //初始页
      pagesize: 10 //每页条数
    };
  },
  computed: {
    ...mapState({
      classList: state => state.classroom.classList
    })
  },
  methods: {
    ...mapActions({
      getClassList: "classroom/getClassList"
    }),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  },
  created() {
    console.log(this.classList);
    this.getClassList();
  }
};
</script>

<style scoped lang='scss'>
.yuejuan {
  padding: 30px 35px;
}
.block {
  text-align: right;
  margin-top: 20px;
}
</style>
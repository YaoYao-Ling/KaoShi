<template>
  <div class="pijuan">
    <!-- ------------------------------------------------------------------ -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        状态
        <el-select>
          <el-option></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        班级
        <el-select>
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <!--列表 ---------------------------------------------------------------------- -->
    <el-table
      :data="yueJuanList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
    >
      <el-table-column label="班级" prop="1601B" width="180">1601B</el-table-column>
      <el-table-column label="姓名" prop="student_name" width="180"></el-table-column>
      <el-table-column label="阅卷状态" prop="未阅" width="180">未阅</el-table-column>
      <el-table-column label="开始时间" prop="start_time" width="180"></el-table-column>
      <el-table-column label="结束时间" prop="end_time" width="200"></el-table-column>
      <el-table-column label="成材率" prop="-" width="200">-</el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="danger">批卷</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页 -------------------------------------------------------------------------- -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8,10, 20, 30, 40]"
        :page-size="pagesize"
        layout="  prev, pager, next,sizes, jumper"
        :total="yueJuanList.length"
      ></el-pagination>
    </div>
    <!-- ------------------------------------------------------------------ -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      // 分页器----------------------------------------
      currentPage: 1, //初始页
      pagesize: 10, //每页条数
      // 输入框----------------------------------------
      formInline: {
        user: "",
        num: "",
        name: ""
      }
    };
  },
  computed: {
    ...mapState({
      yueJuanList: state => state.yuejuan.yueJuanList
    })
  },
  methods: {
    ...mapActions({
      getList: "yuejuan/getList"
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
    this.getList();
  }
};
</script>

<style scoped lang='scss'>
.pijuan {
  padding: 30px 35px;
}
.block {
  text-align: right;
  margin-top: 20px;
}
</style>
<template>
  <!-- 用户展示 -->
  <div class="wrap">
    <h1>{{currItem}}</h1>
    <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column prop="user_name" label="用户名" width="180"></el-table-column>
      <el-table-column prop="user_pwd" label="密码" style="width: 50%"></el-table-column>
      <el-table-column prop="identity_text" label="身份" width="180"></el-table-column>
    </el-table>
    <el-pagination 
        background 
        layout="prev, pager, next" 
        :total="list.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
// import func from '../../../vue-temp/vue-editor-bridge'
export default {
  props: ["list", "currItem"],
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 10 //每页的数据
    };
  },
  methods: {
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(val) {
      this.currentPage = val; // 点击第几页
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: normal;
}
</style>
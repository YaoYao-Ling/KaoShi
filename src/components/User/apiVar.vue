<template>
<!-- api接口权限 -->
  <div class="wrap">
      <h1>{{currItem}}</h1>
      <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
          <el-table-column prop="api_authority_text" label="api权限名称" style="width: 30%"></el-table-column>
          <el-table-column prop="api_authority_url" label="api权限url" style="width: 30%"></el-table-column>
          <el-table-column prop="api_authority_method" label="api权限方法" style="width: 30%"></el-table-column>
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

export default {
    props:['list','currItem'],
    data(){
        return {
            currentPage:1,  //初始页
            pagesize:10,  //每页的数据
        }
    },
    methods:{
        handleSizeChange(size){
            this.pagesize = size;
            console.log(this.pagesize)
        },
        handleCurrentChange(currentPage){
            this.currentPage = currentPage;  // 点击第几页
        }
    }
}
</script>

<style lang="scss" scoped>
h1{
    font-weight: normal;
}
</style>